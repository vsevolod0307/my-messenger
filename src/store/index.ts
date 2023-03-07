import { getAuth, Auth } from "firebase/auth";
import { createStore } from "vuex";
import { getDatabase, set, ref, onValue, get, child, onChildAdded } from "firebase/database";

export default createStore({
  state: {
    userAuth: null,
    listUsers: [],
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
    loadListUsers({commit, state}) {
      onValue(state.databaseRef, (data) => {
        commit("updateListUsers", data.val())
      })
    }
  },
  modules: {},
});
