<template lang="pug">
    div.user-container(v-bind:class="{active: editMode}")
        h1.user-name {{userName}}
        div.button-container
            button.button.edit-button(type="button" v-on:click="showEdit") EDIT
            button.button.delete-button(type="button") DELETE
</template>

<script>
    export default {
        name: 'User',
        data: () => {
            return {
                editMode: false
            }
        },
        props: {
            userName: String
        },
        methods: {
            showEdit: function() {
                this.editMode = !this.editMode;
            }
        }
    }

</script>

<style lang="sass" scoped>

    @keyframes cardSelected
        0%
            position: fixed
            z-index: 2
            width: 300px
            height: 200px
            top: 50%
            left: 50%
            margin-top: -100px
            margin-left: -150px
        100%
            position: fixed
            z-index: 2
            width: 600px;
            height: 350px;
            top: 50%
            left: 50%
            margin-top: -175px
            margin-left: -300px
            

    .user-container
        width: 300px
        height: 200px
        border: 1px solid rgba(0,0,0,0.1)
        border-radius: 8px
        margin: 10px
        display: flex
        flex-direction: column
        justify-content: space-between
        padding-bottom: 20px
        background: white
        &:hover 
            transition: all .212s ease-in
            box-shadow: 1px 1px 8px -1px rgba(0,0,0,0.4)
        .user-name
            font-size: 22px
            font-weight: 700

    .active
        animation: cardSelected .412s ease-in forwards

    .button 
        width: 200px
        height: 35px
        margin: 5px 0
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