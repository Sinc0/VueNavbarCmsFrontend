<template>
    <div v-if="Sections && Categories && Data && SelectedSection">
      <div id="searchBox" v-if="SelectedSection.title == 'search'">

        <!-- search bar -->
        <form v-on:submit.prevent="onSubmit">
          <input id="searchBarInput" placeholder="Enter search text..." /> <!-- v-on:keyup.enter="loadSearch($event)" -->
          <button id="searchBarSubmitButton" v-on:click="loadSearch($event)">Enter</button>
        </form>
        
        <!-- search hits -->
        <p v-if="SearchResults" id="searchHitCount">{{SearchResults.length}} results found</p>
        <div class="searchHit" v-for="(h, itemObjKey) in SearchResults" v-bind:key="h.id" v-bind:id="'searchHit' + (itemObjKey + 1)">
          <div v-if="h.searchMatchType == 'section'" v-on:click="loadSectionFromSearch(null, h.section)"><router-link v-bind:to="'/' + h.section">{{itemObjKey+1}}: <b>section</b> {{h.section}}</router-link></div>
          <div v-if="h.searchMatchType == 'category'" v-on:click="loadCategoryFromSearch(h.section, null, h.category)"><router-link v-bind:to="'/' + h.section + '/' + h.category">{{itemObjKey+1}}: <b>category</b> in {{h.section}} = <b>{{h.value}}</b></router-link></div>
          <div v-if="h.searchMatchType == 'data'" v-on:click="loadCategoryFromSearch(h.section, null, h.category, h.key)"><router-link v-bind:to="'/' + h.section + '/' + h.category">{{itemObjKey+1}}: <b>data</b> in {{h.section}} ➞ {{h.category}} ➞ {{h.key.substr(0, 1).toUpperCase() + h.key.substr(1, h.key.length)}} = <b>{{h.value}}</b></router-link></div>
          <div v-if="h.searchMatchType == 'image description'" v-on:click="loadCategoryFromSearch(h.section, null, h.category)"><router-link v-bind:to="'/' + h.section + '/' + h.category">{{itemObjKey+1}}: <b>image</b> {{h.key}} in {{h.section}} ➞ {{h.category}} = <b>{{h.value}}</b></router-link></div>
        </div>

      </div>
    </div>
</template>


