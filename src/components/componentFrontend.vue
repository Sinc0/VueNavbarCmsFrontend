<template>
    <div id="componentFrontend">

        <!-- modal: password protected -->
        <div id="sitePasswordProtectedModal">
            <!-- <p>Site is Password Protected</p> -->
            <input hidden id="passwordProtectedDomainName" value="" />
            <input id="passwordProtectedPasswordInput" type="password" placeholder="Enter Password..." @keyup.enter="fetchProtectedDomain()" />
            <input id="passwordProtectedPasswordButton" type="button" value="Enter" v-on:click="fetchProtectedDomain()" />
            <p id="passwordProtectedStatusMessage">Status Message</p>
        </div>
        
        <!-- sections -->
        <div id="frontendSections">
            <div id="frontendSectionsList">
                <div id="buttonStart" class="section" v-on:click="displayExtraPage('start')">ㅤ</div>
                <div id="buttonIndex" class="section" v-on:click="displayExtraPage('index')">ㅤ</div>
                <div id="buttonEnd" class="section" v-on:click="displayExtraPage('end')">ㅤ</div>
                <div id="buttonSelectSections" class="section" v-on:click="loadSectionNavigatorModal()">ㅤ</div>
                <div id="buttonAbout" class="section" v-on:click="loadAboutModal()">ㅤ</div>
                <div id="buttonContact" class="section" v-on:click="loadContactModal()">ㅤ</div>
                <div id="buttonFullscreen" class="section"></div>
                <div id="buttonSearch" class="section">ㅤ</div>
                <div v-bind:id="'section#' + section.pos" class="section" v-for="section in sortFrontendSections(frontendSections)" v-on:click="loadSectionCategories(section)" v-bind:title="section.title">
                    {{section.pos}}
                </div>
            </div>
        </div>

        <!-- categories -->
        <div id="frontendCategories" v-if="frontendCategoriesSelected">
            <!-- variables -->
            <div hidden>{{firstCategory = sortFrontendCategories(frontendCategoriesSelected)[0]}}</div>
            
            <!-- select category -->
            <div id="selectedCategoryTitle" v-on:click.left="loadCategoryNavigatorModal()" v-on:click.middle="loadNextCategory()">
                {{firstCategory.title}}
            </div>

            <!-- <div id="frontendCategoriesList">
                <input type="button" v-bind:id="'category#' + category.pos" class="category" 
                    v-for="category in sortFrontendCategories(frontendCategoriesSelected)" 
                    v-on:click="loadCategoryData(category.section , category.title, category.pos)" 
                    v-bind:value="category.title" 
                />
            </div>  -->
        </div>

        <!-- data -->
        <div id="frontendData">
            <!-- select data row -->
            <div id="frontendDataRows">
                <div v-bind:id="'data' + data.pos" v-bind:class="'data' + firstLetterToUpperCase(data.type)" v-for="data in sortFrontendDataSelected(frontendDataSelected)">
                    <!-- type: multiline -->
                    <div id="" v-if="data.type == 'multiline'">
                        <!-- title -->
                        <div id="frontendDataTitleMultiline" class="frontendDataTitle">{{data.title}}</div>
                        
                        <div class="frontendDataData" v-for="item in loadDataData(data)">
                            <!-- <div class="">{{item}}</div> -->
                            <div class="multiline">{{item.text}}</div>
                        </div>
                    </div>
                    
                    <!-- type: singleline -->
                    <div id="" v-else-if="data.type == 'singleline'">
                        <!-- variables -->
                        <div hidden>{{singlelineData = loadDataData(data)}}</div>

                        <!-- title -->
                        <div id="frontendDataTitleSingleline" class="frontendDataTitle">{{data.title}}</div>

                        <!-- data -->
                        <div class="singleline frontendDataData" v-if="singlelineData != ''">{{singlelineData}}</div>
                    </div>

                    <!-- type: timeline -->
                    <div id="" v-else-if="data.type == 'timeline'">
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

                    <!-- type: linklist -->
                    <div id="" v-else-if="data.type == 'linklist'">
                        <!-- title -->
                        <div id="frontendDataTitleLinklist" class="frontendDataTitle">{{data.title}}</div>

                        <div class="frontendDataData" v-for="item in loadDataData(data)">
                            <!-- <div class="">{{item}}</div> -->
                            <!-- <span class="dot">• </span> -->
                            <a class="linklist" v-bind:href="item.link">⮩⠀{{item.text}}</a>
                        </div>
                    </div>

                    <!-- type: textlist -->
                    <div id="" v-else-if="data.type == 'textlist'">
                        <!-- title -->
                        <div id="frontendDataTitleTextlist" class="frontendDataTitle">{{data.title}}</div>

                        <div class="frontendDataData" v-for="item in loadDataData(data)">
                            <!-- <div class="">{{item}}</div> -->
                            <div class="textlist">•⠀{{item.text}}</div>
                        </div>
                    </div>

                    <!-- type: galleryImages -->
                    <div class="imageGallery" v-else-if="data.type == 'galleryImages'">
                        <div hidden>{{firstGalleryImage = loadDataData(data)[0]}}</div>

                        <!-- title -->
                        <div id="frontendDataTitleImageGallery" class="frontendDataTitle" v-if="data.title != ''">{{data.title}}</div>

                        <div class="frontendDataData">
                            <!-- <div class="">{{firstGalleryImage}}</div> -->

                            <!-- first gallery image -->
                            <p id="" class="galleryImagePos">{{firstGalleryImage.pos}}</p>
                            <img v-bind:id="'imageGallery#' + data.pos" class="galleryImageSource" v-bind:src='firstGalleryImage.image' v-bind:alt='(firstGalleryImage.pos - 1)' v-on:click="nextImageGalleryItem('imageGallery#' + data.pos, data.data, firstGalleryImage.pos)" />
                            <p id="" class="galleryImageDescription">{{firstGalleryImage.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- extra page: start -->
        <div id="pageStart" class="extraPage">
            <p class="pageTitle">Start</p>
            <div id="pageStartTitle" v-if="frontendSettings">{{frontendSettings.pageStartTitle}}</div>
            <div id="pageStartText" v-if="frontendSettings">{{frontendSettings.pageStartText}}</div>
        </div>

        <!-- extra page: index -->
        <div id="pageIndex" class="extraPage">
            <p class="pageTitle">Index</p>

            <div id="pageIndexSections" v-if="frontendSections && frontendCategories">
                <div class="pageIndexSection" v-for="item in frontendSections">
                    <p class="indexSection">{{item.pos}}. {{item.title}}</p>

                    <div v-for="c in frontendCategories">
                        <p class="indexCategory" v-if="item.title == c.section">{{indexCategoryAsLetter(c.pos)}}. {{c.title}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- extra page: end -->
        <div id="pageEnd" class="extraPage" v-if="frontendSettings">
            <p class="pageTitle">End</p>
            <div id="pageEndTitle">{{frontendSettings.pageEndTitle}}</div>
            <div id="pageEndText">{{frontendSettings.pageEndText}}</div>            
        </div>

        <!-- modal: underlay -->
        <div id="underlayModal" v-on:click="undisplayModals()">
        </div>
        
        <!-- modal: navigator categories -->
        <div id="categoryNavigatorModal">
            <p class="category">Select Category:</p>

            <div id="" class="category" v-for="item in frontendCategoriesSelected" v-on:click="loadCategoryData(item.section, item.title, item.pos)">
                {{item.title}}
            </div>
        </div>

        <!-- modal: about -->
        <div id="aboutModal" v-if="frontendSettings">
            <p id="aboutTitle" class="modalTitle">About</p>
            {{frontendSettings.buttonAboutText}}
        </div>

        <!-- modal: contact -->
        <div id="contactModal" v-if="frontendContact">
            <p id="contactTitle" class="modalTitle">Contact</p>
            <!-- {{frontendContact}} -->
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

        <!-- modal: loading screen -->
        <!-- <div id="loadingScreenModal">
        </div> -->

        <!-- modal: search -->
        <!-- <div id="searchModal">
        </div> -->

        <!-- modal: navigator sections -->
        <div id="sectionNavigatorModal">
            <p class="selectSection">Select Section:</p>

            <p class="selectSection" v-on:click="displayExtraPage('start')">Start</p>
            <p class="selectSection" v-on:click="displayExtraPage('index')">Index</p>
            
            <div id="" class="selectSection" v-for="item in sortFrontendSections(frontendSections)" v-on:click="loadSectionCategories(item)">
                {{item.title}}
                <!-- {{item.pos}}: {{item.title}} -->
            </div>
            
            <p class="selectSection" v-on:click="displayExtraPage('end')">End</p>
        </div>
    </div>
</template>


<script>
import {useStore} from 'vuex'
import {computed, onMounted, onUpdated, resolveDirective, toRaw} from 'vue'
import router from '../router'

export default {
  setup() {
    //vue
    const store = useStore()


    //variables
    const BACKEND_API = "http://127.0.0.1:8000"
    const frontendSections = computed(() => { return store.getters['storage/frontendSections']})
    const frontendCategories = computed(() => { return store.getters['storage/frontendCategories']})
    const frontendData = computed(() => { return store.getters['storage/frontendData']})
    const frontendCategoriesSelected = computed(() => { return store.getters['storage/frontendCategoriesSelected']})
    const frontendDataSelected = computed(() => { return store.getters['storage/frontendDataSelected']})
    const frontendSettings = computed(() => { return store.getters['storage/frontendSettings']})
    const frontendContact = computed(() => { return store.getters['storage/frontendContact']})


    //globals
    var selectedCategory = ""
    var selectedSection = ""
    var selectedCategoryPos = ""
    var colorNavBackground = ""
    var colorNavIcons = ""
    var colorSectionBackground = ""
    var colorText = ""
    var settings = ""


    //lifecycle hooks
    onMounted(() => { console.log("componentFrontend mounted"); fetchDomain() })
    onUpdated(() => { console.log("componentFrontend updated") })


    //key event listeners
    // document.addEventListener('keydown', function(e) 
    // { 
    //     console.log(e) 
    //     // if (e.code == 'KeyZ' && (e.ctrlKey || e.metaKey)) { alert('Undo!') }
    //     // if (e.code == 'ArrowUp') { alert('Undo!') }
    // })


    //mousewheel event listeners
    // document.addEventListener('wheel', function(e) {
    //     if(e.ctrlKey) { console.log(e) }
    //     if(e.shiftKey) { console.log(e) }
    // })
    

    //functions
    async function fetchDomain()
    {   
        //variables
        let obj = JSON.stringify({ "domain": "testDomainZ" })
        
        //fetch specific domain data
        await fetch(BACKEND_API + "/domain-specific", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            console.log(data)

            if(data.status == "domain is password protected")
            {
                let sitePasswordProtectedModal = document.getElementById("sitePasswordProtectedModal")
                let passwordProtectedDomainName = document.getElementById("passwordProtectedDomainName")
                
                sitePasswordProtectedModal.style.display = "block"
                passwordProtectedDomainName.value = data.domainName
            }

            //fetch domain successful
            else if(data.status == "fetch specific domain successful") 
            { 
                setDomainData(data)

                //load first section
                // loadSectionCategories(firstSection)
            }

            //fetch user failed
            else if(data.status == "fetch specific user failed") 
            { 
                //redirect
                // router.push("/")
            }

        })
    }


    function loadSectionCategories(data)
    {   
        //elements
        let settingsCategoriesIcon = document.getElementById("settingsCategoriesIcon")
        let frontendData = document.getElementById("frontendData")
        let frontendCategoriesList = document.getElementById("frontendCategoriesList")
        let selectedSectionElement = document.getElementById("section#" + data.pos)
        let categoryElements = document.getElementsByClassName("category")
        let sectionElements = document.getElementsByClassName("section")

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

        firstCategory = arrayCategories[0]
        
        //update vuex
        store.dispatch('storage/actionSetFrontendCategoriesSelected', arrayCategories)

        //update elements
        // for(let item in sectionElements)
        // {
        //     let element = document.getElementById(sectionElements[item].id)
        //     if(element) { element.style.opacity = "0.1" }
        // }
        // for(let item in categoryElements)
        // {
        //     let element = document.getElementById(categoryElements[item].id)
        //     if(element) { element.style.opacity = "1" }
        // }
        if(frontendData) { frontendData.style.display = "none" }       
        if(settingsCategoriesIcon) { settingsCategoriesIcon.style.display = "block" }
        if(frontendCategoriesList) { frontendCategoriesList.scrollTo(0,0) }
        if(selectedSectionElement) { selectedSectionElement.style.opacity = "1" }

        //load first category
        loadCategoryData(firstCategory.section , firstCategory.title, firstCategory.pos)
    }


    function loadCategoryData(section, category, position)
    {   
        //debugging
        // console.log(category)
        // console.log("Section: " + section)
        // console.log("Category: " + category)
        // console.log(frontendData.value)

        //elements
        let selectCategoryElement = document.getElementById("category#" + position)
        let frontendDataElement = document.getElementById("frontendData")
        let addNewDataRow = document.getElementById("addNewDataRow")
        let selectedCategoryTitle = document.getElementById("selectedCategoryTitle")
        let categories = document.getElementsByClassName("category")
        
        //variables
        let arrayData = ""

        //set globals
        selectedSection = section
        selectedCategory = category
        selectedCategoryPos = position

        //set array data
        for(let c in frontendData.value)
        {
            if(frontendData.value[c].section == selectedSection && frontendData.value[c].category == selectedCategory) 
            { 
                arrayData = frontendData.value[c].rows
            } 
        }
        
        //update vuex
        store.dispatch('storage/actionSetFrontendDataSelected', arrayData)

        //update elements
        // for(let c in categories)
        // {
        //     let e = document.getElementById(categories[c].id)
        //     if(e) { e.style.opacity = "0.1" }
        // }
        // selectCategoryElement.style.opacity = "1"
        if(frontendDataElement) { frontendDataElement.style.display = "block" }
        if(addNewDataRow) { addNewDataRow.style.display = "block" }
        if(selectedCategoryTitle) { selectedCategoryTitle.innerText = selectedCategory }
        undisplayModals()

        // setTimeout(() => {
        //     if(selectedCategoryTitle) { selectedCategoryTitle.style.color = settings.colorText }
        // }, 100)
    }


    function loadDataType(data)
    {   
        //variables
        let value = ""

        //parse json
        try { data = JSON.parse(data) } 
        catch (error) { }
        
        //null check
        if(data.type == undefined) { value = "null" }

        //set data row text
        else 
        { 
            value = data.title
            // if(data.title == "") { data.title = "no title" }
            // value = data.pos + " · " + data.title
            // value = "Row " + data.pos + " · " + "<" + data.type + ">"
            // value = data.pos + " " + data.title + " " + "<" + data.type + ">" 
            // value = data.pos + " · " + "<" + data.type + ">" 
            // value = "<> · " + data.pos + " · " + "<" + data.type + ">" 
            // value = data.pos + " · " + "<" + data.type + ">" 
            // value = "Row " + data.pos + " · " + "<" + data.type + ">" 
            // value = "Row " + data.pos + " · " + data.title + " · " + "<" + data.type + ">" 
            // value = data.title + " · " + "(" + data.type.toUpperCase() + ")" 
        }

        //return value
        return value
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
        // else 
        { 
            value = data.data
            value = value.replaceAll("'", "\"")
            if(data.type == "multiline") { value = JSON.parse(value) }
            else if(data.type == "timeline") { value = JSON.parse(value) }
            else if(data.type == "linklist") { value = JSON.parse(value) }
            else if(data.type == "textlist") { value = JSON.parse(value) }
            else if(data.type == "galleryImages") { value = JSON.parse(value) }
            // value = JSON.parse(value)
            // if(data.title == "") { data.title = "no title" }
            // value = "Row " + data.pos + " · " + "<" + data.type + ">"
            // value = data.pos + " " + data.title + " " + "<" + data.type + ">" 
            // value = data.pos + " · " + "<" + data.type + ">" 
            // value = "<> · " + data.pos + " · " + "<" + data.type + ">" 
            // value = data.pos + " · " + "<" + data.type + ">" 
            // value = "Row " + data.pos + " · " + "<" + data.type + ">" 
            // value = "Row " + data.pos + " · " + data.title + " · " + "<" + data.type + ">" 
            // value = data.title + " · " + "(" + data.type.toUpperCase() + ")" 
        }

        //return value
        console.log(value)
        return value
    }   


    function loadDataInputs(data, type)
    {   
        //debugging
        // console.log(data)

        //variables
        let arrayData = []

        //set data
        data = data.toString()
        data = data.replace("data,", "")
        data = data.replaceAll("'", "\"")
        data = JSON.parse(data)
        
        //type: gallery images
        if(type == "galleryImages")
        {
            for(let item in data) { arrayData.push(data[item]) }

            arrayData = arrayData.sort((a, b) => { return a.pos - b.pos })

            return arrayData
        }

        //type: others
        else { return data }
        // else if(type == "multiline") { return data }
        // else if(type == "timeline") { return data }
        // else if(type == "singleline") { return data }
        // else if(type == "linklist") { return data }
        // else if(type == "textlist") { return data }
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
        return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
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
            
        }
    }

    function loadContactModal()
    {
        //debugging
        console.log("loadContactModal")

        //elements
        let contactModal = document.getElementById("contactModal")
        let underlayModal = document.getElementById("underlayModal")
        
        //update elements
        if(contactModal.style.display == "none" || contactModal.style.display == "")
        {
            contactModal.style.display = "block"
            underlayModal.style.display = "block"
        }
        else if(contactModal.style.display == "block")
        {
            contactModal.style.display = "none"
            
        }
    }


    function undisplayModals()
    {
        //elements
        let underlayModal = document.getElementById("underlayModal")
        let categoryNavigatorModal = document.getElementById("categoryNavigatorModal")
        let sectionNavigatorModal = document.getElementById("sectionNavigatorModal")
        let aboutModal = document.getElementById("aboutModal")
        let contactModal = document.getElementById("contactModal")
        let pageStart = document.getElementById("pageStart")
        let pageIndex = document.getElementById("pageIndex")
        let pageEnd = document.getElementById("pageEnd")

        //update elements
        if(underlayModal) { underlayModal.style.display = "none" }
        if(categoryNavigatorModal) { categoryNavigatorModal.style.display = "none" }
        if(aboutModal) { aboutModal.style.display = "none" }
        if(contactModal) { contactModal.style.display = "none" }
        if(sectionNavigatorModal) { sectionNavigatorModal.style.display = "none" }
        if(pageStart) { pageStart.style.display = "none" }
        if(pageIndex) { pageIndex.style.display = "none" }
        if(pageEnd) { pageEnd.style.display = "none" }
    }
    

    function loadNextCategory()
    {
        //debugging
        console.log("loadNextCategory")
        // console.log(frontendCategoriesSelected.value)
        
        //elements
        let selectedCategoryTitle = document.getElementById("selectedCategoryTitle")

        //variables
        let totalCategories = frontendCategoriesSelected.value.length - 1
        let nextCategoryPos = ""
        let nextCategoryItem = ""
        let categoryPos = ""

        for(let item in frontendCategoriesSelected.value)
        {
            if(frontendCategoriesSelected.value[item].pos == selectedCategoryPos)
            {
                categoryPos = frontendCategoriesSelected.value[item].pos
                nextCategoryPos = parseInt(selectedCategoryPos)

                if(nextCategoryPos == totalCategories) { nextCategoryPos = 0 }

                console.log("nextCategoryPos: " + nextCategoryPos)

                nextCategoryItem = frontendCategoriesSelected.value[nextCategoryPos]

                loadCategoryData(nextCategoryItem.section, nextCategoryItem.title, nextCategoryItem.pos)

                selectedCategoryTitle.innerText = nextCategoryItem.title

                return
            }
        }
    }


    function nextImageGalleryItem(imageGalleryId, imageGalleryData, currentImagePos)
    {
        console.log("nextImageGalleryItem")
        console.log("currentImage: " + currentImagePos)

        let imageGallery = document.getElementById(imageGalleryId)

        console.log(imageGallery)
        console.log("image number: " + imageGallery.alt)

        let data = JSON.parse(imageGalleryData.replaceAll("'", "\""))
        let newImagePos = parseInt(imageGallery.alt) + 1
        let totalGalleryImages = data.length

        console.log("newImagePos:" + newImagePos)
        console.log(totalGalleryImages)

        if(newImagePos >= totalGalleryImages) { newImagePos = 0 }

        imageGallery.alt = newImagePos
        imageGallery.src = data[newImagePos].image

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
        let componentFrontend = document.getElementById("componentFrontend")
        let frontendSectionsElement = document.getElementById("frontendSections")
        let selectedCategoryTitle = document.getElementById("selectedCategoryTitle")
        let frontendSectionsList = document.getElementById("frontendSectionsList")
        let frontendDataRows = document.getElementById("frontendDataRows")
        let loadingScreen = document.getElementById("loadingScreen")
        let buttonSelectSections = document.getElementById("buttonSelectSections")
        let buttonStartElement = document.getElementById("buttonStart")
        let buttonIndexElement = document.getElementById("buttonIndex")
        let buttonEndElement = document.getElementById("buttonEnd")
        let sectionButtons = document.getElementsByClassName("section")
        
        //save to vuex
        store.dispatch('storage/actionSetFrontendSections', data.sections)
        store.dispatch('storage/actionSetFrontendCategories', data.categories)
        store.dispatch('storage/actionSetFrontendData', data.data)
        store.dispatch('storage/actionSetFrontendSettings', data.settings)
        
        //variables
        let settings = data.settings
        let firstSection = sortFrontendSections(frontendSections.value)[0]

        if(settings.loadingScreen == "true")
        { 
            loadingScreen.style.display = "block"
            setTimeout(() => { loadingScreen.style.display = "none"}, 1000)
        }

        //load default section
        // loadSectionCategories(firstSection)
        if(settings.pageStart == "true") { displayExtraPage('start') }
        else if(settings.pageIndex == "true") { displayExtraPage('index') }
        else { loadSectionCategories(firstSection) }


        setTimeout(() => {
            console.log(settings)
            
            //set nav icons color
            if(sectionButtons)
            {
                for(let item in sectionButtons)
                {
                    if(sectionButtons[item].style) 
                    { 
                        sectionButtons[item].style.backgroundColor = settings.colorNavIcons
                        // sectionButtons[item].style.color = data.settings.colorText
                    }
                }
            }

            //set buttons
            if(settings.pageStart == "true") { buttonStartElement.style.display = "block" }
            if(settings.pageIndex == "true") { buttonIndexElement.style.display = "block" }
            if(settings.pageEnd == "true") { buttonEndElement.style.display = "block" }
            buttonSelectSections.style.display = "block"

            //set colors
            document.documentElement.style.setProperty("--colorLoadingScreen", settings.colorLoadingScreen);
            document.documentElement.style.setProperty("--colorNavBackground", settings.colorNavBackground);
            document.documentElement.style.setProperty("--colorNavIcons", settings.colorNavIcons);
            document.documentElement.style.setProperty("--colorNavIconsText", settings.colorNavIconsText);
            document.documentElement.style.setProperty("--colorText", settings.colorText); // document.documentElement.style.cssText = "--colorText: green"; // document.documentElement.setAttribute("style", "--colorText: green");
            document.documentElement.style.setProperty("--colorSectionBackground", settings.colorSectionBackground);

            //set nav position
            if(settings.navPosition == "top") 
            { 
                document.documentElement.style.setProperty("--navTop", "0px");
                document.documentElement.style.setProperty("--navBottom", "initial");
                document.documentElement.style.setProperty("--navLeft", "initial");
                document.documentElement.style.setProperty("--navRight", "initial");

                if(frontendSectionsElement) {
                    frontendSectionsElement.style.height = "auto"
                    frontendSectionsElement.style.width = "100vw"
                    frontendSectionsElement.style.display = "flex"
                    frontendSectionsElement.style.flexDirection = "row"
                    frontendSectionsElement.style.padding = "8px 0px 8px 0px"
                }
                
                if(frontendSectionsList) {
                    frontendSectionsList.style.display = "inherit"
                    frontendSectionsList.style.height = "auto"
                    frontendSectionsList.style.display = "flex"
                    frontendSectionsList.style.flexDirection = "row"
                }

                document.documentElement.style.setProperty("--frontendCategoriesTop", "12%");
                document.documentElement.style.setProperty("--frontendDataTop", "20%");
                
                if(frontendDataRows) { frontendDataRows.style.maxHeight = "76vh" }
            }
            else if(settings.navPosition == "bottom") 
            {
                document.documentElement.style.setProperty("--navTop", "initial");
                document.documentElement.style.setProperty("--navBottom", "0px");
                document.documentElement.style.setProperty("--navLeft", "initial");
                document.documentElement.style.setProperty("--navRight", "initial");

                if(frontendSectionsElement) {
                    frontendSectionsElement.style.height = "auto"
                    frontendSectionsElement.style.width = "100vw"
                    frontendSectionsElement.style.display = "flex"
                    frontendSectionsElement.style.flexDirection = "row"
                    frontendSectionsElement.style.padding = "8px 0px 8px 0px"
                }

                if(frontendSectionsList) {
                    frontendSectionsList.style.display = "inherit"
                    frontendSectionsList.style.height = "auto"
                    frontendSectionsList.style.display = "flex"
                    frontendSectionsList.style.flexDirection = "row"
                }

                document.documentElement.style.setProperty("--frontendCategoriesTop", "4%");
                document.documentElement.style.setProperty("--frontendDataTop", "12%");

                if(frontendDataRows) { frontendDataRows.style.maxHeight = "74vh" }
            } 
            else if (settings.navPosition == "left") 
            { 
                document.documentElement.style.setProperty("--navTop", "initial");
                document.documentElement.style.setProperty("--navBottom", "initial");
                document.documentElement.style.setProperty("--navLeft", "0px");
                document.documentElement.style.setProperty("--navRight", "initial");

                if(frontendSectionsElement) {
                    frontendSectionsElement.style.height = "100vh"
                    frontendSectionsElement.style.width = "auto"
                    frontendSectionsElement.style.display = "flex"
                    frontendSectionsElement.style.flexDirection = "column"
                    frontendSectionsElement.style.padding = "10px 10px 0px 10px"
                }

                if(frontendSectionsList) {
                    frontendSectionsList.style.display = "inherit"
                    frontendSectionsList.style.height = "100vh"
                    frontendSectionsList.style.display = "flex"
                    frontendSectionsList.style.flexDirection = "column"
                }

                document.documentElement.style.setProperty("--frontendCategoriesTop", "4%");
                document.documentElement.style.setProperty("--frontendDataTop", "12%");
                
                if(frontendDataRows) { frontendDataRows.style.maxHeight = "76vh" }
            } 
            else if (settings.navPosition == "right") 
            {
                document.documentElement.style.setProperty("--navTop", "initial");
                document.documentElement.style.setProperty("--navBottom", "initial");
                document.documentElement.style.setProperty("--navLeft", "initial");
                document.documentElement.style.setProperty("--navRight", "0px");

                if(frontendSectionsElement) {
                    frontendSectionsElement.style.height = "100vh"
                    frontendSectionsElement.style.width = "auto"
                    frontendSectionsElement.style.display = "flex"
                    frontendSectionsElement.style.flexDirection = "column"
                    frontendSectionsElement.style.padding = "10px 10px 0px 10px"
                }

                if(frontendSectionsList) {
                    frontendSectionsList.style.display = "inherit"
                    frontendSectionsList.style.height = "100vh"
                    frontendSectionsList.style.display = "flex"
                    frontendSectionsList.style.flexDirection = "column"
                }

                document.documentElement.style.setProperty("--frontendCategoriesTop", "4%");
                document.documentElement.style.setProperty("--frontendDataTop", "12%");

                if(frontendDataRows) { frontendDataRows.style.maxHeight = "76vh" }
            }
            
            //set buttons
            if(settings.buttonAbout == "true") { buttonAbout.style.display = "block" }
            if(settings.buttonContact == "true") 
            { 
                buttonContact.style.display = "block"
                store.dispatch('storage/actionSetFrontendContact', data.contact)
            }
            if(settings.buttonFullscreen == "true") { buttonFullscreen.style.display = "block" }
            if(settings.buttonSearch == "true") { buttonSearch.style.display = "block" }
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

        //reset elements
        if(pageStart) { pageStart.style.display = "none" }
        if(pageIndex) { pageIndex.style.display = "none" }
        if(pageEnd) { pageEnd.style.display = "none" }

        //update elements
        if(type == "start") { pageStart.style.display = "block" }
        else if(type == "index") { pageIndex.style.display = "block" }
        else if(type == "end") { pageEnd.style.display = "block" }
        underlayModal.style.display = "none"
        sectionNavigatorModal.style.display = "none"
    }


    function indexCategoryAsLetter(value)
    {   
        let letter = ""

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

        return letter
    }

    return {
        //variables
        frontendSections,
        frontendCategories,
        frontendData,
        frontendCategoriesSelected,
        frontendDataSelected,
        frontendSettings,
        frontendContact,

        //functions
        loadSectionCategories,
        loadCategoryData,
        loadDataType,
        loadDataData,
        loadDataInputs,
        fetchDomain,
        sortFrontendDataSelected,
        sortFrontendCategories,
        sortFrontendSections,
        firstLetterToUpperCase,
        loadCategoryNavigatorModal,
        loadSectionNavigatorModal,
        undisplayModals,
        loadNextCategory,
        loadAboutModal,
        loadContactModal,
        nextImageGalleryItem,
        fetchProtectedDomain,
        displayExtraPage,
        indexCategoryAsLetter
    }
  }
}
</script>

<style>
    :root {
        --colorLoadingScreen: black;
        --colorNavBackground: black; 
        --colorNavIcons: black; 
        --colorNavIconsText: black;
        --colorSectionBackground: black;
        --colorText: black;

        --navTop: initial;
        --navBottom: initial;
        --navLeft: initial;
        --navRight: initial;
        
        --frontendCategoriesTop: initial;
        --frontendDataTop: initial;
    }
</style>
<style scoped>
    /*** css variables ***/
    /* * {
        --colorText: blue;
    } */


    /*** scrollbars */
    #frontendData::-webkit-scrollbar { height: 0px; width: 0px; }
    #frontendDataRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #frontendSectionsList::-webkit-scrollbar { height: 0px; width: 0px; }
    #categoryNavigatorModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #sectionNavigatorModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalPreviewImages::-webkit-scrollbar { height: 12px; width: 10px; }
    #dataObjModalPreviewImages::-webkit-scrollbar-track { background: black; }
    #dataObjModalPreviewImages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
    
    /*** elements ***/
    input[type='radio'] { accent-color:  #822c8b; }
    input[type='checkbox'] { accent-color:  #822c8b; }

    /*** ids ***/
    #componentFrontend { height: 100vh; width: 100vw; margin: auto; padding: 0px; color: white; background-color: var(--colorSectionBackground); }
    #frontendSections 
    { 
        position: fixed; 
        display: block; 
        height: 90vh; 
        width: 70px;
        top: var(--navTop); 
        bottom: var(--navBottom); 
        left: var(--navLeft); 
        right: var(--navRight); 
        /* max-height: 88vh;  */
        margin: 0px;
        padding: 0px 18px 10vh 16px;
        /* overflow-y: scroll; */
        user-select: none;
        opacity: 1;
        z-index: 2;
        /* border-right: 1px solid rgba(255, 255, 255, 0.6); */
        background-color: var(--colorNavBackground);
    }
    #frontendSectionsList { display: block; height: 78vh; overflow: scroll; }
    #frontendCategories 
    { 
        position: fixed; 
        display: flex; 
        left: 34%; 
        top: var(--frontendCategoriesTop); /* 4% */
        width: 38vw;
        margin: 0px 0px 20px 0px;
        padding: 4px 0px 30px 0px;
        /* overflow-x: scroll; */
        user-select: none;
        opacity: 1;
        justify-content: center;
        border-bottom: 3px solid var(--colorText); 
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
        left: 34%; 
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
    #frontendDataRows { max-height: 76vh; overflow-y: scroll; }
    #frontendDataTitleTimeline { margin: 0px; }
    #frontendDataTitleMultiline { margin: 0px 0px 20px 0px; }
    #frontendDataTitleImageGallery { margin: 49px; }
    #categoryNavigatorModal 
    { 
        position: fixed;
        display: none;
        max-height: 60vh;
        width: 34vw;
        left: 36%;
        top: 16%;
        margin: 0px;
        padding: 0px;
        z-index: 2;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow-y: scroll;
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
        left: 36%;
        top: 16%;
        margin: 0px;
        padding: 0px;
        z-index: 2;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        /* border: 3px solid #822c8b; */
        /* background-color: #1D212E; */
    }
    #underlayModal { position: fixed; display: none; height: 100vh; width: 100vw; opacity: 0.9; z-index: 2; background-color: black; }
    #selectedCategoryTitle
    {
        margin: 0px; 
        padding: 0px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 32px; 
        font-weight: bold;
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
        left: 36%;
        top: 16%;
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
        left: 40%;
        top: 16%;
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
    #buttonAbout { display: none; background-image: url('/iconInfo.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonContact {  display: none; background-image: url('/iconContactInfo.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonFullscreen { display: none; background-image: url('/iconFullscreen.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonSearch { display: none; background-image: url('/iconSearch.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonStart { display: none; background-image: url('/iconStart.png'); background-size: contain; background-repeat: no-repeat; }
    #buttonIndex { display: none; background-image: url('/iconIndex.png'); background-size: contain; background-repeat: no-repeat; }
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
    #pageStart { display: none; position: fixed; height: 100vh; width: 100vw; z-index: 1; background-color: var(--colorSectionBackground); }
    #pageIndex { display: none; position: fixed; height: 100vh; width: 100vw; z-index: 1; background-color: var(--colorSectionBackground); }
    #pageEnd { display: none; position: fixed; height: 100vh; width: 100vw; z-index: 1; background-color: var(--colorSectionBackground); }
    #pageIndexSections { display: block; height: 92vh; margin: 40px 0px 0px 0px; overflow-y: scroll; }
    #pageStartTitle { margin: 36vh 0px 0px 0px; font-size: 49px; font-weight: bold; }
    #pageStartText { margin: 20px 0px 0px 0px; font-size: 20px; font-weight: bold; opacity: 0.6; }
    #pageEndTitle { margin: 36vh 0px 0px 0px; font-size: 49px; font-weight: bold; }
    #pageEndText { margin: 20px 0px 0px 0px; font-size: 20px; font-weight: bold; opacity: 0.6; }
    /* #data1 { margin-top: calc(-49px - 1px); } */


    /*** classes ***/
    .section
    { 
        max-height: 30px;
        max-width: 30px;
        min-height: 30px;
        min-width: 30px;
        margin: auto;
        margin: 13px;
        padding: 10px; 
        font-size: 22px; 
        font-weight: bold; 
        text-align: center; 
        text-shadow: 0px 1px #1D212E; 
        user-select: none;
        /* border-radius: 90%; */
        color: white;
        background-color: #1D212E;
        /* border: 1px solid white;  */
    }
    .category 
    { 
        margin: 0px; 
        padding: 20px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 32px; 
        font-weight: bold;
        color: var(--colorText); /* #822c8b */
        /* border: 1px solid white; */
        /* background-color: #1D212E; */
    }
    .selectSection 
    { 
        margin: 0px; 
        padding: 20px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 32px; 
        font-weight: bold;
        /* text-transform: uppercase; */
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
        padding: 49px 49px 49px 49px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        /* text-shadow: 0px 1px black; */
        overflow-x: scroll;
        opacity: 1;
        /* opacity: 0.1;  */
        color: white; /* #1D212E */
        /* border: 0px solid #822c8b; */
        border-top: 4px solid rgba(255, 255, 255, 0.02);
        /* background-color: #822c8b; */
    }
    .frontendDataTitle { margin: 0px; font-size: 22px; text-align: left; color: var(--colorText); }
    .frontendDataData { display: block; color: var(--colorText); }
    .imageGallery { display: flex; overflow-x: scroll; flex-direction: column; }
    .multiline { display: inline-block; margin: 20px 0px 20px 0px; font-size: 20px; opacity: 0.4; color: var(--colorText); }
    .singleline { margin: 20px 0px 10px 0px; font-size: 20px; text-align: left; white-space: nowrap; opacity: 0.4; color: var(--colorText); }
    .timeline { display: inline-block; margin: 20px 0px 20px 0px; font-size: 20px; opacity: 0.4; white-space: nowrap; color: var(--colorText); }
    .galleryImageSource 
    { 
        display: block; 
        height: auto; 
        width: calc(38vw - 8px);
        user-select: none; 
        -webkit-user-drag: none; 
        border: 0px solid black;
        border-bottom: 4px solid rgba(255, 255, 255, 0.02);
        border-left: 4px solid rgba(255, 255, 255, 0.02);
        border-right: 4px solid rgba(255, 255, 255, 0.02);
    }
    /* .galleryImageSource:hover { zoom: 120%; } */
    .linklist { display: inline-block; margin: 30px 0px 0px 0px; font-size: 20px; text-decoration: none; opacity: 0.4; color: var(--colorText); }
    .textlist { display: inline-block; margin: 30px 0px 0px 0px; font-size: 20px; opacity: 0.4; color: var(--colorText); }
    .galleryImagePos { display: none; }
    .galleryImageDescription 
    { 
        display: block;
        width: 90%;
        margin: auto; 
        margin-top: 49px; 
        margin-bottom: 49px; 
        padding: 0px; 
        font-size: 20px; 
        text-align: center;
        opacity: 0.4;
        white-space: nowrap;
        overflow-x: scroll;
        color: var(--colorText);
    }
    .timelineDataObj { margin: 40px 0px 0px 4px; padding: 12px 0px 12px 0px; border-left: 3px solid var(--colorText); }
    .dataMultiline 
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 0px;
        padding: 49px 49px 49px 49px; 
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
        padding: 49px 49px 49px 49px; 
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
        padding: 49px 49px 49px 49px; 
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
        padding: 49px 49px 49px 49px; 
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
        padding: 49px 49px 49px 49px; 
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
        /* text-shadow: 0px 1px black; */
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
    .pageTitle { display: none; font-size: 32px; font-weight: bold; margin-top: 60px; }
    .extraPage { user-select: none; }
    .indexSection { display: block; margin: 0px; padding: 0px; font-size: 24px; font-weight: bold; text-shadow: 0px 1px black; }
    .indexCategory { display: block; margin: 0px; padding: 0px; font-size: 20px; font-weight: bold; text-shadow: 0px 1px black; opacity: 0.4; }
    .pageIndexSection { display: block; margin: 0px 0px 40px 0px; }
</style>