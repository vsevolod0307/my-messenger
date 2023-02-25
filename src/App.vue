<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script>
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, User, signOut } from 'firebase/auth';

export default {
  data() {
    return {
      auth: getAuth()
    }
  },
  methods: {
    checkAuthUser() {
      onAuthStateChanged(this.auth, (user) => {
        if(user) {
          console.log(user);
          this.$router.push({name: "profile", params: { id: user.uid }});
        } else {
          console.log(user)
          this.$router.push("/auth")
        } 
      })
    }
  },
  mounted() {
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
