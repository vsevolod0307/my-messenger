<template>
    <div class="reg">
        <form class="reg-form">
            <input type="mail" placeholder="Введите емейл" v-model="email">
            <input type="password" placeholder="Придумайте пароль" v-model="password">
            <button @click.prevent="addUser" type="submit">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
/* eslint-disable */
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import store from '@/store';

export default {
    name: "Registration",
    data() {
        return {
            auth: getAuth(),
            password: "",
            email: "",
        }
    },
    methods: {
        addUser() {
            createUserWithEmailAndPassword(this.auth, this.email, this.password)
            .then((credentialUser) => {
                console.log("sign success for test");
                this.$router.push({path: "/profile", params: { id: credentialUser.user.uid }})
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            })
        },
    }
}
</script>

<style scoped>
    .reg {
        display: flex;
        justify-content: center;
    }
    .reg-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .reg-form input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
    }
    .reg-form button {
        background-color: #a1eba1;
        border: none;
        border-radius: 6px;
        padding: 10px;
        font-size: 18px;
        text-transform: uppercase;
        cursor: pointer;
        width: 100%;
    }
</style>