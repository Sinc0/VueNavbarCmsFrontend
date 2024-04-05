<template>
  <router-view />
</template>


<script>
import {onMounted, onUpdated} from 'vue'

  export default { 
    setup() {
    
    //lifecycle hooks
    // onMounted(() => { console.log("App mounted") })
    // onUpdated(() => { console.log("App updated") })

    return {}
  }}
</script>


<style>
/*** scrollbars ***/
::-webkit-scrollbar { height: 0px; width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: black; }
::-webkit-scrollbar-thumb:hover { background: #555; }


/*** elements ***/
div { margin: 0px; padding: 0px; }
body { margin: 0px; padding: 0px; background-color: black; }


/*** ids ***/
#app 
{
  margin: 0px;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--DataFontColor);
}
</style>