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
            :user="user"
            :uid="dialogUid"
            :dialogMessage="dialogMessage"
        />
    </div>
</template>

<script>
/* eslint-disable */
import store from '@/store';
import DialogMessages from "@/components/DialogMessages.vue";
import { User } from '@/types/user';
import { Message } from '@/types/chats';
export default {
    name: "Messages",
    components: { DialogMessages },
    data() {
        return {
            user: null,
            dialogMessage: false,
            dialogUid: ""
        }
    },
    computed: {
        getMessages() {
            store.dispatch("loadMessagesPersonal");
            if(store.getters.getMessagesPersonal && store.getters.getListUsers) {
                return {
                    dialogs: Object.entries(store.getters.getMessagesPersonal).map(([key, item]) => {
                        return {
                            [key]: Object.values(item).map((message) => {
                                return message.message;
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
        }
    },
    watch: {
        'getMessages.dialogs': {
            handler(updatedUser) {
                if(Array.isArray(updatedUser)) {
                    if(updatedUser.length && this.dialogUid) {
                        this.getPersonalDialog(updatedUser, this.dialogUid)
                    } else {
                        return false;
                    }
                }
            }
        },
        dialogUid(updatedDialog) {
            this.getPersonalDialog(this.getMessages.dialogs, updatedDialog)
        }
    },
    methods: {
        getUser(uid) {
            this.dialogUid = uid;
            this.dialogMessage = true;
        },
        getPersonalDialog(dialogs, uid) {
            dialogs.forEach(item => {
                if(Object.keys(item)[0] === `is-${uid}`) {
                    Object.values(item).forEach(item => this.user = [...item]);
                }
            })
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
            border-radius: 20px 0 0 20px;
        }
        &-messages {
            display: flex;
            height: 80vh;
            width: 80%;
            margin: 0 auto;
            margin-top: 40px;
            box-shadow: 4px -3px 8px -7px cadetblue;
            border-radius: 20px;
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

    @media(max-width: 425px) {
        .dialog {
            &-messages {
                margin-top: 12px;
                width: 96%;
            }
        }
    }
</style>