<template>
  <user-profile/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserProfile from "@/components/UserProfile.vue";
import { UserInfo } from "@/types/user";
import store from '@/store';

@Options({
  components: {
    UserProfile
  },
})
export default class Profile extends Vue {}
</script>