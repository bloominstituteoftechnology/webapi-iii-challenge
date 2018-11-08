<template lang="pug">
    div.post-container
        p.text() {{text}}
</template>

<script>

    export default {
        name: 'Post',
        data: () => {
            return {
                
            }
        },
        props: {
            text: String,
            postId: Number
        }
    }
</script>

<style lang="sass" scoped>
    .post-container
        user-select: none
        margin-bottom: 75px
</style>