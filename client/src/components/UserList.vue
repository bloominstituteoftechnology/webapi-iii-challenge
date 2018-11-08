<template lang="pug">
    div.list-container
        h1.user-list-title {{name}}
        div(v-for='user in users')
            User(v-bind:userName="user.name" v-bind:userId="user.id")
</template>

<script>
    import axios from 'axios';
    import User from './User.vue';
    export default {
        name: 'UserList',
        components: {User},
        data : () => {
            return {
                name: 'UserList',
                users: [],
            }
        },
        created () {
            axios.get('http://localhost:9000/api/users')
                .then(res => this.users = res.data)
                .catch(error => console.error(error));
        }
    }
</script>

<style lang="sass" scoped>
    .list-container
        width: 100%
        display: flex
        flex-direction: column
        justify-content: flex-start
        align-items: center
        position: relative
</style>

