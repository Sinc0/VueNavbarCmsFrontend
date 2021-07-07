<template>
    <!-- ### index tree ### -->
    <div v-if="Sections && Categories && SelectedSection">
      
      <div v-if="SelectedSection.title == 'index'">
        <div v-for="section in Sections.sections.sort((a, b) => {return a.pos - b.pos})" v-bind:key="section.pos">
          <div id="indexSectionDiv" v-if="section.title != 'index'">
              
            <!-- section -->
            <router-link class="indexSection" v-bind:to="'/' + section.title.toLowerCase()" v-on:click="loadSectionFromIndex(section.pos)">{{section.title.substr(0, 1).toUpperCase()}}{{section.title.substr(1, section.title.length - 1)}}</router-link>

            <!-- section category -->
            <div v-for="category in Categories.categories.sort((a, b) => {return a.pos - b.pos})" v-bind:key="category.id">
              <router-link class="indexCategory" v-if="category.section == section.title && category.title.toLowerCase() != section.title.toLowerCase()" v-bind:to="'/' + section.title.toLowerCase() + '/' + category.title.toLowerCase()" v-on:click="loadCategoryFromIndex(section.title, section.pos, category.title)">{{category.title}}</router-link>
            </div>

          </div>
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
                    var sectionLink = document.getElementById("section-router-link#" + p)
                    sectionLink.click()
                    // loadSectionFromIndex(p)
                    // window.history.pushState(null, null, "/" + SelectedSection.value.title)
                }
            }
            
            //arrow up
            if (e.code === "ArrowUp" && e.shiftKey === true)
            {
                if (p > 0)
                {
                    p--
                    var sectionLink = document.getElementById("section-router-link#" + p)
                    sectionLink.click()
                    // loadSectionFromIndex(p)
                    // window.history.pushState(null, null, "/" + SelectedSection.value.title)
                }
            }

            //w
            if (e.code === "KeyW" && e.shiftKey === true)
            {
                if (p > 0)
                {
                    p--
                    var sectionLink = document.getElementById("section-router-link#" + p)
                    sectionLink.click()
                    // loadSectionFromIndex(p)
                    // window.history.pushState(null, null, "/" + SelectedSection.value.title)
                }
            }
            
            //s
            if (e.code === "KeyS" && e.shiftKey === true)
            {
                if (p < totalSections)
                {
                    p++
                    var sectionLink = document.getElementById("section-router-link#" + p)
                    sectionLink.click()
                    // loadSectionFromIndex(p)
                    // window.history.pushState(null, null, "/" + SelectedSection.value.title)
                }
            }
        });

        //history handling
        window.onpopstate = function()
        {
            
            //variables
            var urlPath = window.location.pathname
            var urlPathSplit = urlPath.split("/")
            var urlPathSlashes = urlPath.split("/").length - 1
            var urlPathCleaned = urlPath.substring(1, urlPath.length)
            var section = null
            var category = null

            //debugging
            // console.log("Back/Forward clicked!");
            // console.log("full path: " + urlPath)

            //if no subdomain
            // section = urlPathCleaned
            // section = urlPathSplit[1]
            // category = urlPathSplit[2]
            
            //load section
            if (urlPathSlashes == 2) //section specified only
            {
                //if subdomain
                section = urlPathSplit[2]

                //debugging
                // console.log("section: " + section)

                loadSectionFromIndex(null, section)

            }
            //load category
            else if (urlPathSlashes == 3) //section and category specified
            {
                //if subdomain
                section = urlPathSplit[2]
                category = urlPathSplit[3]

                //clean string
                section = section.toLowerCase()
                category = category.replace("%20", " ")
                category = category.toLowerCase()
               
                //debugging
                // console.log("section: " + section + " category: " + category)
                
                loadCategoryFromIndex(section, null, category)
                
            }

        }

        //functions  
        function loadSectionFromIndex(pos, title)
        {
            //variables
            var section = null
            var sections = Sections.value
            var categories = Categories.value 
            var data = Data.value
            var sectionCategories = []
            var sectionData = []
            var defaultCategoryTitle = "defaultCategoryTitle"
            var defaultCategoryData = []

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
            for (var c in categories.categories)
            {
                if(categories.categories[c].section == section.title)
                {
                    sectionCategories.push(categories.categories[c])
                }
            }

            //filter data for selected section
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

            //set history test 
            // window.history.pushState(null, null, "/" + title)
            
        }
        
        function loadCategoryFromIndex(title, pos, category)
        {
            //debugging           
            // console.log(sections.sections)
            // console.log(categories.categories)
            // console.log(data.data)
            // console.log("title: " + title)
            // console.log("category: " + category)
            
            //variables
            var section = null
            var category = category
            var title = title
            var sections = Sections.value
            var categories = Categories.value 
            var data = Data.value
            var sectionCategories = []
            var defaultCategoryTitle = "defaultCategoryTitle"
            var defaultCategoryData = []

            //filter sections for selected section
            for (var c in sections.sections)
            {
                if (title.toLowerCase() == sections.sections[c].title)
                {
                    section = sections.sections[c]
                }
            }

            //filter categories for selected section
            for (var c in categories.categories)
            {
                if(categories.categories[c].section.toLowerCase() == section.title)
                {
                    sectionCategories.push(categories.categories[c])
                }
            }

            //filter data for selected section
            var sectionData = []
            for (var d in data.data)
            {
                if(data.data[d].section.toLowerCase() == section.title)
                {
                    sectionData.push(data.data[d])
                }
            }

            //filter data for selected section category data
            for (var c in sectionData)
            {
                if (sectionData[c].category.toLowerCase() == category)
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
            loadSectionFromIndex,
            loadCategoryFromIndex
        }
    }
}
</script>

<style scoped>
    #indexSectionDiv {
        margin: 0px;
        padding: 0px;
        padding-bottom: 23px;
    }

    .indexSection, .indexCategory {
        margin: 0px;
        padding: 0px;
    }
    
    .indexSection:active, .indexCategory:active {
        color: lightgreen;
    }

    .indexSection {
        margin: 0px;
        padding: 0px;
        font-weight: bold;
        text-decoration: none;
        color: black;
    }

    .indexCategory {
        font-weight: normal;
        text-decoration: none;
        color: black;
    }
</style>