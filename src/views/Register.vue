<template>
  <registration/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Registration from "@/components/Registration.vue";

@Options({
  components: {
    Registration
  },
})
export default class Register extends Vue {}
</script>