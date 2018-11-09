<template lang="pug">
    div.list-container
        transition(name="expand")
            UserEdit(
                v-if="editMode" 
                v-bind:editModeToggle="editModeToggle"
                v-bind:user='editUser'
                v-bind:posts='editPosts'
            )
        button.arrow.left-button(@click="moveCarousel(-1)" :disabled="atHeadOfList")
        button.arrow.right-button(@click="moveCarousel(1)" :disabled="atEndOfList")
        div.list-wrapper(v-for='user in users' :style="{ transform: 'translateX' + '(' + offset + 'px' + ')'}")
            User(
                v-bind:userName="user.name" 
                v-bind:userId="user.id"
                v-bind:editModeToggle="editModeToggle"
            )
</template>

<script>
    import axios from 'axios';
    import User from './User.vue';
    import UserEdit from './UserEdit.vue';
    export default {
        name: 'UserList',
        components: {
            User,
            UserEdit
        },
        data : () => {
            return {
                name: 'UserList',
                users: [],
                factor: 320,
                // factor: 960,
                offset: 0,
                amount: 3,
                editMode: false,
                // editMode: true,
                editUser: {},
                editPosts: [],
            }
        },
        created () {
            axios.get('http://localhost:9000/api/users')
                .then(res => this.users = res.data)
                .catch(error => console.error(error));
        },
        computed: {
            atEndOfList() {
                return this.offset <= (this.factor * -1) * (this.users.length - this.amount);
            },
            atHeadOfList() {
                return this.offset === 0;
            },
        },
        methods: {
            moveCarousel(direction) {
                if (direction === 1) {
                    this.offset -= this.factor
                } else if (direction === -1) {
                    this.offset += this.factor
                }
            },
            editModeToggle(user, posts){

                if (this.editMode) {
                    this.editUser = {};
                    this.editPosts = [];
                    this.editMode = !this.editMode;
                    return
                }

                if (user && posts) {
                    this.editUser = user;
                    this.editPosts = posts;
                    this.editMode = !this.editMode;
                }


            }
        }
    }
</script>

<style lang="sass" scoped>

    .list-container
        width: 85%
        margin: 0 auto
        max-width: 955px
        width: 955px
        overflow: hidden
        display: flex
        flex-direction: row
        justify-content: flex-start
        align-items: center
        position: relative

    .list-wrapper
        transition: transform .412s ease-in
    .arrow
        position: fixed
        top: 350px
        width: 32px
        height: 32px
        z-index: 2
        cursor: pointer
        outline: none
        border: none
        background-color: transparent
        &:disabled
            opacity: 0.4

    .right-button 
        right: 20px
        background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDQ1MS44NDYgNDUxLjg0NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDUxLjg0NiA0NTEuODQ3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTM0NS40NDEsMjQ4LjI5MkwxNTEuMTU0LDQ0Mi41NzNjLTEyLjM1OSwxMi4zNjUtMzIuMzk3LDEyLjM2NS00NC43NSwwYy0xMi4zNTQtMTIuMzU0LTEyLjM1NC0zMi4zOTEsMC00NC43NDQgICBMMjc4LjMxOCwyMjUuOTJMMTA2LjQwOSw1NC4wMTdjLTEyLjM1NC0xMi4zNTktMTIuMzU0LTMyLjM5NCwwLTQ0Ljc0OGMxMi4zNTQtMTIuMzU5LDMyLjM5MS0xMi4zNTksNDQuNzUsMGwxOTQuMjg3LDE5NC4yODQgICBjNi4xNzcsNi4xOCw5LjI2MiwxNC4yNzEsOS4yNjIsMjIuMzY2QzM1NC43MDgsMjM0LjAxOCwzNTEuNjE3LDI0Mi4xMTUsMzQ1LjQ0MSwyNDguMjkyeiIgZmlsbD0iIzQxYjg4MyIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)
    .left-button 
        left: 20px
        background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0OTIgNDkyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTIgNDkyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTE5OC42MDgsMjQ2LjEwNEwzODIuNjY0LDYyLjA0YzUuMDY4LTUuMDU2LDcuODU2LTExLjgxNiw3Ljg1Ni0xOS4wMjRjMC03LjIxMi0yLjc4OC0xMy45NjgtNy44NTYtMTkuMDMybC0xNi4xMjgtMTYuMTIgICAgQzM2MS40NzYsMi43OTIsMzU0LjcxMiwwLDM0Ny41MDQsMHMtMTMuOTY0LDIuNzkyLTE5LjAyOCw3Ljg2NEwxMDkuMzI4LDIyNy4wMDhjLTUuMDg0LDUuMDgtNy44NjgsMTEuODY4LTcuODQ4LDE5LjA4NCAgICBjLTAuMDIsNy4yNDgsMi43NiwxNC4wMjgsNy44NDgsMTkuMTEybDIxOC45NDQsMjE4LjkzMmM1LjA2NCw1LjA3MiwxMS44Miw3Ljg2NCwxOS4wMzIsNy44NjRjNy4yMDgsMCwxMy45NjQtMi43OTIsMTkuMDMyLTcuODY0ICAgIGwxNi4xMjQtMTYuMTJjMTAuNDkyLTEwLjQ5MiwxMC40OTItMjcuNTcyLDAtMzguMDZMMTk4LjYwOCwyNDYuMTA0eiIgZmlsbD0iIzQxYjg4MyIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)
</style>

