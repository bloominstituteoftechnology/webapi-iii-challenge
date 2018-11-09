<template lang="pug">
    div.edit-container
        div.user-container-edit
            span.close-icon-edit(@click="editModeToggle()")
            label.name-lable(for="name") NAME
            input.name-input(
                type="text" 
                name="name" 
                placeholder="Name" 
                :value='user.userName'
            )
            div.button-container
                button.button-edit.delete-button(type="button") DELETE
                button.button-edit.edit-button(type="button") SAVE
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'User',
        data: () => {
            return {}
        },
        props: {
            user: Object,
            posts: Array,
            editModeToggle: Function,
            editMode: Boolean,
        },
        methods: {}
    }

</script>

<style lang="sass" scoped>

    @keyframes cardSelected
        0%
            width: 300px
            height: 200px
        100%
            width: 600px;
            height: 350px;

    @keyframes cardDeselected
        0%
            width: 600px;
            height: 350px;
        100%
            width: 300px
            height: 200px
    
    
    .edit-container 
        position: fixed
        width: 100vw
        height: 100vh
        z-index: 2
        top: 0px
        left: 0px
        background-color: rgba(0,0,0,0.4)
        display: flex
        justify-content: center
        align-items: center

    .name-lable
        font-size: 14px
        font-weight: 300

    .name-input
        outline: none
        width: 250px
        height: 35px
        border-radius: 12px
        border: 1px solid rgba(0,0,0,0.15)
        margin: 0 auto
        padding: 0 10px
        font-size: 16px
        text-align: center
    
    .user-container-edit
        width: 300px
        height: 200px
        border: 1px solid rgba(0,0,0,0.1)
        border-radius: 8px
        margin: 10px
        display: flex
        flex-direction: column
        justify-content: flex-start
        background: white
        position: relative
        padding: 20px
        animation: cardSelected .412s ease-in forwards
        &:hover 
            transition: all .212s ease-in
            box-shadow: 1px 1px 8px -1px rgba(0,0,0,0.4)
        .user-name
            font-size: 22px
            font-weight: 700
        h1
            user-select: none

    .close-icon-edit
        position: absolute
        z-index: 10
        height: 32px
        width: 32px
        right: -16px
        top: -16px
        background-color: white
        border-radius: 50%
        cursor: pointer
        background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwICAgQzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43NzggICBjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4ICAgYzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4ICAgbC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)
        &:hover
            transition: transform .212s ease-in
            transform: scale(1.06)

    .button-container
        width: 100%
        height: 35px
        display: flex
        justify-content: space-between
        align-items: center
        position: absolute
        bottom: 20px
        left: 0px
        padding: 0px 20px

    .button-edit
        width: 200px
        height: 35px
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