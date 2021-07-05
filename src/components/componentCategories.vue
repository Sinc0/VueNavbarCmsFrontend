<template>
    <!-- ### categories ### -->
    <div id="flexContainer">
      <div v-if="SelectedSectionCategories" id="categories">
        <span v-for="category in SelectedSectionCategories.sort((a, b) => {return a.pos - b.pos})" v-bind:key="category.key">
          <h1 v-bind:id="'category-' + category.pos" class="category" v-on:click="loadCategory(category, SelectedSectionData, category.pos)">
            <router-link v-bind:to="'/' + category.section + '/' + category.title.toLowerCase()">{{category.title}}</router-link> <!-- category.title[0].toUpperCase() + category.title.substring(1) -->
          </h1>
        </span>
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

        function loadCategory(category, data, pos)
        {
            //variables
            var categoryData = []

            //filter data for selected category
            for (var d in data)
            {
                if(data[d].category == category.title)
                {
                  categoryData.push(data[d])
                }
            }

            //vuex
            store.dispatch('storage/actionSetSelectedSectionCategoryData', categoryData)
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
            loadCategory
        }
    }
}
</script>

<style scoped>
  /* scrollbar styling */
  ::-webkit-scrollbar {
    height: 4px;
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: black;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: black;
  }
  
  #flexContainer
  {
    display: inline-flex;
    margin: 0px;
    margin: auto;
    /* margin-left: 80px; */
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
    margin: 0px;
    margin: auto;
    padding: 0px;
    padding-top: 3px;
    padding-bottom: 3px;
    max-width: 43vw;
    overflow-y: scroll;
    overflow-x: scroll;
    /* border: 1px solid black; */
  }

  .category {
    margin: 0px;
    margin-left: 8px;
    margin-right: 8px;
    padding: 0px;
    padding-top: 4px;
    padding-bottom: 8px;
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

  .category a {
    text-decoration: none;
    color: black;
  }

  #category-1 {
    font-weight: bold;
  }

  /* mobile styling */
  @media screen and (max-width: 700px) {
    #categories {
      margin: 0px;
      padding: 0px;
      padding-bottom: 4px;
      max-width: 90vw;
    }

    .category {
      margin: 0px;
      padding: 0px;
      padding-right: 10px;
    }

    ::-webkit-scrollbar {
      height: 0px;
      width: 0px;
    }

  }
</style>