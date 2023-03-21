<template>
  <nav>
  </nav>
  <router-view />
</template>

<script>
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, User, signOut } from 'firebase/auth';
import store from './store';

export default {
  computed: {
    userAuth() {
      return store.getters.userAuth;
    }
  },
  methods: {
    async checkAuthUser() {
      await onAuthStateChanged(this.userAuth, (user) => {
        if(!user) {
          this.$router.push("/auth");
        } else {
          store.commit("saveUid", user.uid);
        }
      })
    }
  },
  async created() {
    store.dispatch("auth");
    await this.checkAuthUser();
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