<script>
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
    setup() {
        //vue
        const store = useStore()


        //variables
        const SelectedSection = computed(() => { return store.getters['storage/selectedSection']})
        const SelectedSectionCategories = computed(() => { return store.getters['storage/selectedSectionCategories']})
        const SelectedSectionData = computed(() => { return store.getters['storage/selectedSectionData']})
        const SelectedSectionCategoryData = computed(() => { return store.getters['storage/selectedSectionCategoryData']})
        const Sections = computed(() => { return store.getters['storage/sections']})
        const Categories = computed(() => { return store.getters['storage/categories']})
        const Data = computed(() => { return store.getters['storage/data']})
        const SearchResults = computed(() => { return store.getters['storage/searchResults']})


        //functions
        function loadSectionFromSearch(pos, t)
        {
          //debugging
          // console.log(sections.sections)
          // console.log(categories.categories)
          // console.log(data.data)

          //variables
          let section = null
          let sections = Sections.value
          let categories = Categories.value 
          let data = Data.value
          let title = t
          let sectionCategories = []
          let sectionData = []
          let defaultCategoryTitle = "defaultCategoryTitle"
          let defaultCategoryData = []

          //filter sections
          if (pos != null)
          {
            for (let c in sections.sections)
            {
              if (pos == sections.sections[c].pos) { section = sections.sections[c] }
            }
          }
          else if (title != null)
          {
            for (let c in sections.sections)
            {
              if (title == sections.sections[c].title) { section = sections.sections[c] }
            }
          }

          //filter categories
          for (let c in categories.categories)
          {
            if(categories.categories[c].section == section.title) { sectionCategories.push(categories.categories[c]) }
          }

          //filter data
          for (let d in data.data)
          {
            if(data.data[d].section == section.title) { sectionData.push(data.data[d]) }
          }

          //filter data for default category title
          for (let c in sectionCategories)
          {
            if (sectionCategories[c].pos == "1") { defaultCategoryTitle = sectionCategories[c].title }
          }

          //filter data for selected section category data
          for (let c in sectionData)
          {
            if (sectionData[c].category == defaultCategoryTitle) { defaultCategoryData.push(sectionData[c]) }
          }
        
          //vuex
          store.dispatch('storage/actionSetSelectedSection', section)
          store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
          store.dispatch('storage/actionSetSelectedSectionData', sectionData)
          if (section.title != "index" || section.title != "search") { store.dispatch('storage/actionSetSelectedSectionCategoryData', defaultCategoryData) }

          //debugging 
          // window.history.pushState(null, null, "/" + title)

        }


        function loadCategoryFromSearch(t, pos, c)
        {
            //debugging
            // console.log(sections.sections)
            // console.log(categories.categories)
            // console.log(data.data)

            //variables
            let section = null
            let category = c
            let title = t
            let sections = Sections.value
            let categories = Categories.value 
            let data = Data.value
            let sectionCategories = []
            let defaultCategoryTitle = "defaultCategoryTitle"
            let defaultCategoryData = []
            let sectionData = []

            //filter sections
            for (let c in sections.sections)
            {
                if (title == sections.sections[c].title) { section = sections.sections[c] }
            }

            //filter categories
            for (let c in categories.categories)
            {
                if(categories.categories[c].section == section.title) { sectionCategories.push(categories.categories[c]) }
            }

            //filter data for selected section
            for (let d in data.data)
            {
                if(data.data[d].section == section.title) { sectionData.push(data.data[d]) }
            }

            //filter data for selected section category data
            for (let c in sectionData)
            {
                if (sectionData[c].category == category) { defaultCategoryData.push(sectionData[c]) }
            }

            // vuex
            store.dispatch('storage/actionSetSelectedSection', section)
            store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
            store.dispatch('storage/actionSetSelectedSectionData', sectionData)
            if (section.title != "index" || section.title != "search") { store.dispatch('storage/actionSetSelectedSectionCategoryData', defaultCategoryData) }

            //debugging
            // window.history.pushState(null, null, "/" + title)

        }


        function loadSearch(event)
        {
            //debugging
            // console.log(event)
            
            //variables
            let searchObjects = []
            let searchString = document.getElementById("searchBarInput")
            let allDataFromDb = Data.value.data
            let searchMatchType = ""
            let searchHitCounter = 0
            let foundIn = []
            let searchBar = document.getElementById("searchBarInput")
            let searchText = searchBar.value
            
            //input error handling
            if (searchString.value == "" || searchString.value[0] == " ")
            {
                console.log("empty string search error")
                return
            }

            //find and set search objects
            for (let d in allDataFromDb)
            {
                //variables
                let searchObject = ""
                let x = allDataFromDb[d]
                let y = Object.entries(x)

                //sort data into search objects
                for (let c in y)
                {
                  //variables
                  let dataType = y[c][0].toString()

                  //filter data to find data.section and data.category
                  if (dataType != "backgroundColor" && dataType != "backgroundImage" && dataType != "key" && dataType != "lastEdited" && dataType != "type" && dataType != "obj" && dataType != "galleryImages")
                  {
                      let cleanStr1 = JSON.stringify(y[c])
                      let cleanStr2 = cleanStr1.substr(1, (cleanStr1.length - 2))
                      // let cleanStr3 = cleanStr2.replaceAll("\"", "'")
                      let cleanStr4 = cleanStr2.replace(",", ":")
                      // let cleanStr5 = "{" + cleanStr4 + "}"
                      
                      searchObject += cleanStr4 + ","
                  }

                  //filter relevant data from data.galleryImages
                  if (dataType == "galleryImages")
                  { 
                      let imageGallery = y[c][1]
                      
                      if (imageGallery != "null")
                      {
                        for (let c in imageGallery)
                        {
                            if (imageGallery[c].hidden == "False" || imageGallery[c].hidden == "false")
                            {
                              cleanStr1 = "\"image-" + c + "\"" + ":" + "\"" + imageGallery[c].description + "\""

                              searchObject += cleanStr1 + ","
                            }
                        }
                      }
                  }

                  //filter relevant data from data.obj
                  if (dataType == "obj")
                  {
                      let obj = y[c][1]
                      if (obj != "null")
                      {
                        for (let c in obj)
                        {
                            if (obj[c].hidden == "False")
                            {
                              let k = Object.entries(obj[c])

                              for(let x in k)
                              {
                                  if (k[x][0] != "hidden" && k[x][0] != "multiline" && k[x][0] != "pos")
                                  {
                                    let cleanStr1 = JSON.stringify(k[x])
                                    let cleanStr2 = cleanStr1.substr(1, (cleanStr1.length - 2))
                                    // let cleanStr3 = cleanStr2.replaceAll("\"", "'")
                                    let cleanStr4 = cleanStr2.replace(",", ":")
                                    // let cleanStr5 = "{" + cleanStr4 + "}"
                                    
                                    searchObject += cleanStr4 + ","
                                  }
                              }
                            }
                        }
                      }
                  }
                }
                
                //parse data to json and add into searchable objects array
                searchObject = "{" + searchObject.substr(0, searchObject.length - 1) + "}"
                searchObject = JSON.parse(searchObject)
                searchObjects.push(searchObject)
            }

            //filter search objects
            for (let c in searchObjects)
            {
                //debugging
                // console.log(searchObjects[c])
                // console.log(searchObjects[c].section)
                // console.log(searchObjects[c].category)

                //variables
                let t = Object.entries(searchObjects[c])
                if (c > 1) { let previousSection = searchObjects[c - 1].section }
                let currentSection = searchObjects[c].section
                let currentCategory = searchObjects[c].category
                
                //check if section is not index or search
                if (currentSection != 'index' && currentSection != 'search')
                {
                  for(let x in t)
                  { 
                      let objectKey = t[x][0]
                      let objectValue = t[x][1]
                      
                      //search match found in category
                      if(objectKey == "category")
                      {
                          if(objectValue.includes(searchString.value))
                          {
                              let categoryName = objectValue

                              searchHitCounter++
                              searchMatchType = "category"
                              
                              let formatToJson1 = "\"section\":" + "\"" + currentSection + "\"," + "\"category\":" + "\"" + currentCategory + "\"," + "\"searchMatchType\":" + "\"category\"," + "\"value\":" + "\"" + categoryName + "\""
                              let formatToJson2 = "{" + formatToJson1 + "}"
                              let parsedToObject = JSON.parse(formatToJson2)
                              
                              foundIn.push(parsedToObject)
                          }
                      }
                    
                      //search match found in section
                      else if(objectKey == "section")
                      {
                          if(objectValue.includes(searchString.value))
                          {
                              searchHitCounter++
                              searchMatchType = "section"
                              
                              let formatToJson1 = "\"section\":" + "\"" + currentSection + "\"," + "\"searchMatchType\":" + "\"section\""
                              let formatToJson2 = "{" + formatToJson1 + "}"
                              let parsedToObject = JSON.parse(formatToJson2)
                              
                              //section duplicate check
                              if (previousSection != null && currentSection != previousSection)
                              {
                                foundIn.push(parsedToObject)
                              }
                          }
                      }
                            
                      //search match found in image description
                      else if(objectKey.substring(0, 5) == "image")
                      {
                        let imageNumber = objectKey.substring(6, 7)
                        imageNumber++
                        let imageDescription = objectValue
                        
                        if(objectValue.includes(searchString.value))
                        {
                            searchHitCounter++
                            searchMatchType = "image"

                            let formatToJson1 = "\"section\":" + "\"" + currentSection + "\"," + "\"category\":" + "\"" + currentCategory + "\"," + "\"searchMatchType\":" + "\"image description\"," + "\"key\":" + "\"" + imageNumber + "\"," + "\"value\":" + "\"" + imageDescription + "\""
                            let formatToJson2 = "{" + formatToJson1 + "}"
                            let parsedToObject = JSON.parse(formatToJson2)

                            foundIn.push(parsedToObject)
                        }
                      }
        
                      //search match found in data var
                      else
                      {
                        if(objectValue.includes(searchString.value))
                        {
                            let dataKey = objectKey
                            let dataValue = objectValue

                            searchHitCounter++
                            searchMatchType = "data"

                            let formatToJson1 = "\"section\":" + "\"" + currentSection + "\"," + "\"category\":" + "\"" + currentCategory + "\"," + "\"searchMatchType\":" + "\"data\"," + "\"key\":" + "\"" + dataKey + "\"," + "\"value\":" + "\"" + dataValue + "\"" 
                            let formatToJson2 = "{" + formatToJson1 + "}"
                            let parsedToObject = JSON.parse(formatToJson2)

                            foundIn.push(parsedToObject)
                        }
                      }
          
                  }
                }

            }
            
            //alphabetically sort search hits by searchMatchType
            foundIn.sort((a, b) => {
                if (a.searchMatchType < b.searchMatchType) {return -1}
                if (a.searchMatchType > b.searchMatchType) {return 1}
                return 0
            })

            //vuex
            store.dispatch('storage/actionSetSearchResults', foundIn)
            store.dispatch('storage/actionSetSearchString', searchText)

        }


        return {
            //vuex
            SelectedSectionCategoryData,
            SelectedSection,
            SelectedSectionCategories,
            SelectedSectionData,
            Sections,
            Categories,
            Data,
            SearchResults,

            //functions
            loadSectionFromSearch,
            loadCategoryFromSearch,
            loadSearch
        }
    }

}
</script>


