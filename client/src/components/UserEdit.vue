<template lang="pug">
</template>

<script>
</script>

<style lang="sass">

    

    .expand-transition

    .expand-enter
        animation: cardSelected .412s ease-in forwards
    
    .expand-leave
        animation: cardDeselected .412s ease-in forwards


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

    @keyframes cardDeselected
        0%
            position: fixed
            z-index: 2
            width: 600px;
            height: 350px;
            top: 50%
            left: 50%
            margin-top: -175px
            margin-left: -300px
        99%
            position: fixed
            width: 300px
            height: 200px
            top: 50%
            left: 50%
            margin-top: -100px
            margin-left: -150px
        100%
            position: default
            margin-top: 0
            margin-left: 0
        
</style>