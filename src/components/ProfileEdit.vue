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

<script lang="ts">
import { getDatabase, set, ref } from "firebase/database";
import { getStorage, ref as refStor, uploadBytes, getDownloadURL } from 'firebase/storage';
import store from '@/store';

export default {
    name: "ProfleEdit",
    props: ['isEdit', 'data'],
    data() {
        return {
            sRef: ref(getDatabase(), `users/(${this.$route.params.id})/info`),
        }
    },
    computed: {
        dataEdit() {
            return this.data;
        }
    },
    methods: {
        writeUserData(): void {
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
        async editImage(e: Event): Promise<void> {
            const storRef = refStor(getStorage(), `users/${store.state.userUid}/avatar`);
            const target = e.target as HTMLInputElement
            const file = (target.files as FileList)[0] as File;
            await uploadBytes(storRef, file);
            await getDownloadURL(storRef).then(url => this.dataEdit.avatarUrl = url)
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