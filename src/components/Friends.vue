<template>
  <div class="friends">
    <list-users :data-users="listFriends" :is-all-users="false"/>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import ListUsers from './ListUsers.vue';
import { UserInfo } from "@/types/user";
/* eslint-disable */
export default {
  components: { ListUsers },
  name: "Friends",
  computed: {
    listFriends(): UserInfo[] {
      return store.state.listFriends;
    }
  },
  mounted() {
    store.dispatch("loadFriends");
  }
}
</script>

<style scoped>
  .friends {
    padding: 0 20px;
  }
</style>