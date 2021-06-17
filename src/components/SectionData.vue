<template>
  <div id="sectionData">
    <!-- ### categories ### -->
    <div id="flexContainer">
      <!-- <h1 id="arrowScrollLeft" class="arrowScroll" v-on:click="scrollCategoriesToLeft()">❮</h1> -->

      <div v-if="SelectedSectionCategories" id="categories">
        <span v-for="category in SelectedSectionCategories.sort((a, b) => {return a.pos - b.pos})" v-bind:key="category.key">
          <!-- <h1 v-bind:id="'category-' + category.pos" class="category" v-if="category.title == 'Index Test'">{{category.title}}</h1>
          <h1 v-bind:id="'category-' + category.pos" class="category" v-if="category.title != 'Index Tree'" v-on:click="loadCategory(category, SelectedSectionData, category.pos)">{{category.title}}</h1> -->
          <h1 v-bind:id="'category-' + category.pos" class="category" v-on:click="loadCategory(category, SelectedSectionData, category.pos)">{{category.title}}</h1>
        </span>
      </div>

      <!-- <h1 id="arrowScrollRight" class="arrowScroll" v-on:click="scrollCategoriesToRight()">❯</h1> -->
    </div>

    
    <!-- ### index tree ### -->
    <div v-if="Sections && Categories">
      <div v-if="SelectedSection.title == 'index'">
        <div v-for="section in Sections.sections.sort((a, b) => {return a.pos - b.pos})" v-bind:key="section.id">
          <div id="indexSectionDiv" v-if="section.title != 'index' && section.title != 'search'">
            <router-link class="indexSection" v-bind:to="'/' + section.title" v-on:click="loadSectionFromIndex(section.pos)">{{section.title}}</router-link>
            <!-- <p class="indexSection" v-bind:to="'/' + section.title" v-on:click="loadSection(section.title, Sections, Categories, Data)">{{section.title}}</p> -->
            <!-- <router-link v-bind:to="section.title"><b>{{section.title}}</b></router-link> -->
            <!-- window.history.pushState(nextState, nextTitle, nextURL); -->
            <div v-for="category in Categories.categories.sort((a, b) => {return a.pos - b.pos})" v-bind:key="category.id">
              <router-link class="indexCategory" v-if="category.section == section.title" v-bind:to="'/'" v-on:click="loadCategoryFromIndex(section.title, section.pos, category.title)">{{category.title}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

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
          <div v-if="h.searchMatchType == 'section'" v-on:click="loadSectionFromIndex(h.section)">{{itemObjKey+1}}: <b>section</b> {{h.section}}</div>
          <div v-if="h.searchMatchType == 'category'" v-on:click="loadCategoryFromIndex(h.section, null, h.category)">{{itemObjKey+1}}: <b>category</b> in {{h.section}} = <b>{{h.value}}</b></div>
          <div v-if="h.searchMatchType == 'data'" v-on:click="loadCategoryFromIndex(h.section, null, h.category, h.key)">{{itemObjKey+1}}: <b>data</b> in {{h.section}} ➞ {{h.category}} ➞ {{h.key.substr(0, 1).toUpperCase() + h.key.substr(1, h.key.length)}} = <b>{{h.value}}</b></div>
          <div v-if="h.searchMatchType == 'image description'" v-on:click="loadCategoryFromIndex(h.section, null, h.category)">{{itemObjKey+1}}: <b>image</b> {{h.key}} in {{h.section}} ➞ {{h.category}} = <b>{{h.value}}</b></div>
        </div>
      </div>
    </div>

    <!-- ### data ### -->
    <div v-if="SelectedSectionCategoryData" id="data">
   
      <!-- check if section is not index or search -->
      <div v-if="SelectedSection.title != 'index' && SelectedSection.title != 'search'">

        <!-- check if category has image gallery -->
        <div id="image-gallery-wrapper" v-if="SelectedSectionCategoryData[0].galleryImages.length > 0">
          
          <!-- arrow previous gallery image -->
          <h1 id="arrowPreviousGalleryImage" class="arrowsImageGallery" v-on:click="showPreviousGalleryImage()">❮</h1>

          <!-- image gallery -->
          <div id="image-gallery">

            <!-- image -->
            <div class="galleryImageDiv" v-for="(image, itemObjKey) in SelectedSectionCategoryData[0].galleryImages.sort((a, b) => {return a.pos - b.pos})" v-bind:key="image.id">
              <img v-if="(itemObjKey + 1) == 1" v-bind:id="'galleryImage#' + (itemObjKey + 1)" class="galleryImage" v-bind:src="image.image" v-bind:title="image.description" /> <!--  + ' pos ' + image.pos --> <!-- 'image' + ' ' + (itemObjKey + 1) + ' of ' + SelectedSectionCategoryData[0].galleryImages.length -->
              <img v-if="(itemObjKey + 1) != 1" v-bind:id="'galleryImage#' + (itemObjKey + 1)" class="galleryImage galleryImageHidden" v-bind:src="image.image" v-bind:title="image.description" />
            </div>

            <!-- <b>image description</b> -->
          </div>

          <!-- arrow next gallery image -->
          <h1 id="arrowNextGalleryImage" class="arrowsImageGallery" v-on:click="showNextGalleryImage()">❯</h1>
        </div>

        <!-- text data -->
        <div class="data-div" v-for="data in SelectedSectionCategoryData[0].obj.sort((a, b) => {return a.pos - b.pos})" v-bind:key="data.id">
            <!-- print data obj -->
            <!-- {{data}} -->

            <!-- filter hidden data -->          
            <div v-if="data.hidden == 'False'">

              <!-- single line text -->
              <div v-if="data.multiline == 'False'">
                <div v-for="o in Object.entries(data)" v-bind:key="o.id">
                  <p class="data-text data-text-singleline" v-bind:id="'data-' + o[0]" v-if="!o.toString().includes('pos') && !o.toString().includes('hidden') && !o.toString().includes('multiline')">
                    <b>{{o.toString().split(",")[0].substring(0, 1).toUpperCase()}}{{o.toString().split(",")[0].substring(1, o.toString().length).toLowerCase()}}</b> = {{o.toString().split(",")[1]}} <!-- messy string -->
                  </p>
                </div>
              </div>

              <!-- multiline text -->
              <div v-if="data.multiline == 'True'">
                <div v-for="o in Object.entries(data)" v-bind:key="o.id">
                  <p class="data-text data-text-multiline" v-bind:id="'data-' + o[0]" v-if="!o.toString().includes('pos') && !o.toString().includes('hidden') && !o.toString().includes('multiline')">
                    <b>{{o.toString().split(",")[0].substring(0, 1).toUpperCase()}}{{o.toString().split(",")[0].substring(1, o.toString().length).toLowerCase()}}</b><br />{{o.toString().split(",")[1]}}<br /> <!-- messy string -->
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>

    <!-- print section obj -->
    <!-- <p v-if="SelectedSection"><b>Section = {{SelectedSection.title}}</b></p>
    <p v-if="SelectedSection"><b>Section Data </b><br />{{SelectedSection}}</p>
    <p v-if="SelectedSection"><b>App Background Color </b><br />{{SelectedSection.appBackgroundColor}}</p>
    <p v-if="SelectedSection"><b>Section Background Color </b><br />{{SelectedSection.sectionBackgroundColor}}</p> -->
    
    <!-- print category obj -->
    <!-- <p v-if="SelectedSectionCategoryData"><b>Category = {{SelectedSectionCategoryData[0].category}}</b></p> -->
    
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

    const SelectedSection = computed(() => { return store.getters['storage/selectedSection']})
    const SelectedSectionCategories = computed(() => { return store.getters['storage/selectedSectionCategories']})
    const SelectedSectionData = computed(() => { return store.getters['storage/selectedSectionData']})
    const SelectedSectionCategoryData = computed(() => { return store.getters['storage/selectedSectionCategoryData']})

    const Sections = computed(() => { return store.getters['storage/sections']})
    const Categories = computed(() => { return store.getters['storage/categories']})
    const Data = computed(() => { return store.getters['storage/data']})
    const SearchResults = computed(() => { return store.getters['storage/searchResults']})
        
    //lifecycle hooks
    onMounted(() => {
        console.log("sectionData mounted")
    })
    
    onUpdated(() => {
        console.log("sectionData updated")

        //update app background color
        if (SelectedSection.value.appBackgroundColor)
        {
          var appBackground = document.getElementById("app")
          var sectionsBackground = document.getElementById("Sections")
          // var dataBackground = document.getElementById("sectionData")

          //set specified data background color
          appBackground.style.backgroundColor = SelectedSection.value.appBackgroundColor

          //default sections sidenav backgroundcolor
          if (SelectedSection.value.sectionBackgroundColor != "")
          {
            sectionsBackground.style.backgroundColor = SelectedSection.value.sectionBackgroundColor
          }
          
          // console.log("section background-color:" + SelectedSection.value.sectionBackgroundColor)
          // console.log("app background color: " + SelectedSection.value.appBackgroundColor)
        }
        else
        {
          //variables
          var defaultColor = "white"

          //set default app background color
          var appBackground = document.getElementById("app")
          appBackground.style.backgroundColor = defaultColor

          //set default section background color
          var sectionsBackground = document.getElementById("Sections")
          sectionsBackground.style.backgroundColor = defaultColor
          
          // console.log("section background-color:" + SelectedSection.value.sectionBackgroundColor)
          // console.log("app background color: " + SelectedSection.value.appBackgroundColor)
        }

        //update color of section buttons
        var sections = Sections.value.sections
        var selectedSectionPos = SelectedSection.value.pos
        
        for (var c in sections)
        {
          var sectionButton = document.getElementById("section#" + c)
          var sectionPos = sectionButton.id.substr(-1)
          
          if (sectionPos == selectedSectionPos)
          {
            sectionButton.style.opacity = "100%"
          }
          else
          {
            sectionButton.style.opacity = "30%"
          }
        }

        //update color of category buttons
        var selectedCategoryTitle = null
        var selectedSectionCategories = SelectedSectionCategories.value
        var selectedCategoryData = SelectedSectionCategoryData.value

        for (var c in selectedCategoryData)
        {
          selectedCategoryTitle = selectedCategoryData[c].category
        }
        // console.log("selected category title: " + selectedCategoryTitle)

        
        for (var c in selectedSectionCategories)
        {
          c++ //category ids start 1
          var categoryButton = document.getElementById("category-" + c)
          // console.log(categoryButton.innerText)

          if (categoryButton.innerText == selectedCategoryTitle)
          {
            categoryButton.style.fontWeight = "bold"
          }
          else
          {
            categoryButton.style.fontWeight = "normal"
          }
        }

        //set last searched text to search bar
        var searchBarText = document.getElementById("searchBarInput")
        if (searchBarText != null)
        {
          searchBarText.value = searchText
        }
        
        //scroll window to top
        window.scrollTo(0,0)        
    })

      //keybinds
      document.addEventListener('keyup', (e) => {
        var totalSections = Sections.value.sections.length - 1
        var p = parseInt(SelectedSection.value.pos)
        
        //arrow down
        if (e.code === "ArrowDown" && e.shiftKey === true)
        {
          if (p < totalSections)
          {
            p++
            loadSectionFromIndex(p)
          }
        }

        //s
        if (e.code === "KeyS" && e.shiftKey === true)
        {
          if (p < totalSections)
          {
            p++
            loadSectionFromIndex(p)
          }
        }
        
        //arrow up
        if (e.code === "ArrowUp" && e.shiftKey === true)
        {
          if (p > 0)
          {
            p--
            loadSectionFromIndex(p)
          }
        }

        //w
        if (e.code === "KeyW" && e.shiftKey === true)
        {
          if (p > 0)
          {
            p--
            loadSectionFromIndex(p)
          }
        }
      });
    
    //variables
    var imagePos = 1
    var searchText = null

    //functions
    function showNextGalleryImage() {
      var galleryImages = document.getElementsByClassName("galleryImage")

      // set ImagePos
      if (imagePos < galleryImages.length)
      {
        imagePos++
      }
      else 
      {
        imagePos = 1
      }
      // console.log(imagePos)

      // display correct gallery image
      for(var c = 1; c <= galleryImages.length; c++)
      {
        var setDisplayedImage = document.getElementById("galleryImage#" + c)

        if (c == imagePos)
        {
          setDisplayedImage.style.display = "block"
          // console.log(setDisplayedImage.id)
        }
        else 
        {
          setDisplayedImage.style.display = "none"
        }

      }
    }

    function showPreviousGalleryImage()
    {
      var galleryImages = document.getElementsByClassName("galleryImage")
      
      // set ImagePos
      if (imagePos > 1)
      {
        imagePos--
      }
      else 
      {
        imagePos = galleryImages.length
      }
      // console.log(imagePos)

      // display correct gallery image
      for(var c = 1; c <= galleryImages.length; c++)
      {
        var setDisplayedImage = document.getElementById("galleryImage#" + c)

        if (c == imagePos)
        {
          setDisplayedImage.style.display = "block"
          // console.log(setDisplayedImage.id)
        }
        else 
        {
          setDisplayedImage.style.display = "none"
        }

      }
    }

    function loadCategory(category, data, pos)
    {
      //filter data for selected category
      var categoryData = []
      for (var d in data)
      {
        if(data[d].category == category.title)
        {
          categoryData.push(data[d])
        }

        // console.log(categories.categories[c].section)
        // console.log(section.title)
        // console.log(data[d])
      }

      //vuex
      store.dispatch('storage/actionSetSelectedSectionCategoryData', categoryData)
      // console.log(categoryData[0])

    }
    
    function loadSectionFromIndex(pos)
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

      //set history test 
      // window.history.pushState(null, null, "/" + title)

    }

    function loadCategoryFromIndex(title, pos, category)
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

      //set searchText
      searchText = searchString.value
    
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

    }

    return {
      //variables
      SelectedSectionCategoryData,
      
      //vuex
      SelectedSection,
      SelectedSectionCategories,
      SelectedSectionData,
      Sections,
      Categories,
      Data,
      SearchResults,

      //functions
      loadCategory,
      showNextGalleryImage,
      showPreviousGalleryImage,
      loadSectionFromIndex,
      loadCategoryFromIndex,
      loadSearch
    }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* scrollbar styling */
