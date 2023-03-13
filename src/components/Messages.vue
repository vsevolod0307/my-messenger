<template>
    <div class="dialog-messages">
        <div class="dialog-aside">
            <ul class="dialog-users">
                <li v-for="user, idx in getMessages.users" :key="idx" class="dialog-user">
                    {{ user[idx].first_name }} {{ user[idx].last_name }}
                </li>
            </ul>
        </div>
        <div class="dialog-message" v-for="value, idx in getMessages.dialog" :key="idx">
            <div v-for="message, i in value" :key="i">
                <div :class="{
                    'dialog-message_item': true,
                    'right': message.fromMe,
                    'left': !message.fromMe
                    }">{{ message.body }}</div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import store from '@/store';
export default {
    name: "Messages",
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
            width: 300px;
            border-right: 2px solid;
            height: 100%;
        }
        &-messages {
            display: flex;
        }
        &-message {
            width: 100%;
            &_item {
                display: flex;
            }
        }
    }
    .right {
        justify-content: flex-end;
    }
    .left {
        justify-content: flex-start;
    }
</style>