<template>
    <div id="componentFrontend">

        <!-- sections -->
        <div id="frontendSections">
            <div id="frontendSectionsList">
                <!-- select section -->
                <div v-bind:id="'section#' + section.pos" class="section" v-for="section in sortFrontendSections(frontendSections)" v-on:click="loadSectionCategories(section)" v-bind:title="section.title">
                    {{section.pos}}
                </div>

            </div>
            <div id="buttonAbout" class="section"  v-on:click="loadAboutModal()">About</div>
            <div id="buttonContact" class="section"  v-on:click="loadContactModal()">Contact</div>
            <div id="buttonFullscreen" class="section">Fullscreen</div>
            <div id="buttonSearch" class="section">Search</div>
        </div>


        <!-- <div id="sectionTitle" v-if="frontendCategoriesSelected">{{frontendCategoriesSelected[0].section}}</div> -->


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

        <!-- modal: underlay -->
        <div id="underlayModal" v-on:click="undisplayModals()">
        </div>
        
        <!-- modal: category navigator -->
        <div id="categoryNavigatorModal">
            <div id="" class="category" v-for="item in frontendCategoriesSelected" v-on:click="loadCategoryData(item.section, item.title, item.pos)">
                {{item.title}}
            </div>
        </div>

        <!-- modal: about -->
        <div id="aboutModal" v-if="frontendSettings">
            <p id="">About</p>
            {{frontendSettings.buttonAboutText}}
        </div>

        <!-- modal: contact -->
        <div id="contactModal" v-if="frontendSettings">
            <p id="">Contact</p>
            {{frontendSettings}}
        </div>

        <!-- modal: password protected -->
        <!-- <div id="sitePasswordProtectedModal">
        </div> -->

        <!-- modal: loading screen -->
        <!-- <div id="loadingScreenModal">
        </div> -->

        <!-- modal: search -->
        <!-- <div id="searchModal">
        </div> -->
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
        
        //fetch specific user data
        await fetch(BACKEND_API + "/specific-domain", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            console.log(data)

            //fetch user successful
            if(data.status == "fetch specific user successful") 
            { 
                //save to vuex
                store.dispatch('storage/actionSetFrontendSections', data.sections)
                store.dispatch('storage/actionSetFrontendCategories', data.categories)
                store.dispatch('storage/actionSetFrontendData', data.data)
                store.dispatch('storage/actionSetFrontendSettings', data.settings)

                let componentFrontend = document.getElementById("componentFrontend")
                let frontendSectionsElement = document.getElementById("frontendSections")
                let selectedCategoryTitle = document.getElementById("selectedCategoryTitle")
                let frontendSections = document.getElementById("frontendSections")
                let frontendSectionsList = document.getElementById("frontendSectionsList")
                let frontendDataRows = document.getElementById("frontendDataRows")
                let sectionButtons = document.getElementsByClassName("section")

                // let firstSection = sortFrontendSections(frontendSections.value)[0]
                // console.log(firstSection)

                settings = data.settings

                setTimeout(() => {
                    console.log(settings)

                    //set sections background color
                    if(componentFrontend) { componentFrontend.style.backgroundColor = settings.colorSectionsBackground }

                    //set nav background color
                    if(frontendSectionsElement) { frontendSectionsElement.style.backgroundColor = settings.colorNavBackground }

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

                    //set text color
                    document.documentElement.style.setProperty("--colorText", settings.colorText); // document.documentElement.style.cssText = "--colorText: green"; // document.documentElement.setAttribute("style", "--colorText: green");
                    console.log("navPosition: " + settings.navPosition)
                    if(settings.navPosition == "top") 
                    { 
                        document.documentElement.style.setProperty("--navTop", "0px");
                        document.documentElement.style.setProperty("--navBottom", "initial");
                        document.documentElement.style.setProperty("--navLeft", "initial");
                        document.documentElement.style.setProperty("--navRight", "initial");
                        frontendSections.style.height = "auto"
                        frontendSections.style.width = "100vw"
                        frontendSections.style.display = "flex"
                        frontendSections.style.flexDirection = "row"
                        frontendSections.style.padding = "8px 0px 8px 0px"
                        frontendSectionsList.style.display = "inherit"
                        frontendSectionsList.style.height = "auto"
                        frontendSectionsList.style.display = "flex"
                        frontendSectionsList.style.flexDirection = "row"
                        document.documentElement.style.setProperty("--frontendCategoriesTop", "12%");
                        document.documentElement.style.setProperty("--frontendDataTop", "20%");
                        frontendDataRows.style.maxHeight = "76vh"
                    }
                    else if (settings.navPosition == "bottom") 
                    {
                        document.documentElement.style.setProperty("--navTop", "initial");
                        document.documentElement.style.setProperty("--navBottom", "0px");
                        document.documentElement.style.setProperty("--navLeft", "initial");
                        document.documentElement.style.setProperty("--navRight", "initial");
                        frontendSections.style.height = "auto"
                        frontendSections.style.width = "100vw"
                        frontendSections.style.display = "flex"
                        frontendSections.style.flexDirection = "row"
                        frontendSections.style.padding = "8px 0px 8px 0px"
                        frontendSectionsList.style.display = "inherit"
                        frontendSectionsList.style.height = "auto"
                        frontendSectionsList.style.display = "flex"
                        frontendSectionsList.style.flexDirection = "row"
                        document.documentElement.style.setProperty("--frontendCategoriesTop", "4%");
                        document.documentElement.style.setProperty("--frontendDataTop", "12%");
                        frontendDataRows.style.maxHeight = "74vh"
                    } 
                    else if (settings.navPosition == "left") 
                    { 
                        document.documentElement.style.setProperty("--navTop", "initial");
                        document.documentElement.style.setProperty("--navBottom", "initial");
                        document.documentElement.style.setProperty("--navLeft", "0px");
                        document.documentElement.style.setProperty("--navRight", "initial");
                        frontendSections.style.height = "100vh"
                        frontendSections.style.width = "auto"
                        frontendSections.style.display = "flex"
                        frontendSections.style.flexDirection = "column"
                        frontendSections.style.padding = "10px 10px 0px 10px"
                        frontendSectionsList.style.display = "inherit"
                        frontendSectionsList.style.height = "68vh"
                        frontendSectionsList.style.display = "flex"
                        frontendSectionsList.style.flexDirection = "column"
                        document.documentElement.style.setProperty("--frontendCategoriesTop", "4%");
                        document.documentElement.style.setProperty("--frontendDataTop", "12%");
                        frontendDataRows.style.maxHeight = "68vh"
                    } 
                    else if (settings.navPosition == "right") 
                    {
                        document.documentElement.style.setProperty("--navTop", "initial");
                        document.documentElement.style.setProperty("--navBottom", "initial");
                        document.documentElement.style.setProperty("--navLeft", "initial");
                        document.documentElement.style.setProperty("--navRight", "0px");
                        frontendSections.style.height = "100vh"
                        frontendSections.style.width = "auto"
                        frontendSections.style.display = "flex"
                        frontendSections.style.flexDirection = "column"
                        frontendSections.style.padding = "10px 10px 0px 10px"
                        frontendSectionsList.style.display = "inherit"
                        frontendSectionsList.style.height = "78vh"
                        frontendSectionsList.style.display = "flex"
                        frontendSectionsList.style.flexDirection = "column"
                        document.documentElement.style.setProperty("--frontendCategoriesTop", "4%");
                        document.documentElement.style.setProperty("--frontendDataTop", "12%");
                        frontendDataRows.style.maxHeight = "76vh"
                    } 
                }, 100)

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
        for(let item in sectionElements)
        {
            let element = document.getElementById(sectionElements[item].id)
            if(element) { element.style.opacity = "0.1" }
        }
        for(let item in categoryElements)
        {
            let element = document.getElementById(categoryElements[item].id)
            if(element) { element.style.opacity = "1" }
        }
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
        let aboutModal = document.getElementById("aboutModal")
        let contactModal = document.getElementById("contactModal")

        //update elements
        if(underlayModal) { underlayModal.style.display = "none" }
        if(categoryNavigatorModal) { categoryNavigatorModal.style.display = "none" }
        if(aboutModal) { aboutModal.style.display = "none" }
        if(contactModal) { contactModal.style.display = "none" }
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


    return {
        //variables
        frontendSections,
        frontendCategories,
        frontendData,
        frontendCategoriesSelected,
        frontendDataSelected,
        frontendSettings,

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
        undisplayModals,
        loadNextCategory,
        loadAboutModal,
        loadContactModal,
        nextImageGalleryItem,
    }
  }
}
</script>

