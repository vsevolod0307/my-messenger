<template>
    <div class="my-profile">
        <router-link
            v-if="uid" 
            :to="{ name: 'profile', params: { id: uid } }"
        >
        мой профиль</router-link>
    </div>
    <ul class="list-users">
        <li v-for="user, idx in listUsers" :key="idx" class="list-user">
            {{ cons(listUsers) }}
            <div class="list-user_avatar">
                <img :src="user.avatarUrl" alt="">
            </div>
            <div class="list-user_name">
                <span>{{ user.first_name }}</span>
                <span>{{ user.last_name }}</span>
            </div>
            <div class="list-user_age">
                <span>Возраст: </span>
                <span>{{ user.age }}</span>
            </div>
            <button class="list-user_send" @click="isSend = true">Написать сообщение</button>
        </li>
    </ul>

    <div v-if="isSend" class="send-modal">
        <form action="#">
            <textarea name="" id="" cols="30" rows="10" placeholder="Введите сообщение" v-model="message"></textarea>
            <button @click.prevent="sendMessage(user)" type="submit">Отправить</button>
        </form>
    </div>
</template>

<script>
import store from '@/store';
import { set, ref, getDatabase } from 'firebase/database';
import { getAuth, Auth } from 'firebase/auth';
export default {
    name: "ListUsers",
    data() {
        return {
            isSend: false,
            message: ""
        }
    },
    computed: {
        listUsers() {
            return store.getters.getListUsers;
        },
        uid() {
            return store.state.userUid;
        }
    },
    methods: {
        sendMessage(user) {
            console.log(user);
            console.log(this.listUsers);
            // set(ref(getDatabase(), `users/(${this.$route.params.id})/messages/sent`), {
            //     message: this.message,
            //     from: `${user.first_name} ${user.last_name}` 
            // }).then(() => {
            //     const uidReceiver = this.listUsers
            //     ref(getDatabase(), `users/(${this.$route.params.id})/messages/sent`)
            // })
        },
        cons(i) {
            console.log(i)
        }
    },
    mounted() {
        // this.uid = store.state.userUid;
        store.dispatch("databaseRef", "users");
        store.dispatch("loadListUsers");
    }
}
</script>

<style lang="scss" scoped>
    .list-users {
        list-style-type: none;
    }
    .list-user {
        display: flex;
        border: 1px solid;
        margin: 20px 0;
        &_avatar {
            min-width: 150px;
            img {
                width: 150px;
                height: 100%;
            }
        }
        &_name, &_age {
            padding: 10px 20px;
        }
        &_send {
            background-color: #a1eba1;
            border: none;
            border-radius: 6px;
            padding: 10px;
            font-size: 18px;
            height: 40px;
            text-transform: uppercase;
            cursor: pointer;
            &:hover {
                background-color: rgba(161,  235,  161, 0.5);
            }
        }
    }
</style>