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

<style>
/* scrollbar styling */
/* ::-webkit-scrollbar {
  height: 0px;
  width: 4px;
}

::-webkit-scrollbar-track {
  background: lightgray;
}

::-webkit-scrollbar-thumb {
  background: black;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
} */

body {
  margin: 0px;
  padding: 0px;
}

#app {
  margin: 0px;
  margin-bottom: 40px;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
