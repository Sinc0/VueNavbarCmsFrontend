<template>
    <div v-if="Sections && Categories && SelectedSection">
      
      <div v-if="SelectedSection.title == 'index'">
        <div v-for="section in Sections.sections.sort((a, b) => {return a.pos - b.pos})" v-bind:key="section.pos">
          
          <div id="indexSectionDiv" v-if="section.title != 'index'">
              
            <!-- section -->
            <router-link class="indexSection" v-bind:to="'/' + section.title.toLowerCase()" v-on:click="loadSectionFromIndex(section.pos)">
                {{section.title.substr(0, 1).toUpperCase()}}{{section.title.substr(1, section.title.length - 1)}}
            </router-link>

            <!-- section category -->
            <div v-for="category in Categories.categories.sort((a, b) => {return a.pos - b.pos})" v-bind:key="category.id">
              <router-link class="indexCategory" v-if="category.section == section.title && category.title.toLowerCase() != section.title.toLowerCase()" v-bind:to="'/' + section.title.toLowerCase() + '/' + category.title.toLowerCase()" v-on:click="loadCategoryFromIndex(section.title, category.title)">
                {{category.title}}
            </router-link>
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
          

        //keybinds
        document.addEventListener('keyup', (e) => {
            //variables
            let totalSections = Sections.value.sections.length - 1
            let p = parseInt(SelectedSection.value.pos)
            let sectionLink = document.getElementById("section-router-link#" + p)

            //check type
            if (e.code === "ArrowUp" && e.shiftKey === true) { if (p > 0) { p--; sectionLink.click() } } //Arrow Up
            if (e.code === "ArrowDown" && e.shiftKey === true) { if (p < totalSections) { p++; sectionLink.click() } } //Arrow Down
            if (e.code === "KeyW" && e.shiftKey === true) { if (p > 0) { p--; sectionLink.click() } } //W
            if (e.code === "KeyS" && e.shiftKey === true) { if (p < totalSections) { p++; sectionLink.click() } } //S
        })


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
            // console.log("total slashes: " + urlPathSlashes)

            //if no subdomain
            // section = urlPathCleaned
            // section = urlPathSplit[1]
            // category = urlPathSplit[2]
            
            //section specified only (subdomain)
            if (urlPathSlashes == 2) 
            { section = urlPathSplit[2]; loadSectionFromIndex(null, section) }
            
            //section and category specified
            else if (urlPathSlashes == 3) 
            {
                //variables
                section = urlPathSplit[2]
                category = urlPathSplit[3]

                //clean string
                section = section.toLowerCase()
                category = category.replace("%20", " ")
                category = category.toLowerCase()
               
                //load category                
                loadCategoryFromIndex(section, category)
            }

        }


        //functions  
        function loadSectionFromIndex(pos, t)
        {
            //variables
            let section = null
            let sections = Sections.value
            let title = t
            let categories = Categories.value 
            let data = Data.value
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
                if(data.data[d].section == section.title)
                {
                    sectionData.push(data.data[d])
                }
            }

            //filter data for default category title
            for (let c in sectionCategories)
            {
                if (sectionCategories[c].pos == "1")
                {
                    defaultCategoryTitle = sectionCategories[c].title
                }
            }

            //filter data for selected section category data
            for (let c in sectionData)
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
            { store.dispatch('storage/actionSetSelectedSectionCategoryData', defaultCategoryData)}

            //debugging
            // window.history.pushState(null, null, "/" + title)
            
        }
        
        
        function loadCategoryFromIndex(t, c)
        {
            //debugging           
            // console.log(sections.sections)
            // console.log(categories.categories)
            // console.log(data.data)
            // console.log("title: " + title)
            // console.log("category: " + category)
            
            //variables
            let section = null
            let category = category
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
                if (title.toLowerCase() == sections.sections[c].title)
                {
                    section = sections.sections[c]
                }
            }

            //filter categories
            for (let c in categories.categories)
            {
                if(categories.categories[c].section.toLowerCase() == section.title)
                {
                    sectionCategories.push(categories.categories[c])
                }
            }

            //filter data
            for (let d in data.data)
            {
                if(data.data[d].section.toLowerCase() == section.title)
                {
                    sectionData.push(data.data[d])
                }
            }

            //filter data for selected section category data
            for (let c in sectionData)
            {
                if (sectionData[c].category.toLowerCase() == category.toLowerCase())
                {
                    defaultCategoryData.push(sectionData[c])
                }
            }

            //vuex
            store.dispatch('storage/actionSetSelectedSection', section)
            store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
            store.dispatch('storage/actionSetSelectedSectionData', sectionData)
            if (section.title != "index" || section.title != "search") { store.dispatch('storage/actionSetSelectedSectionCategoryData', defaultCategoryData) }

            //debugging
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
    /*** ids ***/
    #indexSectionDiv { margin: 0px; padding: 0px; padding-bottom: 23px; }


    /*** classes ***/
    .indexCategory:active { color: var(--activeLinkColor); }
    .indexSection:active { color: var(--activeLinkColor); }

    .indexSection { margin: 0px; padding: 0px; font-weight: bold; text-decoration: none; color: var(--IndexFontColor); }

    .indexCategory { margin: 0px; padding: 0px; font-weight: normal; text-decoration: none; color: black; }
</style>