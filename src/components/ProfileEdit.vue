<template>
    <div class="profile-edit" v-if="isEdit">
        <div class="user-avatar">
            <div class="avatar">
                <img :src="dataEdit.avatarUrl" alt="">
            </div>
            <input type="file" @change="editImage">
        </div>
        <div class="info-prof">
            <input type="text" v-model="dataEdit.first_name" placeholder="Введите Имя" required>
            <input type="text" v-model="dataEdit.last_name" placeholder="Введите Фамилию" required>
            <input type="number" v-model="dataEdit.age" placeholder="Ваш возраст" required>
        </div>
        <div class="gender">
            <div class="male">
                <input type="radio" name="gender" v-model="dataEdit.gender" value="male">
                <label for="gender">Мужской</label>
            </div>
            <div class="female">
                <input type="radio" name="gender" v-model="dataEdit.gender" value="female">
                <label for="gender">Женский</label>
            </div>
        </div>
        <textarea class="about_us" v-model="dataEdit.about_us" cols="30" rows="5" placeholder="Напишите о себе"></textarea>
        <button @click="writeUserData" class="save-changes">Сохранить</button>
    </div>
</template>

<script>
import { getDatabase, set, ref } from "firebase/database";
import { getStorage, ref as refStor, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
    name: "ProfleEdit",
    props: ['isEdit', 'data'],
    data() {
        return {
            sRef: ref(getDatabase(), `users/(${this.$route.params.id})`),
        }
    },
    computed: {
        dataEdit() {
            return this.data;
        }
    },
    methods: {
        writeUserData() {
            set(this.sRef, {
                first_name: this.dataEdit.first_name,
                last_name: this.dataEdit.last_name,
                age: this.dataEdit.age,
                gender: this.dataEdit.gender,
                about_us: this.dataEdit.about_us,
                avatarUrl: this.dataEdit.avatarUrl
            })
            this.$emit("edit", false)
        },
        editImage(imageUrl) {
            const storage = getStorage();
            const storRef = refStor(storage, `users/${this.$route.params.id}/avatar`);
            console.log("es")
            uploadBytes(storRef, imageUrl.target.files[0]);
            getDownloadURL(refStor(storage, `users/${this.$route.params.id}/avatar`))
                .then((url) => this.dataEdit.avatarUrl = url);
        },
    },
    mounted() {
        console.log(this.data)
        console.log(this.dataEdit)
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
        &-edit .about_us {
            margin-top: 20px;
            resize: none;
            width: 94%;
            height: 120px;
            padding: 10px;
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

    // @media () {
    //     .profile{
    //         &-edit {
                
    //         }
    //     }
    // }
</style>