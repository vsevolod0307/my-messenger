<template>
    <div class="profile" v-if="user">
        <div class="profile-info" v-if="!isEdit">
            <div class="avatar">
                <img :src="user?.avatarUrl" alt="">
            </div>
            <div class="profile-name">
                <span class="first-name">{{ user?.first_name }}</span>
                <span class="last-name">{{ user?.last_name }}</span>
            </div>
            <div class="profile-detail-info">
                <div class="age"><span>Возраст: </span>{{ user?.age }}</div>
                <div class="gender"><span>Пол: </span>{{ getGender(user?.gender) }}</div>
                <div class="about">
                    <span class="profile-about-title">О себе: </span>
                    <span class="profile-about">{{ user?.about_us }}</span>
                </div>
            </div>
        </div>
        <profile-edit
            :data="user"
            :isEdit="isEdit"
            @edit="isEdit = $event"
        />
        <div class="profile-main-actions" v-if="uid === $route.params.id">
            <button class="edit" @click="isEdit = true">Редактировать</button>
            <button class="sign-out" @click="signOutUser">Выйти</button>
        </div>
    </div>
</template>

<script lang="ts">
import { signOut } from 'firebase/auth';
import ProfileEdit from "@/components/ProfileEdit.vue";
import store from '@/store';
import { UserInfo } from '@/types/user';
import { PropType } from 'vue';

export default {
    data() {
        return {
            isEdit: false
        }
    },
    components: { ProfileEdit },
    computed: {
        uid(): string {
            return store.state.userUid;
        },
        currentUser(): UserInfo {
            return store.getters.getCurrentUser;
        },
        user(): UserInfo {
            if(store.state.userUid === this.$route.params.id) {
                return this.currentUser;
            } else {
                store.dispatch("loadUserById", this.$route.params.id as string);
                return store.state.userByUid;
            }
        }
    },
    methods: {
        signOutUser(): void {
            signOut(store.state.userAuth);
        },
        getGender(gender: string | undefined): string {
            return gender === "male" ? "Мужчина" : "Женщина";
        },
        // requestPermission() {
        //     Notification.requestPermission().then(per => {
        //         console.log(per);
        //     })
        // }
    },

    mounted(): void {
        store.dispatch("loadCurrentUser");
    }
    // mounted(): void {
        // window.onresize = function(){ location.reload(); }
        

        // this.requestPermission();
        // const messaging = getMessaging();
        // console.log(messaging)
        // getToken(messaging, { vapidKey: "BP9SY499ZYNuBIwzAEAiUDuZ2CSEigCIj6qfzkfIuoKAMpEcISRAWaQT7XL8nAt8ogDj2dpIJapauo8G1by0VOk" }).then((currentToken) => {
        //     if (currentToken) {
        //         // Send the token to your server and update the UI if necessary
        //         console.log(currentToken);
        //         // ...
        //     } else {
        //         // Show permission request UI
        //         console.log('No registration token available. Request permission to generate one.');
        //         // ...
        //     }
        //     }).catch((err) => {
        //     console.log('An error occurred while retrieving token. ', err);
        //     // ...
        // });
    // }
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
            margin-top: 20px;
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
    .user-avatar input {
        margin-top: 10px;
    }
    .save-changes {
        background-color: #a1eba1;
        width: 70%;
        margin-top: 20px;
    }
    @media(max-width: 425px) {
        .profile {
            margin-top: 30px;
            &-about {
                width: 200px;
            }
            &-info {
                padding: 40px;
            }
            &-main-actions {
                top: 90px;
            }
        }
    }
</style>