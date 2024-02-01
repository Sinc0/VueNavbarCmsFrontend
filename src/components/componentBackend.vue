<template>
    <div id="componentBackend">
        <!-- sections -->
        <div id="backendSections" v-if="backendSections">
            <div id="backendSectionsList">
                <!-- select section -->
                <div v-bind:id="'section#' + section.pos" class="section" v-for="section in sortBackendSections(backendSections)" v-on:click="loadSectionCategories(section)" v-bind:title="section.title">
                    {{section.pos}}
                </div>
            </div>
        </div>


        <!-- categories -->
        <div id="backendCategories" v-if="backendCategoriesSelected">
            <!-- edit category -->
            <div id=""><img id="settingsCategoriesIcon" src="/iconSettingsCategories.png" v-on:click="editCategoriesModal(backendCategories)" /></div>

            <!-- select category -->
            <div id="backendCategoriesList">
                <input type="button" v-bind:id="'category#' + category.pos" class="category" 
                    v-for="category in sortBackendCategories(backendCategoriesSelected)" 
                    v-on:click="loadCategoryData(category.section , category.title, category.pos)" 
                    v-bind:value="category.title" 
                />
            </div> 
        </div>


        <!-- data -->
        <div id="backendData">
            <!-- select data row -->
            <div id="backendDataRows">
                <div class="data" v-for="data in sortBackendDataSelected(backendDataSelected)" v-on:click="loadDataObjModal(data, false)">
                    {{loadDataType(data)}}
                </div>
            </div>

            <!-- add new data row -->
            <div id="addNewDataRow" v-on:click="addNewDataRow('')">+</div>
        </div>


        <!-- modal: data obj -->
        <div id="dataObjModal" v-if="backendDataObjModal">
            <!-- header -->
            <p id="dataObjModalHeader" class="dataObjHeader">&lt{{backendDataObjModal.type}}></p>
            
            <div class="dataObjRow" v-for="(row, index) in Object.entries(backendDataObjModal)">
                <!-- obj: variables -->
                <div hidden>{{rowData = row.toString().split(",")}}</div>
                <div hidden v-if="backendDataSelected">{{dataTotalRows = (backendDataSelected.length + 1)}}</div>
                <div hidden v-else-if="!backendDataSelected">{{dataTotalRows = 0}}</div>
                <div hidden>{{dataType = rowData[0]}}</div>
                <div hidden>{{dataValue = rowData[1]}}</div>

                <!-- obj: position -->
                <div id="" v-if="dataType == 'pos'">
                    <p class="dataObjModalRowTitle">Position</p>
                    <input id="dataObjPosition" class="dataObjModalRowInput" required type="number" min="1" v-bind:max='dataTotalRows' v-bind:value="row.toString().replace('pos,', '')" />
                </div>

                <!-- obj: hidden -->
                <div id="" v-else-if="dataType == 'hidden'">
                    <p class="dataObjModalRowTitle">Hidden</p>
                    <input id="dataObjHidden" class="dataObjModalRowInput" required type="checkbox" maxlength="100" />

                    <p id="dataObjNewTitle" class="dataObjModalRowTitle">New</p>
                    <input id="dataObjNew" class="dataObjModalRowInput" required type="checkbox" maxlength="100" />
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
            
            <!-- input errors -->
            <p id="dataObjModalErrorMessage" class="dataObjErrorMessage"></p>

            <!-- update status -->
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
                <button id="buttonSave" v-on:click="saveChangesData('edit')">Confirm Save</button>
                <button id="buttonDelete" v-on:click="saveChangesData('delete')">Confirm Delete</button>
            </div>

        </div>


        <!-- modal: account -->
        <div id="account">
        </div>


        <!-- modal: underlay -->
        <div id="underlayModal" v-on:click="undisplayModals()">
        </div>


        <!-- modal: select add type -->
        <!-- <div id="addSelectTypeModal">
            <label id="addNewTypeTitle">Add</label>
            <input type="button" class="buttonAddNewType" value="New Section" v-on:click="" />
            <input type="button" class="buttonAddNewType" value="New Category" v-on:click="" />
            <input type="button" class="buttonAddNewType" value="New Row" v-on:click="addNewDataRow('')" />
        </div> -->


        <!-- modal: add row -->
        <div id="addDataRowModal">
            <label id="addDataRowTitle">Add Row</label>
            <input type="button" class="buttonNewDataRowType" value="Multiline Text" v-on:click="addNewDataRow('multiline')" />
            <input type="button" class="buttonNewDataRowType" value="Singleline Text" v-on:click="addNewDataRow('singleline')" />
            <input type="button" class="buttonNewDataRowType" value="Timeline" v-on:click="addNewDataRow('timeline')" />
            <input type="button" class="buttonNewDataRowType" value="Linklist" v-on:click="addNewDataRow('linklist')" />
            <input type="button" class="buttonNewDataRowType" value="Textlist" v-on:click="addNewDataRow('textlist')" />
            <input type="button" class="buttonNewDataRowType" value="Image Gallery" v-on:click="addNewDataRow('imageGallery')" />
        </div>

        
        <!-- modal: edit categories -->
        <div id="editCategoriesModal">
            <label id="editCategoryTitle">Edit Categories</label>

            <div id="editCategoriesList">
                <div v-bind:id="'editCategoryObj#' + category.pos" class="editCategoryObj" v-for="category in sortBackendCategories(backendCategoryObjModal)">
                    <input type="button" v-bind:id="'buttonCategorySettingsPos#' + category.pos" class="buttonCategorySettingsPos" v-bind:value="category.pos" v-on:click="editCategory(category, 'click')" />
                    <input type="text" v-bind:id="'buttonCategorySettingsTitle#' + category.pos" class="buttonCategorySettingsTitle" v-bind:value="category.title" v-on:click="editCategory(category, 'click')" placeholder="category" />
                </div>
            </div>
            
            <div id="editCategoriesInputs">
                <input id="inputCategoryDown" class="editPosDown" type="button" value="⬇" v-on:click="editCategory('','up')" />
                <input id="inputCategoryUp" class="editPosUp" type="button" value="⬆" v-on:click="editCategory('','down')" />
                <input id="inputCategoryPos" class="editPosDisplay" type="button" value="" v-on:click="" />
                <input id="inputCategorySave" class="editItemSave" type="button" value="✓" v-on:click="editCategory('','save')" />
                <input id="inputCategoryDelete" class="editItemDelete" type="button" value="━" v-on:click="editCategory('','delete')" />
                <input id="inputCategoryAddRow" class="editAddRow" type="button" value="+" v-on:click="editCategory('','add')" />
                
                <img id="inputCategoryHiddenToggleShow" src="/iconShow.png" v-on:click="editCategory('','hidden')" />
                <img id="inputCategoryHiddenToggleHidden" src="/iconHidden.png" v-on:click="editCategory('','show')" />
                <input hidden id="inputCategoryHidden" class="editHideRow" type="checkbox" value="" />
            </div>

            <!-- confirm update categories -->
            <div id="confirmUpdateCategories">
                <p id="updateStatusMessageUpdateCategories"></p>  <!-- update status message -->
    
                <!-- checkboxes -->
                <div id="confirmCheckboxUpdateCategories">
                    <input id="checkboxSaveUpdateCategories" class="checkbox" type="checkbox" v-on:click="confirmCheckboxUpdateCategories()" />
                    <label id="labelSaveUpdateCategories">Save</label>
                </div>
    
                <!-- save -->
                <div id="confirmChangesCheckboxUpdateCategories">
                    <button id="buttonSaveUpdateCategories" v-on:click="saveChangesCategories()">Confirm Save</button>
                </div>
            </div>
        </div>
        

        <!-- modal: edit sections -->
        <div id="editSectionsModal">
            <label id="editSectionTitle">Edit Sections</label>

            <div id="editSectionsList">
                <div v-bind:id="'editSectionObj#' + section.pos" class="editSectionObj" v-for="section in sortBackendSections(backendSectionObjModal)">
                    <input type="button" v-bind:id="'buttonSectionSettingsPos#' + section.pos" class="buttonSectionSettingsPos" v-bind:value="section.pos" v-on:click="editSection(section, 'click')" />
                    <input type="text" v-bind:id="'buttonSectionSettingsTitle#' + section.pos" class="buttonSectionSettingsTitle" v-bind:value="section.title" v-on:click="editSection(section, 'click')" placeholder="section" />
                </div>
            </div>
            
            <div id="editSectionsInputs">
                <input id="inputSectionDown" class="editPosDown" type="button" value="⬇" v-on:click="editSection('','up')" />
                <input id="inputSectionUp" class="editPosUp" type="button" value="⬆" v-on:click="editSection('','down')" />
                <input id="inputSectionPos" class="editPosDisplay" type="button" value="" v-on:click="" />
                <input id="inputSectionSave" class="editItemSave" type="button" value="✓" v-on:click="editSection('','save')" />
                <input id="inputSectionDelete" class="editItemDelete" type="button" value="━" v-on:click="editSection('','delete')" />
                <input id="inputSectionAddRow" class="editAddRow" type="button" value="+" v-on:click="editSection('','add')" />
                
                <img id="inputSectionHiddenToggleShow" src="/iconShow.png" v-on:click="editSection('','hidden')" />
                <img id="inputSectionHiddenToggleHidden" src="/iconHidden.png" v-on:click="editSection('','show')" />
                <input hidden id="inputSectionHidden" class="editHideRow" type="checkbox" value="" />
            </div>

            <!-- confirm update sections -->
            <div id="confirmUpdateSections">
                <p id="updateStatusMessageUpdateSections"></p>  <!-- update status message -->
    
                <!-- checkboxes -->
                <div id="confirmCheckboxUpdateSections">
                    <input id="checkboxSaveUpdateSections" class="checkbox" type="checkbox" v-on:click="confirmCheckboxUpdateSections()" />
                    <label id="labelSaveUpdateSections">Save</label>
                </div>
    
                <!-- save -->
                <div id="confirmChangesCheckboxUpdateSections">
                    <button id="buttonSaveUpdateSections" v-on:click="saveChangesSections()">Confirm Save</button>
                </div>
            </div>
        </div>


        <!-- button: edit sections -->
        <div id="" v-if="backendSections">
            <img id="settingsSectionsIcon" src="/iconSettingsSections.png" v-on:click="editSectionsModal(backendSections)"/>
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
    const backendCategoryObjModal = computed(() => { return store.getters['storage/backendCategoryObjModal']})
    const backendSectionObjModal = computed(() => { return store.getters['storage/backendSectionObjModal']})


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
    var oldCategoryPos = ""
    var newCategoryPos = ""
    var oldSectionPos = ""
    var newSectionPos = ""
            

    //lifecycle hooks
    onMounted(() => { console.log("componentBackend mounted"); fetchSpecificUser() })
    onUpdated(() => { console.log("componentBackend updated") })


    //event listeners
    document.addEventListener('wheel', function(e) {
        //elements 
        let backendCategoriesList = document.getElementById("backendCategoriesList")
        // let dataObjModalPreviewImages = document.getElementById("dataObjModalPreviewImages")

        //categories horizontal scroll
        if (e.deltaY > 0) { if(backendCategoriesList != null) { backendCategoriesList.scrollLeft += 60; } }
        else { if(backendCategoriesList != null) { backendCategoriesList.scrollLeft -= 60; } }
    })
    

    //functions
    async function fetchSpecificUser()
    {   
        //variables
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
                //save to vuex
                store.dispatch('storage/actionSetBackendSections', data.sections)
                store.dispatch('storage/actionSetBackendCategories', data.categories)
                store.dispatch('storage/actionSetBackendData', data.data)

                //save to local storage
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
        //elements
        let settingsCategoriesIcon = document.getElementById("settingsCategoriesIcon")
        let backendData = document.getElementById("backendData")
        let backendCategoriesList = document.getElementById("backendCategoriesList")
        let selectedSectionElement = document.getElementById("section#" + data.pos)
        let categoryElements = document.getElementsByClassName("category")
        let sectionElements = document.getElementsByClassName("section")

        //variables
        let arrayCategories = []

        //set selected section
        selectedSection = data.title
        
        //set array categories
        for(let c in backendCategories.value)
        {
            if(backendCategories.value[c].section == data.title) { arrayCategories.push(backendCategories.value[c]) }
        }

        //update vuex
        store.dispatch('storage/actionSetBackendCategoriesSelected', arrayCategories)

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
        if(backendData) { backendData.style.display = "none" }       
        if(settingsCategoriesIcon) { settingsCategoriesIcon.style.display = "block" }
        if(backendCategoriesList) { backendCategoriesList.scrollTo(0,0) }
        if(selectedSectionElement) { selectedSectionElement.style.opacity = "1" }
    }


    function loadCategoryData(section, category, position)
    {   
        //debugging
        // console.log(category)
        // console.log("Section: " + section)
        // console.log("Category: " + category)
        // console.log(backendData.value)

        //elements
        let selectCategoryElement = document.getElementById("category#" + position)
        let backendDataElement = document.getElementById("backendData")
        let addNewDataRow = document.getElementById("addNewDataRow")
        let categories = document.getElementsByClassName("category")
        
        //variables
        let arrayData = ""

        //set globals
        selectedSection = section
        selectedCategory = category

        //set array data
        for(let c in backendData.value)
        {
            if(backendData.value[c].section == selectedSection && backendData.value[c].category == selectedCategory) 
            { 
                arrayData = backendData.value[c].rows
            } 
        }
        
        //update vuex
        store.dispatch('storage/actionSetBackendDataSelected', arrayData)

        //update elements
        for(let c in categories)
        {
            let e = document.getElementById(categories[c].id)
            if(e) { e.style.opacity = "0.1" }
        }
        selectCategoryElement.style.opacity = "1"
        if(backendDataElement) { backendDataElement.style.display = "block" }
        if(addNewDataRow) { addNewDataRow.style.display = "block" }
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
            if(data.title == "") { data.title = "no title" }
            value = "Row " + data.pos + " · " + "<" + data.type + ">"
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


    function loadDataObjModal(data, isNew)
    {
        //elements
        let dataObjModal = document.getElementById("dataObjModal")
        let underlayModal = document.getElementById("underlayModal")
        let updateStatusMessage = document.getElementById("updateStatusMessage")
        let checkboxSave = document.getElementById("checkboxSave")
        let checkboxDelete = document.getElementById("checkboxDelete")
        let dataObjModalEditMultiline = document.getElementById("dataObjModalEditMultiline")
        let confirmCheckbox = document.getElementById("confirmCheckbox")
        let confirmChanges = document.getElementById("confirmChanges")
        let dataObjNew = document.getElementById("dataObjNew")
        let labelDelete = document.getElementById("labelDelete")
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjModalErrorMessage = document.getElementById("dataObjModalErrorMessage")
        let dataElements = document.getElementsByClassName("data")
        let dataObjHidden = ""
        
        //set globals
        selectedDataPos = data.pos
        oldDataPos = data.pos

        //debugging
        console.log("loadDataObjModal: Row " + selectedDataPos)
        
        //set vuex
        store.dispatch('storage/actionSetBackendDataObjModal', data)

        //set local storage
        localStorage.setItem("cms-edit-row", JSON.stringify(data))
        
        //update elements
        setTimeout(() => {
            dataObjHidden = document.getElementById("dataObjHidden")
            labelDelete = document.getElementById("labelDelete")
            checkboxDelete = document.getElementById("checkboxDelete")
            if(isNew == true) 
            { 
                dataObjPosition = document.getElementById("dataObjPosition")
                if(checkboxDelete) { checkboxDelete.style.display = "none" }
                if(labelDelete) { labelDelete.style.display = "none" }
                if(dataObjPosition) 
                { 
                    if(backendDataSelected.value) { dataObjPosition.max = backendDataSelected.value.length + 1 }
                    else if(!backendDataSelected.value) { dataObjPosition.max = 1}
                    if(backendDataSelected.value) { dataObjPosition.min = 1 }
                    else if(!backendDataSelected.value) { dataObjPosition.min = 1 }
                }
            }
            else if(isNew == false) 
            { 
                dataObjPosition = document.getElementById("dataObjPosition")
                if(checkboxDelete) { checkboxDelete.style.display = "inline" }
                if(labelDelete) { labelDelete.style.display = "inline" }
                if(dataObjPosition) 
                {   
                    if(backendDataSelected.value) { dataObjPosition.max = backendDataSelected.value.length }
                    else if(!backendDataSelected.value) { dataObjPosition.max = 1 }
                    if(backendDataSelected.value) { dataObjPosition.min = 1 }
                    else if(!backendDataSelected.value) { dataObjPosition.min = 1 }
                }
            }
            if(data.hidden == "true" && dataObjHidden) { dataObjHidden.checked = true }
            else if(data.hidden == "false" && dataObjHidden) { dataObjHidden.checked = false }
        }, 20)
        if(dataObjNew) { dataObjNew.checked = isNew }
        if(dataObjModalEditMultiline) { dataObjModalEditMultiline.style.display = "flex"}
        if(checkboxSave) { checkboxSave.checked = false }
        if(checkboxDelete) { checkboxDelete.checked = false }
        if(updateStatusMessage) { updateStatusMessage.style.display = "none" }
        if(confirmChanges) { confirmChanges.style.display = "none" }
        if(confirmCheckbox) { confirmCheckbox.style.display = "block" }
        if(underlayModal) { underlayModal.style.display = "block" }
        if(dataObjModal) { dataObjModal.style.display = "block"; /* dataObjModal.scrollTo(0,0) */ }
        if(dataObjPosition) { dataObjPosition.style.backgroundColor = "black" }
        if(dataObjModalErrorMessage) { dataObjModalErrorMessage.style.display = "none"; dataObjModalErrorMessage.innerText = "" }
    }


    function undisplayModals()
    {
        //elements
        let dataObjModal = document.getElementById("dataObjModal")
        let underlayModal = document.getElementById("underlayModal")
        let addDataRowModal = document.getElementById("addDataRowModal")
        let addSelectTypeModal = document.getElementById("addSelectTypeModal")
        let editCategoriesModal = document.getElementById("editCategoriesModal")
        let editSectionsModal = document.getElementById("editSectionsModal")

        //update elements
        if(dataObjModal) { dataObjModal.style.display = "none" }
        if(addDataRowModal) { addDataRowModal.style.display = "none" }
        if(underlayModal) { underlayModal.style.display = "none" }
        if(addSelectTypeModal) { addSelectTypeModal.style.display = "none" }
        if(editCategoriesModal) { editCategoriesModal.style.display = "none" }
        if(editSectionsModal) { editSectionsModal.style.display = "none" }
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


    function imageGalleryRemoveImg()
    {
        //elements
        let dataObjModalData = document.getElementById("dataObjModalData")
        let inputImagePosition = document.getElementById("inputImagePosition")
        let dataObjNew = document.getElementById("dataObjNew")
        let dataObjModalPreviewImage = document.getElementsByClassName("dataObjModalPreviewImage")

        //variables
        let rowData = localStorage.getItem('cms-edit-row')
        let rowDataItem = ""
        let imagePos = inputImagePosition.value
        let correctPos = ""
        let isNew = dataObjNew.checked

        //check image pos
        if(imagePos == "") { return }

        //set row data
        rowData = JSON.parse(rowData)
        rowDataItem = JSON.parse(rowData.data.replaceAll("'", "\""))
        
        for(let c in rowDataItem)
        {
            if(imagePos == rowDataItem[c].pos) 
            { 
                console.log(rowDataItem[c])
                rowDataItem.splice(c, 1)
                // if(rowDataItem.length == 1) { rowDataItem.splice(0, 1) }
                // else if(rowDataItem.length > 1) { rowDataItem.splice((imagePos - 1), 1)}
            }
        }
        
        //correct image positions
        for(let c in rowDataItem)
        {
            correctPos = parseInt(c) + 1
            rowDataItem[c].pos = correctPos.toString()
        }
        
        //stringify row data
        rowData.data = JSON.stringify(rowDataItem).replaceAll("\"", "'")

        //update local storage
        localStorage.setItem("cms-edit-row", JSON.stringify(rowData))

        //reload data obj
        loadDataObjModal(rowData, isNew)

        //reset input
        inputImagePosition.value = ""

        //reset preview image opacity
        for(let i = 0; i < dataObjModalPreviewImage.length; i++)
        {
            if(dataObjModalPreviewImage[i]) { dataObjModalPreviewImage[i].style.opacity = "0.3" }
        }
    }


    function imageGalleryAddImg()
    {   
        //elements
        let inputAdd = document.getElementById("inputAdd")
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")
        let dataObjNew = document.getElementById("dataObjNew")
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
        let isNew = dataObjNew.checked

        //null check
        if(imgUrl == "" || imgUrl == null || imgUrl == undefined) 
        { 
            console.log("error: image url is empty") 
        }

        //handle image data
        else 
        { 
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
            loadDataObjModal(rowData, isNew)

            //select new image
            selectPreviewImage(totalItems)
        }
    }


    function imageGalleryUpdateImagePos(type)
    {
        //elements
        let inputImagePosition = document.getElementById("inputImagePosition")
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")
        let dataObjNew = document.getElementById("dataObjNew")

        //variables
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
        let isNew = dataObjNew.checked
        
        //set new image position
        newImagePos = inputImagePosition.value

        //move image up
        if(type == "up") { newImagePos = (parseInt(oldImagePos) + 1).toString() }

        //move image down
        else if(type == "down") { newImagePos = (parseInt(oldImagePos) - 1).toString() }

        //set gallery images
        galleryImages = JSON.parse(rowData)
        galleryImages = galleryImages.data.replaceAll("'", "\"")
        galleryImages = JSON.parse(galleryImages)

        //set total items
        totalItems = galleryImages.length

        //set positions
        maxPos = totalItems
        minPos = "0"

        //null check
        if(oldImagePos == newImagePos) { return }
        else if(newImagePos >= totalItems + 1) { return }
        else if(newImagePos == 0) { return }

        //update image positions
        for(let c in galleryImages)
        {
            if(galleryImages[c].pos == newImagePos) 
            { 
                if(oldImagePos > newImagePos) { moveOldImage = "up"; galleryImages[c].pos = (parseInt(newImagePos) + 1).toString() }
                else if(oldImagePos < newImagePos) { moveOldImage = "down"; galleryImages[c].pos = (parseInt(newImagePos) - 1).toString() } 
            }
            else if(galleryImages[c].pos == oldImagePos) { galleryImages[c].pos = newImagePos }
        }

        //sort gallery by image position
        galleryImages = galleryImages.sort((a, b) => { return a.pos - b.pos })
        
        //correct image positions
        for(let c in galleryImages)
        {
            correctPos = parseInt(c) + 1
            galleryImages[c].pos = correctPos.toString()
        }

        //stringify gallery images
        galleryImages = JSON.stringify(galleryImages).replaceAll("\"", "'")

        //set row data
        rowData = JSON.parse(rowData)
        rowData.data = galleryImages
        rowData.pos = pos
        rowData.hidden = hidden
        rowData.title = title

        //save to local storage
        localStorage.setItem("cms-edit-row", JSON.stringify(rowData))

        //reload data obj modal
        loadDataObjModal(rowData, isNew)

        //reset input
        inputImagePosition.value = newImagePos

        //select image
        selectPreviewImage(newImagePos)
    }


    function sortBackendDataSelected(data)
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


    async function saveChangesData(type)
    {
        //elements
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")
        let confirmChanges = document.getElementById("confirmChanges")
        let confirmCheckbox = document.getElementById("confirmCheckbox")
        let dataObjModalSinglelineText = document.getElementById("dataObjModalSinglelineText")
        let dataObjNew = document.getElementById("dataObjNew")
        let dataObjModalErrorMessage = document.getElementById("dataObjModalErrorMessage")
        
        //variables
        let rowData = JSON.parse(localStorage.getItem('cms-edit-row'))
        let pos = dataObjPosition.value
        let hidden = dataObjHidden.checked.toString()
        let title = dataObjTitle.value
        let rowsArray = []
        let isNew = dataObjNew.checked
        let dataTotalRows = 0
        
        //check object is new
        if(isNew == true) 
        { 
            if(backendDataSelected.value) { dataTotalRows = (backendDataSelected.value.length + 1) } 
            else if(!backendDataSelected.value) { dataTotalRows = 1 } 
        }
        else if(isNew == false) 
        { 
            if(backendDataSelected.value) { dataTotalRows = backendDataSelected.value.length } 
            else if(!backendDataSelected.value) { dataTotalRows = 1 } 
        }

        //check invalid inputs
        if(dataObjPosition.value < 0 || dataObjPosition.value > dataTotalRows || dataObjPosition.value == "") 
        { 
            //debugging
            // console.log("dataObjPosition: " + dataObjPosition.value)
            // console.log("isNew: " + isNew)

            //update elements
            dataObjPosition.style.backgroundColor = "red"
            dataObjModalErrorMessage.style.display = "block"
            dataObjModalErrorMessage.innerText = "Position Invalid"
            
            //return value
            return
        }
        
        //set global
        newDataPos = pos
        
        //type: DELETE
        if(type == 'delete')
        {
            //debugging
            console.log("delete data object: " + pos)
            
            //remove item from backend data
            for(let item in backendData.value)
            {
                // console.log(backendData.value[item])
                
                if(selectedSection == backendData.value[item].section && selectedCategory == backendData.value[item].category)
                { 
                    // console.log(backendData.value[item])

                    for(let r in backendData.value[item].rows)
                    {
                        // console.log(JSON.parse(backendData.value[item].rows[r]).pos)
                        // console.log(r)
                        // console.log(JSON.parse(backendData.value[item].rows[r]))
                        
                        if(pos == JSON.parse(backendData.value[item].rows[r]).pos) 
                        { 
                            // console.log(JSON.parse(backendData.value[item].rows[r])) 
                            backendData.value[item].rows.splice((pos - 1), 1)
                        }
                    }
                    
                    // console.log(toRaw(backendData.value[item].rows))
                }
            }
            

            //add items to new array
            for(let item in backendData.value)
            {
                if(selectedSection == backendData.value[item].section && selectedCategory == backendData.value[item].category)
                { 
                    for(let r in backendData.value[item].rows)
                    {
                        rowsArray.push(JSON.parse(backendData.value[item].rows[r]))
                    }
                }
            }
            
            //update row positions
            for(let c in rowsArray)
            {
                rowsArray[c].pos = (parseInt(c) + 1).toString()
            }

            //stringify row data
            for(let c in rowsArray)
            {
                rowsArray[c] = JSON.stringify(rowsArray[c])
            }

            //update backend data rows
            for(let item in backendData.value)
            {
                if(selectedSection == backendData.value[item].section && selectedCategory == backendData.value[item].category)
                {
                    // console.log(backendData.value[item].rows)
                    backendData.value[item].rows = rowsArray
                }
            }

            console.log(backendData.value)

            //save vuex
            store.dispatch('storage/actionSetBackendData', backendData.value)
            store.dispatch('storage/actionSetBackendDataSelected', rowsArray)
            
            //update DB
            updateUserData(JSON.stringify(toRaw(backendData.value)))
        }

        //type: EDIT
        else if(type == 'edit')
        {
            //update elements
            confirmChanges.style.display = "none"
            confirmCheckbox.style.display = "none"

            //update row data
            rowData.pos = pos
            rowData.hidden = hidden
            rowData.title = title
            rowData.type = rowData.type
            rowData.data = rowData.data
            
            //check special case
            if(dataObjModalSinglelineText) { rowData.data = dataObjModalSinglelineText.value; console.log(dataObjModalSinglelineText.value)}
            
            //save row to local storage
            localStorage.setItem("cms-edit-row", JSON.stringify(rowData))
            
            //object: NEW
            if(isNew == true)
            {   
                //variables
                let newItem = JSON.parse(localStorage.getItem("cms-edit-row"))
                let posIsTaken = false

                //check position is taken
                for(let item in backendData.value)
                {
                    if(selectedSection == backendData.value[item].section && selectedCategory == backendData.value[item].category) 
                    { 
                        for(let r in backendData.value[item].rows)
                        {   
                            let rowItem = JSON.parse(backendData.value[item].rows[r])
                            // console.log(rowItem)

                            if(rowItem.pos == newItem.pos)
                            {
                                console.log("item position already taken")
                                posIsTaken = true
                                break
                            }
                        }     
                    }
                }

                //add new row
                for(let item in backendData.value)
                {
                    if(selectedSection == backendData.value[item].section && selectedCategory == backendData.value[item].category) 
                    {   
                        //position: OPEN
                        if(posIsTaken == false) 
                        {   
                            if(backendData.value[item].rows) 
                            { 
                                backendData.value[item].rows.push(JSON.stringify(newItem))
                                
                                store.dispatch('storage/actionSetBackendData', backendData.value)
                                store.dispatch('storage/actionSetBackendDataSelected', backendData.value[item].rows)
                            }

                            else if(backendData.value[item].rows == "" || backendData.value[item].rows == null) 
                            { 
                                backendData.value[item].rows = [JSON.stringify(newItem)]

                                store.dispatch('storage/actionSetBackendData', backendData.value)
                                store.dispatch('storage/actionSetBackendDataSelected', [JSON.stringify(newItem)])
                            }

                        }
                        
                        //position: TAKEN
                        else if(posIsTaken == true) 
                        {   
                            //variables    
                            let lastItemPos = backendData.value[item].rows.length + 1
                            let rowsData = []
                            let itemHolder  = ""

                            //debugging
                            // console.log("lastItemPos: " + lastItemPos)
                            // console.log("newDataPos: " + newDataPos)

                            //add data rows to array
                            for(let r in backendData.value[item].rows) { rowsData.push(JSON.parse(backendData.value[item].rows[r])) }
                            
                            //sort array by position
                            rowsData = rowsData.sort((a, b) => { return a.pos - b.pos })
                            
                            //handle swap object
                            itemHolder = rowsData[newDataPos - 1]
                            itemHolder.pos = (rowsData.length + 1).toString()

                            //add new item to correct position
                            rowsData[newDataPos - 1] = newItem

                            //add old item to correct position
                            rowsData.push(itemHolder)

                            //stringify data rows
                            for(let i in rowsData) { rowsData[i] = JSON.stringify(rowsData[i]) }
                            
                            //update selected backend data rows
                            backendData.value[item].rows = rowsData
                            
                            //debugging
                            // console.log(backendData.value[item].rows)
                            // console.log(rowsData)
                            // console.log(backendData.value)
                            // console.log(backendDataSelected.value)

                            //save vuex
                            store.dispatch('storage/actionSetBackendData', backendData.value)
                            store.dispatch('storage/actionSetBackendDataSelected', rowsData)
                        }
                    }
                }                
            }
    
            //object: OLD
            else if(isNew == false)
            {
                for(let item in backendData.value)
                {
                    if(selectedSection == backendData.value[item].section && selectedCategory == backendData.value[item].category)
                    {
                        for(let c in backendData.value[item].rows)
                        {   
                            //variables
                            let obj = JSON.parse(backendData.value[item].rows[c])
                            let objTemp = JSON.parse(backendData.value[item].rows[c])
                            let newRowData = localStorage.getItem("cms-edit-row")
                            
                            //update selected row positions
                            if(newDataPos == obj.pos) { objTemp.pos = oldDataPos; backendData.value[item].rows[c] = JSON.stringify(objTemp) }
                            if(oldDataPos == obj.pos) { backendData.value[item].rows[c] =  newRowData}
                        }

                        //save vuex
                        store.dispatch('storage/actionSetBackendData', backendData.value)
                        // store.dispatch('storage/actionSetBackendDataSelected', '')
                    }
                }
            }
    
            //sort row positions
            // for(let item in backendData.value)
            // {
            //     if(selectedSection == backendData.value[item].section && selectedCategory == backendData.value[item].category)
            //     {
            //         //add row data to array
            //         for(let r in backendData.value[item].rows) { rowsArray.push(JSON.parse(backendData.value[item].rows[r])) }
    
            //         //sort rows by position
            //         rowsArray = rowsArray.sort((a, b) => { return a.pos - b.pos })
    
            //         //stringify rows data in array
            //         for(let r in rowsArray) { rowsArray[r] = JSON.stringify(rowsArray[r]) } /* rowsArray[r].pos = (parseInt(r) + 1).toString() */ 
    
            //         //update backend data
            //         backendData.value[item].rows = rowsArray
            //     }
            // }
    
            //reload data obj modal
            loadDataObjModal(JSON.parse(localStorage.getItem("cms-edit-row")), isNew)

            //update DB
            updateUserData(JSON.stringify(toRaw(backendData.value)))
        }
    }


    async function updateUserData(newData)
    {
        //elements
        let updateStatusMessage = document.getElementById("updateStatusMessage")
        let confirmCheckbox = document.getElementById("confirmCheckbox")
        let confirmChanges = document.getElementById("confirmChanges")

        //variables
        let username = localStorage.getItem("cms-account")
        let token = localStorage.getItem("cms-token")
        let lastLogin = localStorage.getItem("cms-last-login")
        let obj = JSON.stringify([{ "username": username, "token": token, "lastLogin": lastLogin }, newData])

        //fetch update user data
        await fetch(BACKEND_API + "/update-user-data", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            // console.log(data)

            //set update successful message
            if(data.status == "update user data successful") 
            { 
                if(confirmCheckbox) { confirmCheckbox.style.display = "none" }
                if(confirmChanges) { confirmChanges.style.display = "none" }
                if(updateStatusMessage) 
                { 
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.style.marginBottom = "0px"
                    updateStatusMessage.innerText = "Update Successful!" 
                }
                setTimeout(() => {undisplayModals()}, 1000) 
            }

            //set update failed message
            else 
            {  
                if(confirmCheckbox) { confirmCheckbox.style.display = "block" }
                if(confirmChanges) { confirmChanges.style.display = "block" }
                if(updateStatusMessage) 
                { 
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.style.marginBottom = "49px"
                    updateStatusMessage.innerText = "Update Failed..." 
                }
            }
        })
    }


    async function updateUserCategories(newCategories, newData)
    {
        //elements
        let updateStatusMessage = document.getElementById("updateStatusMessageUpdateCategories")
        let confirmCheckbox = document.getElementById("confirmCheckboxUpdateCategories")
        let confirmChangesCheckboxUpdateCategories = document.getElementById("confirmChangesCheckboxUpdateCategories")
        let backendData = document.getElementById("backendData")
        let categoryElements = document.getElementsByClassName("category")

        //variables
        let username = localStorage.getItem("cms-account")
        let token = localStorage.getItem("cms-token")
        let lastLogin = localStorage.getItem("cms-last-login")
        let obj = JSON.stringify([{ "username": username, "token": token, "lastLogin": lastLogin }, newCategories, newData])

        //fetch update user catgories
        await fetch(BACKEND_API + "/update-user-categories", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            // console.log(data)

            //set update successful message
            if(data.status == "update user categories successful") 
            { 
                for(let item in categoryElements)
                {
                    let element = document.getElementById(categoryElements[item].id)
                    if(element) { element.style.opacity = "1" }
                }
                if(confirmCheckbox) { confirmCheckbox.style.display = "none" }
                if(confirmChangesCheckboxUpdateCategories) { confirmChangesCheckboxUpdateCategories.style.display = "none" }
                if(backendData) { backendData.style.display = "none" }
                if(updateStatusMessage) 
                { 
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.style.marginBottom = "0px"
                    updateStatusMessage.innerText = "Update Successful!" 
                }
                setTimeout(() => {undisplayModals()}, 1000) 
            }

            //set update failed message
            else 
            { 
                if(confirmCheckbox) { confirmCheckbox.style.display = "block" }
                if(updateStatusMessage) 
                { 
                    updateStatusMessage.style.display = "block"; 
                    updateStatusMessage.style.marginBottom = "49px"
                    updateStatusMessage.innerText = "Update Failed..." 
                }
            }
        })
    }


    async function updateUserSections(newSections)
    {
        //elements
        let updateStatusMessage = document.getElementById("updateStatusMessageUpdateSections")
        let confirmCheckbox = document.getElementById("confirmCheckboxUpdateSections")
        let confirmChangesCheckboxUpdateSections = document.getElementById("confirmChangesCheckboxUpdateSections")
        let backendData = document.getElementById("backendData")
        let categoryElements = document.getElementsByClassName("category")

        //variables
        let username = localStorage.getItem("cms-account")
        let token = localStorage.getItem("cms-token")
        let lastLogin = localStorage.getItem("cms-last-login")
        let obj = JSON.stringify([{ "username": username, "token": token, "lastLogin": lastLogin }, newSections])

        //fetch update user catgories
        await fetch(BACKEND_API + "/update-user-sections", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            // console.log(data)

            //set update successful message
            if(data.status == "update user sections successful") 
            { 
                for(let item in categoryElements)
                {
                    let element = document.getElementById(categoryElements[item].id)
                    if(element) { element.style.opacity = "1" }
                }
                if(confirmCheckbox) { confirmCheckbox.style.display = "none" }
                if(confirmChangesCheckboxUpdateSections) { confirmChangesCheckboxUpdateSections.style.display = "none" }
                if(backendData) { backendData.style.display = "none" }
                if(updateStatusMessage) 
                { 
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.style.marginBottom = "0px"
                    updateStatusMessage.innerText = "Update Successful!" 
                }
                setTimeout(() => {undisplayModals()}, 1000) 
            }

            //set update failed message
            else 
            { 
                if(confirmCheckbox) { confirmCheckbox.style.display = "block" }
                if(updateStatusMessage) 
                { 
                    updateStatusMessage.style.display = "block"; 
                    updateStatusMessage.style.marginBottom = "49px"
                    updateStatusMessage.innerText = "Update Failed..." 
                }
            }
        })
    }


    function selectPreviewImage(pos)
    {
        //debugging
        console.log("selectPreviewImage:" + pos)

        //elements
        let dataObjModalPreviewImage = document.getElementsByClassName("dataObjModalPreviewImage")
        let selectedImage = ""
        let dataObjModalEditImages = document.getElementById("dataObjModalEditImages")
        let inputImagePosition = document.getElementById("inputImagePosition")
        
        //set globals
        oldImagePos = pos

        //update elmeents
        setTimeout(() => {
            selectedImage = document.getElementById("previewImage#" + pos) 
            for(let i = 0; i < dataObjModalPreviewImage.length; i++) 
            { if(dataObjModalPreviewImage[i]) { dataObjModalPreviewImage[i].style.opacity = "0.3" } }
            if(selectedImage) { selectedImage.style.opacity = "1.0" }
            if(dataObjModalEditImages) { dataObjModalEditImages.style.display = "flex" }
            if(inputImagePosition) { inputImagePosition.value = pos }
            if(selectedImage) { selectedImage.scrollIntoView() }
        }, 20) 
    }


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
        let dataObjNew = document.getElementById("dataObjNew")
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
        let isNew = dataObjNew.checked

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
            { let element = document.getElementById(dataObjModalClass[e].id); if(element) { element.style.opacity = "0.1" } }
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
                if(oldPos == editRowData[item].pos) { removeItem = item }
            }

            //remove item from array
            editRowData.splice(removeItem, 1)

            //update data positions
            for(let item in editRowData) 
            { 
                editRowData[item].pos = (parseInt(item) + 1).toString() 
            }

            //set status
            isChanged = true
        }

        //changes: NO
        if(isChanged == false) 
        { 
            console.log("editData: no changes") 
            return 
        }

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
            loadDataObjModal(editRow, isNew)
            
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
        //debugging
        console.log("confirmCheckboxes")

        //elements
        let checkboxSave = document.getElementById("checkboxSave")
        let confirmChanges = document.getElementById("confirmChanges")
        let buttonSave = document.getElementById("buttonSave")
        let buttonDelete = document.getElementById("buttonDelete")
        let dataObjModal = document.getElementById("dataObjModal")
        
        //type: SAVE
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

        //type: DELETE
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


    function addNewDataRow(type)
    {
        //debugging
        console.log("addNewDataRow")

        //elements
        let addSelectTypeModal = document.getElementById("addSelectTypeModal")
        let addDataRowModal = document.getElementById("addDataRowModal")
        let underlayModal = document.getElementById("underlayModal")
        let dataObjNew = ""
        let data = document.getElementsByClassName("data")

        //variables
        let newPos = (data.length + 1).toString()
        let newObjImageGallery = {"pos": newPos,"hidden":"false","type":"galleryImages","title":"","data":"[]"}
        let newObjMultiline = {"pos": newPos,"hidden":"false","type":"multiline","title":"","data":"[]"}
        let newObjTimeline = {"pos": newPos,"hidden":"false","type":"timeline","title":"","data":"[]"}
        let newObjSingleline = {"pos": newPos,"hidden":"false","type":"singleline","title":"","data":""}
        let newObjLinklist = {"pos": newPos,"hidden":"false","type":"linklist","title":"","data":"[]"}
        let newObjTextlist = {"pos": newPos,"hidden":"false","type":"textlist","title":"","data":"[]"}

        //set obj is new
        setTimeout(() => { dataObjNew = document.getElementById("dataObjNew"); if(dataObjNew) { dataObjNew.checked = true }}, 20)

        //update elements
        if(addSelectTypeModal) { addSelectTypeModal.style.display = "none" }
        if(type == "") { addDataRowModal.style.display = "block"; underlayModal.style.display = "block" }
        else if(type != "") { addDataRowModal.style.display = "none" }
        if(type == "imageGallery") { loadDataObjModal(newObjImageGallery, true) }
        else if(type == "multiline") { loadDataObjModal(newObjMultiline, true) }
        else if(type == "timeline") { loadDataObjModal(newObjTimeline, true) }
        else if(type == "singleline") { loadDataObjModal(newObjSingleline, true) }
        else if(type == "linklist") { loadDataObjModal(newObjLinklist, true) }
        else if(type == "textlist") { loadDataObjModal(newObjTextlist, true) }
    }


    function addNewType(type)
    {
        //debugging
        console.log("addNewType")

        //elements
        let addSelectTypeModal = document.getElementById("addSelectTypeModal")
        let underlayModal = document.getElementById("underlayModal")
        
        //update elements
        addSelectTypeModal.style.display = "block"
        underlayModal.style.display = "block"
    }


    function editCategoriesModal(categories)
    {
        //elements
        let editCategoriesModal = document.getElementById("editCategoriesModal")
        let underlayModal = document.getElementById("underlayModal")
        let inputCategoryPos = document.getElementById("inputCategoryPos")
        let updateStatusMessageUpdateCategories = document.getElementById("updateStatusMessageUpdateCategories")
        let confirmCheckboxUpdateCategories = document.getElementById("confirmCheckboxUpdateCategories")
        let checkboxSaveUpdateCategories = document.getElementById("checkboxSaveUpdateCategories")
        let confirmChangesCheckboxUpdateCategories = document.getElementById("confirmChangesCheckboxUpdateCategories")
        let editCategoryObjects = document.getElementsByClassName("editCategoryObj")

        categories = categories.sort((a, b) => { return a.pos - b.pos })

        //set local storage
        localStorage.setItem("cms-edit-category", JSON.stringify(categories))

        //set vuex
        store.dispatch('storage/actionSetBackendCategoryObjModal', categories)

        //update elements
        for(let e in editCategoryObjects) { let c = document.getElementById(editCategoryObjects[e].id); if(c) { c.style.opacity = "1" } }
        inputCategoryPos.value = ""
        editCategoriesModal.style.display = "block"
        underlayModal.style.display = "block"
        confirmCheckboxUpdateCategories.style.display = "block"
        updateStatusMessageUpdateCategories.style.display = "none"
        confirmChangesCheckboxUpdateCategories.style.display = "none"
        checkboxSaveUpdateCategories.checked = false
    }


    function editSectionsModal(sections)
    {
        //elements
        let editSectionsModal = document.getElementById("editSectionsModal")
        let underlayModal = document.getElementById("underlayModal")
        let inputSectionPos = document.getElementById("inputSectionPos")
        let updateStatusMessageUpdateSections = document.getElementById("updateStatusMessageUpdateSections")
        let confirmCheckboxUpdateSections = document.getElementById("confirmCheckboxUpdateSections")
        let checkboxSaveUpdateSections = document.getElementById("checkboxSaveUpdateSections")
        let confirmChangesCheckboxUpdateSections = document.getElementById("confirmChangesCheckboxUpdateSections")
        let editSectionObjects = document.getElementsByClassName("editSectionObj")

        sections = sections.sort((a, b) => { return a.pos - b.pos })

        //set local storage
        localStorage.setItem("cms-edit-section", JSON.stringify(sections))

        //set vuex
        store.dispatch('storage/actionSetBackendSectionObjModal', sections)

        //update elements
        for(let e in editSectionObjects) { let c = document.getElementById(editSectionObjects[e].id); if(c) { c.style.opacity = "1" } }
        inputSectionPos.value = ""
        editSectionsModal.style.display = "block"
        underlayModal.style.display = "block"
        confirmCheckboxUpdateSections.style.display = "block"
        updateStatusMessageUpdateSections.style.display = "none"
        confirmChangesCheckboxUpdateSections.style.display = "none"
        checkboxSaveUpdateSections.checked = false
    }


    function editCategory(category, type)
    {
        //debugging
        console.log("editCategory: " + type)
        console.log(category)
        
        //elements
        let editCategoryObj = ""
        let inputCategoryPos = document.getElementById("inputCategoryPos")
        let inputCategoryHidden = document.getElementById("inputCategoryHidden")
        let inputCategoryHiddenToggleHidden = document.getElementById("inputCategoryHiddenToggleHidden")
        let inputCategoryHiddenToggleShow = document.getElementById("inputCategoryHiddenToggleShow")
        let updateStatusMessageUpdateCategories = document.getElementById("updateStatusMessageUpdateCategories")
        let editCategoryObjects = document.getElementsByClassName("editCategoryObj")
        let lsCategories = JSON.parse(localStorage.getItem('cms-edit-category'))
        let selectedElement = ""
        let newTitle = ""
        
        //variables
        let isChanged = false
        let totalItems = 0
        let id = category.pos

        //type: CLICK
        if(type == "click") 
        {   
            //set old position
            oldCategoryPos = id

            //check if hidden
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) 
                { 
                    //update elements
                    inputCategoryHiddenToggleHidden.style.display = "none"
                    inputCategoryHiddenToggleShow.style.display = "none"

                    //set item hidden
                    if(lsCategories[item].hidden == "true") 
                    { inputCategoryHidden.checked = true; inputCategoryHiddenToggleHidden.style.display = "block" }

                    //set item show
                    else if(lsCategories[item].hidden == "false") 
                    { inputCategoryHidden.checked = false; inputCategoryHiddenToggleShow.style.display = "block" }
                    
                }
            }
        }
        
        //type: ADD
        else if(type == "add") 
        {   
            for(let item in lsCategories)
            {
                if(lsCategories[item].section == selectedSection) { totalItems++ }
            }

            totalItems = (totalItems + 1).toString()

            //add obj to array
            lsCategories.push({hidden: 'false', pos: totalItems, section: selectedSection, title: 'category' + totalItems.toString()})

            //reload edit categories data
            editCategoriesModal(lsCategories)
            
            //select new category
            editCategory({pos: totalItems}, "click")

            //set status
            isChanged = true
        }
        
        //type: SAVE
        else if(type == "save") 
        {   
            for(let item in lsCategories)
            {
                if(oldCategoryPos == lsCategories[item].pos)
                {
                    selectedElement = document.getElementById("buttonCategorySettingsTitle#" + lsCategories[item].pos)
                    newTitle = selectedElement.value

                    for(let c in lsCategories)
                    {
                        if(lsCategories[c].section == selectedSection && newTitle == lsCategories[c].title) 
                        { 
                            console.log("category " + newTitle + " already exists") 
                            updateStatusMessageUpdateCategories.innerText = "category " + newTitle + " already exists"
                            updateStatusMessageUpdateCategories.style.display = "block"

                            return
                        }
                    }
                }
            }

            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) 
                { 
                    //set element
                    selectedElement = document.getElementById("buttonCategorySettingsTitle#" + lsCategories[item].pos)
                    
                    //set old title
                    let oldTitle = lsCategories[item].oldTitle
                    if(oldTitle == null) { lsCategories[item].oldTitle = lsCategories[item].title }

                    //set new title
                    lsCategories[item].title = selectedElement.value

                    //reload edit categories data
                    editCategoriesModal(lsCategories)
            
                    //select new category
                    editCategory({pos: lsCategories[item].pos}, "click")
                }
            }
        }
        
        //type: HIDDEN
        else if(type == "hidden") 
        {   
            if(oldCategoryPos == "") { return }

            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) 
                { 
                    //set hidden
                    lsCategories[item].hidden = "true"
                    inputCategoryHidden.checked = true

                    //reload edit categories data
                    editCategoriesModal(lsCategories)
            
                    editCategory({pos: lsCategories[item].pos}, "click")
                }
            }
        }
        
        //type: SHOW
        else if(type == "show") 
        {   
            if(oldCategoryPos == "") { return }

            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) 
                { 
                    //set hidden
                    // if(inputCategoryHidden.checked == true) { lsCategories[item].hidden = "true" }
                    // else if(inputCategoryHidden.checked == false) { lsCategories[item].hidden = "false" }
                    lsCategories[item].hidden = "false"
                    inputCategoryHidden.checked = false

                    //reload edit categories data
                    editCategoriesModal(lsCategories)
            
                    editCategory({pos: lsCategories[item].pos}, "click")
                }
            }
        }
        
        //type: DELETE
        else if(type == "delete") 
        { 
            //null check
            if(oldCategoryPos == "") { return }

            //variables
            let removeItem = ""
            let sectionCategoriesLength = 0
            let sectionCategoriersCounter = 0

            //set remove item id
            for(let item in lsCategories) 
            { if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) { removeItem = item } }

            //remove selected category from array
            lsCategories.splice(removeItem, 1)
            
            //count section categories
            for(let item in lsCategories) { if(lsCategories[item].section == selectedSection) { sectionCategoriesLength++ } }

            //debugging
            // console.log("sectionCategoriesLength: " + sectionCategoriesLength)
            
            //update data positions
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && sectionCategoriersCounter != sectionCategoriesLength) 
                { 
                    sectionCategoriersCounter++
                    lsCategories[item].pos = sectionCategoriersCounter.toString()
                }
            }
            
            //reload edit categories modal
            editCategoriesModal(lsCategories)

            //select updated category element
            editCategory({pos: ""}, "click")

            //set status
            isChanged = true
        }
        
        //type: UP
        else if(type == "up") 
        { 
            //null check
            if(oldCategoryPos == "") { return }

            //count total items
            for(let item in lsCategories) { if(lsCategories[item].section == selectedSection) { totalItems++ } }
            totalItems = totalItems + 1
            
            //set new position
            newCategoryPos = (parseInt(oldCategoryPos) + 1)
            if(newCategoryPos == 0) { return }
            else if(newCategoryPos > totalItems) { newCategoryPos = totalItems }
            else if(newCategoryPos == totalItems) { return }
            
            //update data positions 1
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && newCategoryPos == lsCategories[item].pos) { lsCategories[item].pos = "0000" } 
            }

            //update data positions 2
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) { lsCategories[item].pos = newCategoryPos.toString() } 
            }

            //update data positions 3
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && lsCategories[item].pos == "0000") { lsCategories[item].pos = oldCategoryPos.toString() } 
            }

            //reload edit categories modal
            editCategoriesModal(lsCategories)

            //select updated category element
            editCategory({pos: newCategoryPos}, "click")

            //set status
            isChanged = true
        }
        
        //type: DOWN
        else if(type == "down") 
        {   
            //null check
            if(oldCategoryPos == "") { return }
            
            //count total items
            for(let item in lsCategories) { if(lsCategories[item].section == selectedSection) { totalItems++ } }
            totalItems = totalItems + 1

            //set new position
            newCategoryPos = (parseInt(oldCategoryPos) - 1)
            if(newCategoryPos == 0) { return }
            else if(newCategoryPos > totalItems) { newCategoryPos = totalItems}
            else if(newCategoryPos == totalItems) { return }
            
            //update data positions 1
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && newCategoryPos == lsCategories[item].pos) 
                { lsCategories[item].pos = "0000" } 
            }

            //update data positions 2
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) 
                { lsCategories[item].pos = newCategoryPos.toString() } 
            }
            
            //update data positions 3
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && lsCategories[item].pos == "0000") 
                { lsCategories[item].pos = oldCategoryPos.toString() } 
            }

            //reload edit categories modal
            editCategoriesModal(lsCategories)

            //select updated category element
            editCategory({pos: newCategoryPos}, "click")

            //set status
            isChanged = true
        }

        //update elements
        for(let e in editCategoryObjects) { let c = document.getElementById(editCategoryObjects[e].id); if(c) { c.style.opacity = "0.1" } }
        setTimeout(() => {
            editCategoryObj = document.getElementById("editCategoryObj#" + id) 
            if(editCategoryObj) { editCategoryObj.style.opacity = "1";  editCategoryObj.scrollIntoView() }
        }, 10)
        inputCategoryPos.value = oldCategoryPos

        //changes: NO
        if(isChanged == false)
        {
            console.log("editCategory: no changes") 
            return 
        }

        //changes: YES
        else if(isChanged == true) 
        { 
            localStorage.setItem("cms-edit-category", JSON.stringify(lsCategories))
        }

    }


    function editSection(section, type)
    {
        //debugging
        console.log("editSection: " + type)
        console.log(section)
        
        //elements
        let editSectionObj = ""
        let inputSectionPos = document.getElementById("inputSectionPos")
        let inputSectionHidden = document.getElementById("inputSectionHidden")
        let inputSectionHiddenToggleHidden = document.getElementById("inputSectionHiddenToggleHidden")
        let inputSectionHiddenToggleShow = document.getElementById("inputSectionHiddenToggleShow")
        let updateStatusMessageUpdateSections = document.getElementById("updateStatusMessageUpdateSections")
        let editSectionObjects = document.getElementsByClassName("editSectionObj")
        let lsSections = JSON.parse(localStorage.getItem('cms-edit-section'))
        let selectedElement = ""
        let newTitle = ""
        
        //variables
        let isChanged = false
        let totalItems = 0
        let id = section.pos

        //type: CLICK
        if(type == "click") 
        {   
            //set old position
            oldSectionPos = id

            //check if hidden
            for(let item in lsSections) 
            { 
                if(oldSectionPos == lsSections[item].pos) 
                { 
                    //update elements
                    inputSectionHiddenToggleHidden.style.display = "none"
                    inputSectionHiddenToggleShow.style.display = "none"

                    //set item hidden
                    if(lsSections[item].hidden == "true") 
                    { inputSectionHidden.checked = true; inputSectionHiddenToggleHidden.style.display = "block" }

                    //set item show
                    else if(lsSections[item].hidden == "false") 
                    { inputSectionHidden.checked = false; inputSectionHiddenToggleShow.style.display = "block" }
                    
                }
            }
        }
        
        //type: ADD
        else if(type == "add") 
        {   
            totalItems = (lsSections.length + 1).toString()

            //add obj to array
            lsSections.push({
                appBackgroundColor: "white",
                hidden: 'false', 
                iconImage: '',
                pos: totalItems, 
                sectionBackgroundColor: 'gray', 
                title: 'section' + totalItems.toString()
            })

            //reload edit categories data
            editSectionsModal(lsSections)
            
            //select new section
            editSection({pos: totalItems}, "click")

            //set status
            isChanged = true
        }
        
        //type: SAVE
        else if(type == "save") 
        {   
            for(let item in lsSections)
            {
                if(oldSectionPos == lsSections[item].pos)
                {
                    selectedElement = document.getElementById("buttonSectionSettingsTitle#" + lsSections[item].pos)
                    newTitle = selectedElement.value

                    for(let c in lsSections)
                    {
                        if(newTitle == lsSections[c].title) 
                        { 
                            console.log("section " + newTitle + " already exists") 
                            updateStatusMessageUpdateSections.innerText = "section " + newTitle + " already exists"
                            updateStatusMessageUpdateSections.style.display = "block"

                            return
                        }
                    }
                }
            }

            for(let item in lsSections) 
            { 
                if(oldSectionPos == lsSections[item].pos) 
                { 
                    //set element
                    selectedElement = document.getElementById("buttonSectionSettingsTitle#" + lsSections[item].pos)
                    
                    //set new title
                    lsSections[item].title = selectedElement.value

                    //reload edit categories data
                    editSectionsModal(lsSections)
            
                    //select new section
                    editSection({pos: lsSections[item].pos}, "click")
                }
            }
        }
        
        //type: HIDDEN
        else if(type == "hidden") 
        {   
            if(oldSectionPos == "") { return }

            for(let item in lsSections) 
            { 
                if(oldSectionPos == lsSections[item].pos) 
                { 
                    //set hidden
                    lsSections[item].hidden = "true"
                    inputSectionHidden.checked = true

                    //reload edit categories data
                    editSectionsModal(lsSections)
            
                    editSection({pos: lsSections[item].pos}, "click")
                }
            }
        }
        
        //type: SHOW
        else if(type == "show") 
        {   
            if(oldSectionPos == "") { return }

            for(let item in lsSections) 
            { 
                if(oldSectionPos == lsSections[item].pos) 
                { 
                    //set hidden
                    lsSections[item].hidden = "false"
                    inputSectionHidden.checked = false

                    //reload edit categories data
                    editSectionsModal(lsSections)
            
                    editSection({pos: lsSections[item].pos}, "click")
                }
            }
        }
        
        //type: DELETE
        else if(type == "delete") 
        { 
            //null check
            if(oldSectionPos == "") { return }

            //variables
            let removeItem = ""
            let sectionSectionsLength = 0
            let sectionSectionsCounter = 0

            //set remove item id
            for(let item in lsSections) 
            { if(oldSectionPos == lsSections[item].pos) { removeItem = item } }

            //remove selected section from array
            lsSections.splice(removeItem, 1)
            
            //count section categories
            sectionSectionsLength = lsSections.length + 1

            //debugging
            // console.log("sectionSectionsLength: " + sectionSectionsLength)
            
            //update data positions
            for(let item in lsSections) 
            { 
                if(sectionSectionsCounter != sectionSectionsLength) 
                { 
                    sectionSectionsCounter++
                    lsSections[item].pos = sectionSectionsCounter.toString()
                }
            }
            
            //reload edit categories modal
            editSectionsModal(lsSections)

            //select updated section element
            editSection({pos: ""}, "click")

            //set status
            isChanged = true
        }
        
        //type: UP
        else if(type == "up") 
        { 
            //null check
            if(oldSectionPos == "") { return }

            //count total items
            totalItems = lsSections.length + 1
            
            //set new position
            newSectionPos = (parseInt(oldSectionPos) + 1)
            if(newSectionPos == 0) { return }
            else if(newSectionPos > totalItems) { newSectionPos = totalItems }
            else if(newSectionPos == totalItems) { return }
            
            //update data positions 1
            for(let item in lsSections) 
            { 
                if(newSectionPos == lsSections[item].pos) { lsSections[item].pos = "0000" } 
            }

            //update data positions 2
            for(let item in lsSections) 
            { 
                if(oldSectionPos == lsSections[item].pos) { lsSections[item].pos = newSectionPos.toString() } 
            }

            //update data positions 3
            for(let item in lsSections) 
            { 
                if(lsSections[item].pos == "0000") { lsSections[item].pos = oldSectionPos.toString() } 
            }

            //reload edit categories modal
            editSectionsModal(lsSections)

            //select updated section element
            editSection({pos: newSectionPos}, "click")

            //set status
            isChanged = true
        }
        
        //type: DOWN
        else if(type == "down") 
        {   
            //null check
            if(oldSectionPos == "") { return }
            
            //count total items
            totalItems = lsSections.length + 1

            //set new position
            newSectionPos = (parseInt(oldSectionPos) - 1)
            if(newSectionPos == 0) { return }
            else if(newSectionPos > totalItems) { newSectionPos = totalItems}
            else if(newSectionPos == totalItems) { return }
            
            //update data positions 1
            for(let item in lsSections) 
            { 
                if(newSectionPos == lsSections[item].pos) 
                { lsSections[item].pos = "0000" } 
            }

            //update data positions 2
            for(let item in lsSections) 
            { 
                if(oldSectionPos == lsSections[item].pos) 
                { lsSections[item].pos = newSectionPos.toString() } 
            }
            
            //update data positions 3
            for(let item in lsSections) 
            { 
                if(lsSections[item].pos == "0000") 
                { lsSections[item].pos = oldSectionPos.toString() } 
            }

            //reload edit categories modal
            editSectionsModal(lsSections)

            //select updated section element
            editSection({pos: newSectionPos}, "click")

            //set status
            isChanged = true
        }

        //update elements
        for(let e in editSectionObjects) { let c = document.getElementById(editSectionObjects[e].id); if(c) { c.style.opacity = "0.1" } }
        setTimeout(() => {
            editSectionObj = document.getElementById("editSectionObj#" + id) 
            if(editSectionObj) { editSectionObj.style.opacity = "1";  editSectionObj.scrollIntoView() }
        }, 10)
        inputSectionPos.value = oldSectionPos

        //changes: NO
        if(isChanged == false)
        {
            console.log("editSection: no changes") 
            return 
        }

        //changes: YES
        else if(isChanged == true) 
        { 
            localStorage.setItem("cms-edit-section", JSON.stringify(lsSections))
        }

    }


    function sortBackendCategories(data)
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


    function sortBackendSections(data)
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


    function confirmCheckboxUpdateCategories()
    {
        let confirmChangesCheckboxUpdateCategories = document.getElementById("confirmChangesCheckboxUpdateCategories")
        let buttonSaveUpdateCategories = document.getElementById("buttonSaveUpdateCategories")
        let checkboxSaveUpdateCategories = document.getElementById("checkboxSaveUpdateCategories")

        if(checkboxSaveUpdateCategories.checked == true) 
        { 
            confirmChangesCheckboxUpdateCategories.style.display = "block"
            buttonSaveUpdateCategories.style.display = "block"
            buttonSaveUpdateCategories.scrollIntoView()
        }
        else if(checkboxSaveUpdateCategories.checked == false) 
        { 
            confirmChangesCheckboxUpdateCategories.style.display = "none"
            buttonSaveUpdateCategories.style.display = "none"
        }
    }


    function saveChangesCategories()
    {
        //debuging
        console.log("saveChangesCategories")

        //variables
        let ls = JSON.parse(localStorage.getItem("cms-edit-category"))
        let newBackendData = []
        
        //add categories to new array
        for(let item in ls)
        {
            newBackendData.push({category: ls[item].title, oldTitle: ls[item].oldTitle, rows: '', section: ls[item].section})            
        }
        // console.log(newBackendData)

        //add old rows data
        for(let item in backendData.value)
        {
            // console.log(backendData.value[item])
            
            for(let c in newBackendData)
            {
                if(backendData.value[item].section == newBackendData[c].section && backendData.value[item].category == newBackendData[c].oldTitle) 
                { 
                    // console.log(backendData.value[item])
                    newBackendData[c].rows = ""
                }
                else if(backendData.value[item].section == newBackendData[c].section && backendData.value[item].category == newBackendData[c].category) 
                { 
                    // console.log(backendData.value[item])
                    newBackendData[c].rows = toRaw(backendData.value[item].rows)
                }
            }
            
        }

        //add new rows data 1
        for(let c in newBackendData)
        {
            if(newBackendData[c].oldTitle != undefined) 
            { 
                // console.log(newBackendData[c])

                for(let i in backendData.value)
                {
                    if(backendData.value[i].section == newBackendData[c].section && backendData.value[i].category == newBackendData[c].oldTitle)
                    {
                        newBackendData[c].rows = toRaw(backendData.value[i].rows)
                    }
                }
            }
        }

        //add new rows data 2
        for(let c in newBackendData)
        {
            if(newBackendData[c].rows == "") 
            { 
                newBackendData[c].rows = ""
                //["{\"pos\":\"1\",\"hidden\":\"false\",\"type\":\"singleline\",\"title\":\"Example Title\",\"data\":\"this is a singleline text example\"}"] 
            }
        }
        
        //remove old title from objects 1
        for(let c in newBackendData)
        {
            if(newBackendData[c].oldTitle != "") { delete newBackendData[c].oldTitle }
        }

        //remove old title from objects 2
        for(let i in ls)
        {
            if(ls[i].oldTitle != "") { delete ls[i].oldTitle }
        }
        // console.log(newBackendData)
        // console.log(toRaw(ls))

        //save vuex
        store.dispatch('storage/actionSetBackendData', newBackendData)
        store.dispatch('storage/actionSetBackendCategories', ls)
        store.dispatch('storage/actionSetBackendCategoriesSelected', ls)

        //update local storage
        localStorage.setItem("cms-edit-category", JSON.stringify(ls))

        //reload edit categories modal
        editCategoriesModal(ls)

        //update DB
        updateUserCategories(JSON.stringify(toRaw(ls)), JSON.stringify(toRaw(backendData.value)))
    }


    function saveChangesSections()
    {
        //debuging
        console.log("saveChangesSections")

        //variables
        let ls = JSON.parse(localStorage.getItem("cms-edit-section"))
        let newBackendSections = []
        
        //add sections to new array
        for(let item in ls)
        {
            newBackendSections.push(ls[item])
            // newBackendSections.push({
            //     category: ls[item].title, 
            //     oldTitle: ls[item].oldTitle, 
            //     rows: '', 
            //     section: ls[item].section
            // })            
        }
        console.log(newBackendSections)

        //add old rows data
        // for(let item in backendData.value)
        // {
        //     // console.log(backendData.value[item])
            
        //     for(let c in newBackendSections)
        //     {
        //         if(backendData.value[item].category == newBackendSections[c].oldTitle) 
        //         { 
        //             // console.log(backendData.value[item])
        //             newBackendSections[c].rows = ""
        //         }
        //         else if(backendData.value[item].category == newBackendSections[c].category) 
        //         { 
        //             // console.log(backendData.value[item])
        //             newBackendSections[c].rows = toRaw(backendData.value[item].rows)
        //         }
        //     }
            
        // }

        //add new rows data 1
        // for(let c in newBackendSections)
        // {
        //     if(newBackendSections[c].oldTitle != undefined) 
        //     { 
        //         // console.log(newBackendSections[c])

        //         for(let i in backendData.value)
        //         {
        //             if(backendData.value[i].category == newBackendSections[c].oldTitle)
        //             {
        //                 newBackendSections[c].rows = toRaw(backendData.value[i].rows)
        //             }
        //         }
        //     }
        // }

        //add new rows data 2
        // for(let c in newBackendSections)
        // {
        //     if(newBackendSections[c].rows == "") 
        //     { 
        //         newBackendSections[c].rows = ""
        //         //["{\"pos\":\"1\",\"hidden\":\"false\",\"type\":\"singleline\",\"title\":\"Example Title\",\"data\":\"this is a singleline text example\"}"] 
        //     }
        // }
        
        //remove old title from objects 1
        // for(let c in newBackendSections)
        // {
        //     if(newBackendSections[c].oldTitle != "") { delete newBackendSections[c].oldTitle }
        // }

        //remove old title from objects 2
        // for(let i in ls)
        // {
        //     if(ls[i].oldTitle != "") { delete ls[i].oldTitle }
        // }
        // console.log(newBackendSections)
        // console.log(toRaw(ls))

        //save vuex
        store.dispatch('storage/actionSetBackendSections', newBackendSections)

        //update local storage
        localStorage.setItem("cms-edit-section", newBackendSections)

        //reload edit sections modal
        editSectionsModal(ls)

        //update DB
        updateUserSections(JSON.stringify(toRaw(backendSections.value)))
    }
    
    
    function confirmCheckboxUpdateSections()
    {
        let confirmChangesCheckboxUpdateSections = document.getElementById("confirmChangesCheckboxUpdateSections")
        let buttonSaveUpdateSections = document.getElementById("buttonSaveUpdateSections")
        let checkboxSaveUpdateSections = document.getElementById("checkboxSaveUpdateSections")

        if(checkboxSaveUpdateSections.checked == true) 
        { 
            confirmChangesCheckboxUpdateSections.style.display = "block"
            buttonSaveUpdateSections.style.display = "block"
            buttonSaveUpdateSections.scrollIntoView()
        }
        else if(checkboxSaveUpdateSections.checked == false) 
        { 
            confirmChangesCheckboxUpdateSections.style.display = "none"
            buttonSaveUpdateSections.style.display = "none"
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
        backendCategoryObjModal,
        backendSectionObjModal,

        //functions
        loadSectionCategories,
        loadCategoryData,
        loadDataType,
        loadDataObjModal,
        loadDataInputs,
        fetchSpecificUser,
        undisplayModals,
        imageGalleryRemoveImg,
        imageGalleryAddImg,
        imageGalleryUpdateImagePos,
        selectPreviewImage,
        addNewDataRow,
        addNewType,
        editCategoriesModal,
        editSectionsModal,
        editData,
        editCategory,
        editSection,
        sortBackendDataSelected,
        sortBackendCategories,
        sortBackendSections,
        confirmCheckboxes,
        confirmCheckboxUpdateCategories,
        confirmCheckboxUpdateSections,
        saveChangesData,
        saveChangesCategories,
        saveChangesSections
    }
  }
}
</script>


