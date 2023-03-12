<template>
    <div class="dialog-messages">
        <div class="dialog-message" v-for="item, idx in getMessages" :key="idx">
            <div class="dialog-message_item">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import store from '@/store';
export default {
    name: "Messages",
    computed: {
        getMessages() {
            return store.getters.getMessagesPersonal;
        },
        uid() {
            return store.state.userUid;
        }
    },
    methods: {
        cons(i) {
            console.log(i)
        }
    },
    mounted() {
        // store.dispatch("databaseRef", `users/(${this.uid})/personal-chats`);
        // console.log(store.state.databaseRef)
        store.dispatch("loadMessagesPersonal")
    }
}
</script>

<style lang="scss" scoped>

</style>