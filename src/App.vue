<template>
  <router-view />
</template>


<script>
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'

  export default { setup() {
    //lifecycle hooks
    onMounted(() => { console.log("App mounted") })

    return {}
  }}
</script>


<style>
/*** css variables ***/
:root 
{
  --activeLinkColor: lightgreen;
  --IndexFontColor: black;
  --DataFontColor: black;
  --DataBackgroundColor: white;
  --SearchHitCountBackgroundColor: black;
  --SearchHitBackgroundColor: white;
  --SearchButtonColor: lightgreen;
  --ImageGalleryArrowsColor: black;
  --ImageGalleryBackgroundColor: black;
  --loadingScreenBackgroundColor: #1a1a1a;
  /* var(--loadingScreenBackgroundColor) */
}

/*** scrollbars ***/
::-webkit-scrollbar { height: 0px; width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: black; }
::-webkit-scrollbar-thumb:hover { background: #555; }


/*** elements ***/
div { margin: 0px; padding: 0px; }
body { margin: 0px; padding: 0px; }


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

/*** mobile ***/
@media screen and (max-width: 700px) {
  /* empty */
}
</style>
