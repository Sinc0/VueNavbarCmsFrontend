<template>
    <div id="componentFrontend">
        <!-- router -->
        <div hidden id="routerCurrentPathElement" v-if="router">{{router.currentRoute.value.fullPath}}</div>
        

        <!-- category underlay -->
        <div id="categoryUnderlay" v-on:click="categoryUnderlaySetOpacity('0.6')"></div>


        <!-- sections nav bar -->
        <div id="frontendSections">
            <div id="frontendSectionsList">
                <div id="buttonStart" class="section" v-on:click="setRoutePath('start')">ㅤ</div>
                <div id="buttonSelectSections" class="section" v-on:click="loadSectionNavigatorModal()">ㅤ</div>
                <div id="buttonAbout" class="section" v-on:click="loadAboutModal()">ㅤ</div>
                <div id="buttonFullscreen" class="section" v-on:click="fullscreen()"></div>
                <div id="buttonSearch" class="section" v-on:click="loadSearchModal()">ㅤ</div>
                <!-- <div id="buttonContact" class="section" v-on:click="loadContactModal()">ㅤ</div> -->
                <!-- <div id="buttonIndex" class="section" v-on:click="setRoutePath('index')">ㅤ</div> -->
                <!-- <div id="buttonEnd" class="section" v-on:click="setRoutePath('end')">Eㅤ</div> -->
            </div>
        </div>


        <!-- selected category -->
        <div id="frontendCategories" v-if="frontendCategories">
            <div id="selectedCategoryTitle" v-on:click.left="loadCategoryNavigatorModal()" v-on:click.middle="loadNextCategory()">
            </div>
        </div>


        <!-- data -->
        <div id="frontendData">

            <!-- select data row -->
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
                                <span id="timelineYear">━━━ {{item.year}} </span>
                                <span id="timelineText">━━━🞂 {{item.text}}</span>
                            </div>
                        </div>
                    </div>

                    <!-- linklist -->
                    <div class="dataLinklist" v-else-if="data.type == 'linklist' && data.hidden == 'false'">
                        <!-- title -->
                        <div id="frontendDataTitleLinklist" class="frontendDataTitle">{{data.title}}</div>

                        <!-- data -->
                        <div class="frontendDataData" v-for="item in loadDataData(data)">
                            <a class="linklist" v-bind:href="item.link">⮩⠀{{item.text}}</a>
                        </div>
                    </div>

                    <!-- textlist -->
                    <div class="dataTextlist" v-else-if="data.type == 'textlist' && data.hidden == 'false'">
                        <!-- title -->
                        <div id="frontendDataTitleTextlist" class="frontendDataTitle">{{data.title}}</div>

                        <div class="frontendDataData" v-for="item in loadDataData(data)">
                            <!-- <div class="">{{item}}</div> -->
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

                        <div class="frontendDataData">
                            <!-- first gallery image -->
                            <p v-bind:id="'galleryImagePos#' + data.pos" class="galleryImagePos">{{firstGalleryImage.pos}}/{{totalImgs}}</p>
                            <img v-bind:id="'imageGallery#' + data.pos" class="galleryImageSource" v-bind:src='firstGalleryImage.image' v-bind:alt='(firstGalleryImage.pos - 1)' v-on:click.left="nextImageGalleryItem(data.pos, data.data)" v-on:click.right="previousImageGalleryItem(data.pos, data.data)" />
                            <p v-bind:id="'galleryImageDescription#' + data.pos" class="galleryImageDescription">{{firstGalleryImage.pos}}/{{totalImgs}} · {{firstGalleryImage.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- extra page: start -->
        <div id="pageStart" class="extraPage">
            <!-- title -->
            <div id="pageStartTitle" v-if="frontendSettings">{{frontendSettings.pageStartTitle}}</div>
            <div id="pageStartText" v-if="frontendSettings">{{frontendSettings.pageStartText}}</div>
        </div>


        <!-- extra page: index -->
        <div id="pageIndex" class="extraPage">
            <!-- <p class="pageTitle">Index</p> -->

            <div id="pageIndexSections" v-if="frontendSections && frontendCategories">
                <div class="pageIndexSection" v-for="item in frontendSections">
                    <p class="indexSection">{{item.title}}</p>
                    <!-- <p class="indexSection">{{item.pos}}. {{item.title}}</p> -->

                    <div v-for="c in frontendCategories">
                        <p class="indexCategory" v-if="item.title == c.section" v-on:click="loadCategoryData(c.section, c.title, c.pos)">
                            · {{c.title}}
                            <!-- {{indexCategoryAsLetter(c.pos)}}. {{c.title}} -->
                        </p>
                    </div>
                </div>
            </div>
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
            <p class="navigatorModalTitle">Sections</p>
            <!-- <p class="navigatorModalTitle">Sections · {{frontendSections.length}}</p> -->

            <div class="categoryNavigatorModalItems">
                <!-- <p class="selectSection" v-on:click="setRoutePath('start')">· Start</p> -->
                <!-- <p class="selectSection" v-on:click="setRoutePath('index')">· Index</p> -->
                
                <div id="" v-for="(item, index) in sortFrontendSections(frontendSections)">
                    <div v-if="item.hidden == 'false'" class="selectSection" v-on:click="setRoutePath(item.title)">{{item.title}}</div>
                    <!-- {{index + 1}} · {{item.title}} -->
                    <!-- {{item.pos}}: {{item.title}} -->
                </div>
                
                <p class="selectSection" v-on:click="setRoutePath('end')">End</p>
            </div>
        </div>


        <!-- modal: navigator categories -->
        <div id="categoryNavigatorModal" v-if="frontendCategories">
            <p class="navigatorModalTitle">Categories</p> <!-- Categories · {{currentSection}} -->
            <!-- <p class="navigatorModalTitle">Categories · {{frontendCategoriesSelected.length}}</p> -->

            <div class="categoryNavigatorModalItems">
                <div id="" v-for="(item, index) in sortFrontendCategories(frontendCategories)" v-on:click="setRoutePath(item.section + '/' + item.title)">
                    <div id="" v-if="item.hidden == 'false'" class="category">{{item.title}}</div>
                    <!-- {{index + 1}} · {{item.title}} -->
                </div>
            </div>
        </div>


        <!-- modal: about -->
        <div id="aboutModal" v-if="frontendSettings">
        
            <!-- about -->
            <p id="aboutTitle" class="modalTitle">About</p>
            <div id="infoAboutText">
                <p id="aboutText">{{frontendSettings.buttonAboutText}}</p>
            </div>
            
            <!-- contact -->
            <p id="aboutTitle" class="modalTitle">Contact</p>
            <div id="infoContactDetails" v-if="frontendContact">
                <div id="contactEmail" class="contactCategory" v-if="frontendContact.email">
                    <img src="/iconContactEmail.png" class="contactDetailThumbnail" />
                    <p class="contactDetailText">{{frontendContact.email}}</p>
                </div>

                <div id="contactName" class="contactCategory" v-if="frontendContact.name">
                    <img src="/iconContactName.png" class="contactDetailThumbnail" />
                    <p class="contactDetailText">{{frontendContact.name}}</p>
                </div>
                
                <div id="contactPhone" class="contactCategory" v-if="frontendContact.phone">
                    <img src="/iconContactPhone.png" class="contactDetailThumbnail" />
                    <p class="contactDetailText">{{frontendContact.phone}}</p>
                </div>
                
                <div id="contactCountry" class="contactCategory" v-if="frontendContact.country">
                    <img src="/iconContactCountry.png" class="contactDetailThumbnail" />
                    <p class="contactDetailText">{{frontendContact.country}}</p>
                </div>
            </div>
            
            <!-- keybinds -->
            <p id="aboutTitle" class="modalTitle">Keybinds</p>
            
            <!-- privacy policy -->
            <p id="aboutTitle" class="modalTitle">Privacy Policy</p>
        </div>


        <!-- modal: contact -->
        <div id="contactModal" v-if="frontendContact">
            <p id="contactTitle" class="modalTitle">Contact</p>
            
            <div id="contactEmail" class="contactCategory" v-if="frontendContact.email">
                <img src="/iconContactEmail.png" class="contactDetailThumbnail" />
                <p class="contactDetailText">{{frontendContact.email}}</p>
            </div>

            <div id="contactName" class="contactCategory" v-if="frontendContact.name">
                <img src="/iconContactName.png" class="contactDetailThumbnail" />
                <p class="contactDetailText">{{frontendContact.name}}</p>
            </div>
            
            <div id="contactPhone" class="contactCategory" v-if="frontendContact.phone">
                <img src="/iconContactPhone.png" class="contactDetailThumbnail" />
                <p class="contactDetailText">{{frontendContact.phone}}</p>
            </div>
            
            <div id="contactCountry" class="contactCategory" v-if="frontendContact.country">
                <img src="/iconContactCountry.png" class="contactDetailThumbnail" />
                <p class="contactDetailText">{{frontendContact.country}}</p>
            </div>
        </div>


        <!-- modal: password protected -->
        <div id="sitePasswordProtectedModal">
            <!-- <p>Site is Password Protected</p> -->
            <input hidden id="passwordProtectedDomainName" value="" />
            <input id="passwordProtectedPasswordInput" type="password" placeholder="Enter Password..." @keyup.enter="fetchProtectedDomain()" />
            <input id="passwordProtectedPasswordButton" type="button" value="Enter" v-on:click="fetchProtectedDomain()" />
            <p id="passwordProtectedStatusMessage">Status Message</p>
        </div>


        <!-- modal: loading screen -->
        <div id="loadingScreen"><img src="/loadingAnimation.gif" /></div>


        <!-- modal: search -->
        <div id="searchModal">

            <!-- search result categories -->
            <div id="searchModalHitsCategories" v-if="frontendSearchResults">
                
                <!-- search results: all -->
                <div id="searchHitCategoryAll" class="searchHitCategory" v-on:click="selectSearchHitsCategory('all')">
                    All ({{frontendSearchResults.length}})
                </div>
                <div class="dotSearchCategory"> · </div>

                <!-- search results: images -->
                <div id="searchHitCategoryImages" class="searchHitCategory" v-on:click="selectSearchHitsCategory('images')">
                    Images ({{filterSearchResults('images', frontendSearchResults).length}})
                </div>
                <div class="dotSearchCategory"> · </div>

                <!-- search results: texts -->
                <div id="searchHitCategoryTexts" class="searchHitCategory" v-on:click="selectSearchHitsCategory('texts')">
                    Others ({{filterSearchResults('texts', frontendSearchResults).length}})
                </div>
                <div class="dotSearchCategory"> · </div>

                <!-- search results: sections -->
                <div id="searchHitCategorySections" class="searchHitCategory" v-on:click="selectSearchHitsCategory('sections')">
                    Sections ({{filterSearchResults('sections', frontendSearchResults).length}})
                </div>
                <div class="dotSearchCategory"> · </div>

                <!-- search results: categories -->
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


        <!-- mobile -->
        <!-- <div id="mobileNavigatorButton" v-on:click="displayMobileNavigator()"></div> -->
        <!-- <div id="mobileNavigatorModal"> -->
            <!-- <p class="selectSection">Select Section:</p> -->

            <!-- <p class="selectSection" v-on:click="loadAboutModal()">About</p> -->
            <!-- <p class="selectSection" v-on:click="">Info</p> -->
            <!-- <p class="selectSection" v-on:click="">Contact</p> -->
            <!-- <p class="selectSection" v-on:click="">Search</p> -->
            <!-- <p class="selectSection" v-on:click="">---</p> -->
            <!-- <p class="selectSection" v-on:click="setRoutePath('index')">Index</p> -->
            
            <!-- <p class="selectSection" v-on:click="setRoutePath('start')">Start</p> -->
            <!-- <div id="" class="selectSection" v-for="item in sortFrontendSections(frontendSections)" v-on:click="loadSectionCategories(item, '', '')"> -->
                <!-- {{item.title}} -->
                <!-- {{item.pos}}: {{item.title}} -->
            <!-- </div> -->
            
            <!-- <p class="selectSection" v-on:click="setRoutePath('end')">End</p> -->
        <!-- </div> -->
    </div>
</template>


<script>
import {useStore} from 'vuex'
import {computed, onMounted, onUpdated, toRaw} from 'vue'
import {useRouter} from 'vue-router'

export default {
  setup() {
    //vue
    const store = useStore()
    const router = useRouter()


    //variables
    const BACKEND_API = "http://127.0.0.1:8000"
    const frontendSections = computed(() => { return store.getters['storage/frontendSections']})
    const frontendCategories = computed(() => { return store.getters['storage/frontendCategories']})
    const frontendData = computed(() => { return store.getters['storage/frontendData']})
    const frontendDataSelected = computed(() => { return store.getters['storage/frontendDataSelected']})
    const frontendSettings = computed(() => { return store.getters['storage/frontendSettings']})
    const frontendContact = computed(() => { return store.getters['storage/frontendContact']})
    const frontendSearchResults = computed(() => { return store.getters['storage/frontendSearchResults']})
    const frontendSearchString = computed(() => { return store.getters['storage/frontendSearchString']})


    //globals
    var selectedCategory = ""
    var selectedSection = ""
    var selectedCategoryPos = ""
    var settings = ""
    var selectedElement = ""


    //lifecycle hook: on mounted
    onMounted(() => { console.log("componentFrontend mounted"); fetchDomain() })
    

    //lifecycle hook: on updated
    onUpdated(() => {
        console.log("componentFrontend updated")
        
        //variables
        let routerCurrentPathElement = document.getElementById("routerCurrentPathElement").innerText
        let routeParams = router.currentRoute.value.params
        let routeCurrentPath = router.currentRoute.value.fullPath
        let routePreviousPath = router.options.history.state.back
        let currentRouteString = router.currentRoute.value.fullPath

        //debugging
        // console.log(routeParams)
        // console.log(routePreviousPath)
        // console.log(routeCurrentPath)
        // console.log(routerCurrentPathElement)
        
        //load route
        if(routeCurrentPath != routePreviousPath) { handleRouting(routeParams) }
    })


    //event listener: keyboard
    document.addEventListener('keyup', function(e) 
    { 
        //debugging
        // console.log(e)

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
    })
    

    //event listener: default browser context menu
    document.addEventListener('contextmenu', function(e)
    {
        //prevent default browser right click window
        e.preventDefault()
    })
    

    //event listener: mouse scroll wheel
    document.addEventListener('wheel', function(e) {
        //elements 
        let searchModalHitsCategories = document.getElementById("searchModalHitsCategories")
        
        //categories horizontal scroll
        if (e.deltaY > 0) { if(searchModalHitsCategories != null) { searchModalHitsCategories.scrollLeft += 60; } }
        else { if(searchModalHitsCategories != null) { searchModalHitsCategories.scrollLeft -= 60; } }
    })
    

    //functions
    async function fetchDomain()
    {   
        //debugging
        // console.log(router.currentRoute.value)
        // console.log(router.currentRoute.value.fullPath)

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
            console.log(data)

            //fetch domain successful
            if(data.status == "fetch specific domain successful") { setDomainData(data) }

            //fetch domain failed
            if(data.status == "fetch specific domain failed") { router.push("/") }
            else if(data.status == "domain does not exist") { router.push("/") }
            else if(data.status == "domain is password protected")
            {
                let sitePasswordProtectedModal = document.getElementById("sitePasswordProtectedModal")
                let passwordProtectedDomainName = document.getElementById("passwordProtectedDomainName")
                
                sitePasswordProtectedModal.style.display = "block"
                passwordProtectedDomainName.value = data.domainName
            }
        })
    }


    function loadSectionCategories(data, routeSection, routeCategory)
    {   
        //elements
        let settingsCategoriesIcon = document.getElementById("settingsCategoriesIcon")
        let frontendData = document.getElementById("frontendData")
        let frontendCategoriesList = document.getElementById("frontendCategoriesList")
        let selectedSectionElement = document.getElementById("section#" + data.pos)
        let pageStart = document.getElementById("pageStart")
        let pageEnd = document.getElementById("pageEnd")
        // let pageIndex = document.getElementById("pageIndex")
        // let categoryElements = document.getElementsByClassName("category")
        // let sectionElements = document.getElementsByClassName("section")

        //variables
        let arrayCategories = []
        let firstCategory = ""

        //set selected section
        selectedSection = data.title
        
        //set array categories
        for(let c in frontendCategories.value)
        {
            if(frontendCategories.value[c].section == data.title) { arrayCategories.push(frontendCategories.value[c]) }
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
        let selectCategoryElement = document.getElementById("category#" + position)
        let frontendDataElement = document.getElementById("frontendData")
        let addNewDataRow = document.getElementById("addNewDataRow")
        let selectedCategoryTitle = document.getElementById("selectedCategoryTitle")
        let frontendDataRows = document.getElementById("frontendDataRows")
        let componentFrontend = document.getElementById("componentFrontend")
        let categoryUnderlay = document.getElementById("categoryUnderlay")
        let categories = document.getElementsByClassName("category")
        
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
            if(categoryUnderlay) { categoryUnderlay.style.opacity = "0.6" }
            undisplayModals()
        }, 20)
    }


    // function loadDataType(data)
    // {   
    //     //variables
    //     let value = ""

    //     //parse json
    //     try { data = JSON.parse(data) } 
    //     catch (error) { }
        
    //     //set data type
    //     if(data.type == undefined) { value = "null" }
    //     else { value = data.title }

    //     //return value
    //     return value
    // }


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

        //debuggin
        // console.log(value)
        
        return value
    }   


    // function loadDataInputs(data, type)
    // {   
    //     //variables
    //     let arrayData = []

    //     //set data
    //     data = data.toString()
    //     data = data.replace("data,", "")
    //     data = data.replaceAll("'", "\"")
    //     data = JSON.parse(data)
        
    //     //type: gallery images
    //     if(type == "galleryImages")
    //     {
    //         for(let item in data) { arrayData.push(data[item]) }

    //         arrayData = arrayData.sort((a, b) => { return a.pos - b.pos })

    //         return arrayData
    //     }

    //     //type: others
    //     else { return data }
    // }


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


    function sortFrontendCategories(data)
    {
        //variables
        let categories = []

        //add category data to array
        for(let c in data)
        {
            if(data[c].section == selectedSection) { categories.push(data[c]) }
        }

        //sort categories by position
        categories = categories.sort((a, b) => { return a.pos - b.pos })

        //return value
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

        //return value
        return sections
    }


    function firstLetterToUpperCase(value)
    {
        return value.toString().substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
    }


    function loadCategoryNavigatorModal()
    {
        //debugging
        console.log("loadCategoryNavigatorModal")

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
        console.log("loadSectionNavigatorModal")

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
        console.log("loadAboutModal")

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


    // function loadContactModal()
    // {
    //     //debugging
    //     console.log("loadContactModal")

    //     //elements
    //     let contactModal = document.getElementById("contactModal")
    //     let underlayModal = document.getElementById("underlayModal")
        
    //     //update elements
    //     if(contactModal.style.display == "none" || contactModal.style.display == "")
    //     {
    //         contactModal.style.display = "block"
    //         underlayModal.style.display = "block"
    //     }
    //     else if(contactModal.style.display == "block")
    //     {
    //         contactModal.style.display = "none"
            
    //     }
    // }


    function undisplayModals()
    {
        //elements
        let underlayModal = document.getElementById("underlayModal")
        let categoryNavigatorModal = document.getElementById("categoryNavigatorModal")
        let sectionNavigatorModal = document.getElementById("sectionNavigatorModal")
        let aboutModal = document.getElementById("aboutModal")
        let contactModal = document.getElementById("contactModal")
        let mobileNavigatorModal = document.getElementById("mobileNavigatorModal")
        let searchModal = document.getElementById("searchModal")

        //update elements
        if(underlayModal) { underlayModal.style.display = "none" }
        if(categoryNavigatorModal) { categoryNavigatorModal.style.display = "none" }
        if(aboutModal) { aboutModal.style.display = "none" }
        if(contactModal) { contactModal.style.display = "none" }
        if(sectionNavigatorModal) { sectionNavigatorModal.style.display = "none" }
        if(mobileNavigatorModal) { mobileNavigatorModal.style.display = "none" }
        if(searchModal) { searchModal.style.display = "none" }

        selectedElement = ""
    }
    

    function loadNextCategory()
    {   
        //debugging
        console.log("loadNextCategory")
        
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
            if(selectedSection == selectedSectionCategories[item].section && selectedSectionCategories[item].pos == selectedCategoryPos)
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
        console.log("loadNextCategory")

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
            if(selectedSection == selectedSectionCategories[item].section && selectedSectionCategories[item].pos == selectedCategoryPos)
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
        //debugging
        // console.log("nextImageGalleryItem")
        // console.log("currentImage: " + currentImagePos)

        //elements
        let nextImage = document.getElementById("imageGallery#" + imageGalleryId)
        let galleryImagePos = document.getElementById("galleryImagePos#" + imageGalleryId)
        let categoryUnderlay = document.getElementById("categoryUnderlay")
        let galleryImageDescription = document.getElementById("galleryImageDescription#" + imageGalleryId)

        //variables
        let data = JSON.parse(imageGalleryData.replaceAll("'", "\""))
        let newImagePos = parseInt(nextImage.alt) + 1
        let totalGalleryImages = data.length

        //check error
        if(newImagePos >= totalGalleryImages) { newImagePos = 0 }
        
        //set image background opacity
        if(categoryUnderlay.style.opacity == "0.6" || categoryUnderlay.style.opacity == "") 
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
        //debugging
        // console.log("previousImageGalleryItem")
        // console.log("currentImage: " + currentImagePos)

        //elements
        let previousImage = document.getElementById("imageGallery#" + imageGalleryId)
        let galleryImagePos = document.getElementById("galleryImagePos#" + imageGalleryId)
        let categoryUnderlay = document.getElementById("categoryUnderlay")
        let galleryImageDescription = document.getElementById("galleryImageDescription#" + imageGalleryId)

        //variables
        let data = JSON.parse(imageGalleryData.replaceAll("'", "\""))
        let newImagePos = parseInt(previousImage.alt) - 1
        let totalGalleryImages = data.length

        //check error
        if(newImagePos <= -1) { newImagePos = totalGalleryImages - 1}

        //set image background opacity
        if(categoryUnderlay.style.opacity == "0.6" || categoryUnderlay.style.opacity == "") 
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
        console.log("specificImageGalleryItem: " + specificImageNr)

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
        if(categoryUnderlay.style.opacity == "0.6" || categoryUnderlay.style.opacity == "") 
        { categoryUnderlay.style.opacity = "0.02"; return }
    }


    async function fetchProtectedDomain()
    {
        console.log("fetchProtectedDomain")
        
        //elements
        let passwordProtectedDomainName = document.getElementById("passwordProtectedDomainName")
        let passwordProtectedPasswordInput = document.getElementById("passwordProtectedPasswordInput")
        let sitePasswordProtectedModal = document.getElementById("sitePasswordProtectedModal")
        let statusMessage = document.getElementById("passwordProtectedStatusMessage")

        //variables
        let domainName = passwordProtectedDomainName.value
        let domainPassword = passwordProtectedPasswordInput.value
        let obj = JSON.stringify({"domainName": domainName, "domainPassword": domainPassword})

        if(domainName != '' && domainPassword != '')
        {
            //fetch protected domain data
            await fetch(BACKEND_API + "/domain-protected", {method: 'post', body: obj})
            .then((response) => { return response.json() })
            .then((data) => {
                //debugging
                console.log(data)

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


    function setDomainData(data)
    {   
        console.log(data.settings)

        //elements
        let loadingScreen = document.getElementById("loadingScreen")
        let buttonSelectSections = document.getElementById("buttonSelectSections")
        let buttonStartElement = document.getElementById("buttonStart")
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
        
        //set html title
        document.title = capitalizeString(route.domain.replaceAll("-", " "))
        
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
            setTimeout(() => { loadingScreen.style.display = "none"}, 3000)
        }

        //set route
        handleRouting(route)

        //set styling
        setTimeout(() => {
            //set pages
            if(settings.pageStart == "true") { buttonStartElement.style.display = "block" }

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
            document.documentElement.style.setProperty("--backgroundPageStart", "url('" + settings.pageStartBackgroundImage + ")")
            document.documentElement.style.setProperty("--backgroundPageEnd", "url('" +  settings.pageEndBackgroundImage + ")")
            document.documentElement.style.setProperty("--navTop", navTop);
            document.documentElement.style.setProperty("--navBottom", navBottom);
            document.documentElement.style.setProperty("--navLeft", navLeft);
            document.documentElement.style.setProperty("--navRight", navRight);
            document.documentElement.style.setProperty("--navIconSizeHeight", navIconSizeHeight)
            document.documentElement.style.setProperty("--navIconSizeWidth", navIconSizeWidth)
            document.documentElement.style.setProperty("--navIconTypeBorderRadius", navIconTypeBorderRadius)
            document.documentElement.style.setProperty("--frontendDataRowsHeight", frontendDataRowsMaxHeight);
            document.documentElement.style.setProperty("--frontendSectionsHeight", frontendSectionsHeight);
            document.documentElement.style.setProperty("--frontendSectionsWidth", frontendSectionsWidth);
            document.documentElement.style.setProperty("--frontendSectionsFlexDirection", frontendSectionsFlexDirection);
            document.documentElement.style.setProperty("--frontendSectionsPadding", frontendSectionsPadding);
            document.documentElement.style.setProperty("--frontendSectionsMargin", frontendSectionsMargin);
            document.documentElement.style.setProperty("--frontendSectionsListHeight", frontendSectionsListHeight);
            document.documentElement.style.setProperty("--frontendSectionsListDisplay", frontendSectionsListDisplay);
            document.documentElement.style.setProperty("--frontendSectionsListFlexDirection", frontendSectionsListFlexDirection);
            document.documentElement.style.setProperty("--frontendCategoriesTop", frontendCategoriesTop);
            document.documentElement.style.setProperty("--frontendDataTop", frontendDataTop);
            document.documentElement.style.setProperty("--frontendDataRowsMaxHeight", frontendDataRowsMaxHeight);
            document.documentElement.style.setProperty("--colorLoadingScreen", settings.colorLoadingScreen)
            document.documentElement.style.setProperty("--colorNavBackground", settings.colorNavBackground)
            document.documentElement.style.setProperty("--colorNavIcons", settings.colorNavIcons)
            document.documentElement.style.setProperty("--colorNavIconsText", settings.colorNavIconsText)
            document.documentElement.style.setProperty("--colorText", settings.colorText); // document.documentElement.style.cssText = "--colorText: green"; // document.documentElement.setAttribute("style", "--colorText: green");
            document.documentElement.style.setProperty("--colorSectionBackground", settings.colorSectionBackground)
        }, 100)
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
        let contactModal = document.getElementById("contactModal")
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
        if(contactModal) { contactModal.style.display = "none" }
        if(searchModal) { searchModal.style.display = "none" }
        buttonStart.style.opacity = "1"
        // buttonIndex.style.opacity = "1"
    }


    function indexCategoryAsLetter(value)
    {   
        //variables
        let letter = ""

        //set letter
        if(value == '1') { letter = "A" }
        else if(value == '2') { letter = "B" }
        else if(value == '3') { letter = "C" }
        else if(value == '4') { letter = "D" }
        else if(value == '5') { letter = "E" }
        else if(value == '6') { letter = "F" }
        else if(value == '7') { letter = "G" }
        else if(value == '8') { letter = "H" }
        else if(value == '9') { letter = "I" }
        else if(value == '10') { letter = "J" }
        else if(value == '11') { letter = "K" }
        else if(value == '12') { letter = "L" }
        else if(value == '13') { letter = "M" }
        else if(value == '14') { letter = "N" }
        else if(value == '15') { letter = "O" }
        else if(value == '16') { letter = "P" }
        else if(value == '17') { letter = "Q" }
        else if(value == '18') { letter = "R" }
        else if(value == '19') { letter = "S" }
        else if(value == '20') { letter = "T" }
        else if(value == '21') { letter = "U" }
        else if(value == '22') { letter = "V" }
        else if(value == '23') { letter = "W" }
        else if(value == '24') { letter = "X" }
        else if(value == '25') { letter = "Y" }
        else if(value == '26') { letter = "Z" }
        else { letter = value }

        //return value
        return letter
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
        console.log("setRoutePath")

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
        console.log("handleRouting")

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
                console.log("search same")
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
        for(let item in frontendSections.value)
        {
            if(route.section && route.section.toLowerCase() == frontendSections.value[item].title.toLowerCase()) 
            { sectionObj = frontendSections.value[item] }
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
                
                //debugging
                // console.log("rowDivId: " + rowDivId)
                // console.log("rowDivImagePos: " + rowDivImage)
                // console.log("itemType: " + itemType)
                // console.log("searchItemSpecified: " + searchItemSpecified)
                // console.log(searchItemObj)
                
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
        let sectionObj = ""
        let nextSectionObj = ""
        let totalSections = frontendSections.value.length - 1
        let id = ""

        //set section id
        for(let item in frontendSections.value)
        {
            sectionObj = frontendSections.value[item]
            
            if(item >= totalSections) { id = 0; break }
            else if(selectedSection == sectionObj.title) { id = parseInt(item) + 1; break }
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
        let sectionObj = ""
        let previousSectionObj = ""
        let totalSections = frontendSections.value.length - 1
        let id = ""

        //set section id
        if(selectedSection.toLowerCase() == frontendSections.value[0].title.toLowerCase()) { id = totalSections }
        else
        {
            for(let item in frontendSections.value)
            {
                sectionObj = frontendSections.value[item]
                
                if(selectedSection.toLowerCase() == sectionObj.title.toLowerCase()) { id = parseInt(item) - 1; break }
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
        //variables
        let words = value.split(" ")
        let newValue = ""

        //format words
        for(let item in words)
        {
            newValue += words[item].substring(0, 1).toUpperCase() + words[item].substring(1, words[item].length) + " "
        }

        return newValue
    }


    function loadSearchModal()
    {
        //debugging
        console.log("loadSearchModal")

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
        console.log("search: " + value)

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

        //debugging
        // console.log(sectionHitsObjects)
        // console.log(categoryHitsObjects)
        // console.log(dataHitsObjects)
        // console.log("searchResults")
        // console.log(searchResults)

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

        //return value
        return results
    }


    function selectSearchHitsCategory(type)
    {   
        //debuggin
        console.log("selectSearchHitsCategory: " + type)

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


    // function displayLoadingScreen()
    // {
    //     //elements
    //     let loadingScreen = document.getElementById("loadingScreen")

    //     //update elements
    //     loadingScreen.style.display = "block"
    //     document.body.style.overflow = 'hidden' //hide scrollbar
    // }


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
        router,
        // frontendCategoriesSelected,

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
        displayExtraPage,
        indexCategoryAsLetter,
        fullscreen,
        displayMobileNavigator,
        setRoutePath,
        categoryUnderlaySetOpacity,
        search,
        setSearchPath,
        filterSearchResults,
        selectSearchHitsCategory
        // loadDataType,
        // loadDataInputs,
        // loadContactModal,
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
    /*** scrollbars */
    #frontendData::-webkit-scrollbar { height: 0px; width: 0px; }
    #frontendDataRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #frontendSectionsList::-webkit-scrollbar { height: 0px; width: 0px; }
    #categoryNavigatorModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #sectionNavigatorModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #searchModalResults::-webkit-scrollbar { height: 0px; width: 0px; }
    .categoryNavigatorModalItems::-webkit-scrollbar { height: 0px; width: 0px; }
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
        color: var(--colorText);
        border: 0px solid white;
        background-color: transparent;
    }
    #aboutModal 
    {
        position: fixed;
        display: none;
        max-height: 60vh;
        width: 34vw;
        top: 20%;
        left: 30%;
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
        border: 3px solid var(--colorText);
        background-color: #1D212E;
    }
    #contactModal 
    {
        position: fixed;
        display: none;
        max-height: 60vh;
        width: 20vw;
        top: 20%;
        left: 36%;
        /* top: 50%; */
        /* left: 50%; */
        /* transform: translate(-50%, -50%); */
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
        border: 3px solid var(--colorText);
        background-color: #1D212E;
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
    #buttonAbout { display: none; background-image: url('/iconInfo.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonContact {  display: none; background-image: url('/iconContactInfo.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonFullscreen { display: none; background-image: url('/iconFullscreen.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonSearch { display: none; background-image: url('/iconSearch.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonStart { display: none; background-image: url('/iconStart.png'); background-size: contain; background-repeat: no-repeat; }
    /* #buttonIndex { display: none; background-image: url('/iconIndex.png'); background-size: contain; background-repeat: no-repeat; } */
    /* #buttonEnd { display: none; } */
    #buttonSelectSections { display: none; background-image: url('/iconSection.png'); background-size: contain; background-repeat: no-repeat; }
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
    #pageStartTitle { margin: 36vh 0px 0px 0px; font-size: 60px; font-weight: bold; text-shadow: 0px 1px black; }
    #pageStartText { margin: 20px 0px 0px 0px; font-size: 29px; font-weight: bold; opacity: 0.6; text-shadow: 0px 1px black; }
    #pageEndTitle { margin: 36vh 0px 0px 0px; font-size: 60px; font-weight: bold; text-shadow: 0px 1px black; }
    #pageEndText { margin: 20px 0px 0px 0px; font-size: 29px; font-weight: bold; opacity: 0.6; text-shadow: 0px 1px black; }
    #mobileNavigatorButton { display: none; }
    #mobileNavigatorModal { display: none; }
    #aboutTitle { }
    #aboutText { margin: 0px; margin-top: 20px; padding: 0px; font-weight: bold; font-size: 20px; }
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
        opacity: 0.6;
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
    /* #data1 { margin-top: calc(-49px - 1px); } */


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
        width: fit-content;
        margin: 0px; 
        padding: 20px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 32px; 
        font-weight: bold;
        text-transform: capitalize;
        color: var(--colorText); /* #822c8b */
        /* border: 1px solid white; */
        /* background-color: #1D212E; */
    }
    .selectSection 
    { 
        width: fit-content;
        margin: 0px; 
        padding: 20px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 32px; 
        font-weight: bold;
        text-transform: capitalize;
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
        color: var(--colorText); /* #822c8b */
        /* border: 1px solid white; */
        /* background-color: #1D212E; */
    }
    .dot { display: inline-block; padding: 0px 10px 0px 0px; color: white; }
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
        display: inline-block; 
        margin: 20px 0px 20px 0px; 
        font-size: 20px; 
        opacity: 0.7; 
        white-space: nowrap;
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
        margin: 20px 0px 0px 0px; 
        font-size: 20px; 
        text-decoration: none; 
        opacity: 0.7;
        text-shadow: 0px 1px #1D212E;
        color: var(--colorText); 
    }
    .textlist 
    { 
        display: inline-block; 
        margin: 10px 0px 10px 0px; 
        font-size: 20px; 
        opacity: 0.7;
        text-shadow: 0px 1px #1D212E;
        color: var(--colorText); 
    }
    .galleryImagePos { display: none; position: relative; width: max-content; margin: 0px; padding: 0px; top: 29px; left: 14px; opacity: 0.7; }
    .galleryImageDescription 
    { 
        display: block;
        width: 90%;
        margin: auto; 
        margin-top: 30px; 
        margin-bottom: 30px; 
        padding: 0px; 
        font-size: 20px;
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
        margin: 0px 0px 0px 4px; 
        padding: 40px 0px 0px 0px;
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
    .contactCategory { display: flex; margin: 40px 0px 0px 0px; flex-direction: row; justify-content: left; align-items: center; }
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
    .dotSearchCategory { display: inline-block; margin: 0px 8px 0px 8px; opacity: 0.2; }
    .searchHitCategory { display: block; white-space: nowrap; opacity: 0.2; }
    .searchResultDataType { opacity: 0.6; }

    
    /*** mobile ***/
    /* @media screen and (max-width: 1000px) 
    {
        #componentFrontend { height: 100vh; width: 100vw; overflow-x: hidden; }
        #frontendSections { display: none; }
        #frontendSectionsList { display: none; }
        #mobileNavigatorButton 
        { 
            display: block;
            position: fixed;
            bottom: 10px;
            right: 10px;
            height: 40px; 
            width: 40px;
            z-index: 3;
            border-radius: 90%;
            background-color: var(--colorNavBackground); 
        }
        #mobileNavigatorModal
        {
            position: fixed;
            height: 100vh;
            width: calc(100vw - 20px);
            padding: 3vw;
            z-index: 3;
            overflow-y: scroll;
            background-color: var(--colorNavBackground);
        }
        #frontendData { width: 100vw; left: initial; }
        #frontendCategories 
        { 
            width: 100vw; 
            left: initial; 
            top: initial; 
            margin-top: 20px; 
            margin-bottom: 0px; 
            z-index: 1;
            background-color: var(--colorSectionBackground);
        }
        #frontendDataTitleImageGallery { margin: 40px; }
        #aboutModal { top: 0px; left: 0px; height: 80vh; max-height: initial; width: 100vw; padding: 10vh 0px 10vh 0px; border: 0px solid white; }

        .galleryImageDescription { margin-top: 40px; margin-bottom: 40px; }
        .galleryImageSource { width: 80vw; margin: auto; }
        .dataSingleline { padding: 40px; }
        .dataMultiline { padding: 40px; }
        .dataLinklist { padding: 40px; }
        .dataTextlist { padding: 40px; }
        .dataTimeline { padding: 40px; }
        .galleryImagePos { top: 29px; left: 49px; }
    }    */
</style>