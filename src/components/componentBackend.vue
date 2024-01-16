<template>
    <div id="componentBackend">
        <!-- sections -->
        <div id="backendSections" v-if="backendSections">
            <div class="section" v-for="section in backendSections" v-on:click="loadSectionCategories(section)">&lt>
                {{section.title}}
            </div>
            <div class="section">(Add Section)</div>
        </div>


        <!-- categories -->
        <div id="backendCategories" v-if="backendCategoriesSelected">
            <div class="category" v-for="category in backendCategoriesSelected" v-on:click="loadCategoryData(category.section , category.title)">
                &lt> {{category.title}} ·
            </div>
            <div class="category">(Add Category)</div>
        </div>


        <!-- data -->
        <div id="backendData" v-if="backendDataSelected">
            <!-- debugging -->
            <!-- {{backendDataSelected}} -->
            
            <!-- new (with rows)-->
            <div class="data" v-for="data in sortBackendDataSelected(backendDataSelected)" v-on:click="loadDataObjModal(data)">
                {{loadDataType(data)}}
            </div>

            <!-- add new row -->
            <div class="data">(Add Row)</div>

            <!-- old (no rows) -->
            <!-- <div class="data" v-for="data in sortBackendDataSelected(backendDataSelected)" v-on:click="loadDataObjModal(data)">
                {{loadDataType(data)}}
            </div> -->
            <!-- <div class="data">(Add Row)</div> -->
        </div>


        <!-- modal: data obj -->
        <div id="dataObjModal" v-if="backendDataObjModal">
            <!-- header -->
            <p class="dataObjHeader">&lt{{backendDataObjModal.type}}></p>
            
            <div class="dataObjRow" v-for="(row, index) in Object.entries(backendDataObjModal)">
                <!-- obj: variables -->
                <div hidden>{{rowData = row.toString().split(",")}}</div>
                <div hidden>{{dataType = rowData[0]}}</div>
                <div hidden>{{dataValue = rowData[1]}}</div>

                <!-- obj: position -->
                <div id="" v-if="dataType == 'pos'">
                    <p class="dataObjModalRowTitle">Position</p>
                    <input id="dataObjPosition" class="dataObjModalRowInput" required type="number" min="1" max="999" v-bind:value="row.toString().replace('pos,', '')" />
                </div>

                <!-- obj: hidden -->
                <div id="" v-else-if="dataType == 'hidden'">
                    <p class="dataObjModalRowTitle">Hidden</p>
                    <input id="dataObjHidden" class="dataObjModalRowInput" required checked type="checkbox" maxlength="100" />
                </div>
                
                <!-- obj: type -->
                <!-- <div id="" v-else-if="dataType == 'type'">
                    <p class="dataObjModalRowTitle">Type</p>
                    <p>{{row.toString().replace("type,", "")}}</p>
                </div> -->
                
                <!-- obj: title -->
                <div id="" v-else-if="dataType == 'title'">
                    <p class="dataObjModalRowTitle">Title</p>
                    <input id="dataObjTitle" class="dataObjModalRowInput" maxlength="100" v-bind:value="row.toString().replace('title,', '')" />
                </div>
                
                <!-- obj: data -->
                <div id="dataObjModalData" v-else-if="dataType == 'data'">

                    <!-- data: galleryImages -->
                    <div v-if="backendDataObjModal.type == 'galleryImages'">
                        <p id="galleryImagesTitle" class="dataObjModalRowTitle">{{loadDataInputs(row, 'galleryImages').length}} Images</p>
                        
                        <div id="dataObjModalAddData">
                            <input id="inputAdd" class="inputAdd" maxlength="1000" v-bind:value="''" placeholder="URL ..." />
                            <input id="buttonAdd" class="buttonAdd" type="button" value="+" v-on:click="imageGalleryAddImg()" />
                        </div>

                        <div id="dataObjModalPreviewImages">
                            <img v-bind:id="'previewImage#' + obj.pos" class="dataObjModalPreviewImage" v-for="(obj, index) in loadDataInputs(row, 'galleryImages').reverse()" v-bind:src="obj.image" v-bind:title="obj.image" v-on:click="selectPreviewImage(obj.pos)"/>
                        </div>
                        
                        <div id="dataObjModalEditImages">
                            <!-- <input id="labelEditImagePosition" disabled value="position" /> -->
                                <input id="buttonEditPosition" type="button" value="⬅" v-on:click="imageGalleryUpdateImagePos('up')" />
                                <input id="buttonEditPosition" type="button" value="➡" v-on:click="imageGalleryUpdateImagePos('down')" />
                                <input id="inputImagePosition" disabled type="number" min="1" max="1000" value="" placeholder="Position" />
                                <input id="buttonDeleteImage" type="button" value="━" v-on:click="imageGalleryRemoveImg()" />
                            <!-- <div id="dataObjModalEditButtons"> -->
                            <!-- </div> -->
                        </div>

                    </div>

                    <!-- data: textlist -->
                    <div v-if="backendDataObjModal.type == 'textlist'">
                        <p class="dataObjModalRowTitle">{{loadDataInputs(row, 'textlist').length}} Items</p>
                        
                        <div id="dataObjModalTextlistRows">
                            <div v-bind:id="'dataObjModalTextlist#' + item.pos" class="dataObjModalTextlist" v-for="item in loadDataInputs(row, 'textlist')" v-on:click="editData('textlist','click', item.pos)">
                                <input v-bind:id="'dataObjModalTextlistPos#' + item.pos" class="inputTextlistSidebarPos" type="button" v-bind:value="item.pos" disabled />
                                <input v-bind:id="'dataObjModalTextlistText#' + item.pos" class="inputTextlistText" maxlength="100" v-bind:value="item.text" placeholder="item" />
                            </div>
                        </div>

                        <div id="dataObjModalEditTextlist">
                            <input id="inputTextlistUp" class="editPosUp" type="button" value="⬇" v-on:click="editData('textlist','up','')" />
                            <input id="inputTextlistDown" class="editPosDown" type="button" value="⬆" v-on:click="editData('textlist','down','')" />
                            <input id="inputTextlistPos" class="editPosDisplay" type="button" value="" v-on:click="" />
                            <input id="inputTextlistSave" class="editItemSave" type="button" value="✓" v-on:click="editData('textlist','save','')" />
                            <input id="inputTextlistDelete" class="editItemDelete" type="button" value="━" v-on:click="editData('textlist','delete','')" />
                            <input id="inputTextlistAddRow" class="editAddRow" type="button" value="+" v-on:click="editData('textlist','add','')" />
                        </div>
                    </div>

                    <!-- data: linklist -->
                    <div v-if="backendDataObjModal.type == 'linklist'">
                        <p class="dataObjModalRowTitle">{{loadDataInputs(row, 'linklist').length}} Links</p>
                        
                        <div id="dataObjModalLinklistRows">
                            <div v-bind:id="'dataObjModalLinklist#' + item.pos" class="dataObjModalLinklist" v-for="item in loadDataInputs(row, 'linklist')" v-on:click="editData('linklist','click', item.pos)">
                                <input v-bind:id="'dataObjModalLinklistPos#' + item.pos" class="inputLinklistSidebarPos" type="button" v-bind:value="item.pos" disabled />
                                <input v-bind:id="'dataObjModalLinklistText#' + item.pos" class="inputLinklistText" maxlength="100" v-bind:value="item.text" placeholder="text" />
                                <input v-bind:id="'dataObjModalLinklistLink#' + item.pos" class="inputLinklistLink" maxlength="100" v-bind:value="item.link" v-bind:title="item.link" placeholder="link" />
                            </div>
                        </div>

                        <div id="dataObjModalEditLinklist">
                            <input id="inputLinklistUp" class="editPosUp" type="button" value="⬇" v-on:click="editData('linklist','up','')" />
                            <input id="inputLinklistDown" class="editPosDown" type="button" value="⬆" v-on:click="editData('linklist','down','')" />
                            <input id="inputLinklistPos" class="editPosDisplay" type="button" value="" v-on:click="" />
                            <input id="inputLinklistSave" class="editItemSave" type="button" value="✓" v-on:click="editData('linklist','save','')" />
                            <input id="inputLinklistDelete" class="editItemDelete" type="button" value="━" v-on:click="editData('linklist','delete','')" />
                            <input id="inputLinklistAddRow" class="editAddRow" type="button" value="+" v-on:click="editData('linklist','add','')" />
                        </div>
                    </div>

                    <!-- data: timeline -->
                    <div v-if="backendDataObjModal.type == 'timeline'">
                        <p class="dataObjModalRowTitle">{{loadDataInputs(row, 'multiline').length}} Times</p>
                        
                        <div id="dataObjModalTimelineRows">
                            <div v-bind:id="'dataObjModalTimeline#' + item.pos" class="dataObjModalTimeline" v-for="item in loadDataInputs(row, 'timeline')" v-on:click="editData('timeline','click', item.pos)">
                                <input v-bind:id="'dataObjModalTimelinePos#' + item.pos" class="inputTimelineSidebarPos" type="button" v-bind:value="item.pos" disabled />
                                <input v-bind:id="'dataObjModalTimelineYear#' + item.pos" class="inputTimelineYear" maxlength="100" v-bind:value="item.year" placeholder="year" />
                                <input v-bind:id="'dataObjModalTimelineText#' + item.pos" class="inputTimelineText" maxlength="100" v-bind:value="item.text" placeholder="text" />
                            </div>
                        </div>

                        <div id="dataObjModalEditTimeline">
                            <input id="inputTimelineUp" class="editPosUp" type="button" value="⬇" v-on:click="editData('timeline','up','')" />
                            <input id="inputTimelineDown" class="editPosDown" type="button" value="⬆" v-on:click="editData('timeline','down','')" />
                            <input id="inputTimelinePos" class="editPosDisplay" type="button" value="" v-on:click="" />
                            <input id="inputTimelineSave" class="editItemSave" type="button" value="✓" v-on:click="editData('timeline','save','')" />
                            <input id="inputTimelineDelete" class="editItemDelete" type="button" value="━" v-on:click="editData('timeline','delete','')" />
                            <input id="inputTimelineAddRow" class="editAddRow" type="button" value="+" v-on:click="editData('timeline','add','')" />
                        </div>
                    </div>

                    <!-- data: multiline -->
                    <div v-if="backendDataObjModal.type == 'multiline'">
                        <p class="dataObjModalRowTitle">{{loadDataInputs(row, 'multiline').length}} Lines</p>
                        
                        <div id="dataObjModalMultilineRows">
                            <div v-bind:id="'dataObjModalMultiline#' + item.pos" class="dataObjModalMultiline" v-for="item in loadDataInputs(row, 'multiline')" v-on:click="editData('multiline','click', item.pos)">
                                <input v-bind:id="'dataObjModalMultilinePos#' + item.pos" class="inputMultilineSidebarPos" type="button" v-bind:value="item.pos" disabled />
                                <input v-bind:id="'dataObjModalMultilineText#' + item.pos" class="inputMultilineText" maxlength="100" v-bind:value="item.text" placeholder="textrow" />
                            </div>
                        </div>

                        <div id="dataObjModalEditMultiline">
                            <input id="inputMultilineUp" class="editPosUp" type="button" value="⬇" v-on:click="editData('multiline','up','')" />
                            <input id="inputMultilineDown" class="editPosDown" type="button" value="⬆" v-on:click="editData('multiline','down','')" />
                            <input id="inputMultilinePos" class="editPosDisplay" type="button" value="" v-on:click="" />
                            <input id="inputMultilineSave" class="editItemSave" type="button" value="✓" v-on:click="editData('multiline','save','')" />
                            <input id="inputMultilineDelete" class="editItemDelete" type="button" value="━" v-on:click="editData('multiline','delete','')" />
                            <input id="inputMultilineAddRow" class="editAddRow" type="button" value="+" v-on:click="editData('multiline','add','')" />
                        </div>
                    </div>

                    <!-- data: singleline -->
                    <div v-if="backendDataObjModal.type == 'singleline'">
                        <p class="dataObjModalRowTitle">Text</p>
                        
                        <div id="dataObjModalSinglelineRows">
                            <div v-bind:id="'dataObjModalSingleline'" class="dataObjModalSingleline">
                                <input v-bind:id="'dataObjModalSinglelineText'" class="inputSinglelineText" maxlength="100" v-bind:value="row.toString().replace('data,', '')" placeholder="textrow" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- debugging -->
                <!-- <div id="">
                    <p class="dataObjModalRowTitle">{{rowData[0]}}</p>
                    <input class="dataObjModalRowInput" maxlength="100" v-bind:value="row" />
                </div> -->
            </div>
            
            <p id="updateStatusMessage"></p>

            <!-- checkboxes -->
            <div id="confirmCheckbox">
                <input id="checkboxSave" class="checkbox" type="checkbox" v-on:click="confirmCheckboxes('save')" />
                <label id="labelSave">Save</label>
                <input id="checkboxDelete" class="checkbox" type="checkbox" v-on:click="confirmCheckboxes('delete')" />
                <label id="labelDelete">Delete</label>
            </div>

            <!-- save/delete -->
            <div id="confirmChanges">
                <button id="buttonSave" v-on:click="saveChanges()">Confirm Save</button>
                <button id="buttonDelete">Confirm Delete</button>
            </div>

        </div>


        <!-- modal: account -->
        <div id="account">
        </div>


        <!-- modal: section options -->
        <div id="sectionOptionsModal">
        </div>


        <!-- modal: underlay -->
        <div id="underlayModal" v-on:click="undisplayModals()">
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
    const backendSections = computed(() => { return store.getters['storage/backendSections']})
    const backendCategories = computed(() => { return store.getters['storage/backendCategories']})
    const backendData = computed(() => { return store.getters['storage/backendData']})
    const backendCategoriesSelected = computed(() => { return store.getters['storage/backendCategoriesSelected']})
    const backendDataSelected = computed(() => { return store.getters['storage/backendDataSelected']})
    const backendDataObjModal = computed(() => { return store.getters['storage/backendDataObjModal']})

    //globals
    var selectedCategory = ""
    var selectedSection = ""
    var selectedDataPos = ""
    var oldImagePos = ""
    var oldDataPos = ""
    var oldMultilinePos = ""
    var oldTimelinePos = ""
    var newImagePos = ""
    var newDataPos = ""
    var newMultilinePos = ""
    var newTimelinePos = ""
    var oldPos = ""
    var newPos = ""
            

    //lifecycle hooks
    onMounted(() => { 
        console.log("componentBackend mounted")

        fetchSpecificUser()
    })

    onUpdated(() => { console.log("componentBackend updated") })


    //event listeners
    // document.addEventListener('wheel', function(e) {
    //     let dataObjModalPreviewImages = document.getElementById("dataObjModalPreviewImages")

    //     if (e.deltaY > 0) 
    //     { 
    //         if(dataObjModalPreviewImages != null) { dataObjModalPreviewImages.scrollLeft += 60; }
    //     }
    //     else 
    //     {
    //         if(dataObjModalPreviewImages != null) { dataObjModalPreviewImages.scrollLeft -= 60; }
    //     }
    // })
    
    //functions
    async function fetchSpecificUser()
    {
        let username = localStorage.getItem("cms-account")
        let token = localStorage.getItem("cms-token")
        let lastLogin = localStorage.getItem("cms-last-login")
        let obj = JSON.stringify({ "username": username, "token": token, "lastLogin": lastLogin })

        //fetch specific user data
        await fetch(BACKEND_API + "/specific-user", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            console.log(data)

            //fetch user successful
            if(data.status == "fetch specific user successful") 
            { 
                //vuex
                store.dispatch('storage/actionSetBackendSections', data.sections)
                store.dispatch('storage/actionSetBackendCategories', data.categories)
                store.dispatch('storage/actionSetBackendData', data.data)

                //local storage
                // localStorage.setItem("cms-backend-user", JSON.stringify(data))
                // localStorage.setItem("cms-backend-data", JSON.stringify(data.data))
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
        let arrayCategories = []
        
        for(let c in backendCategories.value)
        {
            if(backendCategories.value[c].section == data.title) { arrayCategories.push(backendCategories.value[c]) }
        }

        store.dispatch('storage/actionSetBackendCategoriesSelected', arrayCategories)        
    }


    function loadCategoryData(section, category)
    {
        // console.log(category)
        console.log("Section: " + section)
        console.log("Category: " + category)
        // console.log(backendData.value)
        
        selectedSection = section
        selectedCategory = category

        let arrayData = ""

        for(let c in backendData.value)
        {
            // console.log(backendData.value[c].category)

            if(backendData.value[c].section == selectedSection && backendData.value[c].category == selectedCategory) 
            { 
                // console.log(backendData.value[c].rows)
                arrayData = backendData.value[c].rows
            } 
            
            //arrayData.push(backendData.value[c])
        }
        
        store.dispatch('storage/actionSetBackendDataSelected', arrayData)
    }
    

    function loadDataType(data)
    {   
        let value = ""

        try { data = JSON.parse(data) } 
        catch (error) { }

        // console.log(data.type)
        
        if(data.type == undefined) { value = "null" }
        else 
        { 
            if(data.title == "") { data.title = "no title" }

            value = "<> · " + data.pos + " · " + "<" + data.type + ">" 
            // value = data.pos + " · " + "<" + data.type + ">" 
            // value = "Row " + data.pos + " · " + "<" + data.type + ">" 
            // value = "Row " + data.pos + " · " + data.title + " · " + "<" + data.type + ">" 
            // value = data.title + " · " + "(" + data.type.toUpperCase() + ")" 
        }
        // else { value = data.type }

        return value
    }


    function loadDataObjModal(data)
    {
        let dataObjModal = document.getElementById("dataObjModal")
        let underlayModal = document.getElementById("underlayModal")
        let updateStatusMessage = document.getElementById("updateStatusMessage")
        let checkboxSave = document.getElementById("checkboxSave")
        let checkboxDelete = document.getElementById("checkboxDelete")
        let dataObjModalEditMultiline = document.getElementById("dataObjModalEditMultiline")
        let confirmCheckbox = document.getElementById("confirmCheckbox")
        let confirmChanges = document.getElementById("confirmChanges")
        let dataObjHidden = ""
        
        selectedDataPos = data.pos
        oldDataPos = data.pos

        console.log("loadDataObjModal: Row " + selectedDataPos)
        
        store.dispatch('storage/actionSetBackendDataObjModal', data)
        localStorage.setItem("cms-edit-row", JSON.stringify(data))
        
        setTimeout(() => {
            dataObjHidden = document.getElementById("dataObjHidden")
            if(data.hidden == "true") { dataObjHidden.checked = true }
            else if(data.hidden == "false") { dataObjHidden.checked = false }
        }, 20)
        if(dataObjModalEditMultiline) { dataObjModalEditMultiline.style.display = "none"}
        if(checkboxSave) { checkboxSave.checked = false }
        if(checkboxDelete) { checkboxDelete.checked = false }
        if(updateStatusMessage) { updateStatusMessage.style.display = "none" }
        if(confirmChanges) { confirmChanges.style.display = "none" }
        if(confirmCheckbox) { confirmCheckbox.style.display = "block" }
        if(underlayModal) { underlayModal.style.display = "block" }
        if(dataObjModal) { dataObjModal.style.display = "block"; /* dataObjModal.scrollTo(0,0) */ }
    }


    function undisplayModals()
    {
        let dataObjModal = document.getElementById("dataObjModal")
        let underlayModal = document.getElementById("underlayModal")

        dataObjModal.style.display = "none"
        underlayModal.style.display = "none"
    }


    function loadDataInputs(data, type)
    {   
        // console.log(data)

        let arrayData = []

        data = data.toString()
        data = data.replace("data,", "")
        data = data.replaceAll("'", "\"")
        data = JSON.parse(data)
        
        // console.log(data)
        
        if(type == "galleryImages")
        {
            for(let item in data) { arrayData.push(data[item]) }

            arrayData = arrayData.sort((a, b) => { return a.pos - b.pos })

            return arrayData
        }

        else if(type == "multiline")
        {
            return data
        }

        else if(type == "timeline")
        {
            return data
        }

        else if(type == "singleline")
        {
            return data
        }

        else if(type == "linklist")
        {
            return data
        }

        else if(type == "textlist")
        {
            return data
        }
        
    }


    function imageGalleryRemoveImg()
    {
        let dataObjModalData = document.getElementById("dataObjModalData")
        let inputImagePosition = document.getElementById("inputImagePosition")
        let dataObjModalPreviewImage = document.getElementsByClassName("dataObjModalPreviewImage")

        let rowData = localStorage.getItem('cms-edit-row')
        let imagePos = inputImagePosition.value
        let correctPos = ""

        if(imagePos == "") { return }

        rowData = JSON.parse(rowData)
        let rd = JSON.parse(rowData.data.replaceAll("'", "\""))
        
        for(let c in rd)
        {
            if(imagePos == rd[c].pos) 
            { 
                console.log(rd[c])
                rd.splice(c, 1)
                // if(rd.length == 1) { rd.splice(0, 1) }
                // else if(rd.length > 1) { rd.splice((imagePos - 1), 1)}
            }
        }
        
        //correct image positions
        for(let c in rd)
        {
            correctPos = parseInt(c) + 1
            rd[c].pos = correctPos.toString()
        }
        
        rowData.data = JSON.stringify(rd).replaceAll("\"", "'")

        //update local storage
        localStorage.setItem("cms-edit-row", JSON.stringify(rowData))

        //reload data obj
        loadDataObjModal(rowData)

        //reset input
        inputImagePosition.value = ""

        //reset preview image opacity
        for(let i = 0; i < dataObjModalPreviewImage.length; i++)
        {
            if(dataObjModalPreviewImage[i])
            {
                dataObjModalPreviewImage[i].style.opacity = "0.3"
            }
        }
    }


    function imageGalleryAddImg()
    {   
        //elements
        let inputAdd = document.getElementById("inputAdd")
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")
        let dataObjModalPreviewImage = document.getElementsByClassName("dataObjModalPreviewImage")

        //variables
        let pos = dataObjPosition.value
        let hidden = dataObjHidden.checked.toString()
        let title = dataObjTitle.value
        let imgUrl = inputAdd.value
        let rowData = localStorage.getItem('cms-edit-row')
        let arrayData = ""
        let totalItems = ""
        let newImgObj = ""

        //null check
        if(imgUrl == "" || imgUrl == null || imgUrl == undefined) 
        { 
            console.log("error: image url is empty") 
        }
        else 
        { 
            //debuggin
            // console.log(imgUrl) 
        
            //reset input
            inputAdd.value = ""

            //handle data
            arrayData = JSON.parse(rowData)
            arrayData = JSON.parse(arrayData.data.replaceAll("'", "\""))
            totalItems = (arrayData.length + 1).toString()
            arrayData.push({pos: totalItems, image: imgUrl, description: "test"})
            arrayData = JSON.stringify(arrayData)
            rowData = JSON.parse(rowData)
            rowData.data = arrayData.replaceAll("\"", "'")
            rowData.pos = pos
            rowData.hidden = hidden
            rowData.title = title
            
            //update local storage
            localStorage.setItem("cms-edit-row", JSON.stringify(rowData))

            //reload data obj
            loadDataObjModal(rowData)

            //select new image
            selectPreviewImage(totalItems)
        }
    }


    function imageGalleryUpdateImagePos(type)
    {
        let inputImagePosition = document.getElementById("inputImagePosition")
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")

        let pos = dataObjPosition.value
        let hidden = dataObjHidden.checked.toString()
        let title = dataObjTitle.value
        let rowData = localStorage.getItem('cms-edit-row')
        let galleryImages = ""
        let moveOldImage = ""
        let correctPos = ""
        let totalItems = ""
        let maxPos = ""
        let minPos = ""
        
        newImagePos = inputImagePosition.value

        if(type == "up") { newImagePos = (parseInt(oldImagePos) + 1).toString() }
        else if(type == "down") { newImagePos = (parseInt(oldImagePos) - 1).toString() }

        galleryImages = JSON.parse(rowData)
        galleryImages = galleryImages.data.replaceAll("'", "\"")
        galleryImages = JSON.parse(galleryImages)
        totalItems = galleryImages.length
        maxPos = totalItems
        minPos = "0"

        if(oldImagePos == newImagePos) { return }
        else if(newImagePos >= totalItems + 1) { return }
        else if(newImagePos == 0) { return }

        console.log("old pos: " + oldImagePos)
        console.log("new pos: " + newImagePos)
        console.log("total items: " + totalItems)

        for(let c in galleryImages)
        {
            if(galleryImages[c].pos == newImagePos) 
            { 
                if(oldImagePos > newImagePos) { moveOldImage = "up"; galleryImages[c].pos = (parseInt(newImagePos) + 1).toString() }
                else if(oldImagePos < newImagePos) { moveOldImage = "down"; galleryImages[c].pos = (parseInt(newImagePos) - 1).toString() } 
            }
            else if(galleryImages[c].pos == oldImagePos) { galleryImages[c].pos = newImagePos }
        }

        console.log("moveOldImage: " + moveOldImage)

        galleryImages = galleryImages.sort((a, b) => { return a.pos - b.pos })

        for(let c in galleryImages)
        {
            correctPos = parseInt(c) + 1
            galleryImages[c].pos = correctPos.toString()
        }
        console.log(galleryImages)

        galleryImages = JSON.stringify(galleryImages).replaceAll("\"", "'")

        rowData = JSON.parse(rowData)
        rowData.data = galleryImages
        rowData.pos = pos
        rowData.hidden = hidden
        rowData.title = title

        localStorage.setItem("cms-edit-row", JSON.stringify(rowData))

        loadDataObjModal(rowData)

        //reset input
        inputImagePosition.value = newImagePos

        selectPreviewImage(newImagePos)
    }


    function sortBackendDataSelected(data)
    {
        // console.log(data)

        let rows = []

        for(let c in data)
        {
            rows.push(JSON.parse(data[c]))
        }

        rows = rows.sort((a, b) => { return a.pos - b.pos })

        return rows
    }


    async function saveChanges()
    {
        //elements
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")
        let confirmChanges = document.getElementById("confirmChanges")
        let confirmCheckbox = document.getElementById("confirmCheckbox")
        let dataObjModalSinglelineText = document.getElementById("dataObjModalSinglelineText")
        
        //variables
        let rowData = JSON.parse(localStorage.getItem('cms-edit-row'))
        let pos = dataObjPosition.value
        let hidden = dataObjHidden.checked.toString()
        let title = dataObjTitle.value
        let rowsArray = []

        confirmChanges.style.display = "none"
        confirmCheckbox.style.display = "none"

        //set global
        newDataPos = pos
        
        //set new row data
        rowData.pos = pos
        rowData.hidden = hidden
        rowData.title = title
        rowData.type = rowData.type
        rowData.data = rowData.data
        
        //check if singleline text
        if(dataObjModalSinglelineText) { rowData.data = dataObjModalSinglelineText.value; console.log(dataObjModalSinglelineText.value)}
        
        //debugging
        // console.log("oldDataPos: " + oldDataPos)
        // console.log("newDataPos: " + newDataPos)
        // console.log("dataObjHidden: " + hidden)
        // console.log("dataObjTitle: " + title)
        // console.log(rowData)

        //save row to local storage
        localStorage.setItem("cms-edit-row", JSON.stringify(rowData))
        
        //sort row data
        for(let item in backendData.value)
        {
            if(selectedCategory == backendData.value[item].category)
            {
                // console.log(backendData.value[item])
                // console.log(backendData.value[item].category)
                
                for(let c in backendData.value[item].rows)
                {   
                    let obj = JSON.parse(backendData.value[item].rows[c])
                    let objTemp = JSON.parse(backendData.value[item].rows[c])
                    let newRowData = localStorage.getItem("cms-edit-row")

                    if(newDataPos == obj.pos)
                    {
                        objTemp.pos = oldDataPos
                        backendData.value[item].rows[c] = JSON.stringify(objTemp)
                    }

                    if(oldDataPos == obj.pos) { backendData.value[item].rows[c] =  newRowData}
                }
            }
        }

        //sort row positions
        for(let item in backendData.value)
        {
            if(selectedCategory == backendData.value[item].category)
            {
                //add row data to array
                for(let r in backendData.value[item].rows) { rowsArray.push(JSON.parse(backendData.value[item].rows[r])) }

                //sort rows by position
                rowsArray = rowsArray.sort((a, b) => { return a.pos - b.pos })

                //stringify rows data in array
                for(let r in rowsArray) { /* rowsArray[r].pos = (parseInt(r) + 1).toString() */ rowsArray[r] = JSON.stringify(rowsArray[r]) }

                //update backend data
                backendData.value[item].rows = rowsArray
            }
        }

        //debugging
        // console.log(backendData.value)

        //reload data obj modal
        loadDataObjModal(JSON.parse(localStorage.getItem("cms-edit-row")))
        
        //update DB
        updateUserData(JSON.stringify(toRaw(backendData.value)))
        // if(type == "user-data") { updateUserData(JSON.stringify(toRaw(backendData.value))) }

        //update vuex
        // store.dispatch('storage/actionSetBackendData', backendData.value)

        //reload category data
        // loadCategoryData(selectedSection, selectedCategory)
    }


    async function updateUserData(newData)
    {
        //elements
        let updateStatusMessage = document.getElementById("updateStatusMessage")
        let confirmCheckbox = document.getElementById("confirmCheckbox")

        //variables
        let username = localStorage.getItem("cms-account")
        let token = localStorage.getItem("cms-token")
        let lastLogin = localStorage.getItem("cms-last-login")
        let obj = JSON.stringify([{ "username": username, "token": token, "lastLogin": lastLogin }, newData])

        // confirmCheckbox.style.display = "none"

        //fetch update user data
        await fetch(BACKEND_API + "/update-user-data", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            console.log(data)

            //set update status message
            if(data.status == "update user data successful") 
            { 
                confirmCheckbox.style.display = "none"
                updateStatusMessage.style.display = "block"
                updateStatusMessage.innerText = "Update Successful!"
                setTimeout(() => {undisplayModals()}, 1000) 
            }
            else 
            { 
                confirmCheckbox.style.display = "block"
                updateStatusMessage.style.display = "block"
                updateStatusMessage.innerText = "Update Failed..." 
            }
        })
    }


    function selectPreviewImage(pos)
    {
        console.log("selectPreviewImage:" + pos)

        let dataObjModalPreviewImage = document.getElementsByClassName("dataObjModalPreviewImage")
        let selectedImage = ""
        let dataObjModalEditImages = document.getElementById("dataObjModalEditImages")
        let inputImagePosition = document.getElementById("inputImagePosition")

        oldImagePos = pos

        setTimeout(() => {
            selectedImage = document.getElementById("previewImage#" + pos) 
            for(let i = 0; i < dataObjModalPreviewImage.length; i++)
            {
                if(dataObjModalPreviewImage[i])
                {
                    dataObjModalPreviewImage[i].style.opacity = "0.3"
                }
            }
            if(selectedImage) { selectedImage.style.opacity = "1.0" }
            if(dataObjModalEditImages) { dataObjModalEditImages.style.display = "flex" }
            if(inputImagePosition) { inputImagePosition.value = pos }
            if(selectedImage) { selectedImage.scrollIntoView() }
        }, 20) 
    }


    // function editMultilineData(type, pos)
    // {
    //     //debugging
    //     // console.log("type: " + type)
    //     // console.log("pos: " + pos)

    //     //elements
    //     let dataObjModalEditMultiline = document.getElementById("dataObjModalEditMultiline")
    //     let dataObjPosition = document.getElementById("dataObjPosition")
    //     let dataObjHidden = document.getElementById("dataObjHidden")
    //     let dataObjTitle = document.getElementById("dataObjTitle")
    //     let inputMultilinePos = document.getElementById("inputMultilinePos")
    //     let dataObjModalMultilineClass = document.getElementsByClassName("dataObjModalMultiline")
    //     let dataObjModalMultiline = ""
    //     let dataObjModalMultilineText = ""
        
    //     //variables
    //     let editRow = JSON.parse(localStorage.getItem("cms-edit-row"))
    //     let editRowData = JSON.parse(editRow.data.toString().replaceAll("'", '"'))
    //     let position = dataObjPosition.value
    //     let hidden = dataObjHidden.checked.toString()
    //     let title = dataObjTitle.value
    //     let editItem = ""
    //     let totalItems = dataObjModalMultilineClass.length
    //     let isChanged = false

    //     //set input position
    //     inputMultilinePos.value = pos

    //     //set row obj values
    //     editRow.pos = position
    //     editRow.hidden = hidden
    //     editRow.title = title

    //     //set edit item
    //     for(let item in editRowData)
    //     {
    //         if(oldMultilinePos == editRowData[item].pos) { editItem = editRowData[item] }
    //     }

    //     //type: CLICK
    //     if(type == "click") 
    //     { 
    //         //elements
    //         dataObjModalMultiline = document.getElementById("dataObjModalMultiline#" + pos)
    //         dataObjModalMultilineText = document.getElementById("dataObjModalMultilineText#" + pos)

    //         //set old position
    //         oldMultilinePos = pos
            
    //         //update elements
    //         if(dataObjModalEditMultiline) dataObjModalEditMultiline.style.display = "flex"
    //         for(let e in dataObjModalMultilineClass)
    //         {
    //             let element = document.getElementById(dataObjModalMultilineClass[e].id) 
    //             if(element) { element.style.opacity = "0.1" }
    //         }
    //         if(dataObjModalMultiline) { dataObjModalMultiline.style.opacity = "1" }
    //     }

    //     //type: UP
    //     else if(type == "up") 
    //     {   
    //         //set new position
    //         newMultilinePos = (parseInt(oldMultilinePos) + 1).toString()
    //         if(newMultilinePos == 0) { newMultilinePos = 1 }
    //         else if(newMultilinePos > totalItems) { newMultilinePos = totalItems}
            
    //         //update data positions
    //         for(let item in editRowData) { if(newMultilinePos == editRowData[item].pos) { editRowData[item].pos = "0000" } }
    //         for(let item in editRowData) { if(oldMultilinePos == editRowData[item].pos) { editRowData[item].pos = newMultilinePos } }
    //         for(let item in editRowData) { if(editRowData[item].pos == "0000") { editRowData[item].pos = oldMultilinePos } }

    //         //set status
    //         isChanged = true
    //     }

    //     //type: DOWN
    //     else if(type == "down") 
    //     { 
    //         //set new position
    //         newMultilinePos = (parseInt(oldMultilinePos) - 1).toString()
    //         if(newMultilinePos == 0) { newMultilinePos = 1 }
    //         else if(newMultilinePos > totalItems) { newMultilinePos = totalItems}
            
    //         //update data positions
    //         for(let item in editRowData) { if(newMultilinePos == editRowData[item].pos) { editRowData[item].pos = "0000" } }
    //         for(let item in editRowData) { if(oldMultilinePos == editRowData[item].pos) { editRowData[item].pos = newMultilinePos } }
    //         for(let item in editRowData) { if(editRowData[item].pos == "0000") { editRowData[item].pos = oldMultilinePos } }

    //         //set status
    //         isChanged = true
    //     }

    //     //type: SAVE
    //     else if(type == "save") 
    //     {
    //         //elements
    //         dataObjModalMultilineText = document.getElementById("dataObjModalMultilineText#" + oldMultilinePos)
    //         // console.log(dataObjModalMultilineText)
            
    //         //variables
    //         let newText = dataObjModalMultilineText.value

    //         //set new data text
    //         for(let item in editRowData) 
    //         { 
    //             if(oldMultilinePos == editRowData[item].pos) { editRowData[item].text = newText } 
    //         }

    //         //set status
    //         isChanged = true
    //     }

    //     //type: ADD
    //     else if(type == "add") 
    //     {       
    //         //variables
    //         let pos = (editRowData.length + 1).toString()
    //         let obj = {pos: pos, text: ''}

    //         //add item to array
    //         editRowData.push(obj)
            
    //         //set status
    //         isChanged = true
    //     }

    //     //type: DELETE
    //     else if(type == "delete") 
    //     {   
    //         //variables
    //         let removeItem = ""

    //         //set remove item id
    //         for(let item in editRowData) 
    //         { 
    //             if(oldMultilinePos == editRowData[item].pos) { removeItem = item; console.log(editRowData[item]) }
    //         }

    //         //remove item from array
    //         editRowData.splice(removeItem, 1)

    //         //update data positions
    //         for(let item in editRowData)
    //         {
    //             editRowData[item].pos = (parseInt(item) + 1).toString()
    //         }
    //         // console.log(editRowData)

    //         //set status
    //         isChanged = true
    //     }

    //     //changes: NO
    //     if(isChanged == false) 
    //     { console.log("editMultilineData: no changes"); return }

    //     //changes: YES
    //     else if(isChanged == true)
    //     {
    //         //sort data by position
    //         editRowData.sort((a, b) => { return a.pos - b.pos })

    //         //stringify data
    //         editRow.data = JSON.stringify(editRowData).toString().replaceAll("\"", "'")

    //         //save to local storage
    //         localStorage.setItem("cms-edit-row", JSON.stringify(editRow))

    //         //reload data obj
    //         loadDataObjModal(editRow)
            
    //         //type: UP or DOWN
    //         if(type == "up" || type == "down")
    //         {
    //             //update elements
    //             editMultilineData('click', newMultilinePos)
    //             dataObjModalMultiline = document.getElementById("dataObjModalMultiline#" + newMultilinePos)
    //             dataObjModalMultiline.scrollIntoView()
    //         }

    //         //type: ADD
    //         else if(type == "add")
    //         {   
    //             //variables
    //             let elementId = parseInt(totalItems + 1).toString()

    //             //update elements
    //             editMultilineData('click', elementId)
    //             setTimeout(() => { document.getElementById("dataObjModalMultiline#" + elementId).scrollIntoView() }, 20)
    //         }

    //         //type: DELETE
    //         else if(type == "delete")
    //         {
    //             //update elements
    //             inputMultilinePos.value = ""
    //             editMultilineData('click', '')
    //         }

    //         //type: OTHERS
    //         else
    //         {
    //             //update elements
    //             editMultilineData('click', oldMultilinePos)
    //         }
    //     }
    // }


    function editData(type, action, pos)
    {
        //set type
        type = type.substr(0, 1).toUpperCase() + type.substr(1)

        //debugging
        console.log("type: " + type)
        console.log("action: " + action)
        console.log("pos: " + pos)

        //elements
        let dataObjModalEdit = document.getElementById("dataObjModalEdit" + type)
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")
        let inputTypePos = document.getElementById("input" + type + "Pos")
        let inputTypeYear = document.getElementById("input" + type + "Year")
        let dataObjModalClass = document.getElementsByClassName("dataObjModal" + type)
        let dataObjModalType = ""
        let dataObjModalText = ""
        let dataObjModalYear = ""
        let dataObjModalLink = ""
        
        //variables
        let editRow = JSON.parse(localStorage.getItem("cms-edit-row"))
        let editRowData = JSON.parse(editRow.data.toString().replaceAll("'", '"'))
        let position = dataObjPosition.value
        let hidden = dataObjHidden.checked.toString()
        let title = dataObjTitle.value
        let editItem = ""
        let totalItems = dataObjModalClass.length
        let isChanged = false

        //set input position
        if(inputTypePos) { inputTypePos.value = pos }

        //set row obj values
        editRow.pos = position
        editRow.hidden = hidden
        editRow.title = title

        //set edit item
        for(let item in editRowData)
        {
            if(oldPos == editRowData[item].pos) { editItem = editRowData[item] }
        }

        //action: CLICK
        if(action == "click") 
        { 
            //elements
            dataObjModalType = document.getElementById("dataObjModal" + type + "#" + pos)
            dataObjModalText = document.getElementById("dataObjModal" + type + "Text#" + pos)

            //set old position
            oldPos = pos
            
            //update elements
            if(dataObjModalEdit) dataObjModalEdit.style.display = "flex"
            for(let e in dataObjModalClass)
            {
                let element = document.getElementById(dataObjModalClass[e].id) 
                if(element) { element.style.opacity = "0.1" }
            }
            if(dataObjModalType) { dataObjModalType.style.opacity = "1" }
        }

        //action: UP
        else if(action == "up") 
        {   
            //set new position
            newPos = (parseInt(oldPos) + 1).toString()
            if(newPos == 0) { newPos = 1 }
            else if(newPos > totalItems) { newPos = totalItems}
            
            //update data positions
            for(let item in editRowData) { if(newPos == editRowData[item].pos) { editRowData[item].pos = "0000" } }
            for(let item in editRowData) { if(oldPos == editRowData[item].pos) { editRowData[item].pos = newPos } }
            for(let item in editRowData) { if(editRowData[item].pos == "0000") { editRowData[item].pos = oldPos } }

            //set status
            isChanged = true
        }

        //action: DOWN
        else if(action == "down") 
        { 
            //set new position
            newPos = (parseInt(oldPos) - 1).toString()
            if(newPos == 0) { newPos = 1 }
            else if(newPos > totalItems) { newPos = totalItems}
            
            //update data positions
            for(let item in editRowData) { if(newPos == editRowData[item].pos) { editRowData[item].pos = "0000" } }
            for(let item in editRowData) { if(oldPos == editRowData[item].pos) { editRowData[item].pos = newPos } }
            for(let item in editRowData) { if(editRowData[item].pos == "0000") { editRowData[item].pos = oldPos } }

            //set status
            isChanged = true
        }

        //action: SAVE
        else if(action == "save") 
        {
            //elements
            dataObjModalText = document.getElementById("dataObjModal" + type + "Text#" + oldPos)
            dataObjModalYear = document.getElementById("dataObjModal" + type + "Year#" + oldPos)
            dataObjModalLink = document.getElementById("dataObjModal" + type + "Link#" + oldPos)
            // console.log(dataObjModalMultilineText)
            
            //variables
            let newText = ""
            let newYear = ""
            let newLink = ""

            if(dataObjModalText) { newText = dataObjModalText.value }
            if(dataObjModalYear) { newYear = dataObjModalYear.value }
            if(dataObjModalLink) { newLink = dataObjModalLink.value }

            //set new data text
            for(let item in editRowData) 
            { 
                if(oldPos == editRowData[item].pos) 
                { 
                    if(newText) { editRowData[item].text = newText }
                    if(newYear) { editRowData[item].year = newYear }
                    if(newLink) { editRowData[item].link = newLink }
                } 
            }

            //set status
            isChanged = true
        }

        //action: ADD
        else if(action == "add") 
        {       
            //variables
            let pos = (editRowData.length + 1).toString()
            let obj = {pos: pos, text: ''}

            //add item to array
            editRowData.push(obj)
            
            //set status
            isChanged = true
        }

        //action: DELETE
        else if(action == "delete") 
        {   
            //variables
            let removeItem = ""

            //set remove item id
            for(let item in editRowData) 
            { 
                if(oldPos == editRowData[item].pos) 
                { 
                    removeItem = item
                    // console.log(editRowData[item]) 
                }
            }

            //remove item from array
            editRowData.splice(removeItem, 1)

            //update data positions
            for(let item in editRowData)
            {
                editRowData[item].pos = (parseInt(item) + 1).toString()
            }
            // console.log(editRowData)

            //set status
            isChanged = true
        }

        //changes: NO
        if(isChanged == false) 
        { console.log("editData: no changes"); return }

        //changes: YES
        else if(isChanged == true)
        {
            //sort data by position
            editRowData.sort((a, b) => { return a.pos - b.pos })

            //stringify data
            editRow.data = JSON.stringify(editRowData).toString().replaceAll("\"", "'")

            //save to local storage
            localStorage.setItem("cms-edit-row", JSON.stringify(editRow))

            //reload data obj
            loadDataObjModal(editRow)
            
            //action: UP or DOWN
            if(action == "up" || action == "down")
            {
                //update elements
                editData(type, 'click', newPos)
                dataObjModalType = document.getElementById("dataObjModal" + type + "#" + newPos)
                dataObjModalType.scrollIntoView()
            }

            //action: ADD
            else if(action == "add")
            {   
                //variables
                let elementId = parseInt(totalItems + 1).toString()

                //update elements
                editData(type, 'click', elementId)
                setTimeout(() => { document.getElementById("dataObjModal" + type + "#" + elementId).scrollIntoView() }, 20)
            }

            //action: DELETE
            else if(action == "delete")
            {
                //update elements
                inputTypePos.value = ""
                editData(type, 'click', '')
            }

            //action: OTHERS
            else
            {
                //update elements
                editData(type, 'click', oldPos)
            }
        }
    }
    
    
    function confirmCheckboxes(type)
    {
        console.log("confirmCheckboxes")

        let checkboxSave = document.getElementById("checkboxSave")
        let confirmChanges = document.getElementById("confirmChanges")
        let buttonSave = document.getElementById("buttonSave")
        let buttonDelete = document.getElementById("buttonDelete")
        let dataObjModal = document.getElementById("dataObjModal")
        
        if(type == 'save')
        {
            if(checkboxSave.checked == true)
            {
                checkboxDelete.checked = false
                confirmChanges.style.display = "block"
                buttonDelete.style.display = "none"
                buttonSave.style.display = "block"
                buttonSave.scrollIntoView()
            }
            else if(checkboxSave.checked == false)
            {   
                confirmChanges.style.display = "none"
                buttonDelete.style.display = "none"
            }
        }
        else if(type == 'delete')
        {
            if(checkboxDelete.checked == true)
            {
                checkboxSave.checked = false
                confirmChanges.style.display = "block"
                buttonSave.style.display = "none"
                buttonDelete.style.display = "block"
                buttonDelete.scrollIntoView()
            }
            else if(checkboxDelete.checked == false)
            {   
                confirmChanges.style.display = "none"
                buttonDelete.style.display = "none"
            }
        }
    }


    return {
        //variables
        backendSections,
        backendCategories,
        backendData,
        backendCategoriesSelected,
        backendDataSelected,
        backendDataObjModal,

        //functions
        fetchSpecificUser,
        loadSectionCategories,
        loadCategoryData,
        loadDataType,
        loadDataObjModal,
        undisplayModals,
        loadDataInputs,
        imageGalleryRemoveImg,
        imageGalleryAddImg,
        sortBackendDataSelected,
        selectPreviewImage,
        imageGalleryUpdateImagePos,
        saveChanges,
        // editMultilineData,
        editData,
        confirmCheckboxes,
    }
  }
}
</script>


