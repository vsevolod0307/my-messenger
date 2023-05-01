<template>
    <div class="wrapper">
        <ul class="wrapper-list">
                <router-link
                    class="wrapper-link"
                    :to="{ name: 'friendsList'}">Друзья</router-link>
                <router-link
                    class="wrapper-link"
                    :to="{ name: 'friendRequests'}">Заявки в друзья</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Friends from "@/components/Friends.vue";
import FriendRequests from "@/components/FriendRequests.vue";

@Options({
    components: { Friends, FriendRequests }
})
export default class MyFriends extends Vue {}
</script>

<style lang="scss" scoped>
    .wrapper {
        display: grid;
        grid-template-columns: 20% 1fr;
        &-list {
            list-style-type: none;
            padding-top: 20px;
        }
        &-link {
            display: flex;
            justify-content: center;
            padding: 10px 0;
            background-color: #d7e6ff;
            border-radius: 12px;
            margin: 4px 0;
            color: #000;
            text-decoration: none;
            &:hover {
                background-color: rgba(215, 230, 255, 0.5);
            }
        }
    }
    .router-link-active {
        background-color: rgba(215, 230, 255, 0.5);
    }
</style>