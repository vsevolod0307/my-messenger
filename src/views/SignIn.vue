<template>
  <auth/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Auth from "@/components/Auth.vue";

@Options({
  components: {
    Auth
  },
})
export default class SignIn extends Vue {}
</script>