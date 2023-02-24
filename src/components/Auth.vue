<template>
<div class="auth">
    <form class="auth-sign">
        <input type="mail" placeholder="Введите Email" v-model="email">
        <input type="password" placeholder="Введите пароль" v-model="password">
        <button @click.prevent="signUser" type="submit">Войти</button>
        <router-link to="/registration">Регистрация</router-link>
    </form>
    <div class="sign-out">
        <button @click="signOutUser">Выйти</button>
    </div>
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
        checkAuthUser() {
            onAuthStateChanged(this.auth, (user) => {
                if(user) {
                    this.isAuthUser = true;
                    console.log(user)
                } else {
                    console.log(user)
                } 
            })
        },
        signOutUser() {
            signOut(this.auth);
        }
    },
    mounted() {
        this.checkAuthUser();
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

    .auth-sign button, .sign-out button {
        background-color: #a1eba1;
        border: none;
        border-radius: 6px;
        padding: 10px;
        font-size: 18px;
        text-transform: uppercase;
        cursor: pointer;
        width: 100%;
    }
    .sign-out {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .sign-out button {
        background-color: rgb(245 64 68);
        font-size: 14px;
    }
    .auth-sign button:hover {
        background-color: rgba(161,  235,  161, 0.5);
    }  
    .sign-out button:hover {
        background-color: rgba(245, 64, 68, 0.7);
    }  

</style>