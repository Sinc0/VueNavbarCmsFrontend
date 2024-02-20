<template>
    <!-- loading screen -->
    <div id="loadingScreen"><img src="/loadingAnimation.gif" /></div>

    <!-- load all data -->
    <ComponentFrontend />
</template>


<script>
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import ComponentFrontend from '@/components/componentFrontend.vue'


export default {
  name: 'Home',

  components: {
    ComponentFrontend
  },

  setup() {
    //lifecycle hooks
    onMounted(() => {
        console.log("viewMain mounted")
        // // displayLoadingScreen()
        // setTimeout(displayContent, 3000)
        displayContent()
    })


    //functions
    function displayLoadingScreen()
    {
      //elements
      let loadingScreen = document.getElementById("loadingScreen")

      //update elements
      loadingScreen.style.display = "block"
      document.body.style.overflow = 'hidden' //hide scrollbar
    }


    function displayContent()
    {
      //debugging
      console.log("displayContent")

      //elements
      let loadingScreen = document.getElementById("loadingScreen")
      let content = document.getElementById("content")

      //update elements
      document.body.style.overflow = 'visible' //show scrollbar 
      loadingScreen.style.display = "none"
    //   content.style.display = "block"
    }


    return {

    }

  }
}
</script>


<style scoped>
  /*** scrollbars ***/
  ::-webkit-scrollbar { width: 0px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: green; }
  ::-webkit-scrollbar-thumb:hover { background: #555; }


  /*** ids ***/
  #Data { width: 70%; margin: auto; }
  #flex-container 
  {
    display: flex;
    margin: 0px;
    margin-left: 60px;
    padding: 0px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center; /* flex-start, center, flex-end */
    /* align-items: ; */
    /* align-content: ; */
    /* min-height: 1000px; */
  }
  #Categories { margin: 0px; margin: auto; margin-top: 16px; margin-bottom: 10px; padding: 0px; width: 100%; }
  #Sections { left: 0; position: fixed; height: 100vh; overflow-y: scroll; border-right: 2px solid black; }
  #SectionData { padding-bottom: 40px; width: 100%; }
  #content { display: none; animation: fadeIn 1s; }
  #loadingScreen 
  {
    display: none;
    position: fixed;
    margin: 0px;
    padding: 0px;
    padding-top: 27vh;
    height: 90vh;
    width: 100vw;
    z-index: 10;
    background-color: var(--loadingScreenBackgroundColor); /* #1a1a1a */
  }
  #loadingScreen img { max-width: 97vw; -webkit-user-drag: none; }


  /*** classes ***/
  .flex-item { margin: 0px; padding: 0px; }


  /*** animations ***/
  @keyframes fadeIn { 0% {opacity:0;} 100% {opacity:1;} }
  

  /*** mobile ***/
  @media screen and (max-width: 700px) {
    ::-webkit-scrollbar { width: 0px; height: 0px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: black; }
    ::-webkit-scrollbar-thumb:hover { background: #555; }
    
    #flex-container { display: flex; margin: 0px; padding: 0px; flex-direction: column; flex-wrap: nowrap; justify-content: center; min-height: 0px; }
    #Sections { position: relative; height: 100%; overflow: unset; border: 0px solid black; border-bottom: 2px solid black; }
    #Data { margin: auto; width: 90vw; }
    #Categories { width: 90vw; }
    #loadingScreen img { max-width: 97vw; }
    
    .flex-item { margin: 0px; padding: 0px; }
  }
</style>