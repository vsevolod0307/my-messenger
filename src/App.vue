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
    checkAuthUser() {
      // if() {

      // }
      onAuthStateChanged(this.userAuth, (user) => {
        if(!user) {
          this.$router.push("/auth");
        } else {
          store.commit("saveUid", user.uid);
        }
      })
    }
  },
  mounted() {
    store.dispatch("auth");
    this.checkAuthUser();
    console.log(store.state)
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
