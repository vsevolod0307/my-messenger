<template>
    <ul class="profile-menu">
        <li class="profile-link">
            
        </li>
        <li class="profile-link">
            <a href="#">Друзья</a>
        </li><li class="profile-link">
            
        </li>
    </ul>
</template>

<script>
export default {
    name: "ProfileMenu"
}
</script>

<style scoped lang="scss">
    .profile {
        &-menu {
            list-style-type: none;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
        }
        &-link {
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>