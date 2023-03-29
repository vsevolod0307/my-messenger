/* eslint-disable */
import { getAuth, Auth } from "firebase/auth";
import { createStore } from "vuex";
import { getDatabase, set, ref, onValue, get, child, onChildAdded, DatabaseReference } from "firebase/database";
import { UserInfo, CurrentUser, User } from "@/types/user";
import { PersonalChats } from "@/types/chats";
import { getRandomNumber } from "@/helpers/functions";

export default createStore({
  state: {
    userAuth: {} as Auth,
    listUsers: [] as UserInfo[],
    messagesPersonal: {} as PersonalChats,
    databaseRef: {} as DatabaseReference,
    userUid: "" as string
  },
  getters: {
    getMessagesPersonal(state): PersonalChats {
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
    async loadGetUsers({commit, state}): Promise<void> {
      get(child(ref(getDatabase()), "users")).then(async d => {
        let commonData: any;
        await fetch(`https://randomuser.me/api?results=${getRandomNumber(6, 18)}`)
        .then(res => res.json())
        .then(res => commonData = res.results);
        commonData = commonData.map((item: any) => {
          return {
            gender: item.gender,
            first_name: item.name.first,
            last_name: item.name.last,
            age: item.dob.age,
            avatarUrl: item.picture.large,
            about_us: "---"
          }
        })
        const filterList = Object.entries(d.val()).filter(user => user[0] !== `(${state.userUid})`)
        const mainData = filterList.map(([key, itemType]) => {
          const regExpDelBrackets = /[()]/g;
          const item = itemType as User
          return {
            uid: key.replace(regExpDelBrackets, ""),
            ...item.info
          }
        })
        // console.log(mainData[0]["personal-chats"])
        commit("updateListUsers", [...mainData, ...commonData])
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
