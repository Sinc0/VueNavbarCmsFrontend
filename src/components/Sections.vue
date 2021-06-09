<template>
  <div id="sections">
    <!-- test -->
    <p class="section">t</p>

    <!-- sections from api -->
    <div v-if="getSections">
      <p v-for="section in getSections.sections.sort((a, b) => {return a.pos - b.pos})" v-bind:key="section.id" v-bind:id="'section#' + section.pos" v-on:click="loadSection(section, getCategories, getData)" class="section">{{section.pos}}</p>      
    </div>

  </div>
</template>

<script>
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route
import {computed, onMounted, onUpdated} from 'vue'

export default {
  setup() {
    //vuex
    const store = useStore()
    const getSections = computed(() => { return store.getters['storage/sections']})
    const getCategories = computed(() => { return store.getters['storage/categories']})
    const getData = computed(() => { return store.getters['storage/data']})

    //variables
    var defaultSectionTitle = "defaultSectionTitle"
    var defaultSectionNumber = 1
            
    //lifecycle hooks
    onMounted(() => {
        console.log("sections mounted")
        // var t = document.getElementById("section#1")
        // console.log(t)
        // console.log("setSections")
        // var t = computed(() => { return store.getters['storage/sections']})
        // console.log(t.value.sections[0])
        
        //fetch all data
        fetchSections()
        .then(() => fetchCategories())
        .then(() => fetchData())

        // var x = fetchSections().then(() => {console.log(asdf.sections[0])})
        // var y = fetchCategories()
        // var z = fetchData()
    })
    
    onUpdated(() => {
        // console.log("sections updated")
        // var t = document.getElementById("category-1")
        // console.log(t)
        // t.click()
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

        //set default section
        for (var c in jsondata.sections) 
        {
          if (jsondata.sections[c].pos == defaultSectionNumber)
          {
            defaultSectionTitle = jsondata.sections[c].title
            // console.log(jsondata.sections[c].pos)
            store.dispatch('storage/actionSetSelectedSection', jsondata.sections[c])
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
            // console.log(jsondata.categories[c])
            sectionCategories.push(jsondata.categories[c])
          }
        }
        store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)

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
        // console.log(getCategories.value.categories)

        //set default data
        var sectionData = []
        for (var c in jsondata.data)
        {
          if(jsondata.data[c].section == defaultSectionTitle)
          {
            // console.log(jsondata.data[c])
            sectionData.push(jsondata.data[c])
          }
        }
        store.dispatch('storage/actionSetSelectedSectionData', sectionData)
        
      })
    }

    function loadSection(section, categories, data)
    {
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

        //vuex
        store.dispatch('storage/actionSetSelectedSection', section)
        store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
        store.dispatch('storage/actionSetSelectedSectionData', sectionData)
    }

    // function loadDefaultSection() {

    // }

    //onload
    // fetchSections()
    // fetchCategories()
    // fetchData()

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