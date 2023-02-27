<template>
    <div class="profile">
        <div class="profile-info" v-if="!isEdit">
            <div class="avatar">
                <img :src="avatarImage" alt="">
            </div>
            <span class="first-name">{{ first_name }}</span>
            <span class="last-name">{{ last_name }}</span>
            <br>
            <div class="age">{{ 'Возраст:' + age }}</div>
            <div class="age">{{ 'Пол:' + gender }}</div>
            <div class="about">
                {{ 'О себе:' + about_us }}
            </div>
        </div>
        <div class="profile-edit" v-if="isEdit">
            <div class="user-avatar">
                <div class="avatar">
                    <img :src="avatarImage" alt="">
                </div>
                <input type="file" @change="editImage">
            </div>
            <input type="text" v-model="first_name" placeholder="Введите Имя" required>
            <input type="text" v-model="last_name" placeholder="Введите Фамилию" required>
            <input type="number" v-model="age" placeholder="Ваш возраст" required>
            <div class="gender">
                <label for="gender">Мужской</label>
                <input type="radio" name="gender" v-model="gender" value="male">
                <label for="gender">Женский</label>
                <input type="radio" name="gender" v-model="gender" value="female">
            </div>
            <textarea class="about_us" v-model="about_us" cols="30" rows="5" placeholder="Напишите о себе"></textarea>
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
            userUid: this.$route.params.id,
            avatarImage: "",
            first_name: "",
            last_name: "",
            age: "",
            gender: "",
            about_us: "",
            isEdit: false
        }
    },
    methods: {
        signOutUser() {
            signOut(this.auth);
        },
        async editImage(imageUrl) {
            const storage = getStorage();
            const storRef = refStor(storage, "avatar")
            await uploadBytes(storRef, imageUrl.target.files[0]).then((info) => {
                console.log(info.metadata)
            })
            await getDownloadURL(refStor(storage, "avatar"))
            .then((url) => this.avatarImage = url)
        },
        writeUserData() {
            const db = getDatabase();
            set(ref(db, `users/(${this.userUid})`), {
                first_name: this.first_name,
                last_name: this.last_name,
                age: this.age,
                gender: this.gender,
                about_us: this.about_us
            })
            this.isEdit = false;
        },
        getDataProfile() {
            const storage = getDatabase();
            const sRef = ref(storage, `users/(TUvBqw8YMeOp9dRsTlG5oZBvA8L2)`)
            console.log(sRef.key)
            onValue(sRef, data => {
                console.log(data.val())
            })
            // const db = getDatabase();
            // const profileInfo = ref(db, this.userUid);
            // onValue(profileInfo, (snapshot) => {
            //     const data = snapshot.val();
            //     console.log(data);
            //     console.log(snapshot.exists());
            // })
        }
    },
    created() {
        this.getDataProfile();
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