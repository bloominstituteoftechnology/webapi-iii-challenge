<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <UserList />
  </div>
</template>

<script>
import UserList from './components/UserList.vue'

export default {
  name: 'app',
  components: {
    UserList
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

img[alt="Vue logo"] {
  width: 100px;
  height: auto;
}

</style>
