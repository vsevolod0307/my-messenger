<template>
    <ul class="list-users">
        <li v-for="user, idx in listUsers" :key="idx" class="list-user">
            <div class="list-user_avatar" :style="{ background: `url(${user.avatarUrl}) center center / cover no-repeat`, display: 'flex' }">
                <!-- <img :src="user.avatarUrl" alt=""> -->
            </div>
            <div class="list-user_info">
                <div class="list-user_name">
                    <span>{{ user.first_name }}</span>
                    <span>{{ user.last_name }}</span>
                </div>
                <div class="list-user_age">
                    <span>Возраст: </span>
                    <span>{{ user.age }}</span>
                </div>
                <button class="list-user_send" @click="getUser(user)">Написать сообщение</button>
            </div>
        </li>
    </ul>
    <div v-if="isSend" class="send-modal">
        <form action="#">
            <textarea name="" id="" cols="30" rows="10" placeholder="Введите сообщение" v-model="message"></textarea>
            <button @click.prevent="sendMessage(user)" type="submit">Отправить</button>
        </form>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { set, ref, getDatabase, push } from 'firebase/database';

interface User {
    gender: string,
    first_name: string,
    last_name: string,
    about_us: string,
    age: number,
    avatarUrl: string,
    uid: string
}

export default {
    name: "ListUsers",
    data() {
        return {
            isSend: false,
            message: "",
            user: {} as User
        }
    },
    computed: {
        listUsers(): User[] {
            return store.getters.getListUsers;
        },
        uid(): string {
            return store.state.userUid;
        },
        currentUser(): User {
            return store.getters.getCurrentUser;
        }
    },
    methods: {
        sendMessage(user: User) {
            console.log(user);
            console.log(this.currentUser)
            console.log(this.message)
            try {
                // onValue(ref(getDatabase(), `users/(${this.currentUser.uid})/personal-chats/is-${user.uid}`), data => {
                //     if(!data.exists()) {
                //         isExist = false;
                //         const key = `is-${user.uid}`;
                //         set(ref(getDatabase(), `users/(${this.currentUser.uid})/personal-chats`), {
                //             [key]: {
                //                 info: {
                //                     first_name: user.first_name,
                //                     last_name: user.last_name
                //                 }
                //             }
                //         })
                //         set(ref(getDatabase(), `users/(${user.uid})/personal-chats`), {
                //             [key]: {
                //                 info: {
                //                     first_name: this.currentUser.first_name,
                //                     last_name: this.currentUser.last_name
                //                 }
                //             }
                //         }).then(() => isExist = true);
                //     }
                // })
                // onValue(ref(getDatabase(), `users/(${user.uid})/personal-chats/is-${this.currentUser.uid}`), data => {
                //     if(!data.exists()) {
                //         isExist = false;
                //         const key = `is-${this.currentUser.uid}`;
                //         set(ref(getDatabase(), `users/(${user.uid})/personal-chats`), {
                //             [key]: {
                //                 info: {
                //                     first_name: this.currentUser.first_name,
                //                     last_name: this.currentUser.last_name
                //                 }
                //             }
                //         }).then(() => isExist = true);
                //     }
                // })
            set(push(ref(getDatabase(), `users/(${user.uid})/personal-chats/is-${this.currentUser.uid}`)), {
                message: {
                    body: this.message,
                    datetime: new Date().toISOString(),
                    fromMe: false
                }
            })

            set(push(ref(getDatabase(), `users/(${this.currentUser.uid})/personal-chats/is-${user.uid}`)), {
                message: {
                    body: this.message,
                    datetime: new Date().toISOString(),
                    fromMe: true
                }
            })
                    
            } catch(e) {
                console.log(e);
            } finally {
                this.isSend = false;
                // this.message = "";
            }
        },
        getUser(user: User) {
            this.isSend = true
            this.user = user;
        }
    },
    mounted() {
        // this.uid = store.state.userUid;
        // store.dispatch("databaseRef", "users");
        store.dispatch("loadGetUsers");
    }
}
</script>

<style lang="scss" scoped>
    .list-users {
        list-style-type: none;
    }
    .list-user {
        display: flex;
        margin: 20px 0;
        box-shadow: 1px 1px 9px 2px #e5dddd;
        &_avatar {
            min-width: 150px;
            height: 150px;
        }
        &_name, &_age {
            padding: 10px 20px;
        }
        &_name > span:first-child {
            margin-right: 6px;
        }
        &_send {
            background-color: #a1eba1;
            border: none;
            border-radius: 6px;
            padding: 10px;
            height: 40px;
            text-transform: uppercase;
            cursor: pointer;
            margin-top: 20px;
            margin-left: 20px;
            font-size: 14px;
            font-weight: 600;
            &:hover {
                background-color: rgba(161,  235,  161, 0.5);
            }
        }
        &_info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>