<style scoped>
    /*** scrollbars */
    #dataObjModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #backendData::-webkit-scrollbar { height: 0px; width: 0px; }
    #editCategoriesModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #editSectionsModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #backendDataRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #editCategoriesList::-webkit-scrollbar { height: 0px; width: 0px; }
    #editSectionsList::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalMultilineRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalTimelineRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalLinklistRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalTextlistRows::-webkit-scrollbar { height: 0px; width: 0px; }

    #dataObjModalPreviewImages::-webkit-scrollbar { height: 12px; width: 10px; }
    #dataObjModalPreviewImages::-webkit-scrollbar-track { background: black; }
    #dataObjModalPreviewImages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }

    /*** ids ***/
    #componentBackend { height: 100vh; width: 100vw; margin: auto; padding: 0px; color: white; background-color: #1D212E; }
    #backendSections 
    { 
        position: fixed; 
        display: block; 
        height: 90vh; 
        width: 70px;
        left: 0px; 
        top: 0px; 
        /* max-height: 88vh;  */
        margin: 0px;
        padding: 0px 13px 10vh 13px;
        overflow-y: scroll;
        user-select: none;
        opacity: 1;
        /* border-right: 1px solid rgba(255, 255, 255, 0.6); */
        background-color: black;
    }
    #backendCategories 
    { 
        position: fixed; 
        display: flex; 
        left: 36%; 
        top: 4%; 
        width: 30vw; 
        margin: 0px 0px 20px 0px;
        padding: 4px 0px 4px 0px;
        /* overflow-x: scroll; */
        user-select: none;
        opacity: 1;
        /* justify-content: left; */
        /* border-bottom: 1px solid white;  */
        background-color: transparent;
    }
    #backendCategoriesList { display: flex; width: 26vw; overflow-x: scroll; }
    #backendData 
    { 
        position: fixed; 
        display: block; 
        margin: 6px 0px 0px 0px;
        padding: 0px;
        height: auto; 
        width: 30vw; 
        left: 36%; 
        top: 13%;
        overflow-y: scroll;
        user-select: none;
        opacity: 1;
        /* border: 2px solid white;  */
        background-color: transparent;
    }
    #confirmChanges { display: none; padding: 60px 0px 0px 0px; }
    #confirmChangesCheckboxUpdateCategories { display: none; padding: 60px 0px 0px 0px; }
    #confirmChangesCheckboxUpdateSections { display: none; padding: 60px 0px 0px 0px; }
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
    #buttonSaveUpdateCategories 
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
    #buttonSaveUpdateSections 
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
        top: 28px; 
        right: 30px;
        opacity: 0.2;
        border-radius: 90%;
        background-color: #822c8b;
    }
    #account:hover { opacity: 1; }
    #dataObjModal 
    { 
        position: fixed; 
        display: block; 
        max-height: 72vh; 
        width: 22vw; 
        left: 37%; 
        top: 8%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
        border: 2px solid #822c8b; 
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
    #galleryImagesTitle { padding-bottom: 4px; background-color: #1D212E; }
    #dataObjModalEditMultiline { display: flex; padding: 6px; }
    #dataObjModalEditTimeline { display: flex; padding: 6px; }
    #dataObjModalEditLinklist { display: flex; padding: 6px; }
    #dataObjModalEditTextlist { display: flex; padding: 6px; }
    #dataObjModalEdit { display: none; padding: 6px; }
    #dataObjModalMultilineRows { max-height: 200px; overflow-y: scroll; }
    #dataObjModalTimelineRows { max-height: 200px; overflow-y: scroll; }
    #dataObjModalLinklistRows { max-height: 200px; overflow-y: scroll; }
    #dataObjModalTextlistRows { max-height: 200px; overflow-y: scroll; }
    #labelSave { font-size: 24px; font-weight: bold; margin: 0px 32px 0px 0px; vertical-align: super; }
    #labelSaveUpdateCategories { font-size: 24px; font-weight: bold; margin: 0px 32px 0px 0px; vertical-align: super; }
    #labelSaveUpdateSections { font-size: 24px; font-weight: bold; margin: 0px 32px 0px 0px; vertical-align: super; }
    #labelDelete { font-size: 24px; font-weight: bold; margin: 0px; vertical-align: super; }
    #updateStatusMessage { display: none; margin: 49px 0px 0px 0px; font-size: 24px; font-weight: bold; }
    #updateStatusMessageUpdateCategories { display: none; margin: 49px 0px 0px 0px; font-size: 24px; font-weight: bold; }
    #updateStatusMessageUpdateSections { display: none; margin: 49px 0px 0px 0px; font-size: 24px; font-weight: bold; }
    #confirmCheckbox { display: block; }
    #addDataRowModal 
    { 
        position: fixed; 
        display: none; 
        max-height: 72vh; 
        width: 22vw; 
        left: 37%; 
        top: 16%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        border: 2px solid #822c8b; 
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
    }
    #addSelectTypeModal
    {
        position: fixed; 
        display: none; 
        max-height: 72vh; 
        width: 22vw; 
        left: 36%; 
        top: 16%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        border: 2px solid #822c8b; 
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
    }
    #addDataRowTitle { display: block; margin: -9px 0px 40px 0px; font-size: 22px; font-weight: bold; text-shadow: 0px 1px black; color: white; }
    #addNewTypeTitle { display: block; margin: -9px 0px 40px 0px; font-size: 22px; font-weight: bold; text-shadow: 0px 1px black; color: white; }
    #editCategoryTitle { display: block; margin: -9px 0px 40px 0px; font-size: 22px; font-weight: bold; text-shadow: 0px 1px black; color: white; }
    #editSectionTitle { display: block; margin: -9px 0px 40px 0px; font-size: 22px; font-weight: bold; text-shadow: 0px 1px black; color: white; }
    #addNewDataRow 
    { 
        display: none;
        margin: 1px 0px 0px 0px;
        padding: 16px;
        width: -webkit-fill-available;
        bottom: 20px;
        left: 36%;
        font-size: 40px;
        font-weight: bold;
        text-align: center; 
        text-shadow: 0px 1px #1D212E;
        border-radius: 0%;
        color: white;
        /* border: 2px solid #822c8b; */
        background-color: transparent; 
    }
    #dataObjNew { display: none; }
    #dataObjNewTitle { display: none; }
    #settingsSectionsIcon 
    { 
        position: fixed; 
        display: block; 
        height: 80px; 
        width: auto; 
        bottom: 0px; 
        left: 7px;
        margin: 0px;
        padding: 0px 0px 10px 0px;
        user-select: none; 
        -webkit-user-drag: none;
        opacity: 0.2;
        background-color: black;
    }
    #settingsCategoriesIcon 
    { 
        /* position: fixed;  */
        display: block; 
        height: 80px; 
        width: auto; 
        top: 22px; 
        left: calc(38% + 10px); 
        user-select: none; 
        -webkit-user-drag: none;
        opacity: 0.1;
    }
    #settingsSectionsIcon:hover { opacity: 1; }
    #settingsCategoriesIcon:hover { opacity: 1; }
    #editCategoriesModal
    {
        position: fixed; 
        display: none; 
        max-height: 60vh; 
        width: 30vw; 
        left: 33%; 
        top: 16%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        border: 2px solid #822c8b; 
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
    }
    #editSectionsModal
    {
        position: fixed; 
        display: none; 
        max-height: 60vh; 
        width: 30vw; 
        left: 33%; 
        top: 16%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        border: 2px solid #822c8b; 
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
    }
    #editCategoriesInputs { display: flex; padding: 10px; background-color: black; }
    #editSectionsInputs { display: flex; padding: 10px; background-color: black; }
    #editCategoriesList { display: block; max-height: 30vh; overflow-y: scroll; background-color: black; }
    #editSectionsList { display: block; max-height: 30vh; overflow-y: scroll; background-color: black; }
    #backendDataRows { max-height: 76vh; overflow-y: scroll; }
    #confirmUpdateCategories { display: block; margin: 49px 0px 0px 0px; }
    #confirmUpdateSections { display: block; margin: 49px 0px 0px 0px; }
    #inputCategoryHidden { }
    #inputSectionHidden { }
    #inputCategoryHiddenToggleHidden { display: none; height: 49px; width: auto; margin: 0px 8px 0px 4px; user-select: none; -webkit-user-drag: none; }
    #inputCategoryHiddenToggleShow { display: none; height: 49px; width: auto; margin: 0px 8px 0px 4px; user-select: none; -webkit-user-drag: none; }
    #inputSectionHiddenToggleHidden { display: none; height: 49px; width: auto; margin: 0px 8px 0px 4px; user-select: none; -webkit-user-drag: none; }
    #inputSectionHiddenToggleShow { display: none; height: 49px; width: auto; margin: 0px 8px 0px 4px; user-select: none; -webkit-user-drag: none; }

    /* classes */
    .section 
    { 
        height: auto;
        width: 34px;
        margin: auto;
        margin-top: 26px;
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
        margin: 0px 20px 0px 8px; 
        padding: 0px; 
        text-wrap: nowrap; 
        text-shadow: 0px 1px #1D212E; 
        font-size: 26px; 
        font-weight: bold;
        color: white;
        border: 0px solid white;
        background-color: transparent;
    }
    .dot { display: inline-block; padding: 0px 10px 0px 10px; }
    .data 
    { 
        height: auto; 
        width: -webkit-fill-available; 
        display: block;
        margin: 1px 0px 0px 0px;
        padding: 26px 26px 26px 40px; 
        font-size: 19px; 
        font-weight: bold; 
        text-align: left;
        /* text-shadow: 0px 1px black; */
        text-wrap: nowrap;
        overflow-x: scroll;
        opacity: 1;
        color: white; /* #1D212E */
        border: 0px solid #822c8b;
        border-bottom: 1px solid #822c8c66;
        background-color: #822c8b;
    }
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
        background-color: #1D212E;
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
        border-bottom: 1px solid #ffffff2e;
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
        margin: 0px 0px 49px 0px; 
        font-size: 24px; 
        font-weight: bold; 
        text-transform: uppercase; 
        text-shadow: 0px 1px black; color: white; 
    }
    .dataObjErrorMessage 
    { 
        display: none;
        margin: 0px 0px 49px 0px; 
        padding: 0px; 
        font-size: 22px; 
        font-weight: bold; 
        text-shadow: 0px 1px black; 
        color: red; 
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
        /* border-bottom: 1px solid white; */
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
        /* border-bottom: 1px solid white; */
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
        /* border-bottom: 1px solid white; */
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
        /* border-bottom: 1px solid white; */
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
        /* border-bottom: 1px solid white; */
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
        /* border-bottom: 1px solid white; */
        background-color: black;
    }
    .inputMultilineRow { display: inline-flex; width: auto; }
    .dataObjModalMultiline { display: inline-flex; margin: auto; width: -webkit-fill-available; border-bottom: 1px solid white; }
    .dataObjModalTimeline { display: inline-flex; margin: auto; width: -webkit-fill-available; border-bottom: 1px solid white; }
    .dataObjModalLinklist { display: inline-flex; margin: auto; width: -webkit-fill-available; border-bottom: 1px solid white; }
    .dataObjModalTextlist { display: inline-flex; margin: auto; width: -webkit-fill-available; border-bottom: 1px solid white;}
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
        height: 43px;
        width: 13%; 
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
        width: -webkit-fill-available; 
        font-size: 20px; 
        font-weight: bold; 
        color: white; 
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black;
    }
    
    .buttonNewDataRowType 
    { 
        display: block;
        width: -webkit-fill-available;
        margin: 0px 0px 1px 0px;
        padding: 20px;
        font-size: 22px;
        font-weight: bold;
        /* text-shadow: 0px 1px black; */
        text-align: left;
        white-space: nowrap;
        overflow-x: scroll;
        color: white;
        background-color:#822c8b;
        border: 0px solid white;
    }
    .buttonCategorySettingsPos 
    { 
        display: inline-block;
        width: 20%;
        margin: auto;
        padding: 20px 0px 20px 0px;
        font-size: 22px;
        font-weight: bold;
        /* text-shadow: 0px 1px black; */
        text-align: center;
        white-space: nowrap;
        overflow-x: scroll;
        color: white;
        background-color: black; /* #822c8b */
        border: 0px solid white;
    }
    .buttonCategorySettingsTitle 
    { 
        display: inline-block;
        width: -webkit-fill-available;
        margin: 0px 0px 1px 0px;
        padding: 20px;
        font-size: 22px;
        font-weight: bold;
        /* text-shadow: 0px 1px black; */
        text-align: left;
        white-space: nowrap;
        overflow-x: scroll;
        color: white;
        background-color: black; /* #822c8b */
        border: 0px solid white;
    }
    .buttonSectionSettingsPos 
    { 
        display: inline-block;
        width: 20%;
        margin: auto;
        padding: 20px 0px 20px 0px;
        font-size: 22px;
        font-weight: bold;
        /* text-shadow: 0px 1px black; */
        text-align: center;
        white-space: nowrap;
        overflow-x: scroll;
        color: white;
        background-color: black; /* #822c8b */
        border: 0px solid white;
    }
    .buttonSectionSettingsTitle 
    { 
        display: inline-block;
        width: -webkit-fill-available;
        margin: 0px 0px 1px 0px;
        padding: 20px;
        font-size: 22px;
        font-weight: bold;
        /* text-shadow: 0px 1px black; */
        text-align: left;
        white-space: nowrap;
        overflow-x: scroll;
        color: white;
        background-color: black; /* #822c8b */
        border: 0px solid white;
    }
    .buttonAddNewType 
    { 
        display: block;
        width: -webkit-fill-available;
        margin: 0px 0px 1px 0px;
        padding: 20px;
        font-size: 22px;
        font-weight: bold;
        /* text-shadow: 0px 1px #1D212E; */
        text-align: left;
        white-space: nowrap;
        overflow-x: scroll;
        color: white;
        background-color:#822c8b;
        border: 0px solid white;
    }
    .editCategoryPos 
    { 
        display: inline-block; 
        width: 10%;
        padding: 10px;
        font-size: 20px; 
        font-weight: bold; 
        color: white;
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black; 
    }
    .editCategoryHidden 
    { 
        display: inline-block; 
        width: 10%;
        padding: 10px; 
        font-size: 20px; 
        font-weight: bold; 
        color: white;
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black; 
    }
    .editCategoryTitle 
    { 
        display: inline-block; 
        width: 66%; 
        padding: 10px;
        font-size: 20px; 
        font-weight: bold; 
        color: white;
        border: 0px solid white;
        border-bottom: 1px solid white;
        background-color: black; 
    }
    .editCategorySaveButton 
    { 
        display: block; 
        width: -webkit-fill-available; 
        padding: 12px;
        font-size: 20px; 
        font-weight: bold;
        border: 0px solid white;
        background-color: lightgreen; 
    }
    .editCategoryObj { display: flex; border-bottom: 1px solid white; }
    .editSectionObj { display: flex; border-bottom: 1px solid white; }
</style>