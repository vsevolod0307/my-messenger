<template>
    <div class="profile-edit" v-if="isEdit">
        <div class="user-avatar">
            <div class="avatar">
                <img :src="dataProfile.avatarUrl" alt="">
            </div>
            <input type="file" @change="editImage">
        </div>
        <div class="info-prof">
            <input type="text" v-model="dataProfile.first_name" placeholder="Введите Имя" required>
            <input type="text" v-model="dataProfile.last_name" placeholder="Введите Фамилию" required>
            <input type="number" v-model="dataProfile.age" placeholder="Ваш возраст" required>
        </div>
        <div class="gender">
            <div class="male">
                <input type="radio" name="gender" v-model="dataProfile.gender" value="male">
                <label for="gender">Мужской</label>
            </div>
            <div class="female">
                <input type="radio" name="gender" v-model="dataProfile.gender" value="female">
                <label for="gender">Женский</label>
            </div>
        </div>
        <textarea class="about_us" v-model="dataProfile.about_us" cols="30" rows="5" placeholder="Напишите о себе"></textarea>
        <button @click="writeUserData" class="save-changes">Сохранить</button>
    </div>
</template>

<script>
import { getDatabase, set, ref, onValue, get, child, onChildAdded } from "firebase/database";
import { getStorage, ref as refStor, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
    name: "ProfleEdit",
    props: ['isEdit'],
    data() {
        return {
            sRef: ref(getDatabase(), `users/(${this.$route.params.id})`),
            dataProfile: {
                avatarUrl: "",
                first_name: "",
                last_name: "",
                age: "",
                gender: "",
                about_us: "",
            }
        }
    },
    methods: {
        writeUserData() {
            set(this.sRef, {
                first_name: this.dataProfile.first_name,
                last_name: this.dataProfile.last_name,
                age: this.dataProfile.age,
                gender: this.dataProfile.gender,
                about_us: this.dataProfile.about_us,
                avatarUrl: this.dataProfile.avatarUrl
            })
            .then(() => {
                this.$emit("update-data", this.dataProfile);
            })
        },
        async editImage(imageUrl) {
            const storage = getStorage();
            const storRef = refStor(storage, `users/${this.$route.params.id}/avatar`);
            console.log("es")
            await uploadBytes(storRef, imageUrl.target.files[0]);
            await getDownloadURL(refStor(storage, `users/${this.$route.params.id}/avatar`))
                .then((url) => this.dataProfile.avatarUrl = url);
        },
    }
}
</script>

<style lang="scss">
    .avatar  {
        img {
            width: 250px;
        }
    }
    .profile {
        &-edit .info-prof input {
            padding: 10px;
            font-size: 16px;
        }
    }
    .save-changes {
        background-color: rgb(245 64 68);
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 6px;
        padding: 10px;
        text-transform: uppercase;
        cursor: pointer;
        width: 100%;
    }
    .age, .about, .gender {
        font-size: 18px;
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
    }
    .info-prof {
        display: flex;
        flex-direction: column;
        input {
            margin-top: 20px;
        }
        .gender {
            justify-content: space-evenly;
            margin-top: 20px;
        }
    }

    .user-avatar input {
        margin-top: 10px;
    }
    .save-changes {
        background-color: #a1eba1;
        width: 70%;
        margin-top: 20px;
    }
</style>