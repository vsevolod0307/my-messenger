<template>
    <div class="profile">
        <div class="profile-info" v-if="!isEdit">
            <div class="avatar">
                <img :src="dataProfile.avatarUrl" alt="">
            </div>
            <div class="profile-name">
                <span class="first-name">{{ dataProfile.first_name }}</span>
                <span class="last-name">{{ dataProfile.last_name }}</span>
            </div>
            <div class="profile-detail-info">
                <div class="age"><span>Возраст: </span>{{ dataProfile.age }}</div>
                <div class="gender"><span>Пол: </span>{{ getGender() }}</div>
                <div class="about">
                    <span class="profile-about-title">О себе: </span>
                    <span class="profile-about">{{ dataProfile.about_us }}</span>
                </div>
            </div>
        </div>
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
        <div class="profile-main-actions">
            <button class="edit" @click="isEdit = true">Редактировать</button>
            <button class="sign-out" @click="signOutUser">Выйти</button>
        </div>
    </div>
</template>

<script>
import { signOut, getAuth } from 'firebase/auth';
import { getDatabase, set, ref, onValue, get, child, onChildAdded } from "firebase/database";
import { getStorage, ref as refStor, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getMessaging, getToken } from "firebase/messaging";

export default {
    data() {
        return {
            auth: getAuth(),
            sRef: ref(getDatabase(), `users/(${this.$route.params.id})`),
            dataProfile: {
                avatarUrl: "",
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
        getGender() {
            return this.dataProfile.gender === "male" ? "Мужчина" : "Женщина";
        },
        async editImage(imageUrl) {
            const storage = getStorage();
            const storRef = refStor(storage, `users/${this.$route.params.id}/avatar`);
            await uploadBytes(storRef, imageUrl.target.files[0]);
            await getDownloadURL(refStor(storage, `users/${this.$route.params.id}/avatar`))
                .then((url) => this.dataProfile.avatarUrl = url)
        },
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
        },
        requestPermission() {
            Notification.requestPermission().then(per => {
                console.log(per);
            })
        }
    },
    async created() {
        await this.updateDataProfile();
        console.log(getMessaging());
        this.requestPermission();
        const messaging = getMessaging();
        getToken(messaging, { vapidKey: "BP9SY499ZYNuBIwzAEAiUDuZ2CSEigCIj6qfzkfIuoKAMpEcISRAWaQT7XL8nAt8ogDj2dpIJapauo8G1by0VOk" }).then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // console.log(currentToken);
                // ...
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
            }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }
}
</script>

<style scoped lang="scss">
    .avatar  {
        img {
            width: 250px;
        }
    }
    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        > input {
            padding: 10px;
            font-size: 16px;
        }
        &-info {
            padding: 40px 60px;
            border-radius: 30px;
            box-shadow: inset 0px 0px 12px 8px;
        }
        &-about {
            width: 300px;
            word-break: break-word;
            text-align: right;
            padding-left: 20px;
        }
        &-detail-info {
            margin-top: 12px;
        }
        &-name {
            margin-top: 20px;
            .first-name, .last-name {
                margin-right: 10px;
                font-size: 26px;
                font-weight: 700;
            }
        }
        &-main-actions {
            position: absolute;
            right: 50px;
            top: 50px;
            display: flex;
            gap: 10px;
        }
        &-edit .info-prof input {
            padding: 10px;
            font-size: 16px;
        }
    }
    .sign-out, .edit, .save-changes {
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
    .sign-out:hover {
        background-color: rgba(245, 64, 68, 0.7);
    }
    .edit {
        background-color: rgba(58, 55, 55, 1);
        color: #fff;
    }
    .edit:hover {
        background-color: rgba(58, 55, 55, 0.7);
    }
    .age, .about, .gender {
        font-size: 18px;
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
    }
    .about_us {
        resize: none;
        width: -webkit-fill-available;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
        margin-top: 20px;
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