<template>
    <html>user profile id:{{ id }}</html>
    <div class="sign-out">
        <button @click="signOutUser">Выйти</button>
    </div>
</template>

<script lang="ts">
import { signOut, getAuth } from 'firebase/auth';

export default {
    data() {
        return {
            auth: getAuth(),
            id: this.$route.params.id
        }
    },
    methods: {
        signOutUser() {
            signOut(this.auth);
        }
    }
}
</script>

<style scoped>
    .sign-out {
        position: absolute;
        right: 50px;
        top: 50px;
    }
    .sign-out button {
        background-color: rgb(245 64 68);
        font-size: 14px;
        border: none;
        border-radius: 6px;
        padding: 10px;
        text-transform: uppercase;
        cursor: pointer;
        width: 100%;
    }
    .sign-out button:hover {
        background-color: rgba(245, 64, 68, 0.7);
    }
</style>