<template lang="pug">
    div.container
        div.user-container(v-bind:class='{placeholder: editMode}')
            h1.user-name {{userName}}
            div.post-container(v-if='posts.length > 0')
                Post(v-bind:text='posts[0].text' v-bind:postId='posts[0].id')
            //- div.post-container(v-for='post in posts')
                Post(v-bind:text='post.text' v-bind:postId='post.id')
            button.button.edit-button(type="button" v-on:click="editMode = !editMode") EDIT
</template>

<script>
    import axios from 'axios';

    import Post from './Post.vue';

    export default {
        name: 'User',
        components: {
            Post
        },
        data: () => {
            return {
                posts: [],
                editMode: false
            }
        },
        props: {
            userName: String,
            userId: Number,
        },
        methods: {},
        created () {
            axios.get(`http://localhost:9000/api/users/posts/${this.userId}`)
                .then(res => {
                    console.log(res.data, this.userId)
                    this.posts = res.data
                })
                .catch(error => console.error(error));
        }
    }

</script>

<style lang="sass" scoped>

    .container 
        width: 100%
        height: 100%
    
    .user-container
        width: 300px
        min-height: 250px
        border: 1px solid rgba(0,0,0,0.1)
        border-radius: 8px
        margin: 10px
        display: flex
        flex-direction: column
        justify-content: flex-start
        padding-bottom: 20px
        background: white
        position: relative
        padding: 0px 15px
        &:hover 
            transition: all .212s ease-in
            box-shadow: 1px 1px 8px -1px rgba(0,0,0,0.4)
        .user-name
            font-size: 22px
            font-weight: 700
        h1
            user-select: none

    .placeholder
        filter: blur(3px)

    .button 
        width: 200px
        height: 35px
        position: absolute
        bottom: 20px
        left: 50%
        margin-left: -100px
        border: none
        border-radius: 12px
        border: 1px solid rgba(0,0,0,0.1)
        cursor: pointer
        font-weight: 700
        outline: none
        &:hover
            transition: all .212s ease-in
            box-shadow: 0px 0px 3px -1px rgba(0,0,0,0.4)

    .edit-button
        &:hover
            color: #41B883
    .delete-button
        &:hover
            color: rgb(184,65,131)
</style>