<template>
    <div>
        <!-- <div v-if="!dialogMessage" class="dialog-message"></div>
        <div v-if="dialogMessage" class="dialog-message">
            <div v-for="value, idx in dialog" :key="idx">
                <div v-for="message, i in value" :key="i">
                    <div :class="{
                        'dialog-item': true,
                        'right': user.fromMe,
                        'left': !user.fromMe
                        }">
                        <div class="dialog-message_item">{{ user.body }}</div>
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
        </div> -->
    </div>
</template>

<script>
import { set, ref, getDatabase, push, onValue } from 'firebase/database';

export default {
    name: "DialogMessages",
    props: ['uid', 'user', 'dialogMessage'],
    data() {
        return {
            message: ""
        }
    },
    methods: {
        sendMessage(uid) {
            try {
                set(push(ref(getDatabase(), `users/(${this.uid})/personal-chats/is-${this.user.uid}`)), {
                    message: {
                        body: this.message,
                        datetime: new Date().toISOString(),
                        fromMe: true
                    }
                })

                set(push(ref(getDatabase(), `users/(${this.user.uid})/personal-chats/is-${this.uid}`)), {
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
    }
}
</script>

<style lang="scss" scoped>
    .dialog {
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
    }
</style>