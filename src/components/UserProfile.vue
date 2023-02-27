<template>
    <div class="profile">
        <div class="profile-info" v-if="!isEdit">
            <div class="avatar">
                <img :src="dataProfile.avatarImage" alt="">
            </div>
            <span class="first-name">{{ dataProfile.first_name }}</span>
            <span class="last-name">{{ dataProfile.last_name }}</span>
            <br>
            <div class="age">{{ 'Возраст:' + dataProfile.age }}</div>
            <div class="age">{{ 'Пол:' + dataProfile.gender }}</div>
            <div class="about">
                {{ 'О себе:' + dataProfile.about_us }}
            </div>
        </div>
        <div class="profile-edit" v-if="isEdit">
            <div class="user-avatar">
                <div class="avatar">
                    <img :src="dataProfile.avatarImage" alt="">
                </div>
                <input type="file" @change="editImage">
            </div>
            <input type="text" v-model="dataProfile.first_name" placeholder="Введите Имя" required>
            <input type="text" v-model="dataProfile.last_name" placeholder="Введите Фамилию" required>
            <input type="number" v-model="dataProfile.age" placeholder="Ваш возраст" required>
            <div class="gender">
                <label for="gender">Мужской</label>
                <input type="radio" name="gender" v-model="dataProfile.gender" value="male">
                <label for="gender">Женский</label>
                <input type="radio" name="gender" v-model="dataProfile.gender" value="female">
            </div>
            <textarea class="about_us" v-model="dataProfile.about_us" cols="30" rows="5" placeholder="Напишите о себе"></textarea>
            <button @click="writeUserData" class="save-changes">Сохранить</button>
        </div>
        <div class="sign-out">
            <button @click="isEdit = true">Редактировать</button>
            <button @click="signOutUser">Выйти</button>
        </div>
    </div>
</template>

<script>
import { signOut, getAuth } from 'firebase/auth';
import { getDatabase, set, ref, onValue, get, child, onChildAdded } from "firebase/database";
import { getStorage, ref as refStor, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
    data() {
        return {
            auth: getAuth(),
            sRef: ref(getDatabase(), `users/(${this.$route.params.id})`),
            dataProfile: {
                avatarImage: "",
                first_name: "",
                last_name: "",
                age: "",
                gender: "",
                about_us: "",
            },
            isEdit: false,
        }
    },
    methods: {
        signOutUser() {
            signOut(this.auth);
        },
        async editImage(imageUrl) {
            const storage = getStorage();
            const storRef = refStor(storage, "avatar");
            await uploadBytes(storRef, imageUrl.target.files[0]);
            await getDownloadURL(refStor(storage, "avatar"))
                .then((url) => this.dataProfile.avatarImage = url)
        },
        writeUserData() {
            set(this.sRef, {
                first_name: this.dataProfile.first_name,
                last_name: this.dataProfile.last_name,
                age: this.dataProfile.age,
                gender: this.dataProfile.gender,
                about_us: this.dataProfile.about_us
            })
            .then(() => {
                this.updateDataProfile();
            })
            this.isEdit = false;
        },
        updateDataProfile() {
            onValue(this.sRef, data => {
                if(data.exists()) {
                    this.dataProfile = data.val();
                } else {
                    this.isEdit = true;
                }
            })
        }
    },
    async created() {
        await this.updateDataProfile();
        console.log(this.dataProfile);
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
    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .profile > input {
        padding: 10px;
        font-size: 16px;
    }
    .about_us {
        resize: none;
    }
</style>