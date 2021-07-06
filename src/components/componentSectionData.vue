<template>
  <!-- ### data ### -->
  <div id="sectionData">
    <div v-if="SelectedSectionCategoryData && SelectedSection" id="data">
        <div v-if="SelectedSection.title != 'index' && SelectedSection.title != 'search'"> <!-- check if section is not index or search -->
          
          <!-- image gallery -->
          <div id="image-gallery-wrapper" v-if="SelectedSectionCategoryData[0].galleryImages.length > 0"> <!-- check if category has image gallery -->
            
            <h1 id="arrowPreviousGalleryImage" class="arrowsImageGallery" v-on:click="showPreviousGalleryImage()">❮</h1> <!-- arrow previous gallery image -->
            
            <div id="image-gallery">
              <div class="galleryImageDiv" v-for="(image, itemObjKey) in SelectedSectionCategoryData[0].galleryImages.sort((a, b) => {return a.pos - b.pos})" v-bind:key="image.id">
                <img v-if="(itemObjKey + 1) == 1" v-bind:id="'galleryImage#' + (itemObjKey + 1)" class="galleryImage" v-bind:src="image.image" v-bind:title="image.description" /> <!--  + ' pos ' + image.pos --> <!-- 'image' + ' ' + (itemObjKey + 1) + ' of ' + SelectedSectionCategoryData[0].galleryImages.length -->
                <img v-if="(itemObjKey + 1) != 1" v-bind:id="'galleryImage#' + (itemObjKey + 1)" class="galleryImage galleryImageHidden" v-bind:src="image.image" v-bind:title="image.description" />
              </div>
              <!-- <b>image description</b> -->
            
            </div>
            
            <h1 id="arrowNextGalleryImage" class="arrowsImageGallery" v-on:click="showNextGalleryImage()">❯</h1> <!-- arrow next gallery image -->
          
            <!-- mobile arrows -->
            <div id="mobile-arrows-image-gallery-wrapper" v-if="SelectedSectionCategoryData[0].galleryImages.length > 0">
              <h1 id="arrowPreviousGalleryImage" class="arrowsImageGalleryMobile" v-on:click="showPreviousGalleryImage()">❮</h1>
              <h1 id="arrowNextGalleryImage" class="arrowsImageGalleryMobile" v-on:click="showNextGalleryImage()">❯</h1>
            </div>

      </div>

        <!-- text data -->
        <div id="data-div" v-for="data in SelectedSectionCategoryData[0].obj.sort((a, b) => {return a.pos - b.pos})" v-bind:key="data.id">
            <div v-if="data.hidden == 'False'"> <!-- filter hidden data -->  

              <!-- text types -->
              <div v-for="o in Object.entries(data)" v-bind:key="o.id">
                <div v-if="
                  !o.toString().includes('pos') && 
                  !o.toString().includes('hidden') && 
                  !o.toString().includes('multiline') && 
                  !o.toString().includes('listline') && 
                  !o.toString().includes('timeline')"
                >
                  
                  <!-- timeline text -->
                  <div v-if="data.timeline == 'True'">
                      <div class="timeline-wrapper" v-for="li in o[1].toString().split(',')" v-bind:key="li.id">
                        <p class="data-text data-text-timeline" v-bind:id="'data-' + o[0]"><b>─ {{o.toString().split(",")[0]}} ➞</b> {{li}}</p> <!-- █ ─ -->
                      </div> <!-- messy string -->
                  </div>
                  
                  <!-- listline text -->
                  <div v-else-if="data.listline == 'True'">
                    <p class="data-text data-text-list" v-bind:id="'data-' + o[0]">
                      <b>{{o.toString().split(",")[0]}}</b>
                      <br />
                      <span v-for="li in o[1].toString().split(',')" v-bind:key="li.id">
                        <span class="listline-text" v-if="!li.includes('https://')">• {{li}}<br /></span>
                        <span class="listline-link" v-if="li.includes('https://')">• <a v-bind:href="li.split('>')[1]">{{li.split(">")[0]}}</a><br /></span>
                      </span> <!-- messy string -->
                    </p>
                  </div>

                  <!-- singleline text -->
                  <div v-else-if="data.multiline == 'False'">
                    <div v-for="o in Object.entries(data)" v-bind:key="o.id">
                      <p class="data-text data-text-singleline" v-bind:id="'data-' + o[0]" v-if="!o.toString().includes('pos') && !o.toString().includes('hidden') && !o.toString().includes('multiline') && !o.toString().includes('listline')">
                        <b>{{o.toString().split(",")[0]}}:</b> {{o.toString().split(",")[1]}} <!-- messy string -->
                      </p>
                    </div>
                  </div>

                  <!-- multiline text -->
                  <div v-else-if="data.multiline == 'True'">
                    <div v-for="o in Object.entries(data)" v-bind:key="o.id">
                      <p class="data-text data-text-multiline" v-bind:id="'data-' + o[0]" v-if="!o.toString().includes('pos') && !o.toString().includes('hidden') && !o.toString().includes('multiline') && !o.toString().includes('listline')">
                        <b>{{o.toString().split(",")[0]}}</b>
                        <br />{{o.toString().split(",")[1]}} <!-- messy string -->
                      </p>
                    </div>
                  </div>

                </div>
              </div>


            </div>
         </div>

      </div>
    </div>

    <!-- debugging -->
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
    const SearchString = computed(() => { return store.getters['storage/searchString']})
    
        
    //lifecycle hooks
    onMounted(() => {
        console.log("sectionData mounted")

        //update visuals of elements
        updateGraphics()
    })
    
    onUpdated(() => {
        console.log("sectionData updated")
        
        //update visuals of elements
        updateGraphics()

        //set last searched text to search bar
        var searchBarText = document.getElementById("searchBarInput")
        if (searchBarText != null)
        {
          searchBarText.value = SearchString.value
        }
        
        //scroll window to top
        window.scrollTo(0,0)     
    })
    
    //variables
    var imagePos = 1 //gallery image pos

    //functions
    function showNextGalleryImage() {
      //variables
      var galleryImages = document.getElementsByClassName("galleryImage")

      //set ImagePos
      if (imagePos < galleryImages.length)
      {
        imagePos++
      }
      else 
      {
        imagePos = 1
      }

      //display correct gallery image
      for(var c = 1; c <= galleryImages.length; c++)
      {
        var setDisplayedImage = document.getElementById("galleryImage#" + c)

        if (c == imagePos)
        {
          setDisplayedImage.style.display = "block"
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
      
      //set ImagePos
      if (imagePos > 1)
      {
        imagePos--
      }
      else 
      {
        imagePos = galleryImages.length
      }

      //display correct gallery image
      for(var c = 1; c <= galleryImages.length; c++)
      {
        var setDisplayedImage = document.getElementById("galleryImage#" + c)

        if (c == imagePos)
        {
          setDisplayedImage.style.display = "block"
        }
        else 
        {
          setDisplayedImage.style.display = "none"
        }

      }
    }

    function updateGraphics()
    {
        //update app background color
        if (SelectedSection.value.appBackgroundColor)
        {
          var appBackground = document.getElementById("app")
          var sectionsBackground = document.getElementById("Sections")

          //set body background
          var b = document.body
          b.style.backgroundColor = SelectedSection.value.appBackgroundColor

          //set specified data background color
          appBackground.style.backgroundColor = SelectedSection.value.appBackgroundColor

          //set sections sidenav backgroundcolor
          if (SelectedSection.value.sectionBackgroundColor)
          {
            sectionsBackground.style.backgroundColor = SelectedSection.value.sectionBackgroundColor
          }
          
        }
        else
        {
          //variables
          var defaultColor = "white"
          
          //set body background
          var b = document.body
          b.style.backgroundColor = defaultColor

          //set default app background color
          var appBackground = document.getElementById("app")
          appBackground.style.backgroundColor = defaultColor
        
          //set default section background color
          var sectionsBackground = document.getElementById("Sections")
          sectionsBackground.style.backgroundColor = "white"
          
        }

        //update opacity of section buttons
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
        
        for (var c in selectedSectionCategories)
        {
          c++ // category ids start 1
          var categoryButton = document.getElementById("category-" + c)

          if (categoryButton.innerText == selectedCategoryTitle)
          {
            categoryButton.style.fontWeight = "bold"
          }
          else
          {
            categoryButton.style.fontWeight = "normal"
          }
          
        }
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
      showNextGalleryImage,
      showPreviousGalleryImage,
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
    margin: 0px;
    padding: 0px;
    /* border: 1px solid black; */
  }

  #data {
    margin: 0px;
    padding: 0px;
    /* border: 1px solid black;   */
  }

  .data-text {
    margin: 0px;
    margin: auto;
    padding: 10px;
    width: 40vw;
    overflow-wrap: break-word;
    text-align: left;
    background-color: white;
    /* border-bottom: 1px solid black;
    border-left: 1px solid  black;
    border-right: 1px solid black; */
    border-top: 1px solid black;
  }

  
  /* .data-text-singleline
  { */
    /* padding-top: 4px;
    padding-bottom: 4px; */
    /* border: 1px solid black; */ /*
  } */

  /* .data-text-multiline
  { */
    /* text-align: center; */
    /* border-top: 1px solid black;
    border-bottom: 1px solid black; */
    /* border: 1px solid black; */ /*
  } */

  /* .data-text-listline {

  } */

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

  #data-div {
    margin: 0px;
    padding: 0px;
    /* border: 1px solid black; */
  }

  #image-gallery-wrapper {
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
    width: 40vw;
    height: 20vw;
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
    color: black;
    /* border: 1px solid black; */
  }

  .arrowsImageGalleryMobile {
    display: none;
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

  .listline-link a {
    text-decoration: none;
    color: black;
  }

  .listline-link a:active {
    color: lightgreen;
  }

  /* mobile styling */
  @media screen and (max-width: 700px) {
    /* #sectionData {
      /* background-color: black;
      padding-top: 3px;
      padding-bottom: 3px; */ /*
    } */

    .data-text {
      margin: 0px;
      margin: auto;
      width: 81vw;
    }

    #image-gallery {
      margin: 0px;
      margin: auto;
      padding: 0px;
      height: 29vh;
      width: 86vw;
      background-color: black;
      border: 1px solid transparent;
    }

    .arrowsImageGallery {
      display: none;
    }

    .arrowsImageGalleryMobile {
      display: inline-block;
      margin: 0px;
      margin-top: 7px;
      margin-bottom: 11px;
      padding: 0px;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-user-select: none;
      width: 20vw;
      background-color: white;
      border: 1px solid black;
    }

    .arrowsImageGalleryMobile:active {
      background-color: lightgreen;
    }
  }
</style>
