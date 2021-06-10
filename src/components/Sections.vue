<template>
  <div id="sections">
    <!-- sections from api -->
    <div v-if="getSections">
      <p v-for="section in getSections.sections.sort((a, b) => {return a.pos - b.pos})" v-bind:key="section.id" v-bind:id="'section#' + section.pos" v-on:click="loadSection(section, getCategories, getData, section.pos)" class="section">
        <!-- index -->
        <b v-if="section.pos == '0'">i</b>

        <!-- specific categories -->
        <span v-else>{{section.pos}}</span>
      </p>      
    </div>

  </div>
</template>

<script>
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route
import {computed, onMounted, onUpdated} from 'vue'

export default {
  setup() {
    //variables
    var defaultSectionTitle = "defaultSectionTitle"
    var defaultSectionNumber = 0 //0 = index
    var defaultCategory = "defaultCategory"

    //vuex
    const store = useStore()
    const getSections = computed(() => { return store.getters['storage/sections']})
    const getCategories = computed(() => { return store.getters['storage/categories']})
    const getData = computed(() => { return store.getters['storage/data']})

    //router
    let sectionSpecified = useRouter().currentRoute.value.params.sectionId
            
    //lifecycle hooks
    onMounted(() => {
        console.log("sections mounted")

        //fetch all data
        fetchSections()
        .then(() => fetchCategories())
        .then(() => fetchData())
    })
    
    onUpdated(() => {
        // console.log("sections updated")
    })

    //functions
    async function fetchSections() {
      
      let url = "https://wq5can.deta.dev/sections"
      
      await fetch(url) //(url, {method: 'get'})
      .then((response) => response.json()) //convert response to json object
      .then(jsondata => {
        // console.log(jsondata.sections)

        //vuex
        store.dispatch('storage/actionSetSections', jsondata)
        // console.log(getSections.value.sections)

        //set specified section
        if (sectionSpecified != null)
        {
          //check if section id is specified by number
          for (var o = 0; o < 10; o++)
          {
            if (sectionSpecified[0] == o)
            {
              sectionSpecified = parseInt(sectionSpecified)
            }
          }

          //section specified by title
          if (typeof(sectionSpecified) == "string")
          {
            // console.log("section specified by title")

            for (var c in jsondata.sections) 
            {
              if (jsondata.sections[c].title == sectionSpecified)
              {
                defaultSectionTitle = jsondata.sections[c].title
                // console.log(jsondata.sections[c].pos)
                store.dispatch('storage/actionSetSelectedSection', jsondata.sections[c])
              }
            }
          }

          //section specified by id
          if (typeof(sectionSpecified) == "number")
          {
            // console.log("section specified by id")
            
            for (var c in jsondata.sections) 
            {
              if (jsondata.sections[c].pos == sectionSpecified)
              {
                defaultSectionTitle = jsondata.sections[c].title
                // console.log(jsondata.sections[c].pos)
                store.dispatch('storage/actionSetSelectedSection', jsondata.sections[c])
              }
            }
          }

        }
        
        //set default section
        else
        {
          for (var c in jsondata.sections)
          {
            if (jsondata.sections[c].pos == defaultSectionNumber)
            {
              defaultSectionTitle = jsondata.sections[c].title
              // console.log(jsondata.sections[c].pos)
              store.dispatch('storage/actionSetSelectedSection', jsondata.sections[c])
            }
          }
        }

      })
    }

    async function fetchCategories()
    {
      let url = "https://wq5can.deta.dev/categories"
      await fetch(url) //(url, {method: 'get'})
      .then((response) => response.json()) //convert response to json object
      .then(jsondata => {
        // console.log(jsondata.categories)

        //vuex
        store.dispatch('storage/actionSetCategories', jsondata)
        // console.log(getCategories.value.categories)

        //set default categories
        var sectionCategories = []
        for (var c in jsondata.categories)
        {
          if (jsondata.categories[c].section == defaultSectionTitle)
          {
            sectionCategories.push(jsondata.categories[c])
          }
        }
        store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
        
        //set default category
        for (var c in sectionCategories)
        {
          if (sectionCategories[c].pos == "1")
          {
            defaultCategory = sectionCategories[c].title
          }
        }

      })
    }

    async function fetchData()
    {
      let url = "https://wq5can.deta.dev/data"
      await fetch(url) //(url, {method: 'get'})
      .then((response) => response.json()) //convert response to json object
      .then(jsondata => {
        // console.log(jsondata.data)

        //vuex
        store.dispatch('storage/actionSetData', jsondata)

        //set default selected section data
        var sectionData = []
        for (var c in jsondata.data)
        {
          if(jsondata.data[c].section == defaultSectionTitle)
          {
            sectionData.push(jsondata.data[c])
          }
        }
        store.dispatch('storage/actionSetSelectedSectionData', sectionData)
        
        //set default selected section category data
        for (var c in sectionData) 
        {
          if (sectionData[c].category == defaultCategory)
          {
            if (sectionData[c].title != "index")
            {
              var dataInArray = []
              dataInArray.push(sectionData[c])
              store.dispatch('storage/actionSetSelectedSectionCategoryData', dataInArray)
            }
          }        
        }
        
      })
    }

    function loadSection(section, categories, data, pos)
    {   
        //variables
        var categoryTitle = null
        var categoryData = []

        //filter categories for selected section
        var sectionCategories = []
        for (var c in categories.categories)
        {
          if(categories.categories[c].section == section.title)
          {
            sectionCategories.push(categories.categories[c])
          }

          // console.log(section.title)
          // console.log(categories.categories[c].section)
          // console.log(data)
        }

        //filter data for selected section
        var sectionData = []
        for (var d in data.data)
        {
          if(data.data[d].section == section.title)
          {
            sectionData.push(data.data[d])
          }

          // console.log(section.title)
          // console.log(categories.categories[c].section)
          // console.log(data.data[d])
        }

        //filter data for selected section category data
        for (var c in sectionData) 
        {
          if (sectionCategories[c].pos == 1)
          {
            categoryTitle = sectionCategories[c].title
          }

          if (sectionData[c].category == categoryTitle)
          {
            categoryData.push(sectionData[c])
          }

          // console.log(sectionData[c])
        }

        //vuex
        store.dispatch('storage/actionSetSelectedSection', section)
        store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
        if (section.title != "index")
        {
          store.dispatch('storage/actionSetSelectedSectionData', sectionData)
          store.dispatch('storage/actionSetSelectedSectionCategoryData', categoryData)
        }

        //update color of section buttons
        for (var c = 0; c < getSections.value.sections.length; c++)
        {
          var sectionButton = document.getElementById("section#" + c)

          if (c == pos)
          {
            sectionButton.style.border = "2px solid black"
          }
          else
          {
            sectionButton.style.border = "0px solid black"
          }
        }
    }

    return {
      //variables
      
      //vuex
      getSections,
      getCategories,
      getData,

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

  p {
    padding: 10px;
    user-select: none;
    -webkit-user-select: none;
  }
</style>