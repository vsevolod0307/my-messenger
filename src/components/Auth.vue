<template>
<form>
    <input type="mail" placeholder="Введите емейл" v-model="login">
    <input type="password" placeholder="Придумайте пароль" v-model="password">
    <button @click.prevent="addUser" type="submit">Зарегистрироваться</button>
</form>
</template>

<script>
/* eslint-disable */
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

export default {
    name: "Auth",
    data() {
        return {
            auth: getAuth(),
            password: "",
            login: ""
        }
    },
    methods: {
        addUser() {
            console.log(this.login)
            console.log(this.password)
            console.log(this.auth)
            createUserWithEmailAndPassword(this.auth, this.login, this.password)
            .then(currentUser => {
                currentUser.user
                console.log(currentUser);
                console.log("sign success for test");
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            })
        }
    }
}
</script>