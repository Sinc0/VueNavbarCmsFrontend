<template>
  <div id="Main">
    <!-- fetch all data -->
    <FetchData />
    
    <div id="flex-container">
      <!-- sidenav -->
      <div id="Sections" class="flex-item"><Sections/></div>
      
      <!-- Data -->
      <div id="Data">
        <div id="Categories" class="flex-item"><Categories /></div>
        <div id="Index" class="flex-item"><Index /></div>
        <div id="Search" class="flex-item"><Search /></div>
        <div id="SectionData" class="flex-item"><SectionData/></div>
      </div>
    </div>

  </div>
</template>

<script>
import FetchData from '@/components/componentFetchData.vue'
import Categories from '@/components/componentCategories.vue'
import Index from '@/components/componentIndex.vue'
import Search from '@/components/componentSearch.vue'
import SectionData from '@/components/componentSectionData.vue'
import Sections from '@/components/componentSections.vue'

export default {
  name: 'Home',
  components: {
    FetchData,
    Categories,
    Index, 
    Search,
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
      left: ;
      position: relative;
      display: ;
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