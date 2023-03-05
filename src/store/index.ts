import { getAuth, Auth } from "firebase/auth";
import { createStore } from "vuex";
import { getDatabase, set, ref, onValue, get, child, onChildAdded } from "firebase/database";

export default createStore({
  state: {
    userAuth: null,
    listUsers: null,
    databaseRef: null,
    userUid: null
  },
  getters: {
    getListUsers(state) {
      return state.listUsers;
    },
    userUid: state => {
      return state.userUid
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
    loadListUsers({commit, state}) {
      onValue(state.databaseRef, (data) => {
        commit("updateListUsers", data.val())
      })
    }
  },
  modules: {},
});
