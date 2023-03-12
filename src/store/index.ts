/* eslint-disable */
import { getAuth, Auth } from "firebase/auth";
import { createStore } from "vuex";
import { getDatabase, set, ref, onValue, get, child, onChildAdded } from "firebase/database";

export default createStore({
  state: {
    userAuth: null,
    listUsers: [],
    messagesPersonal: [],
    databaseRef: null,
    userUid: null
  },
  getters: {
    getListUsers(state) {
      const filterList = Object.entries(state.listUsers).filter(user => user[0] !== `(${state.userUid})`)
      return filterList.map(item => {
        const regExpDelBrackets = /[()]/g;
        return {
          uid: item[0].replace(regExpDelBrackets, ""),
          ...item[1]
        }
      })
    },
    getMessagesPersonal(state) {
      return state.messagesPersonal
    },
    getCurrentUser(state) {
      const currentUser = Object.entries(state.listUsers).find(user => user[0] === `(${state.userUid})`);
      const regExpDelBrackets = /[()]/g;
      return {
        uid: currentUser[0].replace(regExpDelBrackets, ""),
        ...currentUser[1]
      }
    },
    userUid: state => {
      return state.userUid
    },
    userAuth: state => {
      return state.userAuth;
    }
  },
  mutations: {
    auth(state) {
      state.userAuth = getAuth();
    },
    databaseRef(state, pathDb) {
      state.databaseRef = ref(getDatabase(), pathDb);
    },
    updateListUsers(state, data) {
      state.listUsers = data;
    },
    updateMessagesPersonal(state, data) {
      state.messagesPersonal = data;
    },
    saveUid(state, uid) {
      state.userUid = uid;
    }
  },
  actions: {
    auth(context) {
      context.commit("auth");
    },
    databaseRef(context, pathDb) {
      context.commit("databaseRef", pathDb);
    },
    loadGetUsers({commit}) {
      get(child(ref(getDatabase()), "users")).then(d => {
        commit("updateListUsers", d.val())
      })
    },
    loadMessagesPersonal({commit, state}) {
      console.log(this.state.userUid)
      if(state.userUid) {
        onValue(ref(getDatabase(), `users/(${state.userUid})/personal-chats`), (data) => {
          commit("updateMessagesPersonal", data.val())
        })
      }
    },
    loadListUsers({commit, state}) {
      onValue(state.databaseRef, (data) => {
        commit("updateListUsers", data.val())
      })
    }
  },
  modules: {},
});