<style scoped>
  /*** ids ***/
  #searchBox 
  {
    margin: 0px;
    margin: auto;
    padding: 0px;
    width: 40vw;
    background-color: lightgreen;
    border: 2px solid black;
  }
  #searchBarInput
  {
    margin: 0px;
    padding: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 0%;
    border: 0px;
    border-bottom: 1px solid black;
  }
  #searchBarSubmitButton 
  {
    margin: 0px;
    padding: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 0%;
    border: 0px;
    border-bottom: 1px solid black;
  }
  #searchBarInput { padding-left: 1%; width: 83%; font-weight: bold; outline: none; }
  #searchBarInput::placeholder { color: black; }
  #searchBarSubmitButton { width: 16%; font-weight: bold; background-color: var(--SearchButtonColor); border-left: 2px solid black; }
  #searchBarSubmitButton:active { background-color: var(--activeLinkColor); }
  #searchHitCount 
  {
    margin: 0px;
    padding: 0px;
    padding-top: 7px;
    padding-bottom: 7px;
    font-weight: bold;
    color: white;
    background-color: var(--SearchHitCountBackgroundColor); /* #2c3e50 */
  }


  /*** classes ***/
  .searchHit 
  {
    margin: 0px;
    margin: auto;
    padding: 8px;
    text-align: left;
    background-color: var(--SearchHitBackgroundColor);
    border-top: 1px solid black;
  }

  .searchHit a { text-decoration: none; color: black; }
  .searchHit:hover { background-color: var(--activeLinkColor); }
  .searchHit:active { background-color: var(--activeLinkColor);}


  /*** mobile ***/
  @media screen and (max-width: 700px) {
    #searchBox { width: 88vw; }
  }
</style>