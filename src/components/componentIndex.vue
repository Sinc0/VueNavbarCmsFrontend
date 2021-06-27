<template>
    <!-- ### index tree ### -->
    <div v-if="Sections && Categories">
      <div v-if="SelectedSection.title == 'index'">
        <div v-for="section in Sections.sections.sort((a, b) => {return a.pos - b.pos})" v-bind:key="section.pos">
          <div id="indexSectionDiv" v-if="section.title != 'index' && section.title != 'search' && section.title != 'about'">
            <router-link class="indexSection" v-bind:to="'/' + section.title" v-on:click="loadSectionFromIndex(section.pos)">{{section.title.substr(0, 1).toUpperCase()}}{{section.title.substr(1, section.title.length - 1)}}</router-link>
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
            var totalSections = Sections.value.sections.length
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

        //functions  
        function loadSectionFromIndex(pos, title)
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