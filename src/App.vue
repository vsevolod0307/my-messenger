<template>
  <nav>
    <div class="my-profile">
        <router-link
            v-if="userUid" 
            :to="{ name: 'profile', params: { id: userUid } }"
        >
        мой профиль</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, User, signOut, Auth } from 'firebase/auth';
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
}

* {
  margin: 0;
  padding: 0;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
