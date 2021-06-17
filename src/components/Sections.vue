<template>
  <div id="sections">
    <!-- sections from api -->
    <div v-if="Sections">
      <div v-for="section in Sections.sections.sort((a, b) => {return a.pos - b.pos})" v-bind:key="section.id" v-on:click="loadSection(section.pos)">
        <!-- index -->
        <p v-bind:id="'section#' + section.pos" class="section" v-if="section.title == 'index'" v-bind:title="section.title"><b>i</b></p>
        
        <!-- search -->
        <p v-bind:id="'section#' + section.pos" class="section" v-else-if="section.title == 'search'" v-bind:title="section.title"><b>S</b></p>

        <!-- specific categories -->
        <img v-bind:id="'section#' + section.pos" class="section sectionIcon" v-bind:src="section.iconImage" v-if="section.iconImage != ''" v-bind:title="section.title"/>
        <p v-bind:id="'section#' + section.pos" class="section" v-else-if="section.iconImage == '' && section.title != 'index' && section.title != 'search'" v-bind:title="section.title">{{section.pos}}</p>
        <!-- <p v-bind:id="'section#' + section.pos" class="section" v-else>{{section.pos}}</p> -->

      </div>      
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
    var defaultCategoryTitle = "defaultCategoryTitle"
    var defaultCategoryNumber = 0

    //vuex
    const store = useStore()
    const Sections = computed(() => { return store.getters['storage/sections']})
    const Categories = computed(() => { return store.getters['storage/categories']})
    const Data = computed(() => { return store.getters['storage/data']})

    //router
    let sectionSpecified = useRouter().currentRoute.value.params.sectionId
    let categorySpecified = useRouter().currentRoute.value.params.sectionCategory
    // console.log("section specified: " + sectionSpecified)
    // console.log("category specified: " + categorySpecified)
            
    //lifecycle hooks
    onMounted(() => {
        console.log("sections mounted")

        //fetch all data
        fetchSections()
        .then(() => fetchCategories())
        .then(() => fetchData())
    })
    
    onUpdated(() => {
        console.log("sections updated")
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
        // console.log(Sections.value.sections)

        //set specified section
        if (sectionSpecified != null)
        {
          var defaultSectionData = null
          //check if section id is specified by number
          // for (var o = 0; o < 10; o++)
          // {
          //   if (sectionSpecified[0] == o)
          //   {
          //     sectionSpecified = parseInt(sectionSpecified)
          //   }
          // }

          //section specified by title
          // if (typeof(sectionSpecified) == "string")
          // {
            // console.log("section specified by title")

            for (var c in jsondata.sections) 
            {
              if (jsondata.sections[c].title == sectionSpecified)
              {
                defaultSectionTitle = jsondata.sections[c].title
                defaultSectionNumber = jsondata.sections[c].pos
                defaultSectionData = jsondata.sections[c]
                // console.log(jsondata.sections[c].pos)
                // store.dispatch('storage/actionSetSelectedSection', jsondata.sections[c])
              }
            }
          // }

          //section specified by id
          // if (typeof(sectionSpecified) == "number")
          // {
            // console.log("section specified by id")
            
            for (var c in jsondata.sections) 
            {
              if (jsondata.sections[c].pos == sectionSpecified)
              {
                defaultSectionTitle = jsondata.sections[c].title
                defaultSectionNumber = jsondata.sections[c].pos
                defaultSectionData = jsondata.sections[c]
                // console.log(jsondata.sections[c].pos)
                // store.dispatch('storage/actionSetSelectedSection', jsondata.sections[c])
              }
            }

            store.dispatch('storage/actionSetSelectedSection', defaultSectionData)
          // }

        }
        //set default section
        else
        {
          for (var c in jsondata.sections)
          {
            if (jsondata.sections[c].pos == defaultSectionNumber)
            {
              defaultSectionTitle = jsondata.sections[c].title
              defaultSectionNumber = jsondata.sections[c].pos
              defaultSectionData = jsondata.sections[c]
              // console.log(jsondata.sections[c].pos)
            }
          }

          store.dispatch('storage/actionSetSelectedSection', defaultSectionData)
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
        // console.log(Categories.value.categories)

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
        
        //set default or specified category
        if (categorySpecified != null)
        {
          
          //check if category is specified by title
          for (var c in sectionCategories)
          {
            if (sectionCategories[c].title == categorySpecified)
            {
              defaultCategoryTitle = sectionCategories[c].title
              defaultCategoryNumber = sectionCategories[c].pos
            }
          }

          //check if category is specified by id
          for (var c in sectionCategories)
          {
            if (sectionCategories[c].pos == categorySpecified)
            {
              defaultCategoryTitle = sectionCategories[c].title
              defaultCategoryNumber = sectionCategories[c].pos
            }
          }

          // console.log("specifiedCategory: " + defaultCategoryTitle)
        }
        else
        {
          for (var c in sectionCategories)
          {
            if (sectionCategories[c].pos == "1")
            {
              defaultCategoryTitle = sectionCategories[c].title
            }
          }
  
          // console.log("defaultCategoryTitle: " + defaultCategoryTitle)
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
          if (sectionData[c].category == defaultCategoryTitle)
          {
            if (sectionData[c].title != "index")
            {
              var dataInArray = []
              dataInArray.push(sectionData[c])
              store.dispatch('storage/actionSetSelectedSectionCategoryData', dataInArray)
            }
          }        
        
          //update color of category buttons
          // document.getElementById("category-" + sectionCategories[c].pos).style.textDecoration = "underline"
          if (categorySpecified != null)
          {
            for (var c = 1; c <= sectionData.length; c++)
            {
              var categoryButton = document.getElementById("category-" + c)
              // console.log(categoryButton)
              // console.log(defaultCategoryNumber)
              // console.log(sectionData.length)
              categoryButton.style.textDecoration = "underline"
              if (c == defaultCategoryNumber)
              {
                categoryButton.style.textDecoration = "underline"
              }
              else
              {
                categoryButton.style.textDecoration = "none"
              }
            } 
          }
          
        }

        //update color of section 
        // var sectionButton = document.getElementById("section#" + defaultSectionNumber)
        // sectionButton.style.border = "2px solid black"
        // console.log(sectionButton)
        // console.log("defaultSectionNumber: " + defaultSectionNumber)
        // console.log(sectionData.length)
        
      })
    }

    function loadSection(pos)
    {   
      //variables
      var categoryTitle = null
      var categoryData = []
      var section = null
      
      var sections = Sections.value
      var categories = Categories.value
      var data = Data.value
      // console.log(sections)
      // console.log(categories)
      // console.log(data)

      //filter sections for selected section
      for (var c in sections.sections)
      {
        if (pos == sections.sections[c].pos)
        {
          section = sections.sections[c]
        }
      }

      // for (var c in sections.sections)
      // {
      //   if (title == sections.sections[c].title)
      //   {
      //     section = sections.sections[c]
      //   }
      // }

      //filter categories for selected section
      var sectionCategories = []
      for (var c in categories.categories)
      {
        if(categories.categories[c].section == section.title)
        {
          sectionCategories.push(categories.categories[c])
        }

        // console.log(section.title)
        // console.log(categories.categories[c])
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
      var defaultCategoryTitle = "defaultCategoryTitle"
      var defaultCategoryData = []

      for (var c in sectionCategories)
      {
        if (sectionCategories[c].pos == "1")
        {
          defaultCategoryTitle = sectionCategories[c].title
        }
      }

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
</style>