::-webkit-scrollbar {
  height: 4px;
  width: 0px;
}

::-webkit-scrollbar-track {
  background: lightgray;
}

::-webkit-scrollbar-thumb {
  background: black;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#sectionData {
  margin-left: 80px;
  padding: 10px;
  /* border: 1px solid black; */
}

#flexContainer
{
  display: inline-flex;
  margin: 0px;
  padding: 0px;
  /* display: flex;
  flex-direction: row; */
  /* justify-content: center; */
  /* align-items: ; */
  /* align-content: ; */
}

#categories { 
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start; /* flex-start, center, flex-end */
  /* align-items: ; */
  /* align-content: ; */
  max-width: 700px;
  margin: 0px;
  margin: auto;
  padding: 0px;
  padding-top: 3px;
  padding-bottom: 3px;
  overflow-y: scroll;
  /* border: 1px solid black; */
}

.category {
  margin: 0px;
  margin-left: 8px;
  margin-right: 8px;
  padding: 0px;
  vertical-align: top;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  font-size: 26px;
  font-weight: normal;
  /* border: 1px solid black; */
}

.category:active {
  color: lightgreen;
}

.data-text {
  margin: 0px;
  margin: auto;
  padding: 10px;
  width: 60vw;
  text-align: left;
  background-color: white;
  border: 1px solid black;
}

