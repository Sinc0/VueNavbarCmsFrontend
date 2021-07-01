<template>
  <!-- ### sections ### -->
  <div id="sections">
    <div id="sections-wrapper" v-if="Sections">
      <div class="section-icon-wrapper" v-for="section in Sections.sections.sort((a, b) => {return a.pos - b.pos})" v-bind:key="section.pos" v-on:click="loadSection(section.pos)">
        <!-- index -->
        <router-link v-bind:id="'section-router-link#' + section.pos" v-bind:to="'/' + section.title" v-if="section.title == 'index'">
          <p v-bind:id="'section#' + section.pos" class="section" v-bind:title="section.title"><b>i</b></p>
        </router-link>        
        
        <!-- search -->
        <router-link v-bind:id="'section-router-link#' + section.pos" v-bind:to="'/' + section.title" v-else-if="section.title == 'search'">
          <p v-bind:id="'section#' + section.pos" class="section" v-bind:title="section.title"><b>s</b></p>
        </router-link>

        <!-- about -->
        <router-link v-bind:id="'section-router-link#' + section.pos" v-bind:to="'/' + section.title" v-if="section.title == 'about'">
          <p v-bind:id="'section#' + section.pos" class="section" v-bind:title="section.title"><b>a</b></p>
        </router-link>

        <!-- specific category icon -->
        <router-link v-bind:id="'section-router-link#' + section.pos" v-bind:to="'/' + section.title" v-if="section.iconImage != ''">
          <img v-bind:id="'section#' + section.pos" class="section sectionIcon" v-bind:src="section.iconImage" v-bind:title="section.title"/>
        </router-link>

        <!-- specific category pos -->
        <router-link v-bind:id="'section-router-link#' + section.pos" v-bind:to="'/' + section.title" v-else-if="section.iconImage == '' && section.title != 'index' && section.title != 'search' && section.title != 'about'">
          <p v-bind:id="'section#' + section.pos" class="section" v-bind:title="section.title">{{section.pos}}</p>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, onMounted, onUpdated} from 'vue'

export default {
  setup() {
    //variables

    //vuex
    const store = useStore()
    const Sections = computed(() => { return store.getters['storage/sections']})
    const Categories = computed(() => { return store.getters['storage/categories']})
    const Data = computed(() => { return store.getters['storage/data']})
            
    //lifecycle hooks
    onMounted(() => {
        console.log("sections mounted")
    })
    
    onUpdated(() => {
        console.log("sections updated")
    })

    //functions
    function loadSection(pos)
    {
      //debugging
      // console.log(sections)
      // console.log(categories)
      // console.log(data)

      //variables
      var categoryTitle = null
      var categoryData = []
      var section = null
      var sections = Sections.value
      var categories = Categories.value
      var data = Data.value
      var defaultCategoryTitle = "defaultCategoryTitle"
      var defaultCategoryData = []

      //filter sections for selected section
      for (var c in sections.sections)
      {
        if (pos == sections.sections[c].pos)
        {
          section = sections.sections[c]
        }
      }

      //filter categories for selected section
      var sectionCategories = []
      for (var c in categories.categories)
      {
        if(categories.categories[c].section == section.title)
        {
          sectionCategories.push(categories.categories[c])
        }
      }

      //filter data for selected section
      var sectionData = []
      for (var d in data.data)
      {
        if(data.data[d].section == section.title)
        {
          sectionData.push(data.data[d])
        }
      }

      //filter data for default category title
      for (var c in sectionCategories)
      {
        if (sectionCategories[c].pos == "1")
        {
          defaultCategoryTitle = sectionCategories[c].title
        }
      }

      //filter data for selected section category data
      for (var c in sectionData)
      {
        if (sectionData[c].category == defaultCategoryTitle)
        {
          defaultCategoryData.push(sectionData[c])
        }
      }

      //vuex
      store.dispatch('storage/actionSetSelectedSection', section)
      store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
      store.dispatch('storage/actionSetSelectedSectionData', sectionData)
      if (section.title != "index" || section.title != "search")
      {
        store.dispatch('storage/actionSetSelectedSectionCategoryData', defaultCategoryData)
      }
    }

    return {
      //variables
      
      //vuex
      Sections,
      Categories,
      Data,

      //functions
      loadSection,
    } 
    
  }
}
</script>

<style scoped>
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

  #sections {
    margin: 0px;
    padding: 3px;
    width: 70px;
  }

  .section {
    margin: 0px;
    margin: auto;
    margin-top: 7px;
    margin-bottom: 7px;
    width: 20px;
    color: black;
    /* border: 1px solid black; */
    background-color: lightgreen;
    overflow-wrap: break-word;
  }

  .section:active
  {
    background-color: yellow;
  }

  .section-icon-wrapper a {
    text-decoration: none;
    color: black;
  }

  .sectionIcon {
    -webkit-user-drag: none;
    -webkit-user-select: none;
    user-select: none;
    width: 40px;
    background-color: transparent;
  }

  .sectionIcon:active {
    background-color: transparent;
  }

  p {
    padding: 10px;
    user-select: none;
    -webkit-user-select: none;
  }

  /* mobile styling */
  @media screen and (max-width: 700px) {
    #sections {
      width: 97%;
      overflow-x: scroll;
      overflow-y: unset;
    }

    .section, .sectionIcon {
      margin: 0px;
      vertical-align: top;
    }

    .section-icon-wrapper {
      position: relative;
      display: inline-block;
      margin: 0px;
      margin-left: 10px;
      padding: 4px;
      border: 0px solid black;
    }

    #sections-wrapper {
      position: relative;
      display: inline-block;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      flex-direction: row;
      margin: 0px;
      padding: 0px;
      width: 100%;
      height: 100%;
      /* background-color: black; */
    }
  }
</style>