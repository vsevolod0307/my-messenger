<template>
    <messages/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Messages from "@/components/Messages.vue";

@Options({
    components: { Messages }
})
export default class MyMessages extends Vue {}
</script>