<template>
    <!-- ### search box ### -->
    <div v-if="Sections && Categories && Data">
      <div id="searchBox" v-if="SelectedSection.title == 'search'">
        <!-- search bar -->
        <form v-on:submit.prevent="onSubmit">
          <input id="searchBarInput" placeholder="Enter search text..." /> <!-- v-on:keyup.enter="loadSearch($event)" -->
          <button id="searchBarSubmitButton" v-on:click="loadSearch($event)">Enter</button>
        </form>
        
        <!-- search hits -->
        <p v-if="SearchResults" id="searchHitCount">{{SearchResults.length}} results found</p>
        <div class="searchHit" v-for="(h, itemObjKey) in SearchResults" v-bind:key="h.id" v-bind:id="'searchHit' + (itemObjKey + 1)">
          <!-- {{h}} -->
          <div v-if="h.searchMatchType == 'section'" v-on:click="loadSectionFromSearch(null, h.section)">{{itemObjKey+1}}: <b>section</b> {{h.section}}</div>
          <div v-if="h.searchMatchType == 'category'" v-on:click="loadCategoryFromSearch(h.section, null, h.category)">{{itemObjKey+1}}: <b>category</b> in {{h.section}} = <b>{{h.value}}</b></div>
          <div v-if="h.searchMatchType == 'data'" v-on:click="loadCategoryFromSearch(h.section, null, h.category, h.key)">{{itemObjKey+1}}: <b>data</b> in {{h.section}} ➞ {{h.category}} ➞ {{h.key.substr(0, 1).toUpperCase() + h.key.substr(1, h.key.length)}} = <b>{{h.value}}</b></div>
          <div v-if="h.searchMatchType == 'image description'" v-on:click="loadCategoryFromSearch(h.section, null, h.category)">{{itemObjKey+1}}: <b>image</b> {{h.key}} in {{h.section}} ➞ {{h.category}} = <b>{{h.value}}</b></div>
        </div>
      </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
    setup() {
        //vuex
        const store = useStore()

        const SelectedSection = computed(() => { return store.getters['storage/selectedSection']})
        const SelectedSectionCategories = computed(() => { return store.getters['storage/selectedSectionCategories']})
        const SelectedSectionData = computed(() => { return store.getters['storage/selectedSectionData']})
        const SelectedSectionCategoryData = computed(() => { return store.getters['storage/selectedSectionCategoryData']})

        const Sections = computed(() => { return store.getters['storage/sections']})
        const Categories = computed(() => { return store.getters['storage/categories']})
        const Data = computed(() => { return store.getters['storage/data']})
        const SearchResults = computed(() => { return store.getters['storage/searchResults']})

        //variables

        //functions
        function loadSectionFromSearch(pos, title)
        {
          // console.log("loadSectionFromIndex")
          // console.log("section pos: " + pos)
          // console.log("section category: " + "default")

          var section = null

          var sections = Sections.value
          var categories = Categories.value 
          var data = Data.value
          // console.log(sections.sections)
          // console.log(categories.categories)
          // console.log(data.data)

          //filter sections for selected section
          if (pos != null)
          {
            for (var c in sections.sections)
            {
              if (pos == sections.sections[c].pos)
              {
                section = sections.sections[c]
              }
            }
          }
          else if (title != null)
          {
            for (var c in sections.sections)
            {
              if (title == sections.sections[c].title)
              {
                section = sections.sections[c]
              }
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

          //set history test 
          // window.history.pushState(null, null, "/" + title)

        }

        function loadCategoryFromSearch(title, pos, category)
        {
            console.log("loadCategoryFromIndex")
            console.log("section title: " + title)
            console.log("section pos: " + pos)
            console.log("section category: " + category)

            var section = null
            var category = category
            var title = title

            var sections = Sections.value
            var categories = Categories.value 
            var data = Data.value
            
            // console.log(sections.sections)
            // console.log(categories.categories)
            // console.log(data.data)

            // filter sections for selected section
            for (var c in sections.sections)
            {
                if (title == sections.sections[c].title)
                {
                section = sections.sections[c]
                }
            }
            // console.log(section)

            // filter categories for selected section
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
            // console.log(sectionCategories)

            // filter data for selected section
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
            // console.log(sectionData)

            // filter data for selected section category data
            var defaultCategoryTitle = "defaultCategoryTitle"
            var defaultCategoryData = []

            for (var c in sectionData)
            {
                if (sectionData[c].category == category)
                {
                defaultCategoryData.push(sectionData[c])
                }
            }
            // console.log(defaultCategoryData)

            // vuex
            store.dispatch('storage/actionSetSelectedSection', section)
            store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
            store.dispatch('storage/actionSetSelectedSectionData', sectionData)
            if (section.title != "index" || section.title != "search")
            {
                store.dispatch('storage/actionSetSelectedSectionCategoryData', defaultCategoryData)
            }

            //set history test 
            // window.history.pushState(null, null, "/" + title)

        }

        function loadSearch(event)
        {
            // console.log(event)
            
            //variables
            var searchObjects = []
            var searchString = document.getElementById("searchBarInput")
            var allDataFromDb = Data.value.data
            var searchMatchType = ""
            var searchHitCounter = 0
            var foundIn = []
            var searchBar = document.getElementById("searchBarInput")
            var searchText = searchBar.value
            
            //input error handling
            if (searchString.value == "" || searchString.value[0] == " ")
            {
                console.log("empty string search error")
                return
            }

            for (var d in allDataFromDb)
            {
                //variables
                var searchObject = ""
                var x = allDataFromDb[d]
                var y = Object.entries(x)

                //sort data into search objects
                for (var c in y)
                {
                //variables
                var dataType = y[c][0].toString()

                //filter data to find data.section and data.category
                if (dataType != "backgroundColor" && dataType != "backgroundImage" && dataType != "key" && dataType != "lastEdited" && dataType != "type" && dataType != "obj" && dataType != "galleryImages")
                {
                    var cleanStr1 = JSON.stringify(y[c])
                    var cleanStr2 = cleanStr1.substr(1, (cleanStr1.length - 2))
                    // var cleanStr3 = cleanStr2.replaceAll("\"", "'")
                    var cleanStr4 = cleanStr2.replace(",", ":")
                    // var cleanStr5 = "{" + cleanStr4 + "}"
                    // console.log(cleanStr4)
                    
                    searchObject += cleanStr4 + ","
                }

                //filter relevant data from data.galleryImages
                if (dataType == "galleryImages")
                { 
                    var imageGallery = y[c][1]
                    if (imageGallery != "null")
                    {
                    // console.log("galleryImages")
                    for (var c in imageGallery)
                    {
                        if (imageGallery[c].hidden == "False" || imageGallery[c].hidden == "false")
                        {
                        cleanStr1 = "\"image-" + c + "\"" + ":" + "\"" + imageGallery[c].description + "\""
                        // console.log(cleanStr1)

                        searchObject += cleanStr1 + ","
                        }
                    }
                    }
                }

                //filter relevant data from data.obj
                if (dataType == "obj")
                {
                    var obj = y[c][1]
                    if (obj != "null")
                    {
                    // console.log("obj")
                      for (var c in obj)
                      {
                          if (obj[c].hidden == "False")
                          {
                            var k = Object.entries(obj[c])
                            for(var x in k)
                            {
                                if (k[x][0] != "hidden" && k[x][0] != "multiline" && k[x][0] != "pos")
                                {
                                var cleanStr1 = JSON.stringify(k[x])
                                var cleanStr2 = cleanStr1.substr(1, (cleanStr1.length - 2))
                                // var cleanStr3 = cleanStr2.replaceAll("\"", "'")
                                var cleanStr4 = cleanStr2.replace(",", ":")
                                // var cleanStr5 = "{" + cleanStr4 + "}"
                                // console.log(cleanStr4)
                                
                                searchObject += cleanStr4 + ","

                                // console.log(JSON.stringify(k[x]))
                                }
                            }

                            // console.log(JSON.stringify(obj[c]))
                          }
                      }
                    }
                }
                }
                
                //parse data to json and add into searchable objects array
                searchObject = "{" + searchObject.substr(0, searchObject.length - 1) + "}"
                searchObject = JSON.parse(searchObject)
                searchObjects.push(searchObject)
                // console.log("searchObject: " + searchObject)
                // console.log("")
            }

            // console.log("searchObjects")
            // console.log(searchObjects)


            for (var c in searchObjects)
            {
                // console.log(searchObjects[c])
                // console.log(searchObjects[c].section)
                // console.log(searchObjects[c].category)

                //variables
                var t = Object.entries(searchObjects[c])
                if (c > 1)
                {
                var previousSection = searchObjects[c - 1].section 
                }
                var currentSection = searchObjects[c].section
                var currentCategory = searchObjects[c].category
                
                //check if section is not index or search
                if (currentSection != 'index' && currentSection != 'search')
                {
                for(var x in t)
                { 
                    var objectKey = t[x][0]
                    var objectValue = t[x][1]
                    // console.log("objectKey: " + objectKey)
                    // console.log("objectValue: " + objectValue)
                    
                    //search match found in category
                    if(objectKey == "category")
                    {
                      if(objectValue.includes(searchString.value))
                      {
                          var categoryName = objectValue
                          searchHitCounter++
                          searchMatchType = "category"
                          // foundIn += "{" + "section: " + currentSection + " category: " + currentCategory + " / " + "category" + "},"
                          var formatToJson1 = "\"section\":" + "\"" + currentSection + "\"," + "\"category\":" + "\"" + currentCategory + "\"," + "\"searchMatchType\":" + "\"category\"," + "\"value\":" + "\"" + categoryName + "\""
                          var formatToJson2 = "{" + formatToJson1 + "}"
                          var parsedToObject = JSON.parse(formatToJson2)
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
                          // console.log("previous section: " + previousSection)
                          // console.log("current section: " + currentSection)
                          
                          // foundIn += "{" + "section: " + currentSection + " category: " + currentCategory + " / " + "section" + "},"
                          var formatToJson1 = "\"section\":" + "\"" + currentSection + "\"," + "\"searchMatchType\":" + "\"section\""
                          var formatToJson2 = "{" + formatToJson1 + "}"
                          var parsedToObject = JSON.parse(formatToJson2)
                          
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
                      var imageNumber = objectKey.substring(6, 7)
                      imageNumber++
                      var imageDescription = objectValue
                      
                      if(objectValue.includes(searchString.value))
                      {
                          searchHitCounter++
                          searchMatchType = "image"
                          // foundIn += "{" + "section: " + currentSection + " category: " + currentCategory + " / " + "image description" + "},"
                          var formatToJson1 = "\"section\":" + "\"" + currentSection + "\"," + "\"category\":" + "\"" + currentCategory + "\"," + "\"searchMatchType\":" + "\"image description\"," + "\"key\":" + "\"" + imageNumber + "\"," + "\"value\":" + "\"" + imageDescription + "\""
                          var formatToJson2 = "{" + formatToJson1 + "}"
                          var parsedToObject = JSON.parse(formatToJson2)
                          foundIn.push(parsedToObject)
                      }
                    }
        
                    //search match found in data var
                    else
                    {
                      if(objectValue.includes(searchString.value))
                      {
                          var dataKey = objectKey
                          var dataValue = objectValue
                          searchHitCounter++
                          searchMatchType = "data"
                          // foundIn += "{" + "section: " + currentSection + " category: " + currentCategory + " / " + "data" + "},"
                          var formatToJson1 = "\"section\":" + "\"" + currentSection + "\"," + "\"category\":" + "\"" + currentCategory + "\"," + "\"searchMatchType\":" + "\"data\"," + "\"key\":" + "\"" + dataKey + "\"," + "\"value\":" + "\"" + dataValue + "\"" 
                          var formatToJson2 = "{" + formatToJson1 + "}"
                          var parsedToObject = JSON.parse(formatToJson2)
                          foundIn.push(parsedToObject)
                      }
                    }
        
                    // console.log(t[x])
                }
                }

                // console.log("")
            }
            // console.log("search hit counter: " + searchHitCounter)
            
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
    #searchBox {
    margin: 0px;
    margin: auto;
    padding: 0px;
    width: 40vw;
    background-color: lightgreen;
    border: 2px solid black;
    }

    #searchBarInput, #searchBarSubmitButton {
    margin: 0px;
    padding: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 0%;
    border: 0px;
    border-bottom: 1px solid black;
    }

    #searchBarInput {
    padding-left: 1%;
    width: 83%;
    font-weight: bold;
    outline: none;
    }

    #searchBarInput::placeholder
    {
    color: black;
    }

    #searchBarSubmitButton {
    width: 16%;
    font-weight: bold;
    background-color: lightgreen;
    border-left: 2px solid black;
    }

    #searchBarSubmitButton:active {
    background-color: yellow;
    }

    #searchHitCount {
    margin: 0px;
    padding: 0px;
    padding-top: 7px;
    padding-bottom: 7px;
    font-weight: bold;
    color: white;
    background-color: black; /* #2c3e50 */
    }

    .searchHit {
    margin: 0px;
    margin: auto;
    padding: 8px;
    text-align: left;
    background-color: lightgreen;
    border-top: 1px solid black;
    }

    .searchHit:hover {
    background-color: yellow;
    }

    .searchHit:active {
    background-color: yellow;
    }

  /* mobile styling */
  @media screen and (max-width: 700px) {
    #searchBox {
      width: 88vw;
    }
  }
</style>