.data-text-singleline
{
  /* border: 1px solid black; */
}

.data-text-multiline
{
  /* border: 1px solid black; */
}

.data-div {
  margin: 0px;
  padding: 0px;
}

#image-gallery {
  display: inline-flex;
  margin: 0px;
  margin-top: 7px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-top: 10px;
  padding-right: 10px;
  width: 60vw;
  height: 30vw;
  background-color: black;
  border: 1px solid black;
}

.arrowsImageGallery {  
  display: inline-flex;
  /* margin: 0px;
  padding: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-top: 16vh;
  padding-right: 10px;
  user-select: none;
  -webkit-user-select: none; */
  /* border: 1px solid black; */
  margin: 0;
  margin-top: 18vh;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 3px;
  padding-top: 0px;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: top;
  /* border: 1px solid black; */
}

.arrowsImageGallery:active {
  color: lightgreen;
}

#arrowPreviousGalleryImage {
  margin-left: 0px;
}

.galleryImage {
  display: block;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  /* width: 400px;
  height: 300px; */
}

.galleryImageHidden {
  display: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}

#indexSectionDiv {
  margin: 0px;
  margin-top: 10px;
  padding: 0px;
}

.indexSection, .indexCategory {
  margin: 0px;
  padding: 0px;
}

.indexSection {
  margin: 0px;
  padding: 10px;
  font-weight: bold;
  text-decoration: none;
  color: black;
}

.indexCategory {
  font-weight: normal;
  text-decoration: none;
  color: black;
}

#searchBox {
  margin: 0px;
  margin: auto;
  padding: 0px;
  width: 40vw;
  background-color: lightgreen;
  border: 1px solid black;
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

#searchBarSubmitButton {
  width: 16%;
  font-weight: bold;
  background-color: lightgreen;
  border-left: 1px solid black;
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
</style>
