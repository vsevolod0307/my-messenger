<template>
    <div v-if="getMessages" class="dialog-messages">
        <div class="dialog-aside">
            <ul class="dialog-users">
                <li v-for="user, idx in getMessages.users" :key="idx" class="dialog-user" @click="getUser(user.uid)">
                    <span v-if="user">{{ user.first_name }} {{ user.last_name }}</span>
                </li>
            </ul>
        </div>
        <dialog-messages
            :uid="uid"
            :user="user"
            :dialogMessage="dialogMessage"
        />
        {{ cons(getMessages) }}
    </div>
</template>

<script>
/* eslint-disable */
import store from '@/store';
import DialogMessages from "@/components/DialogMessages";
export default {
    name: "Messages",
    components: { DialogMessages },
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
                    dialogs: Object.entries(store.getters.getMessagesPersonal).map(([key, item]) => {
                        return {
                            [key]: Object.values(item).map(message => {
                                return message.message
                            })
                        }
                    }),
                    users: Object.entries(store.getters.getMessagesPersonal).map((key) => {
                        const userUid = key[0].split("-")[1]
                        const user = store.getters.getListUsers.find(item => item.uid === userUid)
                        if(user) {
                            return {
                                first_name: user.first_name,
                                last_name: user.last_name,
                                uid: user.uid
                            }
                        }
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
        getUser(uid) {
            this.dialogMessage = true;
            this.getPersonalDialog(uid)
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
        getPersonalDialog(uid) {
            const red = this.getMessages.dialogs.find((item, i) => Object.keys(item)[i] === `is-${uid}`)
            console.log(red)
        }
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