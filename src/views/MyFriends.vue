<template>
    <friends/>
    <friend-requests/>
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