<template>
  <nav>
    <div class="my-profile">
        <router-link
            v-if="userUid" 
            :to="{ name: 'profile', params: { id: userUid } }"
        >
        <img src="@/assets/profile.png" alt=""></router-link>
        <router-link
                to="/messages"
            ><img src="@/assets/message.png" alt="">
        </router-link>
        <router-link
            to="/all-users"
        ><img src="@/assets/all.png" alt="">
        </router-link>
        <router-link
            to="/friends"
        ><img src="@/assets/friends.png" alt="">
        </router-link>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { onAuthStateChanged, Auth } from 'firebase/auth';
import store from './store';

export default {
  computed: {
    userAuth(): Auth {
      return store.getters.userAuth;
    },
    userUid(): string {
      return store.getters.userUid;
    }
  },
  methods: {
    checkAuthUser(): void {
      onAuthStateChanged(this.userAuth, (user) => {
        if(!user) {
          this.$router.push("/auth");
        } else {
          store.commit("saveUid", user.uid);
        }
      })
    }
  },
  created(): void {
    store.dispatch("auth");
    this.checkAuthUser();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
}

nav {
  padding: 30px;
  background-color: #d0f5d0;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  img {
    width: 40px;
  }
}
.my-profile {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
@media (max-width: 425px) {
  nav {
    padding: 20px;
  }
}
</style>
