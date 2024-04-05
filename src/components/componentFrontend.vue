<template>
    <div id="componentFrontend">
        <!-- router -->
        <div hidden id="routerCurrentPathElement" v-if="router">{{router.currentRoute.value.fullPath}}</div>
        

        <!-- sections nav bar -->
        <div id="frontendSections">
            <div id="frontendSectionsList">
                <div id="buttonStart" class="section" v-on:click="setRoutePath('start')">ㅤ</div>
                <div id="buttonSelectSections" class="section" v-on:click="loadSectionNavigatorModal()">ㅤ</div>
                <div id="buttonAbout" class="section" v-on:click="loadAboutModal()">ㅤ</div>
                <div id="buttonFullscreen" class="section" v-on:click="fullscreen()"></div>
                <div id="buttonSearch" class="section" v-on:click="loadSearchModal()">ㅤ</div>
                <div id="buttonSlideshowMode" class="section" v-on:click="slideshowMode()"></div>
            </div>
        </div>


        <!-- category underlay -->
        <div id="categoryUnderlay" v-on:click="categoryUnderlaySetOpacity('0.49')"></div>


        <!-- category title -->
        <div id="frontendCategories" v-if="frontendCategories">
            <div hidden>{{frontendCategoriesTotalCategories = sortFrontendCategories(frontendCategories).length}}</div>

            <div id="selectedCategoryTitle" v-if="frontendCategoriesTotalCategories == 1"></div>
            <div id="selectedCategoryTitle" v-else v-on:click.left="loadCategoryNavigatorModal()"></div>
        </div>


        <!-- data -->
        <div id="frontendData">

            <!-- rows -->
            <div id="frontendDataRows">
                <div v-bind:id="'data' + data.pos" v-for="data in sortFrontendDataSelected(frontendDataSelected)">
                    
                    <!-- multiline -->
                    <div class="dataMultiline" v-if="data.type == 'multiline' && data.hidden == 'false'">
                        
                        <!-- title -->
                        <div id="frontendDataTitleMultiline" class="frontendDataTitle">{{data.title}}</div>

                        <!-- data -->
                        <div class="frontendDataData" v-for="item in loadDataData(data)">
                            <div class="multiline">{{item.text}}</div>
                        </div>
                    </div>
                    
                    <!-- singleline -->
                    <div class="dataSingleline" v-else-if="data.type == 'singleline' && data.hidden == 'false'">
                        
                        <!-- variables -->
                        <div hidden>{{singlelineData = loadDataData(data)}}</div>

                        <!-- title -->
                        <div id="frontendDataTitleSingleline" class="frontendDataTitle">{{data.title}}</div>

                        <!-- data -->
                        <div class="singleline frontendDataData" v-if="singlelineData != ''">{{singlelineData}}</div>
                    </div>

                    <!-- timeline -->
                    <div class="dataTimeline" v-else-if="data.type == 'timeline' && data.hidden == 'false'">
                        
                        <!-- variables -->
                        <div hidden>{{timelineData = loadDataData(data)}}</div>

                        <!-- title -->
                        <div id="frontendDataTitleTimeline" class="frontendDataTitle">{{data.title}}</div>
                        
                        <!-- data -->
                        <div class="timelineDataObj frontendDataData" v-if="timelineData != ''" v-for="item in timelineData">
                            <div class="timeline">
                                <span class="timelineYear">━━  {{item.year}}  ━━ </span>
                                <span class="timelineText">  {{item.text}}</span>
                            </div>
                        </div>
                    </div>

                    <!-- linklist -->
                    <div class="dataLinklist" v-else-if="data.type == 'linklist' && data.hidden == 'false'">
                        
                        <!-- title -->
                        <div id="frontendDataTitleLinklist" class="frontendDataTitle">{{data.title}}</div>

                        <!-- data -->
                        <div class="frontendDataData linklistContainer" v-for="item in loadDataData(data)">
                            <p class="linklist" v-bind:href="item.link" v-on:click="loadLinkListUrl(item.link)">➡⠀{{item.text}}</p>
                        </div>
                    </div>

                    <!-- textlist -->
                    <div class="dataTextlist" v-else-if="data.type == 'textlist' && data.hidden == 'false'">
                        
                        <!-- title -->
                        <div id="frontendDataTitleTextlist" class="frontendDataTitle">{{data.title}}</div>

                        <!-- data -->
                        <div class="frontendDataData textlistContainer" v-for="item in loadDataData(data)">
                            <div class="textlist">•⠀{{item.text}}</div>
                        </div>
                    </div>

                    <!-- galleryImages -->
                    <div class="imageGallery" v-else-if="data.type == 'galleryImages' && data.hidden == 'false'">
                        
                        <!-- variables -->
                        <div hidden>{{galleryData = loadDataData(data)}}</div>
                        <div hidden>{{firstGalleryImage = loadDataData(data)[0]}}</div>
                        <div hidden>{{totalImgs = galleryData.length}}</div>

                        <!-- title -->
                        <div id="frontendDataTitleImageGallery" class="frontendDataTitle" v-if="data.title != ''">{{data.title}}</div>

                        <!-- image -->
                        <div class="frontendDataData" v-if="firstGalleryImage">
                            <p v-bind:id="'galleryImagePos#' + data.pos" class="galleryImagePos">{{firstGalleryImage.pos}}/{{totalImgs}}</p>
                            <img v-bind:id="'imageGallery#' + data.pos" class="galleryImageSource" v-bind:src='firstGalleryImage.image' v-bind:alt='(firstGalleryImage.pos - 1)' v-on:click.left="nextImageGalleryItem(data.pos, data.data)" v-on:click.right="previousImageGalleryItem(data.pos, data.data)" />
                            <p v-bind:id="'galleryImageDescription#' + data.pos" class="galleryImageDescription" v-if="totalImgs == 1 && firstGalleryImage.description == ''"></p>
                            <p v-bind:id="'galleryImageDescription#' + data.pos" class="galleryImageDescription" v-else-if="totalImgs == 1 && firstGalleryImage.description != ''">{{firstGalleryImage.description}}</p>
                            <p v-bind:id="'galleryImageDescription#' + data.pos" class="galleryImageDescription" v-else>{{firstGalleryImage.pos}}/{{totalImgs}} · {{firstGalleryImage.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- extra page: start -->
        <div id="pageStart" class="extraPage">
            <!-- title -->
            <div id="pageStartTitle" v-if="frontendSettings">{{frontendSettings.pageStartTitle}}</div>

            <!-- text -->
            <div id="pageStartText" v-if="frontendSettings">{{frontendSettings.pageStartText}}</div>
        </div>


        <!-- extra page: end -->
        <div id="pageEnd" class="extraPage">
            <div id="pageEndTitle" v-if="frontendSettings">{{frontendSettings.pageEndTitle}}</div>
            <div id="pageEndText" v-if="frontendSettings">{{frontendSettings.pageEndText}}</div>            
        </div>


        <!-- modal: underlay -->
        <div id="underlayModal" v-on:click="undisplayModals()">
        </div>
        

        <!-- modal: navigator sections -->
        <div id="sectionNavigatorModal" v-if="frontendSections">
            <!-- title -->
            <p class="navigatorModalTitle">Sections</p>
            <!-- <p class="navigatorModalTitle">{{capitalizeString(router.currentRoute.value.params.domain)}}</p> -->

            <!-- sections -->
            <div class="sectionNavigatorModalItems">
                <div id="" class="selectSectionContainer" v-for="(item, index) in sortFrontendSections(frontendSections)">
                    <div v-if="item.hidden == 'false'" class="selectSection" v-on:click="setRoutePath(item.title)">{{item.title}}</div>
                </div>
                
                <!-- <p id="selectedSectionPageEnd" class="selectSection" v-on:click="setRoutePath('end')">End</p> -->
            </div>
        </div>


        <!-- modal: navigator categories -->
        <div id="categoryNavigatorModal" v-if="frontendCategories">

            <!-- variables -->
            <div hidden>{{categoryNavigatorModalTitleObj = sortFrontendCategories(frontendCategories)[0]}}</div>

            <!-- title -->
            <p class="navigatorModalTitle" v-if="categoryNavigatorModalTitleObj">{{categoryNavigatorModalTitleObj.section}}</p>
            <p class="navigatorModalTitle" v-else>Categories</p>
            
            <!-- categories -->
            <div class="categoryNavigatorModalItems">
                <div id="" class="categoryContainer" v-for="(item, index) in sortFrontendCategories(frontendCategories)">
                    <div id="" v-if="item.hidden == 'false'" class="category" v-on:click="setRoutePath(item.section + '/' + item.title)">
                        {{item.title}}
                    </div>
                </div>
            </div>
        </div>


        <!-- modal: about -->
        <div id="aboutModal" v-if="frontendSettings">
        
            <!-- about -->
            <div id="infoAboutText">
                <p id="infoAboutTitle" class="modalTitle">About</p>
                <p id="aboutText" class="infoItem">{{frontendSettings.buttonAboutText}}</p>
            </div>
            
            <!-- contact -->
            <div id="infoContactDetails" v-if="frontendContact">
                <p id="infoContactTitle" class="modalTitle">Contact</p>

                <div id="contactEmail" class="contactCategory" v-if="frontendContact.email">
                    <img src="/images/icons/iconContactEmail.png" class="contactDetailThumbnail" />
                    <p class="contactDetailText">{{frontendContact.email}}</p>
                </div>

                <div id="contactName" class="contactCategory" v-if="frontendContact.name">
                    <img src="/images/icons/iconContactName.png" class="contactDetailThumbnail" />
                    <p class="contactDetailText">{{frontendContact.name}}</p>
                </div>
                
                <div id="contactPhone" class="contactCategory" v-if="frontendContact.phone">
                    <img src="/images/icons/iconContactPhone.png" class="contactDetailThumbnail" />
                    <p class="contactDetailText">{{frontendContact.phone}}</p>
                </div>
                
                <div id="contactCountry" class="contactCategory" v-if="frontendContact.country">
                    <img src="/images/icons/iconContactCountry.png" class="contactDetailThumbnail" />
                    <p class="contactDetailText">{{frontendContact.country}}</p>
                </div>
            </div>

            <!-- bindings -->
            <div id="infoBindings">

                <!-- keybinds -->
                <p id="infoKeybindsTitle" class="modalTitle">Keybinds</p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindName">⬆</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Prev Category</span>
                </p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindName">⬇</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Next Category</span>
                </p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindName">⬅</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Prev Section</span>
                </p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindName">➡</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Next Section</span>
                </p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindName">§</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Search</span>
                </p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindNameNotSingleKey">Shift + S</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Sections</span>
                </p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindNameNotSingleKey">Shift + C</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Categories</span>
                </p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindNameNotSingleKey">Shift + F</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Fullscreen</span>
                </p>
                <p class="infoItemKeybind">
                    <span class="infoItemKeybindNameNotSingleKey">Esc</span>
                    <span class="dotKeybindItem">·</span>
                    <span class="infoItemKeybindDescription">Close Windows</span>
                </p>

                <!-- mousebinds -->
                <p id="infoMousebindsTitle" class="modalTitle">Mousebinds</p>
                <p class="infoItemMousebind">
                    <span class="infoItemMousebindName">Click Scroll</span>
                    <span class="dotMousebindItem">·</span>
                    <span class="infoItemMousebindDescription">Slideshow</span>
                </p>
                <p class="infoItemMousebind">
                    <span class="infoItemMousebindName">Click Side 1</span>
                    <span class="dotMousebindItem">·</span>
                    <span class="infoItemMousebindDescription">Next Slide</span>
                </p>
                <p class="infoItemMousebind">
                    <span class="infoItemMousebindName">Click Side 2</span>
                    <span class="dotMousebindItem">·</span>
                    <span class="infoItemMousebindDescription">Prev Slide</span>
                </p>
            </div>
            
            <!-- slideshow mode -->
            <div id="infoSlideshowMode" v-if="frontendSettings.modeSlideshow == 'true'">
                <p id="infoSlideshowModeTitle" class="modalTitle">Slideshow Mode</p>
                <p id="aboutText" class="infoItem">Rotate screen to activate</p>
            </div>
        </div>


        <!-- modal: password protected -->
        <div id="sitePasswordProtectedModal">
            
            <!-- enter password -->
            <input hidden id="passwordProtectedDomainName" value="" />
            <input id="passwordProtectedPasswordInput" type="password" placeholder="Enter Password..." @keyup.enter="fetchProtectedDomain()" />

            <!-- confirm password -->
            <input id="passwordProtectedPasswordButton" type="button" value="Enter" v-on:click="fetchProtectedDomain()" />
            
            <!-- status message -->
            <p id="passwordProtectedStatusMessage">Status Message</p>
        </div>


        <!-- modal: loading screen -->
        <div id="loadingScreen">
            <img src="/images/loadingAnimation.gif" />
        </div>


        <!-- modal: search -->
        <div id="searchModal">

            <!-- search result categories -->
            <div id="searchModalHitsCategories" v-if="frontendSearchResults">
                
                <!-- all -->
                <div id="searchHitCategoryAll" class="searchHitCategory" v-on:click="selectSearchHitsCategory('all')">
                    All ({{frontendSearchResults.length}})
                </div>
                
                <div class="dotSearchCategory"> · </div>

                <!-- images -->
                <div id="searchHitCategoryImages" class="searchHitCategory" v-on:click="selectSearchHitsCategory('images')">
                    Images ({{filterSearchResults('images', frontendSearchResults).length}})
                </div>
                
                <div class="dotSearchCategory"> · </div>

                <!-- texts -->
                <div id="searchHitCategoryTexts" class="searchHitCategory" v-on:click="selectSearchHitsCategory('texts')">
                    Others ({{filterSearchResults('texts', frontendSearchResults).length}})
                </div>
                
                <div class="dotSearchCategory"> · </div>

                <!-- sections -->
                <div id="searchHitCategorySections" class="searchHitCategory" v-on:click="selectSearchHitsCategory('sections')">
                    Sections ({{filterSearchResults('sections', frontendSearchResults).length}})
                </div>
                
                <div class="dotSearchCategory"> · </div>

                <!-- categories -->
                <div id="searchHitCategoryCategories" class="searchHitCategory" v-on:click="selectSearchHitsCategory('categories')">
                    Categories ({{filterSearchResults('categories', frontendSearchResults).length}})
                </div>
            </div>

            <!-- search input -->
            <input id="searchModalInput" type="text" placholder="..." @keyup.enter="setSearchPath()" maxlength="40" />

            <!-- search result items -->
            <div id="searchModalResults" v-if="frontendSearchResults">
                <div v-bind:id="'searchResultItem#' + (index + 1)" class="" v-for="(item, index) in frontendSearchResults">
                    
                    <!-- section -->
                    <div class="searchResultSection searchResultItem" v-if="item.searchResultType == 'section'" v-on:click="setRoutePath(item.title)">
                        <span class="searchResultDataType">section</span>
                        <span class="dotSearchItem"> · </span>
                        <span>{{item.title}}</span> <!-- • -->
                    </div>

                    <!-- category -->
                    <div class="searchResultCategory searchResultItem" v-else-if="item.searchResultType == 'category'" v-on:click="setRoutePath(item.section + '/' + item.title)">
                        <span class="searchResultDataType">category</span>
                        <span class="dotSearchItem"> · </span>
                        <span>{{item.title}}</span>
                        <span class="dotSearchItem"> · in {{item.section}} </span>
                    </div>
                    
                    <!-- text -->
                    <div class="searchResultData searchResultItem" v-else-if="item.searchResultType == 'text' && item.text" v-on:click="setRoutePath(item.section + '/' + item.category + '@row' + item.divId + '-item' + item.pos, item)">
                        <div class="searchResultDataText">
                            <span class="searchResultDataType" v-if="item.dataType == 'linklist'">link</span>
                            <span class="searchResultDataType" v-else-if="item.dataType == 'textlist'">item</span>
                            <span class="searchResultDataType" v-else-if="item.dataType == 'timeline'">timeline</span>
                            <span class="searchResultDataType" v-else-if="item.dataType == 'singleline'">text</span>
                            <span class="searchResultDataType" v-else-if="item.dataType == 'multiline'">text</span>
                            <span class="dotSearchItem">·</span> 
                            <span>{{item.text}}</span>
                        </div>
                    </div>

                    <!-- image -->
                    <div class="searchResultImage searchResultItem" v-else-if="item.searchResultType == 'image' && item.description" v-on:click="setRoutePath(item.section + '/' + item.category + '@row' + item.divId + '-image' + item.pos, item)">
                        <img class="searchResultDataImage" v-bind:src="item.image" />
                        <div class="searchResultDataDescription">{{item.description}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal: slideshow mode -->
        <div id="slideshowModal">
            <p hidden id="" v-if="frontendSlideshowPage">hidden: {{frontendSlideshowPage.hidden}}</p>
            <p hidden id="" v-if="frontendSlideshowPage">type: {{frontendSlideshowPage.type}}</p>
            
            <!-- slideshow current page -->
            <p id="slidesCurrentPageNumber"></p>

            <!-- slideshow page title -->
            <p id="slideshowSectionStart" v-if="frontendSlideshowPage && frontendSlideshowPage.type == 'slideshowStart'">{{frontendSlideshowPage.title}}</p>
            <p id="slideshowSectionStart" v-else-if="frontendSlideshowPage && frontendSlideshowPage.type == 'slideshowEnd'">{{frontendSlideshowPage.title}}</p>
            <p id="slideshowSectionStart" v-else-if="frontendSlideshowPage && frontendSlideshowPage.type == 'sectionStart'">{{frontendSlideshowPage.pos}}. {{frontendSlideshowPage.title}}</p>
            <p id="slideshowTitle" v-else-if="frontendSlideshowPage && frontendSlideshowPage.title != ''">{{frontendSlideshowPage.title}}</p>
            <p id="slideshowTitle" v-else-if="frontendSlideshowPage && frontendSlideshowPage.title == '' && frontendSlideshowPage.type == 'timeline'">Timeline</p>
            <p id="slideshowTitle" v-else-if="frontendSlideshowPage && frontendSlideshowPage.title == '' && frontendSlideshowPage.type == 'galleryImages'">&#8203;</p> <!-- {{frontendSlideshowPage.category}} -->
            <p id="slideshowTitle" v-else-if="frontendSlideshowPage && frontendSlideshowPage.title == ''">&#8203;</p>

            <!-- slideshow page data -->
            <div id="slideshowData">
                <div id="" class="" v-if="frontendSlideshowPage && frontendSlideshowPage.hidden == 'true'"></div>
                <div id="" class="slideshowStartText" v-else-if="frontendSlideshowPage && frontendSlideshowPage.type == 'slideshowStart'">{{frontendSlideshowPage.data}}</div>
                <div id="" class="slideshowEndText" v-else-if="frontendSlideshowPage && frontendSlideshowPage.type == 'slideshowEnd'">{{frontendSlideshowPage.data}}</div>
                <div id="" class="" v-else-if="frontendSlideshowPage && frontendSlideshowPage.type == 'sectionStart'"></div>
                
                <div id="" class="slideshowSingleline" v-else-if="frontendSlideshowPage && frontendSlideshowPage.type == 'singleline'">{{frontendSlideshowPage.data}}</div>
                
                <div id="" class="" v-else-if="frontendSlideshowPage && frontendSlideshowPage.type != 'singleline' && frontendSlideshowPage.type != 'galleryImages'" v-for="row in JSON.parse(frontendSlideshowPage.data)">
                    <div id="" class="slideshowDataItem">
                        <!-- mutliline -->
                        <div id="" v-if="frontendSlideshowPage.type == 'multiline'">
                            <div class="slideshowItemMultiline">{{row.text}}</div>
                        </div>
    
                        <!-- textlist -->
                        <div id="" v-else-if="frontendSlideshowPage.type == 'textlist'">
                            <div class="slideshowItemTextlist"> • {{row.text}}</div>
                        </div>
                        
                        <!-- linklist -->
                        <div id="" class="slideshowItemLinklist" v-else-if="frontendSlideshowPage.type == 'linklist'">
                            <div class="slideshowItemLinklistText" v-if="row.text">{{row.text}}</div>
                            <div class="slideshowItemLinklistLink" v-if="row.link && row.link.includes('://')">• {{row.link.replaceAll("https://", "").replaceAll("http", "").replaceAll("www.", "")}}</div>
                            <div class="slideshowItemLinklistLink" v-else></div>
                        </div>
    
                        <!-- timeline -->
                        <div id="" class="slideshowItemTimeline" v-else-if="frontendSlideshowPage.type == 'timeline'">
                            <div class="slideshowItemTimelineYear">{{row.year}}</div>
                            <div class="slideshowItemTimelineText">{{row.text}}</div>
                        </div>
                    </div>
                </div>

                <!-- gallery images -->
                <div id="" v-else-if="frontendSlideshowPage && frontendSlideshowPage.type == 'galleryImages'">
                    <div hidden>{{slideshowImageObjectData = JSON.parse(frontendSlideshowPage.data)}}</div>
                    
                    <img class="slideshowImage" v-bind:src="slideshowImageObjectData.image" />
                    <p class="slideshowImageDescription">{{slideshowImageObjectData.description}}</p>
                </div>
            </div>
        </div>


        <!-- mobile only -->
        <div id="mobilePortraitExitSlideshow" v-on:click="slideshowModeExit()">
            <p id="mobilePortraitExitSlideshowText" v-on:click="">Press to Exit</p>
        </div>

        <div id="mobileLandscapeStartSlideshow">
            <p id="mobileLandscapeStartSlideshowText" v-on:click="slideshowMode()">Press to Start</p>
        </div>

        <div id="mobileLandscapeNavArrows">
            <div id="mobileLandscapePreviousSlide" v-on:click="slideshowModePrevious()">➡</div>
            <div id="mobileLandscapeNextSlide" v-on:click="slideshowModeNext()">➡</div>
        </div>

        <div id="mobileExitSlideshow" v-on:click="slideshowModeExit()">•</div>
    </div>
</template>


<script>
import {useStore} from 'vuex'
import {computed, onMounted, onUpdated, toRaw} from 'vue'
import {useRouter} from 'vue-router'
import configs from '/configs.json'

export default {
  setup() {

    //vue
    const store = useStore()
    const router = useRouter()


    //variables
    const BACKEND_API = configs.REST_API || "http://127.0.0.1:8000"
    const frontendSections = computed(() => { return store.getters['storage/frontendSections']})
    const frontendCategories = computed(() => { return store.getters['storage/frontendCategories']})
    const frontendData = computed(() => { return store.getters['storage/frontendData']})
    const frontendDataSelected = computed(() => { return store.getters['storage/frontendDataSelected']})
    const frontendSettings = computed(() => { return store.getters['storage/frontendSettings']})
    const frontendContact = computed(() => { return store.getters['storage/frontendContact']})
    const frontendSearchResults = computed(() => { return store.getters['storage/frontendSearchResults']})
    const frontendSearchString = computed(() => { return store.getters['storage/frontendSearchString']})
    const frontendSlideshowPage = computed(() => { return store.getters['storage/frontendSlideshowPage']})


    //globals
    var selectedCategory = ""
    var selectedSection = ""
    var selectedCategoryPos = ""
    var settings = ""
    var selectedElement = ""
    var slideshowModeActive = "false"
    var slidesCurrentPage = 0


    //lifecycle hook: on mounted
    onMounted(() => { 
        console.log("componentFrontend mounted")
        fetchDomain()
    })
    

    //lifecycle hook: on updated
    onUpdated(() => {
        console.log("componentFrontend updated")
        
        //variables
        let routeParams = router.currentRoute.value.params
        let routeCurrentPath = router.currentRoute.value.fullPath
        let routePreviousPath = router.options.history.state.back
        // let currentRouteString = router.currentRoute.value.fullPath
        // let routerCurrentPathElemkent = document.getElementById("routerCurrentPathElement").innerText

        //check slideshow status
        if(slideshowModeActive == "true") { slideshowModal.style.display = "block"; return }
        
        //load route
        if(routeCurrentPath != routePreviousPath) { handleRouting(routeParams) }
    })


    //event listener: keyboard
    document.addEventListener('keyup', function(e) { 
        
        //slideshow
        if(slideshowModeActive == "true")
        {
            if(e.code == "Escape") { slideshowModeExit() }
            else if(e.code == "ArrowRight") { slideshowModeNext() }
            else if(e.code == "ArrowLeft") { slideshowModePrevious() }
        }

        //standard
        else if(slideshowModeActive == "false")
        {
            //null check
            if(selectedElement == 'searchModal' && e.code == "Escape") { undisplayModals(); selectedElement = "" }
            else if(selectedElement == 'searchModal' && e.code != "Escape") { return }
    
            //single key
            if(e.code == "Escape") { undisplayModals() }
            else if(e.code == "ArrowDown") { loadNextCategory() }
            else if(e.code == "ArrowUp") { loadPreviousCategory() }
            else if(e.code == "ArrowLeft") { loadPreviousSection() }
            else if(e.code == "ArrowRight") { loadNextSection() }
            else if(e.key == "§") { loadSearchModal() }
            // else if(e.code == "KeyS") { loadSectionNavigatorModal() }
            
            //shift + key
            else if(e.shiftKey && e.code == "KeyF") { fullscreen() }
            else if(e.shiftKey && e.code == "KeyS") { loadSectionNavigatorModal() }
            else if(e.shiftKey && e.code == "KeyC") { loadCategoryNavigatorModal() }
            // else if(e.shiftKey && e.code == "ArrowRight") { }
            // else if(e.shiftKey && e.code == "ArrowLeft") { }
    
            //ctrl + key
            // else if(e.ctrlKey && e.code == "KeyF") { selectedElement = "" }
            // else if(e.shiftKey && e.code == "KeyS") { selectedElement = "" }
        }
    })
    

    //event listener: right click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault() //prevent default browser right click window
    })
    

    //event listener: mouse scroll
    document.addEventListener('wheel', function(e) {
        
        //elements 
        let searchModalHitsCategories = document.getElementById("searchModalHitsCategories")
        
        //categories horizontal scroll
        if (e.deltaY > 0) { if(searchModalHitsCategories != null) { searchModalHitsCategories.scrollLeft += 60 } }
        else { if(searchModalHitsCategories != null) { searchModalHitsCategories.scrollLeft -= 60 } }
    })


    //event listener: mouse click
    document.addEventListener('mouseup', function(e) {
        
        //clarification
        // e.button 0 = left click
        // e.button 1 = middle click
        // e.button 2 = right click
        // e.button 3 = side-back click
        // e.button 4 = side-front click

        //slideshow
        if(settings.modeSlideshow == "false") 
        { return }
        
        else if(slideshowModeActive == "true")
        {
            if(e.button == 1) { slideshowModeExit() }
            else if(e.button == 3) { e.preventDefault(); slideshowModePrevious() }
            else if(e.button == 4) { e.preventDefault(); slideshowModeNext() }  
        }

        //standard
        else if(slideshowModeActive == "false")
        {
            if(e.button == 1) { slideshowMode() }
        }
    })
    

    //functions
    async function fetchDomain()
    {   
        //variables
        let route = router.currentRoute.value.params
        let routeDomain = route.domain || ""
        let routeSection = route.section || ""
        let routeCategory = route.category || ""
        let obj = JSON.stringify({ "data": {"domain": routeDomain, "section": routeSection, "category": routeCategory }})
        
        //fetch specific domain data
        await fetch(BACKEND_API + "/domain-specific", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {

            //debugging
            // console.log(data)

            //fetch domain successful
            if(data.status == "fetch specific domain successful") 
            { 
                setDomainData(data).then(() => { generatePwaManifest()})
            }
            
            //domain is private
            else if(data.status == "domain is private") 
            {
                let lsAcc = localStorage.getItem("cms-account")
                let lsToken = localStorage.getItem("cms-token")
                let lsLastLogin = localStorage.getItem("cms-last-login")

                if(lsAcc != "" && lsToken != "" && lsLastLogin != "")
                {
                    fetchPrivateDomain(lsAcc, lsToken, lsLastLogin)
                }

            }

            //domain is password protected
            else if(data.status == "domain is password protected")
            {
                let sitePasswordProtectedModal = document.getElementById("sitePasswordProtectedModal")
                let passwordProtectedDomainName = document.getElementById("passwordProtectedDomainName")
                
                sitePasswordProtectedModal.style.display = "block"
                passwordProtectedDomainName.value = data.domainName
            }

            //fetch domain failed
            else if(data.status == "domain does not exist") { router.push("/") }
            
        })
    }


    function loadSectionCategories(data, routeSection, routeCategory)
    {   
        //null check
        if(data == null || data == undefined || data == "") { return }
        
        //elements
        let settingsCategoriesIcon = document.getElementById("settingsCategoriesIcon")
        let frontendData = document.getElementById("frontendData")
        let frontendCategoriesList = document.getElementById("frontendCategoriesList")
        let selectedSectionElement = document.getElementById("section#" + data.pos)
        let pageStart = document.getElementById("pageStart")
        let pageEnd = document.getElementById("pageEnd")

        //variables
        let arrayCategories = []
        let firstCategory = ""

        //set selected section
        selectedSection = data.title
        
        //set array categories
        for(let c in frontendCategories.value)
        {
            if(frontendCategories.value[c].section.toLowerCase() == data.title.toLowerCase()) 
            { arrayCategories.push(frontendCategories.value[c]) }
        }

        //set first category
        firstCategory = arrayCategories[0]

        //null check
        if(firstCategory == undefined) { return }
        else if(firstCategory == null) { return }
        else if(firstCategory == "") { return }
        
        //update elements
        if(frontendData) { frontendData.style.display = "none" }    
        if(settingsCategoriesIcon) { settingsCategoriesIcon.style.display = "block" }
        if(frontendCategoriesList) { frontendCategoriesList.scrollTo(0,0) }
        if(selectedSectionElement) { selectedSectionElement.style.opacity = "1" }
        if(pageStart) { pageStart.style.display = "none" }
        if(pageEnd) { pageEnd.style.display = "none" }
        // if(pageIndex) { pageIndex.style.display = "none" }

        //load categories
        if(routeSection != '' && routeCategory != '') loadCategoryData(routeSection, routeCategory, '')
        else { loadCategoryData(firstCategory.section , firstCategory.title, firstCategory.pos) }
        
    }


    function loadCategoryData(section, category, position)
    {   
        //elements
        let frontendDataElement = document.getElementById("frontendData")
        let addNewDataRow = document.getElementById("addNewDataRow")
        let selectedCategoryTitle = document.getElementById("selectedCategoryTitle")
        let frontendDataRows = document.getElementById("frontendDataRows")
        let categoryUnderlay = document.getElementById("categoryUnderlay")
        // let componentFrontend = document.getElementById("componentFrontend")
        // let selectCategoryElement = document.getElementById("category#" + position)
        // let categories = document.getElementsByClassName("category")
        
        //variables
        let arrayData = ""
        let selectedCategoryUnderlaySrc = ""
        let categoryTitleOriginal = ""
        let categoryExists = false

        //set globals
        selectedSection = section.toString().toLowerCase().replaceAll("-", " ")
        selectedCategory = category.toString().toLowerCase().replaceAll("-", " ")

        //check if category exists
        for(let item in frontendCategories.value)
        {
            let categoryTitle = frontendCategories.value[item].title.toString().toLowerCase()
            let categorySection = frontendCategories.value[item].section.toString().toLowerCase()

            if(selectedSection == categorySection && selectedCategory == categoryTitle) { categoryExists = true }
        }

        //null check
        if(categoryExists == false) { return }

        //set category values
        for(let item in frontendCategories.value)
        {
            let categoryTitle = frontendCategories.value[item].title.toString().toLowerCase()
            let categorySection = frontendCategories.value[item].section.toString().toLowerCase()

            if(selectedSection == categorySection && selectedCategory == categoryTitle)
            {   
                //set category pos
                selectedCategoryPos = frontendCategories.value[item].pos

                //set category title
                categoryTitleOriginal = frontendCategories.value[item].title

                //set category underlay src
                selectedCategoryUnderlaySrc = frontendCategories.value[item].backgroundImage
                
                //update elements
                if(selectedCategoryUnderlaySrc == undefined) { categoryUnderlay.style.backgroundImage = "none" }
                else if(selectedCategoryUnderlaySrc != undefined) { categoryUnderlay.style.backgroundImage = "url(" + selectedCategoryUnderlaySrc + ")" }
            }
        }

        //set category data
        for(let c in frontendData.value)
        {   
            let categorySection = frontendData.value[c].section.toString().toLowerCase()
            let categoryTitle = frontendData.value[c].category.toString().toLowerCase()

            if(selectedSection == categorySection && categoryTitle == selectedCategory) { arrayData = frontendData.value[c].rows } 
        }
        
        //update vuex
        store.dispatch('storage/actionSetFrontendDataSelected', arrayData)

        //update elements
        setTimeout(() => {
            selectedCategoryTitle = document.getElementById("selectedCategoryTitle")
            
            if(frontendDataElement) { frontendDataElement.style.display = "block" }
            if(addNewDataRow) { addNewDataRow.style.display = "block" }
            if(selectedCategoryTitle) { selectedCategoryTitle.innerText = category.replaceAll("-", " ") }
            if(frontendDataRows) { frontendDataRows.scrollTo(0,0) }
            if(categoryUnderlay) { categoryUnderlay.style.opacity = "0.49" }
            
            undisplayModals()
        }, 20)
    }


    function loadDataData(data)
    {
        //variables
        let value = ""

        //parse json
        try { data = JSON.parse(data) } 
        catch (error) { }
        
        //null check
        if(data.type == undefined) { value = "null" }

        //set data row text
        { 
            value = data.data
            value = value.replaceAll("'", "\"")
            
            if(data.type == "multiline") { value = JSON.parse(value) }
            else if(data.type == "timeline") { value = JSON.parse(value) }
            else if(data.type == "linklist") { value = JSON.parse(value) }
            else if(data.type == "textlist") { value = JSON.parse(value) }
            else if(data.type == "galleryImages") { value = JSON.parse(value) }
        }

        return value
    }   


    function sortFrontendDataSelected(data)
    {
        //variables
        let rows = []

        //add data rows to array
        for(let c in data) { rows.push(JSON.parse(data[c])) }

        //sort data rows by position
        rows = rows.sort((a, b) => { return a.pos - b.pos })

        //return value
        return rows
    }

    function sortFrontendDataSlideshow(data)
    {
        //sort data by section name
        let x = data.sort(function (x, y) {
            let a = x.section.toLowerCase(),
                b = y.section.toLowerCase();

            return a == b ? 0 : a > b ? 1 : -1;
        })

        return x
    }

    function sortFrontendDataRowsSlideshow(rows)
    {
        let sorted = []

        if(rows && rows.length == 1)
        {
            let r = JSON.parse(rows)

            sorted.push(r)
        }
        else if(rows && rows.length > 1)
        {
            for(let item in rows)
            {
                sorted.push(JSON.parse(rows[item]))
            }

            sorted = sorted.sort((a, b) => { return a.pos - b.pos })
        }

        return sorted
    }


    function sortFrontendCategories(data)
    {
        //variables
        let categories = []

        //add category data to array
        for(let c in data)
        {
            let sectionInData = data[c].section.toString().toLowerCase()
            let sectionSelected = selectedSection.toString().toLowerCase()

            if(sectionInData == sectionSelected) { categories.push(data[c]) }
        }

        //sort categories by position
        categories = categories.sort((a, b) => { return a.pos - b.pos })

        return categories
    }


    function sortFrontendSections(data)
    {
        //variables
        let sections = []

        //add section data to array
        for(let c in data)
        {
            sections.push(data[c])
        }

        //sort sections by position
        sections = sections.sort((a, b) => { return a.pos - b.pos })

        return sections
    }


    function firstLetterToUpperCase(value)
    {
        return value.toString().substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
    }


    function loadCategoryNavigatorModal()
    {
        //debugging
        // console.log("loadCategoryNavigatorModal")

        //elements
        let categoryNavigatorModal = document.getElementById("categoryNavigatorModal")
        let underlayModal = document.getElementById("underlayModal")
        
        //update elements
        if(categoryNavigatorModal.style.display == "none" || categoryNavigatorModal.style.display == "")
        {
            categoryNavigatorModal.style.display = "block"
            underlayModal.style.display = "block"
        }
        else if(categoryNavigatorModal.style.display == "block")
        {
            categoryNavigatorModal.style.display = "none"
            underlayModal.style.display = "none"
        }
    }


    function loadSectionNavigatorModal()
    {
        //debugging
        // console.log("loadSectionNavigatorModal")

        //elements
        let sectionNavigatorModal = document.getElementById("sectionNavigatorModal")
        let underlayModal = document.getElementById("underlayModal")
        
        //update elements
        if(sectionNavigatorModal.style.display == "none" || sectionNavigatorModal.style.display == "")
        {
            sectionNavigatorModal.style.display = "block"
            underlayModal.style.display = "block"
        }
        else if(sectionNavigatorModal.style.display == "block")
        {
            sectionNavigatorModal.style.display = "none"
            underlayModal.style.display = "none"
        }
    }


    function loadAboutModal()
    {
        //debugging
        // console.log("loadAboutModal")

        //elements
        let aboutModal = document.getElementById("aboutModal")
        let underlayModal = document.getElementById("underlayModal")
        
        //update elements
        if(aboutModal.style.display == "none" || aboutModal.style.display == "")
        {
            aboutModal.style.display = "block"
            underlayModal.style.display = "block"
        }
        else if(aboutModal.style.display == "block")
        {
            aboutModal.style.display = "none"
            underlayModal.style.display = "none"
        }
    }


    function undisplayModals()
    {
        //elements
        let underlayModal = document.getElementById("underlayModal")
        let categoryNavigatorModal = document.getElementById("categoryNavigatorModal")
        let sectionNavigatorModal = document.getElementById("sectionNavigatorModal")
        let aboutModal = document.getElementById("aboutModal")
        let mobileNavigatorModal = document.getElementById("mobileNavigatorModal")
        let searchModal = document.getElementById("searchModal")
        // let slideshowModal = document.getElementById("slideshowModal")

        //update elements
        if(underlayModal) { underlayModal.style.display = "none" }
        if(categoryNavigatorModal) { categoryNavigatorModal.style.display = "none" }
        if(aboutModal) { aboutModal.style.display = "none" }
        if(sectionNavigatorModal) { sectionNavigatorModal.style.display = "none" }
        if(mobileNavigatorModal) { mobileNavigatorModal.style.display = "none" }
        if(searchModal) { searchModal.style.display = "none" }
        // if(slideshowModal) { slideshowModal.style.display = "none" }
        document.documentElement.style.cursor = 'auto'
        selectedElement = ""
    }
    

    function loadNextCategory()
    {   
        //debugging
        // console.log("loadNextCategory")
        
        //null check
        if(frontendCategories.value == null) { return }
        if(router.currentRoute.value.params.section == "start") { return }
        else if(router.currentRoute.value.params.section == "end") { return }
        
        //variables
        let selectedSectionCategories = sortFrontendCategories(frontendCategories.value)
        let totalCategories = selectedSectionCategories.length
        let nextCategoryPos = ""
        let nextCategoryItem = ""
        let currentCategoryPos = ""

        //set next category data
        for(let item in selectedSectionCategories)
        {
            let sectionSelected = selectedSection.toLowerCase()
            let sectionInCategory = selectedSectionCategories[item].section.toLowerCase()

            if(sectionSelected == sectionInCategory && selectedSectionCategories[item].pos == selectedCategoryPos)
            {   
                //set variables
                currentCategoryPos = selectedSectionCategories[item].pos
                nextCategoryPos = parseInt(selectedCategoryPos)

                //check if last category
                if(nextCategoryPos == totalCategories) { nextCategoryPos = 0 }

                //set next category object
                nextCategoryItem = selectedSectionCategories[nextCategoryPos]
                
                //load next category route
                setRoutePath(nextCategoryItem.section + "/" + nextCategoryItem.title)    

                return
            }
        }
    }


    function loadPreviousCategory()
    {
        //debugging
        // console.log("loadPreviousCategory")

        //null check
        if(frontendCategories.value == null) { return }
        if(router.currentRoute.value.params.section == "start") { return }
        else if(router.currentRoute.value.params.section == "end") { return }
        
        //variables
        let selectedSectionCategories = sortFrontendCategories(frontendCategories.value)
        let totalCategories = selectedSectionCategories.length - 1
        let previousCategoryPos = ""
        let previousCategoryItem = ""
        let currentCategoryPos = ""

        //set previous category data
        for(let item in selectedSectionCategories)
        {
            let sectionSelected = selectedSection.toLowerCase()
            let sectionInCategory = selectedSectionCategories[item].section.toLowerCase()

            if(sectionSelected == sectionInCategory && selectedSectionCategories[item].pos == selectedCategoryPos)
            {   
                //set variables
                currentCategoryPos = selectedSectionCategories[item].pos
                previousCategoryPos = parseInt(selectedCategoryPos) - 2

                //check if first category
                if(previousCategoryPos == -1 ) { previousCategoryPos = totalCategories }

                //set previous category object
                previousCategoryItem = selectedSectionCategories[previousCategoryPos]

                //load previous category route
                setRoutePath(previousCategoryItem.section + "/" + previousCategoryItem.title)  

                return
            }
        }
    }


    function nextImageGalleryItem(imageGalleryId, imageGalleryData)
    {
        //elements
        let nextImage = document.getElementById("imageGallery#" + imageGalleryId)
        let galleryImagePos = document.getElementById("galleryImagePos#" + imageGalleryId)
        let categoryUnderlay = document.getElementById("categoryUnderlay")
        let galleryImageDescription = document.getElementById("galleryImageDescription#" + imageGalleryId)

        //variables
        let data = JSON.parse(imageGalleryData.replaceAll("'", "\""))
        let newImagePos = parseInt(nextImage.alt) + 1
        let totalGalleryImages = data.length

        //null check
        if(totalGalleryImages <= 1) { return }

        //check error
        if(newImagePos >= totalGalleryImages) { newImagePos = 0 }
        
        //set image background opacity
        if(categoryUnderlay.style.opacity == "0.49" || categoryUnderlay.style.opacity == "") 
        { categoryUnderlay.style.opacity = "0.02"; return }

        //set image alt text
        nextImage.alt = newImagePos

        //set image image src
        nextImage.src = data[newImagePos].image

        //update elements
        galleryImagePos.innerText = (newImagePos + 1) + "/" + totalGalleryImages
        galleryImageDescription.innerText = data[newImagePos].pos + "/" + totalGalleryImages + " · " + data[newImagePos].description
        categoryUnderlay.style.opacity = "0.02"
        nextImage.scrollIntoView()
    }


    function previousImageGalleryItem(imageGalleryId, imageGalleryData)
    {
        //elements
        let previousImage = document.getElementById("imageGallery#" + imageGalleryId)
        let galleryImagePos = document.getElementById("galleryImagePos#" + imageGalleryId)
        let categoryUnderlay = document.getElementById("categoryUnderlay")
        let galleryImageDescription = document.getElementById("galleryImageDescription#" + imageGalleryId)

        //variables
        let data = JSON.parse(imageGalleryData.replaceAll("'", "\""))
        let newImagePos = parseInt(previousImage.alt) - 1
        let totalGalleryImages = data.length

        //null check
        if(totalGalleryImages <= 1) { return }

        //check error
        if(newImagePos <= -1) { newImagePos = totalGalleryImages - 1}

        //set image background opacity
        if(categoryUnderlay.style.opacity == "0.49" || categoryUnderlay.style.opacity == "") 
        { categoryUnderlay.style.opacity = "0.02"; return }

        //set image alt text
        previousImage.alt = newImagePos

        //set image image src
        previousImage.src = data[newImagePos].image

        //update elements
        galleryImagePos.innerText = (newImagePos + 1) + "/" + totalGalleryImages
        galleryImageDescription.innerText = data[newImagePos].pos + "/" + totalGalleryImages + " · " + data[newImagePos].description
        categoryUnderlay.style.opacity = "0.02"
        previousImage.scrollIntoView()
    }


    function specificImageGalleryItem(imageGalleryId, imageGalleryData, specificImageNr)
    {
        //debugging
        // console.log("specificImageGalleryItem: " + specificImageNr)

        //elements
        let imageGallery = document.getElementById("imageGallery#" + imageGalleryId)
        let categoryUnderlay = document.getElementById("categoryUnderlay")
        let galleryImageDescription = document.getElementById("galleryImageDescription#" + imageGalleryId)

        //variables
        let data = JSON.parse(imageGalleryData.replaceAll("'", "\""))
        let newImagePos = specificImageNr - 1
        let totalGalleryImages = data.length

        //set image src
        imageGallery.src = data[newImagePos].image

        //set image description
        galleryImageDescription.innerText = (newImagePos + 1) + "/" + totalGalleryImages + " · " + data[newImagePos].description

        //set image alt text
        imageGallery.alt = newImagePos

        //set image background opacity
        if(categoryUnderlay.style.opacity == "0.49" || categoryUnderlay.style.opacity == "") 
        { categoryUnderlay.style.opacity = "0.02"; return }
    }


    async function fetchProtectedDomainData()
    {
        //elements
        let passwordProtectedDomainName = document.getElementById("passwordProtectedDomainName")
        let passwordProtectedPasswordInput = document.getElementById("passwordProtectedPasswordInput")
        let sitePasswordProtectedModal = document.getElementById("sitePasswordProtectedModal")
        let statusMessage = document.getElementById("passwordProtectedStatusMessage")

        //variables
        let domainName = passwordProtectedDomainName.value
        let domainPassword = passwordProtectedPasswordInput.value
        let route = router.currentRoute.value.params
        let domainRoute = route.domain || ""
        let obj = JSON.stringify({"domainRoute": domainRoute, "domainName": domainName, "domainPassword": domainPassword})

        if(domainName != '' && domainPassword != '')
        {
            //fetch protected domain data
            await fetch(BACKEND_API + "/domain-protected", {method: 'post', body: obj})
            .then((response) => { return response.json() })
            .then((data) => {
                //debugging
                // console.log(data)

                if(data.status == "fetch protected domain successful")
                {   
                    sitePasswordProtectedModal.style.display = "none"
                    setDomainData(data)
                }
                else 
                { 
                    statusMessage.style.color = "red"
                    statusMessage.style.display = "block"
                    statusMessage.innerText = "domain password is incorrect"
                }
            })
        }
    }


    async function setDomainData(data)
    {   
        //debugging
        // console.log(data.settings)

        //elements
        let loadingScreen = document.getElementById("loadingScreen")
        let buttonSelectSections = document.getElementById("buttonSelectSections")
        // let buttonStartElement = ""
        // let selectedSectionPageEnd = ""
        // let componentFrontend = document.getElementById("componentFrontend")
        // let frontendSectionsElement = document.getElementById("frontendSections")
        // let selectedCategoryTitle = document.getElementById("selectedCategoryTitle")
        // let frontendSectionsList = document.getElementById("frontendSectionsList")
        // let frontendDataRows = document.getElementById("frontendDataRows")
        // let buttonIndexElement = document.getElementById("buttonIndex")
        // let buttonEndElement = document.getElementById("buttonEnd")
        // let sectionButtons = document.getElementsByClassName("section")

        //variables
        let navIconSizeHeight = ""
        let navIconSizeWidth = ""
        let navTop = ""
        let navBottom = ""
        let navLeft = ""
        let navRight = ""
        let frontendCategoriesTop = ""
        let frontendDataTop = ""
        let frontendDataRowsMaxHeight = ""
        let frontendSectionsHeight = ""
        let frontendSectionsWidth = ""
        let frontendSectionsFlexDirection = ""
        let frontendSectionsPadding = ""
        let frontendSectionsMargin = ""
        let frontendSectionsListHeight = ""
        let frontendSectionsListDisplay = ""
        let frontendSectionsListFlexDirection = ""
        let navIconTypeBorderRadius = ""
        let route = data.route
        let docTitle = route.domain || data.route
        
        //set html title
        document.title = capitalizeString(docTitle)
        
        //save to vuex
        store.dispatch('storage/actionSetFrontendSections', data.sections)
        store.dispatch('storage/actionSetFrontendCategories', data.categories)
        store.dispatch('storage/actionSetFrontendData', data.data)
        store.dispatch('storage/actionSetFrontendSettings', data.settings)
        
        //set globals
        settings = data.settings

        //set loading screen
        if(settings.loadingScreen == "true")
        { 
            loadingScreen.style.display = "block"
            setTimeout(() => { loadingScreen.style.display = "none"}, 1000)
        }

        //set route
        handleRouting(route)

        //set styling
        setTimeout(() => {
            //set pages
            if(settings.pageStart == "true") { setTimeout(() => { document.getElementById("buttonStart").style.display = "block" }, 100) }
            // if(settings.pageEnd == "true" ) { setTimeout(() => { document.getElementById("selectedSectionPageEnd").style.display = "block" }, 100) }

            //set extras
            if(settings.modeSlideshow == "true" && window.screen.width > 1000) { buttonSlideshowMode.style.display = "block" }

            //set nav buttons
            if(settings.buttonAbout == "true") { buttonAbout.style.display = "block" }
            if(settings.buttonContact == "true") { store.dispatch('storage/actionSetFrontendContact', data.contact) }
            if(settings.buttonFullscreen == "true") { buttonFullscreen.style.display = "block" }
            if(settings.buttonSearch == "true") { buttonSearch.style.display = "block" }
            if(buttonSelectSections ) { buttonSelectSections.style.display = "block" }

            //set nav icons
            if(settings.navIconSize == "small") { navIconSizeHeight = "20px"; navIconSizeWidth = "20px"}
            else if(settings.navIconSize == "medium") { navIconSizeHeight = "30px"; navIconSizeWidth = "30px" }
            else if(settings.navIconSize == "large") { navIconSizeHeight = "40px"; navIconSizeWidth = "40px" }
            if(settings.navIconType == "square") { navIconTypeBorderRadius = "0%"}
            else if(settings.navIconType == "rounded") { navIconTypeBorderRadius = "90%" }
            
            //set nav position defaults
            navTop = "initial"
            navBottom = "initial"
            navLeft = "initial"
            navRight = "initial"
            frontendSectionsHeight = "100vh"
            frontendSectionsWidth = "auto"
            frontendSectionsPadding = "24vh 2px 0px 0px"
            frontendSectionsMargin = "0px 0px 0px 0px"
            frontendSectionsFlexDirection = "column"
            frontendSectionsListHeight = "auto"
            frontendCategoriesTop = "6%"
            frontendDataTop = "12%"
            frontendDataRowsMaxHeight = "80vh"
            frontendSectionsListDisplay = "flex"

            //set nav top
            if(settings.navPosition == "top") 
            {   
                navTop = "0px"
                frontendSectionsHeight = "auto"
                frontendSectionsWidth = "100vw"
                frontendSectionsFlexDirection = "row"
                frontendSectionsPadding = "0px 0px 0px 39vw"
                frontendSectionsListFlexDirection = "row"
                frontendCategoriesTop = "12%"
                frontendDataTop = "20%"
            }

            //set nav bottom
            else if(settings.navPosition == "bottom") 
            {
                navBottom = "0px"
                frontendSectionsHeight = "auto"
                frontendSectionsWidth = "100vw"
                frontendSectionsFlexDirection = "row"
                frontendSectionsPadding = "0px 0px 0px 39vw"
                frontendSectionsListFlexDirection = "row"
                frontendDataRowsMaxHeight = "74vh" 
            }

            //set nav left
            else if(settings.navPosition == "left") 
            { 
                navLeft = "0px"
                frontendSectionsListHeight = "100vh"
                frontendSectionsListFlexDirection = "column"
            }

            //set nav right
            else if(settings.navPosition == "right") 
            {
                navRight = "0px"
                frontendSectionsListHeight = "100vh"
                frontendSectionsListFlexDirection = "column"
            }
            
            //set CSS variables
            document.documentElement.style.setProperty("--backgroundPageStart", "linear-gradient(to right, rgba(0,0,0, 0.49) 0 100%), url('" + settings.pageStartBackgroundImage + "')")
            document.documentElement.style.setProperty("--backgroundPageEnd", "linear-gradient(to right, rgba(0,0,0, 0.49) 0 100%), url('" +  settings.pageEndBackgroundImage + "')")
            document.documentElement.style.setProperty("--navTop", navTop)
            document.documentElement.style.setProperty("--navBottom", navBottom)
            document.documentElement.style.setProperty("--navLeft", navLeft)
            document.documentElement.style.setProperty("--navRight", navRight)
            document.documentElement.style.setProperty("--navIconSizeHeight", navIconSizeHeight)
            document.documentElement.style.setProperty("--navIconSizeWidth", navIconSizeWidth)
            document.documentElement.style.setProperty("--navIconTypeBorderRadius", navIconTypeBorderRadius)
            document.documentElement.style.setProperty("--frontendDataRowsHeight", frontendDataRowsMaxHeight)
            document.documentElement.style.setProperty("--frontendSectionsHeight", frontendSectionsHeight)
            document.documentElement.style.setProperty("--frontendSectionsWidth", frontendSectionsWidth)
            document.documentElement.style.setProperty("--frontendSectionsFlexDirection", frontendSectionsFlexDirection)
            document.documentElement.style.setProperty("--frontendSectionsPadding", frontendSectionsPadding)
            document.documentElement.style.setProperty("--frontendSectionsMargin", frontendSectionsMargin)
            document.documentElement.style.setProperty("--frontendSectionsListHeight", frontendSectionsListHeight)
            document.documentElement.style.setProperty("--frontendSectionsListDisplay", frontendSectionsListDisplay)
            document.documentElement.style.setProperty("--frontendSectionsListFlexDirection", frontendSectionsListFlexDirection)
            document.documentElement.style.setProperty("--frontendCategoriesTop", frontendCategoriesTop)
            document.documentElement.style.setProperty("--frontendDataTop", frontendDataTop)
            document.documentElement.style.setProperty("--frontendDataRowsMaxHeight", frontendDataRowsMaxHeight)
            document.documentElement.style.setProperty("--colorLoadingScreen", settings.colorLoadingScreen)
            document.documentElement.style.setProperty("--colorNavBackground", settings.colorNavBackground)
            document.documentElement.style.setProperty("--colorNavIcons", settings.colorNavIcons)
            document.documentElement.style.setProperty("--colorNavIconsText", settings.colorNavIconsText)
            document.documentElement.style.setProperty("--colorText", settings.colorText)
            document.documentElement.style.setProperty("--colorSectionBackground", settings.colorSectionBackground)
        }, 100)

        //preload images from galleries
        preloadImages()
    }


    function displayExtraPage(type)
    {
        //elements
        let pageStart = document.getElementById("pageStart")
        let pageIndex = document.getElementById("pageIndex")
        let pageEnd = document.getElementById("pageEnd")
        let underlayModal = document.getElementById("underlayModal")
        let sectionNavigatorModal = document.getElementById("sectionNavigatorModal")
        let mobileNavigatorModal = document.getElementById("mobileNavigatorModal")
        let aboutModal = document.getElementById("aboutModal")
        let searchModal = document.getElementById("searchModal")
        // let sectionElements = document.getElementsByClassName("section")
        // let categoryElements = document.getElementsByClassName("category")

        //reset elements
        if(pageStart) { pageStart.style.display = "none" }
        if(pageIndex) { pageIndex.style.display = "none" }
        if(pageEnd) { pageEnd.style.display = "none" }

        //update elements
        if(type == "start") { pageStart.style.display = "block" }
        else if(type == "index") { pageIndex.style.display = "block" }
        else if(type == "end") { pageEnd.style.display = "block" }
        if(underlayModal) { underlayModal.style.display = "none" }
        if(sectionNavigatorModal) { sectionNavigatorModal.style.display = "none" }
        if(mobileNavigatorModal) { mobileNavigatorModal.style.display = "none" }
        if(aboutModal) { aboutModal.style.display = "none" }
        if(searchModal) { searchModal.style.display = "none" }
        buttonStart.style.opacity = "1"
        // buttonIndex.style.opacity = "1"
    }


    function fullscreen()
    {   
        //elements
        let doc = document.documentElement,

        //variables
        state = (document.webkitIsFullScreen || document.isFullScreen),
        requestFullscreen = (doc.requestFullscreen || doc.webkitRequestFullScreen),
        cancelFullscreen = (document.cancelFullScreen || document.webkitCancelFullScreen);

        //activate fullscreen
        if(!state) { requestFullscreen.call(doc) }

        //close fullscreen
        else { cancelFullscreen.call(document) }
    }


    function displayMobileNavigator()
    {
        //elements
        let mobileNavigatorModal = document.getElementById("mobileNavigatorModal")

        //update elements
        mobileNavigatorModal.style.display = "block"
    }


    function setRoutePath(value)
    {   
        //debugging
        // console.log("setRoutePath")

        //variables
        let routeParams = router.currentRoute.value.params
        let currentRouteString = router.currentRoute.value.fullPath
        let newPath = '/' + routeParams.domain.toLowerCase() + '/' + value.replaceAll(" ", "-").toLowerCase()
        let previousRoute = router.options.history.state.back

        //null check
        if(("/" + routeParams.domain + "/" + value) == currentRouteString) { return }
        else if(newPath == router.currentRoute.value.fullPath.toLowerCase() && newPath.includes("search=")) { return }
        else if(newPath == router.currentRoute.value.fullPath.toLowerCase()) { undisplayModals(); return }

        //set new path   
        router.push({ path: newPath })
    }


    function categoryUnderlaySetOpacity(value)
    {
        //elements
        let categoryUnderlaySetOpacity = document.getElementById("categoryUnderlay")

        //update elements
        categoryUnderlaySetOpacity.style.opacity = value
    }


    function handleRouting(route)
    {   
        //debugging
        // console.log("handleRouting")

        //variables
        let type = ""
        let firstSection = ""
        let sectionObj = ""
        let searchSame = false

        //set type
        if(route.section == null) { type = "default" }
        else if(route.section.includes("search=")) 
        { 
            let searchStringPrevious = frontendSearchString.value
            let searchStringNew = route.section.replace("search=", "")
            
            if(searchStringNew == searchStringPrevious) 
            { 
                searchModal.style.display = "block"
                underlayModal.style.display = "block"
                searchModalInput.value = searchStringNew
                searchSame = true
                return
            }
            else if(searchStringPrevious == null) { search(searchStringNew) }
            else if(searchStringNew != searchStringPrevious) { search(searchStringNew) }
            
            type == "search"
        }
        else if(route.section == 'start') { type = "start" }
        else if(route.section == 'end') { type = "end" }
        else if(route.section != undefined && route.category == undefined) { type = "section" }
        else if(route.section != undefined && route.category != undefined) { type = "section + category" }
        else { type = "default" }
        
        //null check
        if(searchSame == true) { return }
        
        //set first section
        firstSection = sortFrontendSections(frontendSections.value)[0]

        //set section obj
        if(route.section)
        {
            for(let item in frontendSections.value)
            {
                let sectionInUrl = route.section.toLowerCase().replaceAll("-", " ")
                let sectionInDatabase = frontendSections.value[item].title.toLowerCase()
    
                if(sectionInUrl == sectionInDatabase) 
                { 
                    sectionObj = frontendSections.value[item] 
                }
            }
        }

        //load route
        if(type == "default") { settings.pageStart == "true" ? displayExtraPage('start') : loadSectionCategories(firstSection, '', '') }
        else if(type == "start") { settings.pageStart == "true" ? displayExtraPage('start') : loadSectionCategories(firstSection, '', '') }
        else if(type == "end") { settings.pageEnd == "true" ? displayExtraPage('end') : loadSectionCategories(firstSection, '', '') }
        else if(type == "section") { loadSectionCategories(sectionObj, '', '') }
        else if(type == "section + category") 
        {   
            let rowDivId = ""
            let rowDivImage = ""
            let splitRoute = ""
            let itemType = ""

            //route is standard
            if(!route.category.includes("@")) 
            {
                loadSectionCategories(sectionObj, route.section , route.category)
            }
            
            //route includes row/item
            else if(route.category.includes("@")) 
            { 
                splitRoute = route.category.split("@")
                route.category = splitRoute[0]
                
                if(splitRoute[1] == "") { return }
                else if(splitRoute[1].split("-")[1].toString().includes("image")) { itemType = "image"}
                else { itemType = "item" }

                rowDivId = splitRoute[1].split("-")[0].toString().replace("row", "")
                rowDivImage = splitRoute[1].split("-")[1].toString().replace("image", "")
                
                loadSectionCategories(sectionObj, route.section , route.category)

                setTimeout(() => { 
                    let searchItemDiv = document.getElementById("data" + rowDivId)
                    
                    if(itemType == "item") { searchItemDiv.scrollIntoView({ behavior: 'smooth' }) }

                    else if(itemType == "image")
                    {
                        let imageGalleryData = ""

                        for(let item in frontendDataSelected.value)
                        {
                            let obj = JSON.parse(frontendDataSelected.value[item])
                            if(obj.type == 'galleryImages' && obj.pos == rowDivId) { imageGalleryData = obj.data }
                        }

                        searchItemDiv.scrollIntoView({ behavior: 'smooth' })
                        specificImageGalleryItem(rowDivId, imageGalleryData, rowDivImage)
                    }
                }, 300)
            }
        }
    }

    
    function loadNextSection()
    {
        //variables
        let nextSectionObj = ""
        let totalSections = frontendSections.value.length - 1
        let id = ""

        //set section id
        for(let item in frontendSections.value)
        {
            if(item >= totalSections) { id = 0; break }
            else if(selectedSection.toLowerCase() == frontendSections.value[item].title.toLowerCase()) { id = parseInt(item) + 1; break }
        }

        //set next section data
        nextSectionObj = frontendSections.value[id]

        //set globals
        selectedSection = nextSectionObj.title

        //set next section path
        setRoutePath(selectedSection)
    }


    function loadPreviousSection()
    {   
        //variables
        let previousSectionObj = ""
        let totalSections = frontendSections.value.length - 1
        let id = ""

        //set section id
        if(selectedSection.toLowerCase() == frontendSections.value[0].title.toLowerCase()) { id = totalSections }
        else
        {
            for(let item in frontendSections.value)
            {
                if(selectedSection.toLowerCase() == frontendSections.value[item].title.toLowerCase()) { id = parseInt(item) - 1; break }
            }
        }

        //set previous section data
        previousSectionObj = frontendSections.value[id]

        //set globals
        selectedSection = previousSectionObj.title

        //set next previous path
        setRoutePath(selectedSection)
    }


    function capitalizeString(value)
    {   
        //debugging
        // console.log("capitalizeString")
        
        //set value
        value = value.replaceAll("-", " ")

        //variables
        let words = value.split(" ")
        let newValue = ""

        //format words
        for(let item in words)
        {
            newValue += words[item].substring(0, 1).toUpperCase() + words[item].substring(1, words[item].length) + " "
        }

        //remove last character whitespace
        if(newValue.substring(newValue.length - 1, newValue.length) == " ") 
        { newValue = newValue.substring(0, newValue.length - 1) }
        
        return newValue
    }


    function loadSearchModal()
    {
        //debugging
        // console.log("loadSearchModal")

        //elements
        let searchModal = document.getElementById("searchModal")
        let underlayModal = document.getElementById("underlayModal")
        let searchModalInput = document.getElementById("searchModalInput")
        
        //update elements
        if(searchModal.style.display == "none" || searchModal.style.display == "")
        {
            searchModalInput.style.color = "white"
            searchModal.style.display = "block"
            underlayModal.style.display = "block"
            searchModalInput.select()
            setTimeout(() => { searchModalInput.value = frontendSearchString.value;  searchModalInput.style.color = "black" }, 1)
            // setTimeout(() => { searchModalInput.value = "";  searchModalInput.style.color = "black" }, 1)
           
        }
        else if(searchModal.style.display == "block")
        {
            searchModal.style.display = "none"
            underlayModal.style.display = "none"
        }

        //set selected element
        selectedElement = "searchModal"
    }

    
    function setSearchPath()
    {
        //elements
        let searchModalInput = document.getElementById("searchModalInput")
        
        //variables
        let value = "search=" + searchModalInput.value.toLowerCase()
        let route = router.currentRoute.value.params
        let newPath = '/' + route.domain.toLowerCase() + '/' + value.toLowerCase()
        
        //null check
        if(newPath == router.currentRoute.value.fullPath.toLowerCase() && newPath.includes("search=")) { return }

        //set search path
        router.push({ path: newPath })
    }


    function search(value)
    {
        //debugging
        // console.log("search: " + value)

        //elements
        let searchModalInput = document.getElementById("searchModalInput")
        let searchModal = document.getElementById("searchModal")
        
        //variables
        let forbiddenCharacters = ["'", "\"", "/", "\\", "_", "<", ">"]
        let sectionHits = 0
        let categoryHits = 0
        let dataHits = 0
        let sectionHitsObjects = []
        let categoryHitsObjects = []
        let dataHitsObjects = []
        let searchResults = []
        let frontendSectionsData = toRaw(frontendSections.value)
        let frontendCategoriesData = toRaw(frontendCategories.value)
        let searchString = value
        let dataExists = "false"
        let dataRowsArray = ""
        let row = ""
        let rdf = ""
        let rdfItem = ""

        //add SECTION search hits
        for(let item in frontendSectionsData)
        {
            if(frontendSectionsData[item].title.toLowerCase().includes(searchString)) 
            { 
                frontendSectionsData[item].searchResultType = "section"
                sectionHits++
                sectionHitsObjects.push(frontendSectionsData[item])
                searchResults.push(frontendSectionsData[item])
            }
        }

        //add CATEGORY search hits
        for(let item in frontendCategoriesData)
        {
            if(frontendCategoriesData[item].title.toLowerCase().includes(searchString)) 
            { 
                frontendCategoriesData[item].searchResultType = "category"
                categoryHits++
                categoryHitsObjects.push(frontendCategoriesData[item]) 
                searchResults.push(frontendCategoriesData[item]) 
            }
        }

        //add DATA search hits
        for(let item in frontendData.value)
        {
            if(frontendData.value[item].rows)
            {
                dataRowsArray = toRaw(frontendData.value[item].rows)

                for(let r in dataRowsArray)
                {
                    row = JSON.parse(dataRowsArray[r])
                    
                    //data is singleline
                    if(row.hidden == "false" && row.type == 'singleline' && row.data.toLowerCase().includes(searchString))
                    {
                        row.section = frontendData.value[item].section
                        row.category = frontendData.value[item].category
                        row.dataType = row.type
                        row.searchResultType = "text"
                        row.text = row.data
                        row.divId = row.pos
                        // row.dataFull = JSON.stringify(row)

                        dataHits++
                        dataHitsObjects.push(row)
                        searchResults.push(row)
                    }

                    //data is NOT singleline
                    else if(row.hidden == "false" && row.type != 'singleline') 
                    {   
                        rdf = JSON.parse(row.data.replaceAll("'", "\""))
                    
                        for(let o in rdf)
                        {   
                            //data is text
                            if(rdf[o].text) { rdfItem = rdf[o].text.toLowerCase(); rdf[o].searchResultType = "text" }

                            //data is image
                            else { rdfItem = rdf[o].description.toLowerCase(); rdf[o].searchResultType = "image" }
                            
                            rdf[o].section = frontendData.value[item].section
                            rdf[o].category = frontendData.value[item].category
                            rdf[o].dataType = row.type
                            rdf[o].divId = row.pos
                            rdf[o].dataFull = row
                            // rdf[o].searchResultType = "data"

                            if(rdfItem.includes(searchString))
                            { 
                                dataHits++
                                dataHitsObjects.push(rdf[o])
                                searchResults.push(rdf[o])
                            }
                        }
                    }
                }
            }
        }

        //save to vuex
        store.dispatch('storage/actionSetFrontendSearchString', searchString)
        store.dispatch('storage/actionSetFrontendSearchResults', searchResults)

        //update elements
        searchModal.style.display = "block"
        setTimeout(() => { selectSearchHitsCategory('all', searchResults) }, 100)
    }


    function filterSearchResults(type, array)
    {
        //variables
        let results = ""

        //check type
        if(type == 'all') { results = array.slice().filter((item) => { return item.searchResultType != ''}) }
        else if(type == 'sections') { results = array.slice().filter((item) => { return item.searchResultType == 'section'}) }
        else if(type == 'categories') { results = array.slice().filter((item) => { return item.searchResultType == 'category'}) }
        else if(type == 'images') { results = array.slice().filter((item) => { return item.searchResultType == 'image'}) }
        else if(type == 'texts') { results = array.slice().filter((item) => { return item.searchResultType == 'text'}) }

        return results
    }


    function selectSearchHitsCategory(type)
    {   
        //debugging
        // console.log("selectSearchHitsCategory: " + type)

        //elements
        let searchModalResults = document.getElementById("searchModalResults")
        let searchHitCategoryAll = document.getElementById("searchHitCategoryAll")
        let searchHitCategorySections = document.getElementById("searchHitCategorySections")
        let searchHitCategoryCategories = document.getElementById("searchHitCategoryCategories")
        let searchHitCategoryImages = document.getElementById("searchHitCategoryImages")
        let searchHitCategoryTexts = document.getElementById("searchHitCategoryTexts")
        let searchResultItemsAll = document.getElementsByClassName("searchResultItem")
        let searchResultImages = document.getElementsByClassName("searchResultImage")
        let searchResultCategories = document.getElementsByClassName("searchResultCategory")
        let searchResultSections = document.getElementsByClassName("searchResultSection")
        let searchResultOthers = document.getElementsByClassName("searchResultData")

        //reset elements
        searchHitCategoryAll.style.opacity = "0.2"
        searchHitCategorySections.style.opacity = "0.2"
        searchHitCategoryCategories.style.opacity = "0.2"
        searchHitCategoryImages.style.opacity = "0.2"
        searchHitCategoryTexts.style.opacity = "0.2"
        for(let item in searchResultItemsAll) { if(searchResultItemsAll[item].style) { searchResultItemsAll[item].style.display = "none" } }

        //update elements ALL
        if(type == 'all')
        { 
            searchHitCategoryAll.style.opacity = "1"
            for(let item in searchResultItemsAll) { if(searchResultItemsAll[item].style) { searchResultItemsAll[item].style.display = "flex" } }
        }

        //update elements SECTIONS
        else if(type == 'sections')
        { 
            searchHitCategorySections.style.opacity = "1"
            for(let item in searchResultSections) { if(searchResultSections[item].style) { searchResultSections[item].style.display = "block" } }
        }

        //update elements CATEGORIES
        else if(type == 'categories')
        { 
            searchHitCategoryCategories.style.opacity = "1"
            for(let item in searchResultCategories) { if(searchResultCategories[item].style) { searchResultCategories[item].style.display = "block" } }
        }

        //update elements IMAGES
        else if(type == 'images')
        { 
            searchHitCategoryImages.style.opacity = "1"
            for(let item in searchResultImages) { if(searchResultImages[item].style) { searchResultImages[item].style.display = "flex" } }
        }

        //update elements TEXTS
        else if(type == 'texts')
        { 
            searchHitCategoryTexts.style.opacity = "1"
            for(let item in searchResultOthers) { if(searchResultOthers[item].style) { searchResultOthers[item].style.display = "block" } }
        }

        //scroll to top
        searchModalResults.scrollTo(0,0)
    }


    function preloadImages()
    {
        //debugging
        // console.log("preloadImages")
        
        //category background images
        for(let item in frontendCategories.value)
        {
            let categoryBackgroundImage = frontendCategories.value[item].backgroundImage

            if(categoryBackgroundImage != null)
            {
                let newImg = new Image
                newImg.src = categoryBackgroundImage
            }
        }

        //gallery images
        for(let item in frontendData.value)
        {
            for(let r in frontendData.value[item].rows)
            {
                let rObj = JSON.parse(frontendData.value[item].rows[r])

                if(rObj.type == 'galleryImages') 
                {
                    let gallery = JSON.parse(rObj.data.replaceAll("'", "\""))

                    for(let i in gallery)
                    {
                        let newImg = new Image
                        newImg.src = gallery[i].image
                    }
                }
            }
        }
    }


    function slideshowMode()
    {
        //elements
        let slideshowModal = ""
        let mobileLandscapeStartSlideshow = document.getElementById("mobileLandscapeStartSlideshow")
        
        //variables
        let totalSections = frontendSections.value.length
        let totalCategories = frontendCategories.value.length
        let sectionsSorted = sortFrontendSections(toRaw(frontendSections.value))
        let dataSorted = sortFrontendDataSlideshow(toRaw(frontendData.value))
        let categoriesSorted = frontendCategories.value
        let sectionsByPos = []
        let dataRowsInOrder = []
        let startPageSlide = ""
        let endPageSlide = ""
        let slides = []

        if(settings.pageStart == "true") 
        { 
            startPageSlide = {
                "backgroundImage": settings.pageStartBackgroundImage,
                "category": "",
                "data": settings.pageStartText,
                "hidden": "false",
                "pos": "0",
                "section": "",
                "title": settings.pageStartTitle,
                "type": "slideshowStart"
            }
            slides.push(startPageSlide) 
        }
        else if(settings.pageStart == "false")
        {
            startPageSlide = {
                "backgroundImage": "",
                "category": "",
                "data": "",
                "hidden": "false",
                "pos": "0",
                "section": "",
                "title": capitalizeString(router.currentRoute.value.params.domain),
                "type": "slideshowStart"
            }
            slides.push(startPageSlide)
        }

        //add sections to array
        for(let s in sectionsSorted)
        {
            sectionsByPos.push(sectionsSorted[s].title)
        }
        
        //handle data rows
        for(let item in dataSorted)
        {
            let obj = dataSorted[item]
            let section = obj.section.toLowerCase()
            let category = obj.category.toLowerCase()
            let rows = sortFrontendDataRowsSlideshow(dataSorted[item].rows)

            for(let item in rows) 
            { 
                let r = rows[item]
                // let r = JSON.parse(rows[item])
                
                r.section = section
                r.category = category
                r.data = r.data.replaceAll("'", "\"")

                for(let b in categoriesSorted)
                {
                    let cItem = categoriesSorted[b]
                    let cSection = cItem.section.toLowerCase()
                    let cTitle = cItem.title.toLowerCase()

                    if(cSection == r.section.toLowerCase() && cTitle == r.category.toLowerCase())
                    {
                        r.backgroundImage = categoriesSorted[b].backgroundImage
                        break
                    }
                }

                if(r.hidden == "false" && r.type != 'galleryImages') 
                { 
                    dataRowsInOrder.push(r) 
                }
                else if(r.hidden == "false" && r.type == 'galleryImages') 
                {   
                    let imageObjects = JSON.parse(r.data)

                    for(let x in imageObjects)
                    {
                        dataRowsInOrder.push({
                            "category": r.category,
                            "data": JSON.stringify(imageObjects[x]),
                            "hidden": r.hidden,
                            "pos": r.pos,
                            "section": r.section,
                            "title": r.title,
                            "type": r.type,
                            "backgroundImage": r.backgroundImage
                        })
                    }
                }
            }
        }
        
        //add slides to array
        for(let item in sectionsByPos)
        {   
            //check if index section exist
            let sPos = ""
            if(sectionsByPos[0].toString().toLowerCase() == "index") { sPos = (parseInt(item)).toString() }
            else { sPos = (parseInt(item) + 1).toString() }

            //variables
            let s = {
                "backgroundImage": "",
                "category": "",
                "data": "",
                "hidden": "false",
                "pos": sPos,
                "section": sectionsByPos[item],
                "title": firstLetterToUpperCase(sectionsByPos[item]),
                "type": "sectionStart"
            }

            //add section start slide
            if(s.title.toLowerCase() != "index") { slides.push(s) }
            

            //set section background image
            for(let b in categoriesSorted)
            {
                let cItem = categoriesSorted[b]
                let cSection = cItem.section.toLowerCase()
                let cTitle = cItem.title.toLowerCase()

                if(cSection == s.section.toLowerCase())
                {
                    s.backgroundImage = categoriesSorted[b].backgroundImage
                    break
                }
            }

            //check if data is set to hidden
            for(let d in dataRowsInOrder)
            {
                if(dataRowsInOrder[d].section.toLowerCase() == s.title.toLowerCase())
                {
                    if(dataRowsInOrder[d].hidden == "false") { slides.push(dataRowsInOrder[d]) }
                }
            }
        }

        //add end page
        if(settings.pageEnd == "true") 
        { 
            endPageSlide = {
                "backgroundImage": settings.pageEndBackgroundImage,
                "category": "",
                "data": settings.pageEndText,
                "hidden": "false",
                "pos": slides.length.toString(),
                "section": "",
                "title": settings.pageEndTitle,
                "type": "slideshowEnd"
            }
            slides.push(endPageSlide)
        }
        else if(settings.pageEnd == "false")
        {
            endPageSlide = {
                "backgroundImage": "",
                "category": "",
                "data": "",
                "hidden": "false",
                "pos": slides.length.toString(),
                "section": "",
                "title": "End",
                "type": "slideshowEnd"
            }
            slides.push(endPageSlide)
        }

        //set local storage
        localStorage.setItem("cms-slides", JSON.stringify(slides))

        //set vuex
        store.dispatch('storage/actionSetFrontendSlideshowPage', slides[0])

        //update elements
        let doc = document.documentElement,
        requestFullscreen = (doc.requestFullscreen || doc.webkitRequestFullScreen)
        requestFullscreen.call(doc)
        mobileLandscapeStartSlideshow.style.display = "none"
        mobilePortraitExitSlideshow.style.display = "block"
        setTimeout(() => {
            slideshowModal = document.getElementById("slideshowModal")
            slideshowModal.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0, 0.4) 0 100%), url('" + slides[slidesCurrentPage].backgroundImage + "')"
            slideshowModal.style.backgroundSize = "cover"
            slideshowModal.style.display = "block"
            document.documentElement.style.cursor = 'none'
        }, 100)
        
        //set slideshow status
        slideshowModeActive = "true"
        
        //debugging
        // console.log(slides)
    }


    function slideshowModeNext()
    {
        //elements
        let slideshowModal = document.getElementById("slideshowModal")
        let slidesCurrentPageNumber = document.getElementById("slidesCurrentPageNumber")

        //variables
        let slides = JSON.parse(localStorage.getItem("cms-slides"))
        let totalSlides = slides.length

        //increment slide page
        slidesCurrentPage++

        //null check
        if(slidesCurrentPage > (totalSlides - 1)) { slidesCurrentPage = 0 }

        //update elements
        slidesCurrentPageNumber.innerText = slidesCurrentPage + "/" + (totalSlides - 1)
        if(slides[slidesCurrentPage].backgroundImage != "")
        {
            slideshowModal.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0, 0.49) 0 100%), url('" + slides[slidesCurrentPage].backgroundImage + "')"
            slideshowModal.style.backgroundSize = "cover"
        }
        else if(slides[slidesCurrentPage].backgroundImage == "")
        {
            slideshowModal.style.backgroundImage = "none"
        }
        
        //update vuex
        store.dispatch('storage/actionSetFrontendSlideshowPage', slides[slidesCurrentPage])
    }


    function slideshowModePrevious()
    {
        //elements
        let slideshowModal = document.getElementById("slideshowModal")
        let slidesCurrentPageNumber = document.getElementById("slidesCurrentPageNumber")

        //variables
        let slides = JSON.parse(localStorage.getItem("cms-slides"))
        let totalSlides = slides.length

        //decrement slide page
        slidesCurrentPage--

        //null check
        if(slidesCurrentPage < 0) { slidesCurrentPage = (totalSlides - 1) }

        //update elements
        slidesCurrentPageNumber.innerText = slidesCurrentPage + "/" + (totalSlides - 1)
        if(slides[slidesCurrentPage].backgroundImage != "")
        {
            slideshowModal.style.backgroundImage = "linear-gradient(to right, rgba(0,0,0, 0.49) 0 100%), url('" + slides[slidesCurrentPage].backgroundImage + "')"
            slideshowModal.style.backgroundSize = "cover"
        }
        else if(slides[slidesCurrentPage].backgroundImage == "")
        {
            slideshowModal.style.backgroundImage = "none"
        }

        //update vuex
        store.dispatch('storage/actionSetFrontendSlideshowPage', slides[slidesCurrentPage])
    }


    function slideshowModeExit()
    {
        setTimeout(() => {
            //elements
            let slideshowModal = document.getElementById("slideshowModal")
            let mobileLandscapeStartSlideshow = document.getElementById("mobileLandscapeStartSlideshow")
            let mobilePortraitExitSlideshow = document.getElementById("mobilePortraitExitSlideshow")

            //update elements
            slideshowModal.style.display = "none"
            mobileLandscapeStartSlideshow.style.display = "initial"
            mobilePortraitExitSlideshow.style.display = "none"
            document.documentElement.style.cursor = 'auto'

            //set globals
            slideshowModeActive = "false"
            slidesCurrentPage = 0
            
            //exit browser fullscreen
            let doc = document.documentElement,
            cancelFullscreen = (document.cancelFullScreen || document.webkitCancelFullScreen)
            cancelFullscreen.call(document)
            return 
        }, 400)
    }


    async function generatePwaManifest()
    {
        //debugging
        // console.log("generatePwaManifest")
        
        //variables
        let manifest = ""
        let link = ""
        
        //set manifest
        manifest = {
            name: capitalizeString(router.currentRoute.value.params.domain),
            short_name: capitalizeString(router.currentRoute.value.params.domain),
            display: 'standalone',
            theme_color: '#000000',
            background_color: '#000000',
            icons: [
                { src: settings.iconImage192x192, sizes: '192x192', type: 'image/png', purpose: "any" },
                { src: settings.iconImage512x512, sizes: '512x512', type: 'image/png', purpose: "any" },
            ],
            description: '',
            start_url: window.location.href
        }
        
        //create base64 file
        link = document.createElement('link')
        link.rel = 'manifest'
        link.href = `data:application/json;base64,${btoa(JSON.stringify(manifest))}`
        
        //add file link to html header
        document.head.appendChild(link)
    }


    function loadLinkListUrl(url)
    {
        //debugging
        // console.log(url)

        //load external
        if(url.includes("://")) { window.open(url, '_self') }

        //load internal
        else { router.push(url) }
    }


    async function fetchProtectedDomain()
    {
        fetchProtectedDomainData().then(() => { generatePwaManifest()})
    }

    
    async function fetchPrivateDomain(lsUsername, lsToken, lsLogin)
    {   
        //variables
        let username = lsUsername
        let token = lsToken
        let lastLogin = lsLogin
        let obj = JSON.stringify({ "username": username, "token": token, "lastLogin": lastLogin })

        //null check
        if(username == null || token == null || lastLogin == null) { router.push("/"); return }
        
        //fetch specific user data
        await fetch(BACKEND_API + "/domain-private", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            
            //debugging
            // console.log(data)

            //fetch user successful
            if(data.status == "fetch private domain successful") 
            { 
                setDomainData(data).then(() => { generatePwaManifest()})
            }

            //fetch user failed
            else if(data.status == "fetch private domain failed") 
            {
                router.push("/")
            }

        })
    }


    return {
        //variables
        frontendSections,
        frontendCategories,
        frontendData,
        frontendDataSelected,
        frontendSettings,
        frontendContact,
        frontendSearchResults,
        frontendSearchString,
        frontendSlideshowPage,
        router,

        //functions
        loadSectionCategories,
        loadCategoryData,
        loadDataData,
        loadCategoryNavigatorModal,
        loadSectionNavigatorModal,
        loadNextCategory,
        loadPreviousCategory,
        loadAboutModal,
        loadSearchModal,
        loadNextSection,
        loadPreviousSection,
        fetchDomain,
        sortFrontendDataSelected,
        sortFrontendCategories,
        sortFrontendSections,
        firstLetterToUpperCase,
        undisplayModals,
        nextImageGalleryItem,
        previousImageGalleryItem,
        fetchProtectedDomain,
        fetchProtectedDomainData,
        displayExtraPage,
        fullscreen,
        displayMobileNavigator,
        setRoutePath,
        categoryUnderlaySetOpacity,
        search,
        setSearchPath,
        filterSearchResults,
        selectSearchHitsCategory,
        capitalizeString,
        slideshowMode,
        slideshowModeNext,
        slideshowModePrevious,
        slideshowModeExit,
        loadLinkListUrl
    }
  }
}
</script>