<style>
    :root {
        --colorText: blue;
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
    #dataObjModalPreviewImages::-webkit-scrollbar { height: 12px; width: 10px; }
    #dataObjModalPreviewImages::-webkit-scrollbar-track { background: black; }
    #dataObjModalPreviewImages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
    
    /*** elements ***/
    input[type='radio'] { accent-color:  #822c8b; }
    input[type='checkbox'] { accent-color:  #822c8b; }

    /*** ids ***/
    #componentFrontend { height: 100vh; width: 100vw; margin: auto; padding: 0px; color: white; background-color: #1D212E; }
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
        /* border-right: 1px solid rgba(255, 255, 255, 0.6); */
        background-color: transparent;
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
    #underlayModal { position: fixed; display: none; height: 100vh; width: 100vw; opacity: 0.9; z-index: 1; background-color: black; }
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
    #buttonAbout { margin-top: 20px; }
    #buttonContact { }
    #buttonFullscreen { }
    #buttonFullsearch { }
    /* #data1 { margin-top: calc(-49px - 1px); } */


    /*** classes ***/
    .section 
    { 
        height: auto;
        width: 34px;
        margin: auto;
        margin: 10px;
        padding: 10px 8px 10px 8px; 
        font-size: 22px; 
        font-weight: bold; 
        text-align: center; 
        text-shadow: 0px 1px #1D212E; 
        user-select: none;
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
</style>