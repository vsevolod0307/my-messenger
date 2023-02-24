<template>
    <html>user profile id:{{ id }}</html>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    }
}
</script>