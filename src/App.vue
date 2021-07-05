<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <br />
    <a href="https://cli.vuejs.org" target="_blank" rel="noopener">external link</a>
    <br />
    <router-link to="/about">internal link</router-link>
  </div> -->
  <router-view />
</template>

<script>
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'

  export default {
    setup() {

    //lifecycle hooks
    onMounted(() => {
        console.log("App mounted")
    })

      return {

      }
    }
  }
</script>

<style>
/* scrollbar styling */
::-webkit-scrollbar {
  height: 0px;
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: black;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

div {
  margin: 0px;
  padding: 0px;
}

body {
  margin: 0px;
  padding: 0px;
}

#app {
  margin: 0px;
  padding: 0px;
  padding-bottom: 40px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* mobile styling */
@media screen and (max-width: 700px) {
  #app {
    margin-bottom: 3.5vh;
  }
}
</style>
