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
    <div v-if="isSend" class="send-modal" @click.self="isSend = false">
        <form action="#">
            <textarea name="" id="" cols="30" rows="10" placeholder="Введите сообщение" v-model="message"></textarea>
            <button class="list-user_send" @click.prevent="sendMessage(user)" type="submit">Отправить</button>
        </form>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { set, ref, getDatabase, push } from 'firebase/database';
import { User } from '@/types/user';

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
            return store.state.listUsers;
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
            try {
                set(push(ref(getDatabase(), `users/(${user.uid})/personal-chats/is-${this.uid}`)), {
                    message: {
                        body: this.message,
                        datetime: new Date().toISOString(),
                        fromMe: false
                    }
                })

                set(push(ref(getDatabase(), `users/(${this.uid})/personal-chats/is-${user.uid}`)), {
                    message: {
                        body: this.message,
                        datetime: new Date().toISOString(),
                        fromMe: true
                    }
                }) 
                this.message = "";
            } catch(e) {
                console.log(e);
            } finally {
                this.isSend = false;
            }
        },
        getUser(user: User) {
            this.isSend = true
            this.user = user;
        }
    },
    mounted() {
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
    .send-modal {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        backdrop-filter: grayscale(1);
        form {
            position: absolute;
            top: 350px;
            left: 42vw;
            display: flex;
            flex-direction: column;
            gap: 20px;
            button {
                margin: 0;
            }
            textarea {
                padding: 10px;
                border-radius: 10px;
                resize: none;
                border: none;
                box-shadow: 1px 1px 7px 3px;
                outline: none;
            }
        }
    }

    @media (max-width: 425px) {
        .list-user_avatar {
            min-width: 120px;
            height: 120px;
        }
        .list-user_send {
            height: 35px;
            font-size: 12px;
        }
        .list-user_name, .list-user_age {
            padding: 5px 20px;
        }
        .send-modal form{
            left: 18vw;
        }
    }
</style>