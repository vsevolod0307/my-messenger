/* eslint-disable */
import { getAuth, Auth } from "firebase/auth";
import { createStore } from "vuex";
import { getDatabase, set, ref, onValue, get, child, onChildAdded, DatabaseReference } from "firebase/database";
import { User, CurrentUser } from "@/types/user";

export default createStore({
  state: {
    userAuth: {} as Auth,
    listUsers: [] as User[],
    messagesPersonal: [],
    databaseRef: {} as DatabaseReference,
    userUid: "" as string
  },
  getters: {
    getListUsers(state): User[] {
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
    getCurrentUser(state): CurrentUser | undefined {
      const currentUser = Object.entries(state.listUsers).find(user => user[0] === `(${state.userUid})`);
      const regExpDelBrackets = /[()]/g;
      if(currentUser) {
        return {
          uid: currentUser[0].replace(regExpDelBrackets, ""),
          ...currentUser[1]
        }
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
    auth(state): void {
      state.userAuth = getAuth();
    },
    databaseRef(state, pathDb): void {
      state.databaseRef = ref(getDatabase(), pathDb);
    },
    updateListUsers(state, data): void {
      state.listUsers = data;
    },
    updateMessagesPersonal(state, data): void {
      state.messagesPersonal = data;
    },
    saveUid(state, uid): void {
      state.userUid = uid;
    }
  },
  actions: {
    auth(context): void {
      context.commit("auth");
    },
    databaseRef(context, pathDb): void {
      context.commit("databaseRef", pathDb);
    },
    loadGetUsers({commit}): void {
      get(child(ref(getDatabase()), "users")).then(d => {
        commit("updateListUsers", d.val())
      })
    },
    loadMessagesPersonal({commit, state}): void {
      onValue(ref(getDatabase(), `users/(${state.userUid})/personal-chats`), (data) => {
        commit("updateMessagesPersonal", data.val())
      })
    },
    loadListUsers({commit, state}): void {
      onValue(state.databaseRef, (data) => {
        commit("updateListUsers", data.val())
      })
    }
  },
  modules: {},
});
