<template>
    <div id="sectionData">
      <div v-if="SelectedSectionCategoryData && SelectedSection && SelectedSection.title != 'index' && SelectedSection.title != 'search'" id="data">
        
        <!-- options menu -->
        <!-- <div id="optionsMenu">
          <span>collapse</span>
          <span> • </span>
          <span>images</span>
          <span> • </span>
          <span>lists</span>
          <span> • </span>
          <span>text</span>
        </div> -->

        <!-- data rows -->
        <div hidden>{{sortedRows = sortRowPosition(SelectedSectionCategoryData[0])}}</div>
        
        <div v-for="(item, itemObjKey) in sortedRows">
          <div v-bind:id="'dataRow' + (itemObjKey - 1)" class="dataRow" v-if="item[0] != 'key' && item[0] != 'section' && item[0] != 'category'">
            <!-- debugging -->
            <!-- <div><b>{{item[0]}}</b></div> -->
            <!-- <div><b>{{item[1]}}</b></div> -->

            <!-- item data -->
            <div id="" v-if="item.hidden != 'true'">
              <!-- title -->
              <span class="itemTitle" v-if="item.title != ''">{{item.title}}</span>

              <!-- gallery images -->
              <div class="itemImageGallery" v-if="item.type == 'galleryImages'">
                
                <div hidden>{{ig = JSON.parse(item.data.replaceAll("'", "\""))}}</div>
                
                <div id="image-gallery" v-if="ig.length > 0">
                  <h1 id="arrowPreviousGalleryImage" class="arrowsImageGallery" v-on:click="showPreviousGalleryImage()">❮</h1>
                  
                  <div v-bind:id="'galleryImageDiv' + itemObjKey" class="galleryImageDiv" v-for="(image, itemObjKey) in ig" v-bind:key="image.id"> <!-- .sort((a, b) => {return a.pos - b.pos})" -->
                    <!-- <p>src:{{image.image}}</p> -->
                    <img v-if="(itemObjKey + 1) == 1" v-bind:id="'galleryImage#' + (itemObjKey + 1)" class="galleryImage" v-bind:src="image.image" v-bind:title="(itemObjKey + 1) + ' ' + image.description" /> <!--  + ' pos ' + image.pos --> <!-- 'image' + ' ' + (itemObjKey + 1) + ' of ' + SelectedSectionCategoryData[0].galleryImages.length -->
                    <img v-if="(itemObjKey + 1) != 1" v-bind:id="'galleryImage#' + (itemObjKey + 1)" class="galleryImage galleryImageHidden" v-bind:src="image.image" v-bind:title="(itemObjKey + 1) + ' ' + image.description" />
                  </div>
                  
                  <h1 id="arrowNextGalleryImage" class="arrowsImageGallery" v-on:click="showNextGalleryImage()">❯</h1> 

                  <!-- mobile arrows -->
                  <!-- <div id="mobile-arrows-image-gallery-wrapper" v-if="ig.length > 0">
                    <h1 id="" class="arrowsImageGalleryMobile" v-on:click="showPreviousGalleryImage()">❮</h1>
                    <h1 id="" class="arrowsImageGalleryMobile" v-on:click="showNextGalleryImage()">❯</h1>
                  </div> -->
                </div>
              </div>

              <!-- list: text -->
              <div class="itemList" v-else-if="item.type == 'textlist'">
                <div v-for="i in item.data.split(',')"><span>• </span>{{i}}</div>
              </div>
              
              <!-- list: timeline -->
              <div class="itemList" v-else-if="item.type == 'timeline'">

                <div hidden>{{listData = JSON.parse(item.data.replaceAll("'", "\""))}}</div>

                <div class="timeline-item" v-for="i in listData"><span><b>──{{i.year}}──• {{i.text}}</b></span></div>
              </div>
              
              <!-- list: links -->
              <div class="itemList" v-else-if="item.type == 'linklist'">
                
                <div hidden>{{listData = JSON.parse(item.data.replaceAll("'", "\""))}}</div>
                
                <div v-for="i in listData">
                  <a class="linklist-item" v-bind:href="i.link" target="_blank"><span>• </span>{{i.text}}</a>
                </div>
              </div>

              <!-- text: multiline -->
              <div class="itemText" v-else-if="item.type == 'multiline'">
                <div v-for="i in item.data.split(',')">{{i}}</div>
              </div>
              
              <!-- text: singleline -->
              <div class="itemText" v-else-if="item.type == 'singleline'">{{item.data}}</div>

              <!-- others -->
              <!-- <div v-else>{{item.data}}</div> -->
            </div>
            
            <!-- <span>pos: {{item.pos}}</span><br /> -->
            <!-- <span>hidden: {{item.hidden}}</span><br /> -->
            <!-- <span>type: {{item.type}}</span> -->
          </div>
        </div>

        <!-- debugging -->
        <!-- {{SelectedSectionCategoryData}}<br /><br /> -->
        <!-- {{SelectedSectionCategoryData[0]}}<br /><br /> -->
        <!-- total rows: {{Object.entries(SelectedSectionCategoryData[0]).length - 3}}<br /><br /> -->
        <!-- <br /> -->
        <!-- <div v-if="SelectedSection">
          <b>Section Title: </b>{{SelectedSection.title}}<br />
          <b>Section Obj: </b>{{SelectedSection}}<br />
          <b>App Background Color: </b>{{SelectedSection.appBackgroundColor}}<br />
          <b>Section Background Color: </b>{{SelectedSection.sectionBackgroundColor}}<br />
        </div> -->
        <!-- <p v-if="SelectedSectionCategoryData"><b>Category = {{SelectedSectionCategoryData[0].category}}</b></p> -->
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, onMounted, onUpdated} from 'vue'
import { json } from 'body-parser'

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
    const SearchString = computed(() => { return store.getters['storage/searchString']})
    var imagePos = 1 //gallery image pos


    //lifecycle hooks
    onMounted(() => {
        //debugging
        console.log("sectionData mounted")

        //update elements
        updateGraphics()
    })
    
    onUpdated(() => {
        //debugging
        console.log("sectionData updated")
        
        //elements
        let searchBarText = document.getElementById("searchBarInput")

        //variables
        imagePos = 1

        //update elements
        showFirstGalleryImage()
        updateGraphics()
        if (searchBarText != null) { searchBarText.value = SearchString.value }
        window.scrollTo(0,0) //scroll window to top
    })
    

    //functions
    function showNextGalleryImage() 
    {
      //elements
      let galleryImages = document.getElementsByClassName("galleryImage")

      //set image position
      if (imagePos < galleryImages.length) { imagePos++ }
      else { imagePos = 1 }

      //display correct gallery image
      for(let c = 1; c <= galleryImages.length; c++)
      {
        let setDisplayedImage = document.getElementById("galleryImage#" + c)

        if (c == imagePos) { setDisplayedImage.style.display = "block" }
        else { setDisplayedImage.style.display = "none" }
      }
    }


    function showPreviousGalleryImage()
    {
      //elements
      let galleryImages = document.getElementsByClassName("galleryImage")
      
      //set image position
      if (imagePos > 1) { imagePos-- }
      else { imagePos = galleryImages.length }

      //display correct gallery image
      for(let c = 1; c <= galleryImages.length; c++)
      {
        let setDisplayedImage = document.getElementById("galleryImage#" + c)

        if (c == imagePos) { setDisplayedImage.style.display = "block" }
        else { setDisplayedImage.style.display = "none" }
      }
    }


    function showFirstGalleryImage() 
    {
      // var galleryImages = document.getElementsByClassName("galleryImage")
      
      // for(var c = 1; c <= galleryImages.length; c++)
      // {
      //   var setDisplayedImage = document.getElementById("galleryImage#" + c)

      //   if (c == 1)
      //   {
      //     setDisplayedImage.style.display = "block"
      //   }
      //   else 
      //   {
      //     setDisplayedImage.style.display = "none"
      //   }
      // }
    }


    function updateGraphics()
    {
      //debugging
      console.log(SelectedSection.value)

      //variables
      let sectionBackgroundColor = SelectedSection.value.appBackgroundColor
      let sectionBarColor = SelectedSection.value.sectionBackgroundColor
      let defaultColor = "white"
      let sections = Sections.value.sections
      let selectedSectionPos = SelectedSection.value.pos
      let selectedCategoryTitle = null
      let selectedSectionCategories = SelectedSectionCategories.value
      let selectedCategoryData = SelectedSectionCategoryData.value
      let selectedSectionBackgroundColor = SelectedSection.value.appBackgroundColor
      
      //elements
      let appBackground = document.getElementById("app")
      let sectionsBackground = document.getElementById("Sections")
      let body = document.body
      
      //set default colors
      body.style.backgroundColor = defaultColor
      appBackground.style.backgroundColor = defaultColor
      sectionsBackground = document.getElementById("Sections")
      sectionsBackground.style.backgroundColor = "white"

      //update elements
      if (sectionBackgroundColor) 
      {
        body.style.backgroundColor = selectedSectionBackgroundColor
        appBackground.style.backgroundColor = selectedSectionBackgroundColor
      }
      
      if (sectionBarColor) { sectionsBackground.style.backgroundColor = sectionBarColor }

      //update opacity of section buttons
      // for(let c in sections)
      // {
      //   let sectionButton = document.getElementById("section#" + c)
      //   let sectionPos = ""
        
      //   if(c < 10) { sectionPos = sectionButton.id.substr(-1) }
      //   else if(c >= 10 && c < 100) { sectionPos = sectionButton.id.substr(-2) }
      //   else if(c >= 100 && c < 1000) { sectionPos = sectionButton.id.substr(-3) }
        
      //   if (sectionPos == selectedSectionPos) { sectionButton.style.opacity = "100%" }
      //   else { sectionButton.style.opacity = "30%" }
      // }

      //update color of category buttons
      // for(let c in selectedCategoryData) { selectedCategoryTitle = selectedCategoryData[c].category }
      
      // for(let c in selectedSectionCategories)
      // {
      //   //elements
      //   let categoryButton = document.getElementById("category-" + c)

      //   //increment category id
      //   c++
        
      //   if (categoryButton.innerText == selectedCategoryTitle) { categoryButton.style.fontWeight = "bold"; categoryButton.scrollIntoView() }
      //   else { categoryButton.style.fontWeight = "normal" }
      // }
        
    }
        

    function preloadGalleryImages()
    {
      //debugging
      console.log("preloading images")
        
      //handle image data
      for (var v in Data.value.data)
      {
        //variables
        let galleryImagesData = Data.value.data[v].galleryImages
        
        //set image obj
        if (galleryImagesData != "null")
        {
          for (let image in galleryImagesData) { let tempImage = new Image().src=gi[image].image }
        }
      }
    }


    function sortRowPosition(data)
    {
      //handle data
      data = JSON.stringify(data)
      data = JSON.parse(data)
      
      //variables
      let dataArray = Object.entries(data)
      let newArray = []

      for(let item in dataArray)
      {
        let formattedItem = JSON.stringify(dataArray[item][1])

        try { formattedItem = JSON.parse(dataArray[item][1]); newArray.push(formattedItem) } 
        catch (error) { /* console.log(error) */ }

        //debugging
        //console.log(dataArray[item][1].split(",")[0])m)
        console.log(formattedItem.pos)
      }
      
      //sort by row position
      newArray.sort(function (a, b) { return a.pos - b.pos })

      //debugging
      // console.log(newArray)
      // console.table(newArray)

      //return value
      return newArray                                                             
    }

    
    //preload images
    preloadGalleryImages()


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
      showNextGalleryImage,
      showPreviousGalleryImage,
      sortRowPosition
    }   
  }
}
</script>


