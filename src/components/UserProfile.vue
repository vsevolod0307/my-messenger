<template>
    <div class="profile">
        <div class="user-avatar">
            <input type="file" @change="editImage">
        </div>
        <div class="sign-out">
            <button @click="signOutUser">Выйти</button>
        </div>
    </div>
</template>

<script>
import { signOut, getAuth } from 'firebase/auth';
import { getDatabase, set, ref } from "firebase/database";

export default {
    data() {
        return {
            auth: getAuth(),
            id: this.$route.params.id,
            imageUrl: ""
        }
    },
    methods: {
        signOutUser() {
            signOut(this.auth);
        },
        editImage(e) {
            console.log(e.target.value);
        },
        writeUserData(userId, name, email, imageUrl) {
            const db = getDatabase();
            set(ref(db, 'users/' + userId), {
                username: name,
                email: email,
                profile_picture: imageUrl
            });
        }
    },
    mounted() {
        // this.writeUserData("88", "test", "kkk@mail.ru", "image.png");
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