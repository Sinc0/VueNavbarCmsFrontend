<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="flex-container">
      <div id="Sections" class="flex-item"><Sections/></div>
      <div id="SectionData" class="flex-item"><SectionData/></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route
import {computed} from 'vue'

import SectionData from '@/components/SectionData.vue'
import Sections from '@/components/Sections.vue'

export default {
  name: 'Home',
  components: {
    Sections,
    SectionData
  },

  setup() {
    //router
    //let routerIdParamExample = useRouter().currentRoute.value.params.id

    return {

    }
  }
}
</script>

<style scoped>
  .flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center; /* flex-start, center, flex-end */
    /* align-items: ; */
    /* align-content: ; */
    min-height: 1000px;
  }

  .flex-item {
    margin: 0px;
    padding: 0px;
  }

  #Sections {
    left: 0;
    position: fixed;
    /* margin-top: 100px; */
    height: 100vh;
    /* width is 70px; */
    overflow-y: scroll;
    border-right: 3px solid black;
  }

  #SectionData {
    /* margin-left: 90px; */
    width: 100%;
    /* border: 1px solid black; */
  }

  /* scrollbar styling */
  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: green;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>