<template>
  <div class="sectionData">
    <!-- ### categories ### -->
    <div id="flexContainer">
      <!-- <h1 id="arrowScrollLeft" class="arrowScroll" v-on:click="scrollCategoriesToLeft()">❮</h1> -->

      <div v-if="SelectedSectionCategories" id="categories">
        <h1 v-for="category in SelectedSectionCategories.sort((a, b) => {return a.pos - b.pos})" v-bind:key="category.key" v-bind:id="'category-' + category.pos" v-on:click="loadCategory(category, SelectedSectionData, category.pos)" class="category">{{category.title}}</h1>
      </div>

      <!-- <h1 id="arrowScrollRight" class="arrowScroll" v-on:click="scrollCategoriesToRight()">❯</h1> -->
    </div>

    <!-- ### data ### -->
    <div v-if="SelectedSectionCategoryData" id="data">
      
      <!-- image gallery -->
      <br />
      <b>gallery images: {{SelectedSectionCategoryData[0].galleryImages}}</b><br />
      <br />

      <!-- text data -->
      <div class="data-div" v-for="data in SelectedSectionCategoryData[0].obj.sort((a, b) => {return a.pos - b.pos})" v-bind:key="data.id">
          <!-- {{data}} -->

          <!-- filter hidden data -->          
          <div v-if="data.hidden == 'False'">

            <!-- single line text -->
            <div v-if="data.multiline == 'False'">              
              <div v-for="o in Object.entries(data)" v-bind:key="o.id">
                <p class="data-text data-text-singleline" v-if="!o.toString().includes('pos') && !o.toString().includes('hidden') && !o.toString().includes('multiline')">
                  <b>{{o.toString().split(",")[0].substring(0, 1).toUpperCase()}}{{o.toString().split(",")[0].substring(1, o.toString().length).toLowerCase()}}</b> = {{o.toString().split(",")[1]}} <!-- messy string -->
                </p>
              </div>
            </div>

            <!-- multiline text -->
            <div v-if="data.multiline == 'True'">
              <div v-for="o in Object.entries(data)" v-bind:key="o.id">
                <p class="data-text data-text-multiline" v-if="!o.toString().includes('pos') && !o.toString().includes('hidden') && !o.toString().includes('multiline')">
                  <b>{{o.toString().split(",")[0].substring(0, 1).toUpperCase()}}{{o.toString().split(",")[0].substring(1, o.toString().length).toLowerCase()}}</b><br />
                  {{o.toString().split(",")[1]}}<br /> <!-- messy string -->
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>

    <p v-if="SelectedSection"><b>Section = {{SelectedSection.title}}</b></p>
    <p v-if="SelectedSection"><b>Section Data </b><br />{{SelectedSection}}</p>
    <p v-if="SelectedSectionCategoryData"><b>Category = {{SelectedSectionCategoryData[0].category}}</b></p>
    
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route
import {computed} from 'vue'

export default {
  setup() {
    //vuex
    const store = useStore()
    const SelectedSection = computed(() => { return store.getters['storage/selectedSection']})
    const SelectedSectionCategories = computed(() => { return store.getters['storage/selectedSectionCategories']})
    const SelectedSectionData = computed(() => { return store.getters['storage/selectedSectionData']})
    const SelectedSectionCategoryData = computed(() => { return store.getters['storage/selectedSectionCategoryData']})

    //variables
    
    //functions

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

        // console.log(pos)
        // var categoryElement = document.getElementById("category-" + pos)
        // var categoryElements = document.getElementsByClassName("category")
        // categoryElement.style.color = "red"
        // console.log(categoryElements)

      //vuex
      store.dispatch('storage/actionSetSelectedSectionCategoryData', categoryData)
    }

    return {
      //variables
      SelectedSectionCategoryData,
      
      //vuex
      SelectedSection,
      SelectedSectionCategories,
      SelectedSectionData,

      //functions
      loadCategory,
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

.sectionData {
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
  padding-bottom: 10px;
  width: 60%;
  text-align: left;
  /* border: 1px solid black; */
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
</style>
