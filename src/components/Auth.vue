<template>
<div class="auth">
    <form class="auth-sign">
        <input type="email" placeholder="Введите Email" v-model="email">
        <input type="password" placeholder="Введите пароль" v-model="password">
        <button @click.prevent="signUser" type="submit">Войти</button>
        <router-link to="/registration">Регистрация</router-link>
    </form>
</div>
</template>

<script>
/* eslint-disable */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, User, signOut } from 'firebase/auth';

export default {
    name: "Auth",
    data() {
        return {
            auth: getAuth(),
            password: "",
            email: "",
            user: "",
            isAuthUser: false
        }
    },
    methods: {
        signUser() {
            signInWithEmailAndPassword(this.auth, this.email, this.password)
            .then(credentialUser => {
                console.log(credentialUser);
                this.email = "";
                this.password = "";
                this.$router.push({name: "profile", params: { id: credentialUser.user.uid }})
            })
            .catch((error) => {
                console.log(this.auth)
                console.log(error.code);
                console.log(error.message);
            })
        },
        
    }
}
</script>

<style scoped>
    .auth {
        display: flex;
        justify-content: center;
        position: relative;
    }
    .auth-sign {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .auth-sign input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
    }

    .auth-sign button {
        background-color: #a1eba1;
        border: none;
        border-radius: 6px;
        padding: 10px;
        font-size: 18px;
        text-transform: uppercase;
        cursor: pointer;
        width: 100%;
    }
    .auth-sign button:hover {
        background-color: rgba(161,  235,  161, 0.5);
    }
</style>