<template>
    <div v-if="isAllUsers" class="list-title">Все пользователи</div>
    <ul class="list-users" v-if="dataUsers">
        <li v-for="user, idx in dataUsers" :key="idx" class="list-user">
            <router-link
                v-if="user.uid"
                :to="{
                    name: 'profile',
                    params:  {
                        id: user.uid
                    }
                }"
            >
                <div v-if="user.avatarUrl" class="list-user_avatar" :style="{ background: `url(${user.avatarUrl}) center center / cover no-repeat`, display: 'flex' }"></div>
                <img v-else src="@/assets/no_avatar.png" class="list-user_avatar">
            </router-link>
            <div class="list-user_info">
                <div class="list-user_name">
                    <span>{{ user.first_name }}</span>
                    <span>{{ user.last_name }}</span>
                </div>
                <div class="list-user_age">
                    <span>Возраст: </span>
                    <span>{{ user.age }}</span>
                </div>
                <div class="list-user_actions-request" v-if="isRequest">
                    <button @click="allowFriend(user)" class="list-user-allow">Принять</button>
                    <button @click="disallowFriend(user.uid)" class="list-user-disallow">Отклонить</button>
                </div>
                <div class="list-user_actions" v-else>
                    <button :disabled="!user.uid" class="list-user_send" @click="getUser(user)"></button>
                    <button v-if="isAllUsers" :disabled="!user.uid" class="list-user_add-friend" @click="sendAddFriend(user.uid)"></button>
                </div>
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
import { set, ref, getDatabase, push, remove } from 'firebase/database';
import { UserInfo } from '@/types/user';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    name: "ListUsers",
    props: {
        dataUsers: {} as PropType<UserInfo[]>,
        isAllUsers: {
            type: Boolean,
            default: true
        },
        isRequest: {
            type: Boolean, 
            default: false
        }
    },
    data() {
        return {
            isSend: false,
            message: "" as string,
            user: {} as UserInfo
        }
    },
    computed: {
        uid(): string {
            return store.state.userUid;
        },
        currentUser(): UserInfo {
            return store.getters.getCurrentUser;
        }
    },
    methods: {
        sendMessage(user: UserInfo): void {
            try {
                set(push(ref(getDatabase(), `users/(${user})/personal-chats/is-${this.uid}`)), {
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
        getUser(user: UserInfo): void {
            this.isSend = true
            this.user = user;
        },
        sendAddFriend(uid?: string): void {
            set(ref(getDatabase(), `users/(${uid})/request-friends/${this.uid}`), {
                allow: false
            })
        },
        allowFriend(user?: UserInfo): void {
            set(ref(getDatabase(), `users/(${this.uid})/request-friends`), null);
            set(ref(getDatabase(), `users/(${user?.uid})/friends/${this.uid}`), {...this.currentUser});
            set(ref(getDatabase(), `users/(${this.uid})/friends/${user?.uid}`), {...user});
        },
        disallowFriend(uid?: string): void {
            console.log("disallow friend" + uid)
        }
    },
    mounted(): void {
        store.dispatch("loadCurrentUser");
    }
})
</script>

<style lang="scss" scoped>
    .list-users {
        list-style-type: none;
    }
    .list-title {
        font-size: 24px;
        margin-top: 20px;
        letter-spacing: 2px;
        font-weight: 600;
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
        &_send, &_add-friend {
            background-color: #a1eba1;
            background: url(../assets/send-mail.png) center 4px / 50% no-repeat;
            border: none;
            border-radius: 6px;
            padding: 10px 30px;
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
        &_add-friend {
            background: url(../assets/add-friend.png) center center / 50% no-repeat;
            margin-left: 5px;
            &:hover {
                background-color: rgba(215, 230, 255, 0.5);
            }
        }
        &_info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        &_actions-request {
            padding: 4px 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        &-allow, &-disallow {
            min-width: 140px;
            padding: 4px 0;
            border: none;
            background-color: #d0f5d0;
            cursor: pointer;
            font-size: 14px;
            text-transform: uppercase;
            font-weight: 600;
            border-radius: 4px;
            &:hover {
                background-color: rgba(208, 245, 208, 0.7);
            }
        }
        &-disallow {
            background-color: rgb(58, 55, 55);
            color: #fff;
            &:hover {
                background-color: rgba(58, 55, 55, 0.7);
            }
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
                background: none;
                background-color: #a1eba1;
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