<style scoped>
  /*** scrollbars ***/
  ::-webkit-scrollbar { height: 4px; width: 0px; }
  ::-webkit-scrollbar-track { background: lightgray; }
  ::-webkit-scrollbar-thumb { background: black; }
  ::-webkit-scrollbar-thumb:hover { background: #555; }


  /*** ids ***/
  #sectionData { margin: 0px; padding: 0px; }
  #data { padding: 0px; user-select: none; border: 1px solid black; }
  #data-div { margin: 0px; padding: 0px; }
  #image-gallery-wrapper { margin: 0px; padding: 0px; }
  #image-gallery {
    display: inline-flex;
    margin: 0px;
    margin-top: 7px;
    padding-bottom: 3px;
    padding-left: 3px;
    padding-top: 3px;
    padding-right: 3px;
    /* width: auto; */
    max-width: 40vw;
    min-width: 40vw;
    height: 20vw;
    background-color: var(--ImageGalleryBackgroundColor);
    border: 1px solid black;
  }
  #arrowPreviousGalleryImage { display: flex; margin: 0px; align-items: center; color: gray; }
  #arrowNextGalleryImage { display: flex; margin: 0px; align-items: center; color: gray; }


  /*** classes ***/
  .data-text {
    margin: 0px;
    margin: auto;
    padding: 10px;
    width: 40vw;
    overflow-wrap: break-word;
    text-align: left;
    background-color: var(--DataBackgroundColor);
    /* border-bottom: 1px solid black;
    border-left: 1px solid  black;
    border-right: 1px solid black; */
    border-top: 1px solid black;
  }
  /* .data-text-singleline { padding-top: 4px; padding-bottom: 4px; border: 1px solid black; }  */
  /* .data-text-multiline { text-align: center; border-top: 1px solid black; border-bottom: 1px solid black; border: 1px solid black; }
  /* .data-text-listline { } */
  .data-text-timeline {
    padding-bottom: 20px;
    padding-left: 4px;
    padding-top: 20px;
    padding-right: 0px;
    border-bottom: 0px;
    border-left: 3px solid black;
    border-top: 0px;
    border-right: 0px;
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
    margin-top: 20%;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 3px;
    padding-top: 0px;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: top;
    color: var(--ImageGalleryArrowsColor);
    /* border: 1px solid black; */
  }
  .arrowsImageGalleryMobile { display: none; }
  .arrowsImageGallery:active { color: var(--activeLinkColor); }
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
  .listline-link a { text-decoration: none; color: black; }
  .listline-link a:active { color: var(--activeLinkColor); }
  .dataRow { width: auto; margin: 0px 0px 40px 0px; }
  .itemTitle { display: block; font-weight: bold; font-size: 19px; }
  .linklist-item { text-decoration: none; }
  .timeline-item { width: max-content; margin: auto; padding: 12px 0px 12px 0px; border-left: 3px solid black; }


  /*** mobile ***/
  @media screen and (max-width: 700px) {
    /* #sectionData { background-color: black; padding-top: 3px; padding-bottom: 3px; } */
    #image-gallery {
      margin: 0px;
      margin: auto;
      padding: 0px;
      height: 29vh;
      width: 86vw;
      background-color: var(--ImageGalleryBackgroundColor);
      border: 1px solid transparent;
    }

    .data-text { margin: 0px; margin: auto; width: 81vw;}
    .arrowsImageGallery { display: none; }
    .arrowsImageGalleryMobile {
      display: inline-block;
      margin: 0px;
      margin-bottom: 1px;
      padding: 0px;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-user-select: none;
      width: 47.5%;
      background-color: white;
      border: 1px solid black;
    }
    .arrowsImageGalleryMobile:active { background-color: var(--activeLinkColor); }
  }
</style>