<style>
    :root {
        --frontendSectionsHeight: initial;
        --frontendSectionsWidth: initial;
        --frontendSectionsFlexDirection: initial;
        --frontendSectionsPadding: initial;
        --frontendSectionsMargin: intial;
        --frontendCategoriesTop: initial;
        --frontendDataTop: initial;
        --frontendDataRowsHeight: initial;
        --frontendSectionsListHeight: initial;
        --frontendSectionsListDisplay: initial;
        --frontendSectionsListFlexDirection: initial;

        --navTop: initial;
        --navBottom: initial;
        --navLeft: initial;
        --navRight: initial;
        --navIconSizeHeight: initial;
        --navIconSizeWidth: initial;
        --navIconType: initial;
        --navIconTypeBorderRadius: initial;

        --backgroundPageStart: initial;
        --backgroundPageEnd: initial;

        --colorLoadingScreen: black;
        --colorNavBackground: black; 
        --colorNavIcons: black; 
        --colorNavIconsText: black;
        --colorSectionBackground: black;
        --colorText: black;

    }
</style>
<style scoped>
    /*** scrollbars ***/
    #frontendData::-webkit-scrollbar { height: 0px; width: 0px; }
    #frontendDataRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #frontendSectionsList::-webkit-scrollbar { height: 0px; width: 0px; }
    #categoryNavigatorModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #sectionNavigatorModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #searchModalResults::-webkit-scrollbar { height: 0px; width: 0px; }
    #aboutModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #slideshowModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #slideshowData::-webkit-scrollbar { height: 0px; width: 0px; }
    .categoryNavigatorModalItems::-webkit-scrollbar { height: 0px; width: 0px; }
    .sectionNavigatorModalItems::-webkit-scrollbar { height: 0px; width: 0px; }
    
    #dataObjModalPreviewImages::-webkit-scrollbar { height: 12px; width: 10px; }
    #dataObjModalPreviewImages::-webkit-scrollbar-track { background: black; }
    #dataObjModalPreviewImages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
    

    /*** elements ***/
    input[type='radio'] { accent-color:  #822c8b; }
    input[type='checkbox'] { accent-color:  #822c8b; }


    /*** ids ***/
    #componentFrontend 
    { 
        position: fixed;
        height: 100vh; 
        width: 100vw; 
        margin: auto; 
        padding: 0px;
        z-index: 3;
        color: white;
        background-color: black;
        /* background-color: var(--colorSectionBackground);
        background-image: none;
        background-size: cover;
        background-repeat: no-repeat; */
    }
    #frontendSections 
    { 
        position: fixed; 
        display: flex; 
        height: var(--frontendSectionsHeight); 
        width: var(--frontendSectionsWidth);
        top: var(--navTop); 
        bottom: var(--navBottom); 
        left: var(--navLeft); 
        right: var(--navRight); 
        margin: var(--frontendSectionsMargin);
        padding: var(--frontendSectionsPadding);
        flex-direction: var(--frontendSectionsFlexDirection);
        user-select: none;
        opacity: 1;
        z-index: 2;
        background-color: var(--colorNavBackground);
    }
    #frontendSectionsList 
    { 
        display: var(--frontendSectionsListDisplay); 
        height: var(--frontendSectionsListHeight); 
        flex-direction: var(--frontendSectionsListFlexDirection);
        overflow: scroll; 
    }
    #frontendCategories 
    { 
        position: fixed; 
        display: flex; 
        left: 32%; 
        top: var(--frontendCategoriesTop); /* 4% */
        width: 38vw;
        margin: 0px;
        padding: 4px 0px 0px 0px;
        /* overflow-x: scroll; */
        user-select: none;
        opacity: 1;
        justify-content: center;
        /* border-bottom: 3px solid var(--colorText); */
        background-color: transparent;
    }
    #frontendCategoriesList { display: flex; width: 26vw; overflow-x: scroll; }
    #frontendData 
    { 
        position: fixed; 
        display: block; 
        margin: 0px;
        padding: 0px;
        height: auto; 
        width: 38vw; 
        left: 32%; 
        top: var(--frontendDataTop); /* 12% */
        overflow-y: scroll;
        user-select: none;
        opacity: 1;
        /* border: 1px solid #822c8c66;  */
        background-color: transparent;
    }
    #confirmChanges { display: none; padding: 60px 0px 0px 0px; }
    #underlayModal { position: fixed; display: none; height: 100vh; width: 100vw; opacity: 0.9; z-index: 1; background-color: black; }
    #dataObjModalPreviewImages 
    { 
        display: inline-flex; 
        width: -webkit-fill-available; 
        margin: auto;
        overflow-x: scroll;
        border: 16px solid black;
        border-top: 0px solid black;
        border-bottom: 0px solid black;
        background-color: black;
    }
    #galleryImagesTitle { padding-bottom: 4px; background-color: #1D212E; }
    #frontendDataRows { max-height: var(--frontendDataRowsHeight); overflow-y: scroll; }
    #frontendDataTitleTimeline { margin: 0px 0px 30px 0px; }
    #frontendDataTitleMultiline { margin: 0px 0px 6px 0px; }
    #frontendDataTitleTextlist { margin: 0px 0px 8px 0px; }
    #frontendDataTitleImageGallery { margin: 30px; text-align: center; }
    #categoryNavigatorModal 
    { 
        position: fixed;
        display: none;
        max-height: 60vh;
        width: 34vw;
        left: 33%;
        top: 10%;
        margin: 0px;
        padding: 0px;
        z-index: 2;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        /* border: 3px solid #822c8b; */
        /* background-color: #1D212E; */
    }
    #sectionNavigatorModal 
    { 
        position: fixed;
        display: none;
        max-height: 60vh;
        width: 34vw;
        left: 33%;
        top: 10%;
        margin: 0px;
        padding: 0px;
        z-index: 2;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        /* border: 3px solid #822c8b; */
        /* background-color: #1D212E; */
    }
    #underlayModal { position: fixed; display: none; height: 100vh; width: 100vw; opacity: 0.96; z-index: 2; background-color: black; }
    #selectedCategoryTitle
    {
        margin: 0px; 
        padding: 0px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 32px; 
        font-weight: bold;
        text-transform: capitalize;
        white-space: nowrap;
        overflow-x: scroll;
        color: var(--colorText);
        border: 0px solid white;
        background-color: transparent;
    }
    #aboutModal 
    {
        position: fixed;
        display: none;
        max-height: 60vh;
        width: 28vw;
        top: 10%;
        left: 34%;
        margin: 0px;
        padding: 40px;
        z-index: 2;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        /* border: 3px solid var(--colorText); */
        /* background-color: #1D212E; */
    }
    #searchModal 
    {
        position: fixed;
        display: none;
        max-height: auto;
        width: 26vw;
        top: 16%;
        left: 36%;
        margin: 0px;
        padding: 0px;
        z-index: 2;
        /* -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; */
        /* overflow-y: scroll; */
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        /* border: 1px solid var(--colorText); */
        background-color: transparent;
    }
    #searchModalResults 
    {
        display: block;
        max-height: 49vh;
        width: auto;
        margin: 0px;
        padding: 0px;
        z-index: 2;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        /* border: 1px solid var(--colorText); */
        /* background-color: transparent; */
    }
    #searchModalInput 
    { 
        width: -webkit-fill-available;
        margin: auto;
        font-size: 24px; 
        font-weight: bold; 
        padding: 10px;
        color: black;
        border: 1px solid white;
        border-style: none;
        background-color: white; 
    }
    #buttonAbout { display: none; background-image: url('/images/icons/iconInfo.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonContact {  display: none; background-image: url('/images/icons/iconContactInfo.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonFullscreen { display: none; background-image: url('/images/icons/iconFullscreen.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonSearch { display: none; background-image: url('/images/icons/iconSearch.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonStart { display: none; background-image: url('/images/icons/iconStart.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonSlideshowMode { display: none; background-image: url('/images/icons/iconSlideshow.png'); background-size: contain; background-repeat: no-repeat; }
    /* #buttonIndex { display: none; background-image: url('/images/iconIndex.png'); background-size: contain; background-repeat: no-repeat; } */
    /* #buttonEnd { display: none; } */
    #buttonSelectSections { display: none; background-image: url('/images/icons/iconSection.png'); background-size: contain; background-repeat: no-repeat; }
    #sitePasswordProtectedModal 
    { 
        display: none; 
        position: fixed; 
        height: 100vh; 
        width: 100vw;
        margin: 0px;
        padding: 20% 0px 0px 0px;
        z-index: 3; 
        background-color: #1D212E; 
    }
    #passwordProtectedPasswordInput 
    { 
        display: block;
        width: 299px;
        margin: auto; 
        padding: 10px; 
        font-size: 20px; 
        font-weight: bold;
        color: white;
        border: 1px solid white;
        background-color: black;
    }
    #passwordProtectedPasswordButton 
    { 
        display: block;
        width: 321px;
        margin: auto; 
        padding: 10px; 
        font-size: 20px; 
        font-weight: bold;
        border: 0px solid white;
    }
    #passwordProtectedStatusMessage { display: none; font-weight: bold; font-size: 20px; text-shadow: 0px 1px black; }
    #pageStart 
    { 
        display: none; 
        position: fixed; 
        height: 100vh;
        width: 100vw; 
        z-index: 1;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: var(--backgroundPageStart);
        background-color: var(--colorSectionBackground);
    }
    #pageIndex 
    { 
        display: none; 
        position: fixed; 
        height: 100vh; 
        width: 100vw; 
        z-index: 1; 
        background-color: black;
        /* background-color: var(--colorSectionBackground); */
    }
    #pageEnd 
    { 
        display: none; 
        position: fixed; 
        height: 100vh; 
        width: 100vw; 
        z-index: 1; 
        background-size: cover;
        background-repeat: no-repeat;
        background-image: var(--backgroundPageEnd);
        background-color: var(--colorSectionBackground); 
    }
    #pageIndexSections { display: block; height: 80vh; margin: 10vh 0px 0px 0px; overflow-y: scroll; }
    #pageStartTitle 
    { 
        max-width: 60vw;
        margin: auto;
        margin-top: 36vh; 
        font-size: 60px; 
        font-weight: bold;
        text-shadow: 0px 1px black;
        white-space: nowrap;
        overflow-x: scroll;
    }
    #pageStartText 
    {
        max-width: 60vw;
        margin: auto;
        font-size: 29px; 
        font-weight: bold;
        text-shadow: 0px 1px black;
        white-space: nowrap;
        opacity: 0.6;
        overflow-x: scroll;
    }
    #pageEndTitle 
    { 
        max-width: 60vw;
        margin: auto;
        margin-top: 36vh; 
        font-size: 60px; 
        font-weight: bold;
        text-shadow: 0px 1px black;
        white-space: nowrap;
        overflow-x: scroll;
    }
    #pageEndText 
    { 
        max-width: 60vw;
        margin: auto;
        font-size: 29px; 
        font-weight: bold;
        text-shadow: 0px 1px black;
        white-space: nowrap;
        opacity: 0.6;
        overflow-x: scroll;
    }
    #mobileNavigatorButton { display: none; }
    #mobileNavigatorModal { display: none; }
    #loadingScreen 
    {
        display: none;
        position: fixed;
        margin: 0px;
        padding: 0px;
        padding-top: 27vh;
        height: 90vh;
        width: 100vw;
        z-index: 10;
        background-color: #1a1a1a;
    }
    #loadingScreen img { max-width: 97vw; -webkit-user-drag: none; }
    #categoryUnderlay 
    { 
        position: fixed;
        height: 100vh; 
        width: 100vw; 
        margin: auto; 
        padding: 0px;
        z-index: 0;
        opacity: 0.49;
        color: white;
        background-color: var(--colorSectionBackground);
        background-image: none;
        background-size: cover;
        background-repeat: no-repeat;
    }
    #searchModalTotalHits 
    { 
        display: block;
        padding: 18px 20px 18px 20px; 
        font-size: 20px; 
        font-weight: bold;
        text-align: left;
        user-select: none;
        opacity: 0.6;
        color: white;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1); 
        text-align: center; 
    }
    #searchModalHitsCategories 
    { 
        display: flex;
        width: -webkit-fill-available;
        padding: 18px 20px 18px 20px; 
        font-size: 20px; 
        font-weight: bold;
        text-align: left;
        user-select: none;
        opacity: 0.6;
        overflow-x: scroll;
        color: white;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1); 
        text-align: center; 
    }
    #searchHitCategoryAll { opacity: 1; }
    #infoAboutTitle { margin: 0px 0px 12px 0px; }
    #infoContactTitle { margin: 60px 0px 0px 0px; }
    #infoKeybindsTitle { margin: 60px 0px 12px 0px; }
    #infoMousebindsTitle { margin: 60px 0px 12px 0px; }
    /* #infoPrivacyPolicyTitle { margin: 60px 0px 12px 0px; } */
    #contactEmail { margin: 12px 0px 20px 22%; }
    #contactName { margin: 0px 0px 20px 22%; }
    #contactPhone { margin: 0px 0px 20px 22%; }
    #contactCountry { margin: 0px 0px 0px 22%; }
    #slideshowModal 
    { 
        position: fixed; 
        display: none; 
        top: 0px; 
        left: 0px; 
        height: 100vh; 
        width: 100vw;
        z-index: 10;
        background-color: var(--colorSectionBackground);;
    }
    #slideshowSectionStart 
    { 
        display: block; 
        margin: 43vh 0px 0px 0px; 
        padding: 0px; 
        font-size: 60px; 
        font-weight: bold; 
        user-select: none;
        text-transform: capitalize;
        color: var(--colorText) 
    }
    #slideshowTitle 
    { 
        display: block; 
        margin: 60px 0px 30px 0px; 
        padding: 0px; 
        font-size: 49px; 
        font-weight: bold; 
        user-select: none;
        text-transform: capitalize;
        color: var(--colorText) 
    }
    #slidesCurrentPageNumber 
    { 
        display: block; 
        position: fixed; 
        bottom: 8px; 
        left: 24px; 
        font-size: 20px; 
        font-weight: bold; 
        opacity: 0.2; 
        color: white;
    }
    #slideshowData { display: block; max-height: 76vh; margin: auto; overflow-y: scroll; user-select: none; user-drag: none; }
    #mobileLandscapeStartSlideshow { display: none; }
    #mobileLandscapeStartSlideshowText { display: none; }
    #mobilePortraitExitSlideshow { display: none; }
    #mobilePortraitExitSlideshowText { display: none; }
    #mobileLandscapeNavArrows { display: none; }
    #mobileExitSlideshow { display: none; }
    #selectedSectionPageEnd { display: none; }
    #infoSlideshowMode { display: none; }


    /*** classes ***/
    .section
    { 
        max-height: var(--navIconSizeHeight);
        min-height: var(--navIconSizeHeight);
        max-width: var(--navIconSizeWidth);
        min-width: var(--navIconSizeWidth);
        margin: auto;
        margin: 13px 16px 13px 16px;
        padding: 10px;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0px 1px #1D212E;
        text-transform: capitalize;
        user-select: none;
        color: white;
        border-radius: var(--navIconTypeBorderRadius);
        background-color: var(--colorNavIcons);
        /* border: 1px solid hwb(0deg 0% 100% / 20%);  */
    }
    .category 
    { 
        width: max-content;
        margin: 0px; 
        padding: 20px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 32px; 
        font-weight: bold;
        text-transform: capitalize;
        white-space: nowrap;
        overflow-x: scroll;
        user-select: none;
        color: var(--colorText); /* #822c8b */
        /* border: 1px solid white; */
        /* background-color: #1D212E; */
    }
    .selectSection 
    { 
        width: max-content;
        margin: 0px; 
        padding: 20px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 32px; 
        font-weight: bold;
        text-transform: capitalize;
        white-space: nowrap;
        overflow-x: scroll;
        user-select: none;
        /* text-transform: uppercase; */
        color: var(--colorText); /* #822c8b */
        /* border: 1px solid white; */
        /* background-color: #1D212E; */
    }
    .navigatorModalTitle 
    { 
        margin: 0px; 
        padding: 20px 20px 10px 24px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 46px; 
        font-weight: bold;
        text-transform: capitalize;
        overflow-x: scroll;
        color: var(--colorText); /* #822c8b */
        /* border: 1px solid white; */
        /* background-color: #1D212E; */
    }
    .dot { display: inline-block; padding: 0px 10px 0px 0px; color: white; opacity: 0.4; }
    .data 
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 0px;
        padding: 36px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        text-shadow: 0px 1px #1D212E;
        overflow-x: scroll;
        opacity: 1;
        /* opacity: 0.1;  */
        color: white; /* #1D212E */
        /* border: 0px solid #822c8b; */
        border-top: 4px solid rgba(255, 255, 255, 0.02);
        /* background-color: #822c8b; */
    }
    .frontendDataTitle 
    { 
        margin: 0px; 
        font-size: 22px;
        font-weight: bold;
        text-align: left; 
        text-shadow: 0px 1px #1D212E;
        color: var(--colorText); 
    }
    .frontendDataData 
    { 
        display: block; 
        color: var(--colorText); 
        text-shadow: 0px 1px #1D212E;
    }
    .imageGallery { display: flex; overflow-x: scroll; flex-direction: column; }
    .multiline 
    { 
        display: inline-block; 
        margin: 12px 0px 12px 0px; 
        font-size: 20px; 
        opacity: 0.7; 
        text-shadow: 0px 1px #1D212E;
        user-select: text;
        color: var(--colorText); 
    }
    .singleline
    {
        margin: 10px 0px 10px 0px; 
        font-size: 20px; 
        text-align: left; 
        white-space: nowrap; 
        opacity: 0.7; 
        overflow-x: scroll;
        text-shadow: 0px 1px #1D212E;
        user-select: text;
        color: var(--colorText); 
    }
    .timeline 
    { 
        display: flex;
        flex-direction: row; 
        margin: 20px 0px 20px 0px; 
        font-size: 20px; 
        /* opacity: 0.7;  */
        /* white-space: nowrap; */
        text-shadow: 0px 1px #1D212E;
        color: var(--colorText); 
    }
    .galleryImageSource 
    { 
        display: block; 
        height: auto; 
        width: calc(38vw - 8px);
        user-select: none; 
        -webkit-user-drag: none; 
        border: 0px solid black;
        /* border-top: 4px solid rgba(255, 255, 255, 0.02); */
        border-bottom: 4px solid rgba(255, 255, 255, 0.02);
        border-left: 4px solid rgba(255, 255, 255, 0.02);
        border-right: 4px solid rgba(255, 255, 255, 0.02);
    }
    /* .galleryImageSource:hover { zoom: 120%; } */
    .linklist 
    { 
        display: inline-block; 
        margin: 10px 0px 10px 0px; 
        font-size: 20px; 
        text-decoration: none; 
        opacity: 0.7;
        text-shadow: 0px 1px #1D212E;
        color: var(--colorText); 
    }
    .linklistContainer { white-space: nowrap; overflow-x: scroll; }
    .textlist 
    { 
        display: inline-block; 
        margin: 6px 0px 6px 0px; 
        font-size: 20px; 
        opacity: 0.7;
        text-shadow: 0px 1px #1D212E;
        color: var(--colorText); 
    }
    .textlistContainer { white-space: nowrap; overflow-x: scroll; }
    .galleryImagePos { display: none; position: relative; width: max-content; margin: 0px; padding: 0px; top: 29px; left: 14px; opacity: 0.7; }
    .galleryImageDescription 
    { 
        display: block;
        width: 90%;
        margin: auto; 
        margin-top: 30px; 
        margin-bottom: 30px; 
        padding: 0px; 
        font-size: 19px;
        font-weight: bold;
        text-align: center;
        opacity: 0.7;
        /* white-space: nowrap; */
        overflow-x: scroll;
        user-select: text;
        text-shadow: 0px 1px #1D212E;
        color: var(--colorText);
    }
    .timelineDataObj 
    { 
        margin: -20px 0px 0px 0px; 
        padding: 40px 0px 40px 0px;
        text-shadow: 0px 1px #1D212E;
        border-left: 3px solid var(--colorText); 
    }
    .dataMultiline 
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 0px;
        padding: 36px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        overflow-x: scroll;
        opacity: 1;
        border-top: 4px solid rgba(255, 255, 255, 0.02);
    }
    .dataSingleline 
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 0px;
        padding: 36px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        overflow-x: scroll;
        opacity: 1;
        border-top: 4px solid rgba(255, 255, 255, 0.02);
    }
    .dataTimeline 
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 0px;
        padding: 36px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        overflow-x: scroll;
        opacity: 1;
        border-top: 4px solid rgba(255, 255, 255, 0.02);
    }
    .dataLinklist
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 0px;
        padding: 36px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        overflow-x: scroll;
        opacity: 1;
        border-top: 4px solid rgba(255, 255, 255, 0.02);
    }
    .dataTextlist
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 0px;
        padding: 36px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        overflow-x: scroll;
        opacity: 1;
        border-top: 4px solid rgba(255, 255, 255, 0.02);
    }
    .dataGalleryimages 
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 0px;
        padding: 0px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        text-shadow: 0px 1px #1D212E;
        overflow-x: scroll;
        opacity: 1;
        /* opacity: 0.1;  */
        /* border: 0px solid #822c8b; */
        border-top: 4px solid rgba(255, 255, 255, 0.02);
        /* background-color: #822c8b; */
    }
    .modalTitle { margin: 0px; font-size: 28px; font-weight: bold; }
    .contactCategory { display: flex; margin: 0px; flex-direction: row; justify-content: left; align-items: center; }
    .contactDetailText 
    { 
        display: inline-block; 
        margin: 0px 0px 0px 22px;
        padding: 0px; 
        font-weight: bold; 
        font-size: 20px; 
        user-select: text;
        white-space: nowrap;
        overflow-x: scroll;
        opacity: 0.7;
    }
    .contactDetailThumbnail { display: inline-block; margin: 0px 0px 0px 20px; height: 60px; width: auto; user-select: none; -webkit-user-drag: none; }
    .pageTitle 
    { 
        display: none; 
        font-size: 32px; 
        font-weight: bold; 
        margin-top: 60px; 
        text-shadow: 0px 1px #1D212E;
    }
    .extraPage { user-select: none; }
    .indexSection 
    { 
        display: block; 
        margin: 0px; 
        padding: 0px; 
        font-size: 32px; 
        font-weight: bold; 
        text-shadow: 0px 1px #1D212E;
    }
    .indexCategory 
    { 
        display: block; 
        margin: 0px; 
        padding: 0px; 
        font-size: 20px; 
        font-weight: bold; 
        text-shadow: 0px 1px #1D212E;
        opacity: 0.7; 
    }
    .pageIndexSection { display: block; margin: 0px 0px 40px 0px; }
    .categoryNavigatorModalItems
    {
        position: fixed;
        display: block;
        max-height: 60vh;
        width: 34vw;
        left: 33%;
        top: 19%;
        margin: 0px;
        padding: 0px;
        z-index: 2;
        text-align: -webkit-center;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        /* border: 3px solid #822c8b; */
        /* background-color: #1D212E; */
    }
    .categoryContainer { display: block; overflow-x: scroll; }
    .sectionNavigatorModalItems
    {
        position: fixed;
        display: block;
        max-height: 60vh;
        width: 34vw;
        left: 33%;
        top: 19%;
        margin: 0px;
        padding: 0px;
        z-index: 2;
        text-align: -webkit-center;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        /* border: 3px solid #822c8b; */
        /* background-color: #1D212E; */
    }
    .selectSectionContainer { display: block; overflow-x: scroll; }
    .searchResultItem 
    { 
        display: flex;
        padding: 18px 20px 18px 20px; 
        font-size: 20px; 
        font-weight: bold;
        text-align: left;
        user-select: none;
        opacity: 0.6;
        white-space: nowrap;
        overflow-x: scroll;
        color: white;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1); 
    }
    .searchResultImage 
    { 
        display: flex;
        flex-direction: column;
        padding: 18px 20px 18px 20px; 
        font-size: 20px; 
        font-weight: bold;
        text-align: left;
        user-select: none;
        opacity: 0.6;
        color: white;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1); 
    }
    .searchResultDataText { white-space: nowrap; overflow-x: scroll; }
    .searchResultDataImage { height: auto; width: -webkit-fill-available; }
    .searchResultDataDescription
    { 
        display: inline-block;
        margin: 16px 1px 0px 1px;
        width: -webkit-fill-available; 
        overflow-x: scroll; 
        white-space: nowrap; 
        vertical-align: super;
        text-align: center; 
    }
    .dotSearchItem { display: inline-block; margin: 0px 8px 0px 8px; opacity: 0.4; }
    .dotKeybindItem { display: inline-block; margin: 0px 10px 0px 10px; opacity: 0.4; vertical-align: super; }
    .dotMousebindItem { display: inline-block; margin: 0px 10px 0px 10px; opacity: 0.4; vertical-align: super; }
    .dotSearchCategory { display: inline-block; margin: 0px 8px 0px 8px; opacity: 0.2; }
    .searchHitCategory { display: block; white-space: nowrap; opacity: 0.2; }
    .searchResultDataType { opacity: 0.6; }
    .infoItem { margin: 0px; margin: 0px; padding: 0px; font-weight: bold; font-size: 20px; opacity: 0.7; }
    /* .privacyPolicyItem { margin: 0px; margin: 6px 0px 6px 27%; padding: 0px; font-weight: bold; font-size: 20px; opacity: 0.7; text-align: left } */
    .infoItemKeybind { margin: 16px 0px 16px 28%; padding: 0px; font-weight: bold; font-size: 20px; opacity: 0.7; text-align: left; }
    .infoItemMousebind { margin: 16px 0px 16px 0px; padding: 0px; font-weight: bold; font-size: 20px; opacity: 0.7; text-align: center; }
    .timelineText { display: inline-block; padding: 3px 0px 0px 10px; opacity: 0.7; }
    .timelineYear { display: inline-block; white-space: nowrap; }
    .infoItemKeybindName { display: inline-block; font-size: 36px; }
    .infoItemKeybindNameNotSingleKey { display: inline-block; font-size: 26px; vertical-align: super; }
    .infoItemMousebindName { display: inline-block; font-size: 26px; vertical-align: super; }
    .infoItemKeybindDescription { display: inline-block; vertical-align: super; font-size: 24px; opacity: 0.9; }
    .infoItemMousebindDescription { display: inline-block; vertical-align: super; font-size: 24px; opacity: 0.9; }
    .slideshowImage 
    { 
        position: absolute;
        height: 100vh;
        width: 100vw;
        top: 0px;
        left: 0px;
        user-select: none; 
        user-drag: none; 
        -webkit-user-drag: none;
        z-index: -1;
        opacity: 1;
        border: 1px solid rgba(255, 255, 255, 0.1); 
    }
    .slideshowImageDescription 
    { 
        position: absolute;
        width: -webkit-fill-available;
        bottom: 40px;
        margin: auto;
        font-size: 22px; 
        font-weight: bold; 
        text-align: center;
        text-shadow: 0px 1px black;
        opacity: 1; 
    }
    .slideshowItemMultiline { width: 49%; margin: auto; margin-bottom: 20px; font-size: 24px; font-weight: bold; opacity: 0.7; }
    .slideshowItemTextlist { width: 40%; margin: auto; margin-bottom: 30px; font-size: 26px; font-weight: bold; text-align: center; opacity: 0.7; }
    .slideshowItemLinklist { margin: 0px 0px 10px 0px; font-size: 24px; font-weight: bold; opacity: 1; }
    .slideshowItemTimeline { width: 40%; margin: auto; margin-bottom: 80px;  }
    .slideshowItemTimelineYear { margin: 0px 0px 0px 0px; font-size: 30px; font-weight: bold; text-align: left; opacity: 1; }
    .slideshowItemTimelineText { margin: 0px 0px 0px 0px; font-size: 24px; font-weight: bold; text-align: left; opacity: 0.7; }
    .slideshowSingleline { margin: 0px 0px 0px 0px; font-size: 24px; font-weight: bold; text-align: center; opacity: 0.7; }
    .slideshowItemLinklistLink { margin: 0px 0px 40px 0px; font-size: 24px; font-weight: bold; text-align: center; opacity: 0.7; }
    .slideshowStartText { margin: 0px 0px 0px 0px; font-size: 24px; font-weight: bold; text-align: center; opacity: 0.7; }
    .slideshowEndText { margin: 0px 0px 0px 0px; font-size: 24px; font-weight: bold; text-align: center; opacity: 0.7; }

    
    /*** mobile ***/
    @media screen and (max-width: 1000px) and (orientation: portrait)
    {
        #frontendSections { bottom: 0px; height: auto; width: -webkit-fill-available; margin: 0px; padding: 0px; }
        #frontendSectionsList { flex-direction: row; height: auto; justify-content: center; } 
        #frontendCategories { width: 80vw; top: 3vh; left: 0%; margin: 0px 10vw 0px 10vw; }
        #frontendData { width: 80vw; left: 0%; margin: 0px 10vw 0px 10vw; }
        #frontendDataRows { max-height: 76vh; }
        #sectionNavigatorModal { width: 80vw; top: 4%; left: 0%; margin: 0px 10vw 0px 10vw; }
        #categoryNavigatorModal { width: 80vw; top: 4%; left: 0%; margin: 0px 10vw 0px 10vw; }
        #searchModal { width: 80vw; top: 4%; left: 0%; margin: 0px 10vw 0px 10vw; }
        #aboutModal 
        {
            display: block;
            max-height: 84vh;
            width: 80vw; 
            top: 4%; 
            left: 0%; 
            margin: 0px 10vw 0px 10vw;
            padding: 0px;
            overflow-y: scroll;
            border: 0px;
            background-color: transparent;
        }
        #infoSlideshowMode { display: block; }
        #infoSlideshowModeTitle { display: block; margin: 60px 0px 6px 0px; }
        #infoBindings { display: none; }
        #contactEmail { margin: 12px 0px 20px 3%; }
        #contactName { margin: 0px 0px 20px 3%; }
        #contactPhone { margin: 0px 0px 20px 3%; }
        #contactCountry { margin: 0px 0px 0px 3%; }
        #pageStartTitle { max-width: 80vw; margin: auto; margin-top: 40vh; font-size: 34px; }
        #pageStartText { max-width: 80vw; margin: auto; font-size: 22px; }
        #pageEndTitle { max-width: 80vw; margin: auto; margin-top: 40vh; font-size: 34px; }
        #pageEndText { max-width: 80vw; margin: auto; font-size: 22px; }
        #searchModalHitsCategories { padding-top: 0px; }
        #searchModalResults { max-height: 70vh; }
        #buttonSlideshowMode { display: none; }
        #mobileLandscapeStartSlideshow { display: none; }
        #mobileLandscapeStartSlideshowText { display: none; }
        #mobileExitSlideshow { display: none; }
        #mobilePortraitExitSlideshow 
        { 
            position: fixed; 
            display: none; 
            top: 0px; 
            left: 0px; 
            width: 100vw; 
            height: 100vh;
            z-index: 20;
            background-color: black;  
        }
        #mobilePortraitExitSlideshowText
        {
            display: block; 
            width: fit-content; 
            margin: auto;
            margin-top: 42vh;
            font-size: 30px; 
            font-weight: bold; 
            color: white; 
        }
        #mobileLandscapeNavArrows { display: none; }
        /* #buttonFullscreen { display: none; } */

        .section { margin: 13px 16px 18px 16px; } /* 13px 13px 18px 13px */
        .dataSingleline { padding: 30px 0px 30px 0px; }
        .dataMultiline { padding: 30px 0px 30px 0px; }
        .dataTextlist { padding: 30px 0px 30px 0px; }
        .dataTimeline { padding: 30px 0px 30px 0px; }
        .dataLinklist { padding: 30px 0px 30px 0px; }
        .galleryImageDescription { width: 80vw; }
        .galleryImageSource { width: 80vw; border: 0px solid white; }
        .categoryNavigatorModalItems { max-height: 74vh; width: 80vw; top: 16%; left: 0%; margin: 0px 10vw 0px 10vw; }
        .sectionNavigatorModalItems { max-height: 74vh; width: 80vw; top: 16%; left: 0%; margin: 0px 10vw 0px 10vw; }
        .timeline { flex-direction: column; }
        .textlist { width: -webkit-fill-available; margin: 2px 0px 2px 0px; white-space: nowrap; overflow-x: scroll; }
        .privacyPolicyItem { margin: 0px 0px 2px 0px; text-align: center; }
    }

    @media screen and (max-width: 1000px) and (orientation: landscape)
    {
        #mobileLandscapeStartSlideshow 
        { 
            position: fixed; 
            display: block; 
            top: 0px; 
            left: 0px; 
            width: 100vw; 
            height: 100vh;
            z-index: 20;
            background-color: black; 
        }
        #mobileLandscapeStartSlideshowText 
        { 
            display: block; 
            width: fit-content; 
            margin: auto;
            margin-top: 42vh;
            font-size: 30px; 
            font-weight: bold; 
            color: white; 
        }
        #mobilePortraitExitSlideshow { display: none; }
        #mobilePortraitExitSlideshowText { display: none; }
        #slideshowSectionStart { font-size: 40px; margin: 42vh 0px 0px 0px; }
        #slideshowTitle { margin: 20px 0px 12px 0px; font-size: 34px; }
        #slideshowData { max-width: 90vw; max-height: 70vh; }
        #slidesCurrentPageNumber { top: initial; bottom: -16px; left: 10px; right: initial; font-size: 22px; opacity: 0.09; }
        #mobileLandscapeNavArrows 
        { 
            position: fixed;
            display: flex;
            flex-direction: row;
            width: fill-content;
            bottom: -6px;
            right: 12px;
            z-index: 10;
            font-size: 49px;
            opacity: 0.09;
            color: white;
        }
        #mobileLandscapePreviousSlide { margin-top: 9px; margin-right: 10px; rotate: 180deg ;}
        #mobileExitSlideshow 
        { 
            position: fixed; 
            display: block; 
            top: -6px;
            left: 6px; 
            font-size: 34px;
            font-weight: bold; 
            z-index: 10;
            opacity: 0.09;
            color: white; 
        }

        .slideshowItemLinklistText { font-size: 20px; }
        .slideshowItemLinklistLink { font-size: 20px; }
        .slideshowSingleline { font-size: 20px; }
        .slideshowItemTimeline { width: 90%; margin-bottom: 49px; }
        .slideshowItemTimelineYear { font-size: 27px; }
        .slideshowItemTimelineText { font-size: 20px; }
        .slideshowItemTextlist { width: auto; font-size: 20px; margin-bottom: 12px; }
        .slideshowItemMultiline { width: 90%; font-size: 20px; }
        .slideshowImage { position: absolute; height: 100vh; width: 100vw; top: -1px; left: -1px; z-index: -1; opacity: 1; filter: brightness(70%); }
        .slideshowImageDescription 
        { 
            position: absolute; 
            width: 90vw; 
            bottom: 13vh;
            margin: 0px;
            padding: 0px;
            font-size: 18px;
            z-index: -1;
            opacity: 0.9;
            white-space: nowrap;
            overflow-x: scroll; 
        }
    }
</style>