<style scoped>
    /*** scrollbars */
    #dataObjModalPreviewImages::-webkit-scrollbar { height: 12px; width: 10px; }
    #dataObjModalPreviewImages::-webkit-scrollbar-track { background: black; }
    #dataObjModalPreviewImages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
    #dataObjModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModal::-webkit-scrollbar-track { background: black; }
    #dataObjModal::-webkit-scrollbar-thumb { background: gray; }


    /*** ids ***/
    #componentBackend { height: 100vh; width: 100vw; margin: auto; padding: 0px; color: white; background-color: #2c9b2c; }
    #backendSections 
    { 
        position: fixed; 
        display: block; 
        left: 22%; 
        top: 6%; 
        width: 13vw; 
        max-height: 88vh; 
        margin: 0px 0px 20px 0px;
        overflow-y: scroll;
        user-select: none;
        /* border-right: 2px solid white; */
        background-color: #2c9b2c;
    }
    #backendCategories 
    { 
        position: fixed; 
        display: flex; 
        left: 36%; 
        top: 6%; 
        width: 40vw; 
        margin: 0px 0px 20px 0px;
        overflow-x: scroll;
        user-select: none;
        /* border-bottom: 2px solid white;  */
        background-color: gray;
    }
    #backendData 
    { 
        position: fixed; 
        display: block; 
        margin: 0px 0px 20px 0px;
        padding: 30px 0px 0px 0px;
        height: 79vh; 
        width: 40vw; 
        left: 36%; 
        top: 12%;
        overflow-y: scroll;
        user-select: none;
        /* border: 2px solid white;  */
        background-color: lightgray;
    }
    #confirmChanges { display: none; padding: 60px 0px 0px 0px; }
    #buttonSave 
    { 
        display: none;
        width: -webkit-fill-available;
        margin: auto;
        padding: 16px 0px 16px 0px; 
        font-size: 22px; 
        font-weight: bold; 
        user-select: none;
        border-radius: 0%;
        border: 1px solid #00000099;
        color: white;
        background-color: #1acf1a; 
    }
    #buttonDelete 
    { 
        display: none;
        width: -webkit-fill-available;
        margin: auto;
        padding: 16px 0px 16px 0px;
        font-size: 22px;
        font-weight: bold;
        user-select: none;
        border-radius: 0%; 
        border: 1px solid #00000099;
        color: white; 
        background-color: red; 
    }
    #account 
    { 
        position: fixed; 
        display: block; 
        height: 80px; 
        width: 80px; 
        top: 18px; 
        right: 20px; 
        border-radius: 90%;
        background-color: white; 
    }
    #dataObjModal 
    { 
        position: fixed; 
        display: block; 
        max-height: 70vh; 
        width: 28vw; 
        left: 34%; 
        top: 10%; 
        margin: 0px;
        padding: 40px 40px 40px 40px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        /* transform: translate(-40%, -50%); */
        background-color: #2c9b2c; 
        border: 2px solid white; 
    }
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
    #dataObjModalAddData { display: flex; margin: 0px; padding: 0px; }
    #dataObjModalEditImages 
    { 
        display: flex;
        flex-direction: row; 
        justify-content: left; 
        border: 0px solid black;
        background-color: black; 
    }
    #inputImagePosition 
    { 
        display: block; 
        width: auto;
        margin: 0px 0px 0px 20px;
        padding: 10px; 
        font-size: 20px; 
        font-weight: bold;
        text-align: center;
        color: white;
        border: 0px solid black;
        background-color: black; 
    }
    #buttonDeleteImage 
    { 
        display: inline-block; 
        width: 30%; 
        padding: 0px;
        font-size: 36px;
        font-weight: bold; 
        border: 6px solid black;
        color: red;
        background-color: black; 
    }
    #labelEditImagePosition 
    { 
        display: none; 
        width: 40px; 
        margin: 0px; 
        padding: 0px; 
        font-size: 20px; 
        font-weight: bold;
        background-color: black; 
        color: white; 
    }
    #buttonEditPosition
    {
        display: inline-block;
        width: 18%;
        padding: 10px 0px 10px 20px;
        font-size: 33px;
        font-weight: bold; 
        border: 6px solid black;
        border-right: 0px solid black;
        border-left: 0px solid black;
        color: lightgreen;
        background-color: black;
    }
    #buttonAdd { border: 10px solid black; }
    #inputAdd { border-bottom: 12px solid black; }
    #dataObjModalEditButtons { padding: 6px 4px 6px 4px; }
    #dataObjModalData { background-color: black; }
    #galleryImagesTitle { padding-bottom: 4px; background-color: #2c9b2c; }
    #dataObjModalEditMultiline { display: flex; padding: 6px; }
    #dataObjModalEditTimeline { display: flex; padding: 6px; }
    #dataObjModalEditLinklist { display: flex; padding: 6px; }
    #dataObjModalEditTextlist { display: flex; padding: 6px; }
    #dataObjModalEdit { display: none; padding: 6px; }
    #dataObjModalMultilineRows { max-height: 240px; overflow-y: scroll; }
    #dataObjModalTimelineRows { max-height: 240px; overflow-y: scroll; }
    #dataObjModalLinklistRows { max-height: 240px; overflow-y: scroll; }
    #dataObjModalTextlistRows { max-height: 240px; overflow-y: scroll; }
    #labelSave { font-size: 24px; font-weight: bold; margin: 0px 32px 0px 0px; vertical-align: super; }
    #labelDelete { font-size: 24px; font-weight: bold; margin: 0px; vertical-align: super; }
    #updateStatusMessage { display: none; margin: 49px 0px 40px 0px; font-size: 24px; font-weight: bold; }
    #confirmCheckbox { display: block; }

    
    .section { padding: 10px; font-size: 20px; font-weight: bold; text-align: left; user-select: none; color: black; border-bottom: 1px solid black; }
    .category { padding: 10px 0px 10px 10px; text-wrap: nowrap; font-size: 20px; font-weight: bold; color: black; }
    .dot { display: inline-block; padding: 0px 10px 0px 10px; }
    .data { height: 40px; width: 100%; display: block; padding: 0px 0px 0px 40px; font-size: 20px; font-weight: bold; text-align: left; color: black; }
    .dataObjModalRowTitle 
    { 
        display: block; 
        margin: 0px 0px 1px 0px;
        padding: 0px; 
        font-size: 22px; 
        font-weight: bold;
        text-transform: capitalize; 
        text-align: left;
        text-shadow: 0px 1px black; 
        color: white;
        background-color: #2c9b2c;
    }
    .dataObjModalRowInput 
    { 
        display: block; 
        height: 40px; 
        width: -webkit-fill-available; 
        padding: 1px 10px 1px 10px;
        font-size: 20px; 
        font-weight: bold;
        color: white;
        border: 0px solid white;
        /* border-bottom: 1px solid white; */
        background-color: black; 
    }
    .dataObjModalRowInputDataItem 
    { 
        display: inline-block; 
        height: 40px; 
        width: 90%;
        padding: 1px 10px 1px 10px;
        font-size: 20px; 
        font-weight: bold;
        color: white;
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black; 
    }
    .dataObjRow { margin: 0px 0px 60px 0px; }
    .dataObjHeader 
    { 
        margin: 0px 0px 40px 0px; 
        font-size: 24px; 
        font-weight: bold; 
        text-transform: uppercase; 
        text-shadow: 0px 1px black; color: white; 
    }
    .buttonAdd 
    {     
        display: inline-block;
        width: auto;
        padding: 0px 13px 4px 13px;
        font-size: 33px;
        font-weight: bold;
        border: 0px solid black;
        border-bottom: 1px solid white;
        color: lightgreen;
        background-color: black;
    }
    .buttonDelete 
    {     
        display: inline-block;
        width: auto;
        padding: 4px 16px 4px 16px;
        font-size: 26px;
        font-weight: bold;
        border: 0px solid black;
        border-bottom: 1px solid white;
        background-color: red;
    }
    .buttonDelete:active { opacity: 0.7; }
    .dataObjModalPreviewImage 
    { 
        display: inline-block; 
        max-height: 160px; 
        min-height: 160px; 
        max-width: 160px;
        min-width: 160px;
        user-select: none; 
        -webkit-user-drag: none;
        border: 0px solid black;
        border-left: 6px solid black;
        border-right: 12px solid black;
        border-bottom: 16px solid black;
        background-color: white;
    }
    .dataObjModalDataItems { display: flex; margin: auto; text-align: left; }
    .inputAdd 
    { 
        display: inline-block; 
        height: 40px; 
        width: 90%;
        padding: 8px 12px 4px 22px;
        font-size: 20px; 
        font-weight: bold;
        color: white;
        border: 0px solid white;
        /* border-bottom: 1px solid white; */
        background-color: black;
    }
    .inputMultilineText 
    { 
        display: inline-flex; 
        padding: 1px 10px 1px 10px;
        height: 40px;
        width: -webkit-fill-available; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputMultilinePos
    {
        display: inline-flex; 
        padding: 3px 7px 1px 16px;
        height: 43px;
        width: auto; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputMultilineSidebarPos
    {
        display: inline-flex; 
        padding: 3px 7px 1px 16px;
        height: 43px;
        width: auto; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputTimelineText 
    { 
        display: inline-flex; 
        padding: 1px 10px 1px 10px;
        height: 40px;
        width: 70%; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputTimelineYear
    {
        display: inline-flex; 
        padding: 3px 7px 1px 16px;
        height: 38px;
        width: 12%; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputTimelineSidebarPos
    {
        display: inline-flex; 
        padding: 3px 3px 1px 16px;
        height: 43px;
        width: auto; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputMultilineRow { display: inline-flex; width: auto; }
    .dataObjModalMultiline { display: inline-flex; margin: auto; width: -webkit-fill-available; }
    .dataObjModalTimeline { display: inline-flex; margin: auto; width: -webkit-fill-available; }
    .dataObjModalLinklist { display: inline-flex; margin: auto; width: -webkit-fill-available; }
    .checkbox { height: 30px; width: 30px; }

    .editAddRow
    { 
        height: 40px; 
        width: 40px; 
        margin: 0px 10px 0px 0px; 
        font-size: 40px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white; 
        background-color: black; 
    }
    .editPosUp
    { 
        height: 40px; 
        width: 40px; 
        margin: 4px 10px 4px 6px; 
        font-size: 30px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white; 
        background-color: black; 
    }
    .editPosDown 
    { 
        height: 40px; 
        width: 40px; 
        margin: 4px 10px 4px 6px; 
        font-size: 30px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white; 
        background-color: black; 
    }
    .editItemDelete 
    { 
        height: 40px; 
        width: 40px; 
        margin: 3px 22px 0px 6px; 
        font-size: 36px; 
        font-weight: bold; 
        border: 0px solid white; 
        color: red; 
        background-color: black; 
    }
    .editItemSave 
    { 
        height: 40px; 
        width: 40px; 
        margin: 2px 16px 0px 10px; 
        font-size: 40px; 
        font-weight: bold; 
        border: 0px solid white; 
        color: lightgreen; 
        background-color: black; 
    }
    .editPosDisplay
    {
        height: 40px; 
        width: -webkit-fill-available; 
        margin: 4px 10px 0px 2px; 
        font-size: 26px; 
        font-weight: bold; 
        border: 0px solid white; 
        color: white; 
        background-color: black; 
    }
    .inputSinglelineText 
    { 
        display: inline-flex; 
        padding: 1px 10px 1px 10px;
        height: 40px;
        width: -webkit-fill-available; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        background-color: black;
    }
    .inputLinklistSidebarPos
    {
        display: inline-flex; 
        padding: 3px 3px 1px 16px;
        height: 43px;
        width: auto; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputLinklistText
    {
        display: inline-flex; 
        padding: 1px 10px 1px 10px;
        height: 40px;
        width: 60%; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputLinklistLink
    {
        display: inline-flex; 
        padding: 1px 10px 1px 10px;
        height: 40px;
        width: 22%; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputTextlistSidebarPos
    {
        display: inline-flex; 
        padding: 3px 3px 1px 16px;
        height: 46px;
        width: 9%; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    .inputTextlistText
    {
        display: inline-flex; 
        padding: 1px 10px 1px 10px;
        height: 40px;
        width: 86%; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
</style>