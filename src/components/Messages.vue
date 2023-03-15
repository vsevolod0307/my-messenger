<template>
    <div v-if="getMessages" class="dialog-messages">
        <div class="dialog-aside">
            <ul class="dialog-users">
                <li v-for="user, idx in getMessages.users" :key="idx" class="dialog-user" @click="getUser(user[idx])">
                    <span v-if="user[idx]">{{ user[idx].first_name }} {{ user[idx].last_name }}</span>
                </li>
            </ul>
        </div>
        <div v-if="!dialogMessage" class="dialog-message"></div>
        <div v-if="dialogMessage" class="dialog-message">
            <div v-for="value, idx in getMessages.dialog" :key="idx">
                <div v-for="message, i in value" :key="i">
                    <div :class="{
                        'dialog-item': true,
                        'right': message.fromMe,
                        'left': !message.fromMe
                        }">
                        <div class="dialog-message_item">{{ message.body }}</div>
                    </div>
                </div>
                <input 
                    type="text" 
                    placeholder="Введите сообщение" 
                    class="dialog-input"
                    v-model="message"
                    @keyup.enter="sendMessage(uid)"
                >
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import store from '@/store';
import { set, ref, getDatabase, push, onValue } from 'firebase/database';
export default {
    name: "Messages",
    data() {
        return {
            message: "",
            user: null,
            dialogMessage: false
        }
    },
    computed: {
        getMessages() {
            store.dispatch("loadMessagesPersonal");
            if(store.getters.getMessagesPersonal && store.getters.getListUsers) {
                return {
                    dialog: Object.entries(store.getters.getMessagesPersonal).map(item => {
                        return Object.values(item[1]).map(item => {
                            return item.message
                        })
                    }),
                    users: Object.entries(store.getters.getMessagesPersonal).map(user => {
                        const userUid = user[0].split("-")[1]
                        return store.getters.getListUsers.filter(item => {
                            return userUid === item.uid
                        })
                    })
                }
            }
        },
        uid() {
            return store.state.userUid;
        }
    },
    methods: {
        cons(i) {
            console.log(i)
        },
        getUser(user) {
            this.user = user;
            this.dialogMessage = true;
            console.log(this.user)
        },
        sendMessage(uid) {
            try {
                set(push(ref(getDatabase(), `users/(${uid})/personal-chats/is-${this.user.uid}`)), {
                    message: {
                        body: this.message,
                        datetime: new Date().toISOString(),
                        fromMe: true
                    }
                })

                set(push(ref(getDatabase(), `users/(${this.user.uid})/personal-chats/is-${uid}`)), {
                    message: {
                        body: this.message,
                        datetime: new Date().toISOString(),
                        fromMe: false
                    }
                })
                    
            } catch(e) {
                console.log(e);
            } finally {
                // this.isSend = false;
                this.message = "";
            }
        },
    },
    mounted() {
        store.dispatch("loadGetUsers");
    }
}
</script>

<style lang="scss" scoped>
    .dialog {
        &-aside {
            width: 25%;
            border-right: 2px solid;
            height: 100%;
            background-color: #d7e6ff;
        }
        &-messages {
            display: flex;
            height: 80vh;
        }
        &-message {
            width: 75%;
            background-color: rgba(161, 235, 161, 0.5);
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            &_item {
                border: 1px solid #fff;
                padding: 14px;
                border-radius: 8px;
                background-color: #e9e4e4;
                box-shadow: inset 0px 0px 2px 0px;
                font-size: 20px;
            }
        }
        &-item {
            display: flex;
            margin: 4px 0;
        }
        &-input {
            margin-top: 20px;
            padding: 10px;
            font-size: 16px;
            border-radius: 4px;
            border: none;
            outline: none;
            width: 94%;
        }
        &-user {
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid;
            &:hover {
                background-color: rgb(173 204 255);
                cursor: pointer;
            }
        }
    }
    .right {
        justify-content: flex-end;
        > .dialog-message_item {
            background-color: #6d7a81;
            color: #fff;
            text-align: right;
        }
    }
    .left {
        justify-content: flex-start;
        > .dialog-message_item {
            text-align: left;
        }
    }

    @media (max-width: 425px) {
        .dialog-message_item {
            padding: 8px;
            font-size: 18px;
        }
    }
</style>