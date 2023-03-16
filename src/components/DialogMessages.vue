<template>
    <div class="dialog-block">
        <div v-if="!dialogMessage" class="dialog-message"></div>
        <div v-if="dialogMessage" class="dialog-message">
            <div v-for="message, i in user" :key="i">
                <div :class="{
                    'dialog-item': true,
                    'right': message.fromMe,
                    'left': !message.fromMe
                    }">
                    <div class="dialog-message_item">{{ message.body }}</div>
                </div>
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
</template>

<script>
import { set, ref, getDatabase, push, onValue } from 'firebase/database';
import store from '@/store';

export default {
    name: "DialogMessages",
    props: ['uid', 'user', 'dialogMessage'],
    data() {
        return {
            message: ""
        }
    },
    computed: {
        uidUser() {
            return store.state.userUid;
        }
    },
    methods: {
        sendMessage() {
            try {
                set(push(ref(getDatabase(), `users/(${this.uidUser})/personal-chats/is-${this.uid}`)), {
                    message: {
                        body: this.message,
                        datetime: new Date().toISOString(),
                        fromMe: true
                    }
                })

                set(push(ref(getDatabase(), `users/(${this.uid})/personal-chats/is-${this.uidUser}`)), {
                    message: {
                        body: this.message,
                        datetime: new Date().toISOString(),
                        fromMe: false
                    }
                })

                this.$emit("update-dialog", this.uid);
            } catch(e) {
                console.log(e);
            } finally {
                this.message = "";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .dialog {
        &-message {
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            &::-webkit-scrollbar {
                width: 0;
            }
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
            padding: 10px;
            font-size: 16px;
            border-radius: 4px;
            border: none;
            outline: none;
            width: 94.5%;
            position: absolute;
            bottom: 20px;
            left: 0;
            margin-left: 2%;
        }
        &-block {
            width: 75%;
            background-color: rgba(161, 235, 161, 0.5);
            padding: 20px;
            padding-bottom: 80px;
            position: relative;
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