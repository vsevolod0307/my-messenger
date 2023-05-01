<template>
  <div class="requests">
    <list-users :isAllUsers="false" :dataUsers="getRequests" />
  </div>
</template>

<script lang="ts">
import store from '@/store';
import ListUsers from './ListUsers.vue';
import { UserInfo } from '@/types/user';

export default {
    name: "FriendRequests",
    components: { ListUsers },
    computed: {
      getRequests(): UserInfo[] {
        return store.state.listUsers.filter(user => {
          return store.getters.getRequestFriends.includes(user.uid);
        })
      }
    },
    mounted() {
      store.dispatch("loadGetUsers");
      store.dispatch("loadRequestFriends");
    },
}
</script>

<style scoped>
  .requests {
    padding: 0 20px;
  }
</style>