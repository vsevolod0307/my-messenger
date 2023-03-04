<template>
    <list-users/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ListUsers from "@/components/ListUsers.vue";
import store from '@/store';

@Options({
    components: { ListUsers }
})
export default class AllUsers extends Vue {}
</script>