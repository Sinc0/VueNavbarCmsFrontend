<template>
  <div id="Main">
    <!-- load all data -->
    <ComponentFetchData />
    
    <!-- content -->
    <div id="content" v-if="Sections && Categories && Data">
      <div id="flex-container">
        
        <!-- sidenav -->
        <div id="Sections" class="flex-item"><ComponentSections/></div>
        
        <!-- data -->
        <div id="Data">
          <div id="Categories" class="flex-item"><ComponentCategories /></div>
          <div id="Index" class="flex-item"><ComponentIndex /></div>
          <div id="Search" class="flex-item"><ComponentSearch /></div>
          <div id="SectionData" class="flex-item"><ComponentSectionData/></div>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
import ComponentFetchData from '@/components/componentFetchData.vue'
import ComponentCategories from '@/components/componentCategories.vue'
import ComponentIndex from '@/components/componentIndex.vue'
import ComponentSearch from '@/components/componentSearch.vue'
import ComponentSectionData from '@/components/componentSectionData.vue'
import ComponentSections from '@/components/componentSections.vue'
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'

export default {
  name: 'Home',

  components: {
    ComponentFetchData,
    ComponentCategories,
    ComponentIndex, 
    ComponentSearch,
    ComponentSections,
    ComponentSectionData,
  },

  setup() {
    //vuex
    const store = useStore()

    const Sections = computed(() => { return store.getters['storage/sections']})
    const Categories = computed(() => { return store.getters['storage/categories']})
    const Data = computed(() => { return store.getters['storage/data']})

    //lifecycle hooks
    onMounted(() => {
        console.log("viewMain mounted")
    })

    return {
      Sections,
      Categories,
      Data
    }
  }
}
</script>

<style scoped>
  #flex-container {
    display: flex;
    margin: 0px;
    margin-left: 60px;
    padding: 0px;
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

  #Categories {
    margin: 0px;
    margin: auto;
    margin-top: 16px;
    margin-bottom: 10px;
    padding: 0px;
    width: 40vw;
    /* border: 1px solid black; */
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
  
  /* mobile styling */
  @media screen and (max-width: 700px) {
    /* scrollbar styling */
    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: black;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    
    #flex-container {
      display: flex;
      margin: 0px;
      padding: 0px;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center; /* flex-start, center, flex-end */
      /* align-items: ; */
      /* align-content: ; */
      min-height: 0px;
    }
    
    .flex-item {
      margin: 0px;
      padding: 0px;
      /* border: 1px solid black; */
    }
        
    #Sections {
      /* left: 0; */
      position: relative;
      /* display: block; */
      /* margin-top: 100px; */
      height: 100%;
      /* width is 70px; */
      overflow: unset;
      border: 0px solid black;
      border-bottom: 2px solid black;
    }

    #Data {
      margin: auto;
      width: 90vw;
    }

    #Categories {
      width: 90vw;
    }
  }
</style>