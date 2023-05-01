<template>
    <list-users :dataUsers="listUsers"/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ListUsers from "@/components/ListUsers.vue";
import store from "@/store";
import { UserInfo } from "@/types/user";

@Options({
    components: { ListUsers }
})
export default class AllUsers extends Vue {
    get listUsers(): UserInfo[] {
        return store.state.listUsers;
    }

    mounted(): void {
        store.dispatch("loadGetUsers");
    }
}
</script>