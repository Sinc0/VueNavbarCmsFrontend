<template>
    <div id="componentBackend">
        
        <!-- sections -->
        <div id="backendSections" v-if="backendSections">
            <div id="backendSectionsList">
                <!-- select section -->
                <div v-bind:id="'section#' + section.pos" class="section" 
                    v-for="section in sortBackendSections(backendSections)" 
                    v-on:click="loadSectionCategories(section)" 
                    v-bind:title="section.title">
                    {{section.pos}}
                </div>
            </div>
        </div>


        <!-- categories -->
        <div id="backendCategories" v-if="backendCategoriesSelected">
            <!-- edit category -->
            <div id="">
                <img id="settingsCategoriesIcon" src="/images/icons/iconSettingsCategories.png" v-on:click="editCategoriesModal(backendCategories)" />
            </div>

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
            
            <!-- rows -->
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
                    <input id="dataObjTitle" class="dataObjModalRowInput" maxlength="100" v-bind:value="row.toString().replace('title,', '')" placeholder="title" />
                </div>
                
                <!-- obj: data -->
                <div id="dataObjModalData" v-else-if="dataType == 'data'">

                    <!-- data: galleryImages -->
                    <div v-if="backendDataObjModal.type == 'galleryImages'">
                        <p id="galleryImagesTitle" class="dataObjModalRowTitle">{{loadDataInputs(row, 'galleryImages').length}} Images</p>
                        
                        <div id="dataObjModalAddData">
                            <input id="inputAddGalleryImage" class="inputAddGalleryImage" maxlength="1000" v-bind:value="''" placeholder="URL ..." />
                            <input id="buttonAddGalleryImage" class="buttonAddGalleryImage" type="button" value="+" v-on:click="imageGalleryAddImg()" />
                        </div>

                        <div id="dataObjModalEditImages">
                            <input id="buttonDeleteImage" type="button" value="━" v-on:click="imageGalleryRemoveImg()" />
                            <input id="inputImagePosition" disabled type="number" min="1" max="1000" value="" placeholder="Position" />
                            <input id="buttonEditPosition" type="button" value="⬅" v-on:click="imageGalleryUpdateImagePos('up')" />
                            <input id="buttonEditPosition" type="button" value="➡" v-on:click="imageGalleryUpdateImagePos('down')" />
                        </div>

                        <div id="dataObjModalPreviewImages">
                            <img v-bind:id="'previewImage#' + obj.pos" class="dataObjModalPreviewImage" v-for="(obj, index) in loadDataInputs(row, 'galleryImages').reverse()" v-bind:src="obj.image" v-bind:title="obj.image" v-on:click="selectPreviewImage(obj.pos, obj.description)"/>
                        </div>

                        <div id="dataObjModalEditImageDescription">
                            <input id="inputImageDescription" type="text" value="" placeholder="Description"  maxlength="400"/>
                            <input id="buttonEditDescription" class="editItemSave" type="button" value="✓" v-on:click="imageGalleryUpdateImageDescription()" />
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
                                <input v-bind:id="'dataObjModalTimelineYear#' + item.pos" class="inputTimelineYear" maxlength="40" v-bind:value="item.year" placeholder="year" />
                                <input v-bind:id="'dataObjModalTimelineText#' + item.pos" class="inputTimelineText" maxlength="400" v-bind:value="item.text" placeholder="text" />
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
                                <input v-bind:id="'dataObjModalMultilineText#' + item.pos" class="inputMultilineText" maxlength="1000" v-bind:value="item.text" placeholder="textrow" />
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


        <!-- modal: underlay -->
        <div id="underlayModal" v-on:click="undisplayModals()">
        </div>


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
            <label id="editCategoryTitle">Categories</label>

            <div id="editCategoriesList">
                <div v-bind:id="'editCategoryObj#' + category.pos" class="editCategoryObj" v-for="category in sortBackendCategories(backendCategoryObjModal)">
                    <input type="button" v-bind:id="'buttonCategorySettingsPos#' + category.pos" class="buttonCategorySettingsPos" v-bind:value="category.pos" v-on:click="editCategory(category, 'click')" />
                    <input type="text" v-bind:id="'buttonCategorySettingsTitle#' + category.pos" class="buttonCategorySettingsTitle" v-bind:value="category.title" v-on:click="editCategory(category, 'click')" placeholder="category" maxlength="40" />
                </div>
            </div>
            
            <div id="editCategoriesInputs">
                <input id="inputCategoryDown" class="editPosDown" type="button" value="⬇" v-on:click="editCategory('','up')" />
                <input id="inputCategoryUp" class="editPosUp" type="button" value="⬆" v-on:click="editCategory('','down')" />
                <input id="inputCategoryPos" class="editPosDisplay" type="button" value="" v-on:click="" />
                <input id="inputCategorySave" class="editItemSave" type="button" value="✓" v-on:click="editCategory('','save')" />
                <input id="inputCategoryDelete" class="editItemDelete" type="button" value="━" v-on:click="editCategory('','delete')" />
                <input id="inputCategoryAddRow" class="editAddRow" type="button" value="+" v-on:click="editCategory('','add')" />
                
                <img id="inputCategoryHiddenToggleShow" src="/images/icons/iconShow.png" v-on:click="editCategory('','hidden')" />
                <img id="inputCategoryHiddenToggleHidden" src="/images/icons/iconHidden.png" v-on:click="editCategory('','show')" />
                
                <input hidden id="inputCategoryHidden" class="editHideRow" type="checkbox" value="" />
            </div>

            <!-- category background url -->
            <input id="inputCategorySettingsBackgroundImageUrl" class="" type="text"  placeholder="Background Image URL" maxlength="1000" />

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
            <label id="editSectionTitle">Sections</label>

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
                
                <img id="inputSectionHiddenToggleShow" src="/images/icons/iconShow.png" v-on:click="editSection('','hidden')" />
                <img id="inputSectionHiddenToggleHidden" src="/images/icons/iconHidden.png" v-on:click="editSection('','show')" />
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


        <!-- modal: edit account -->
        <div id="editAccountModal">
            
            <!-- account credentials -->
            <div id="editAccountCredentials" class="editAccountSection" v-if="backendAccountCredentials">
                <!-- variables -->
                <div hidden>{{accountCredentials = sortAccountCredentials(backendAccountCredentials)}}</div>
                
                <!-- title -->
                <label id="editAccountTitleCredentials" class="editAccountTitle">Credentials</label>
                
                <!-- inputs -->
                <input id="editAccountUsername" class="editAccountInputText" type="text" placeholder="Username" v-bind:value="accountCredentials.username" maxlength="20" />
                <input id="editAccountDomain" class="editAccountInputText" type="text" placeholder="Domain" v-bind:value="accountCredentials.domain" maxlength="40" />
                <input id="editAccountEmail" class="editAccountInputText" type="text" placeholder="Email" v-bind:value="accountCredentials.email" maxlength="100" />
                <input id="editAccountName" class="editAccountInputText" type="text" placeholder="Name" v-bind:value="accountCredentials.name" maxlength="30" />
                <input id="editAccountPhone" class="editAccountInputText" type="text" placeholder="Phone" v-bind:value="accountCredentials.phone" maxlength="30" />
                <input id="editAccountCountry" class="editAccountInputText" type="text" placeholder="Country" v-bind:value="accountCredentials.country" maxlength="30" />
                <input id="editAccountPassword" class="editAccountInputText" type="button" value="Change Password" v-on:click="editAccount('password', '', 'true')" maxlength="20" />
                
                <div id="editAccountChangePassword">
                    <input id="editAccountPasswordOld" class="editAccountInputText" type="password" placeholder="Old Password" maxlength="20" />
                    <img id="editAccountPasswordImgShow" src="/images/icons/iconShow.png" v-on:click="showPasswordInputs()" />
                    <img id="editAccountPasswordImgHide" src="/images/icons/iconHidden.png" v-on:click="hidePasswordInputs()" />
                    <input id="editAccountPasswordNew" class="editAccountInputText" type="password" placeholder="New Password" maxlength="20" />
                    <input id="editAccountPasswordNewAgain" class="editAccountInputText" type="password" placeholder="New Password Again" maxlength="20" />
                    <input id="editAccountPasswordConfirm" class="editAccountInputText" type="button" value="Confirm New Password" maxlength="20" />
                </div>
            </div>
            
            <!-- account settings -->
            <div id="editAccountSettings" v-if="backendAccountSettings">
                
                <!-- edit: account icon -->
                <div id="editAccountIcon" class="editAccountSection">
                    
                    <!-- title -->
                    <label class="editAccountTitle">Icon</label>

                    <div id="editAccountIconDefaultIcons">
                        <!-- <img class="editAccountIcon" src="/images/pwa/pwa-icon-192x192-blue.png" v-on:click="editIcon('blue')" /> -->
                        <img id="iconOriginal" class="editAccountIcon" src="/images/pwa/pwa-icon-192x192-original.png" v-on:click="editIcon('original')" />
                        <img id="iconGreen" class="editAccountIcon" src="/images/pwa/pwa-icon-192x192-green.png" v-on:click="editIcon('green')" />
                        <img id="iconRed" class="editAccountIcon" src="/images/pwa/pwa-icon-192x192-red.png" v-on:click="editIcon('red')" />
                        <img id="iconOrange" class="editAccountIcon" src="/images/pwa/pwa-icon-192x192-orange.png" v-on:click="editIcon('orange')" />
                        <img id="iconViolet" class="editAccountIcon" src="/images/pwa/pwa-icon-192x192-violet.png" v-on:click="editIcon('violet')" />
                        <img id="iconYellow" class="editAccountIcon" src="/images/pwa/pwa-icon-192x192-yellow.png" v-on:click="editIcon('yellow')" />
                    </div>
                    
                    <!-- <input id="editAccountIconInputDefault" class="editAccountInputText" type="button" value="Default" /> -->
                    <!-- <input id="editAccountIconInputCustom" class="editAccountInputText" type="button" value="Custom" /> -->
                    <input id="editAccountIconInput192x192" class="editAccountInputText" type="text" value="" placeholder="Icon Image Url (192x192)" maxlength="100" />
                    <input id="editAccountIconInput512x512" class="editAccountInputText" type="text" value="" placeholder="Icon Image Url (512x512)" maxlength="100" />
                    <!-- <input hidden id="editAccountIconInput192x192" class="editAccountInputText" type="text" value="" placeholder="Icon Image Url (192x192)" maxlength="100" /> -->
                    <!-- <input hidden id="editAccountIconInput512x512" class="editAccountInputText" type="text" value="" placeholder="Icon Image Url (512x512)" maxlength="100" /> -->
                </div>

                <!-- edit: account colors -->
                <div id="editAccountColors" class="editAccountSection">
                    
                    <!-- title -->
                    <label class="editAccountTitle">Colors</label>
    
                    <!-- color: section background -->
                    <div id="" class="editAccountColors">
                        <input id="editAccountColorSectionBackground" class="editAccountInputColor" type="text" maxlength="40" placeholder="..." />
                        <label class="editAccountText"> Background</label>
                    </div>
                    
                    <!-- color: text -->
                    <div id="" class="editAccountColors">
                        <input id="editAccountColorText" class="editAccountInputColor" type="text" maxlength="40" placeholder="..." />
                        <label class="editAccountText"> Text</label>
                    </div>
    
                    <!-- color: loading screen -->
                    <div id="" class="editAccountColors">
                        <input id="editAccountColorLoadingScreen" class="editAccountInputColor" type="text" maxlength="40" placeholder="..." />
                        <label class="editAccountText"> Loading Screen</label>
                    </div>

                    <!-- color: nav background -->
                    <div id="editAccountNavBackgroundColor" class="editAccountColors">
                        <input id="editAccountColorNavBackground" class="editAccountInputColor" type="text" maxlength="40" placeholder="..." />
                        <label class="editAccountText"> Nav Background</label>
                    </div>
    
                    <!-- color: nav icons -->
                    <div id="" class="editAccountColors">
                        <input id="editAccountColorNavIcons" class="editAccountInputColor" type="text" maxlength="40" placeholder="..." />
                        <label class="editAccountText"> Nav Icons</label>
                    </div>

                    <!-- color: nav icons text -->
                    <div id="" class="editAccountColors">
                        <input id="editAccountColorNavIconsText" class="editAccountInputColor" type="text" maxlength="40" placeholder="..." />
                        <label class="editAccountText"> Nav Icons Text</label>
                    </div>
                </div>

                <!-- edit: account nav -->
                <div id="editAccountNav" class="editAccountSection">

                    <!-- title -->
                    <label class="editAccountTitle">Nav</label>
                    
                    <!-- toggle: nav position -->
                    <div id="editAccountNavPosition">
                        <label class="editAccountToggle">Position:</label>
                        <button id="editAccountNavTop" class="editAccountToggleButton" v-on:click="editAccount('navPosition', 'top', 'true')">Top</button>
                        <button id="editAccountNavBottom" class="editAccountToggleButton" v-on:click="editAccount('navPosition', 'bottom', 'true')">Bottom</button>
                        <button id="editAccountNavLeft" class="editAccountToggleButton" v-on:click="editAccount('navPosition', 'left', 'true')">Left</button>
                        <button id="editAccountNavRight" class="editAccountToggleButton" v-on:click="editAccount('navPosition', 'right', 'true')">Right</button>
                    </div>
    
                    <!-- toggle: nav icon type -->
                    <div id="editAccountNavIconType">
                        <label class="editAccountToggle">Icon Type:</label>
                        <button id="editAccountNavSquare" class="editAccountToggleButton" v-on:click="editAccount('navIconType', 'square', 'true')">Square</button>
                        <button id="editAccountNavRounded" class="editAccountToggleButton" v-on:click="editAccount('navIconType', 'rounded', 'true')">Rounded</button>
                    </div>
    
                    <!-- toggle: nav icon size -->
                    <div id="editAccountNavIconSize">
                        <label class="editAccountToggle">Icon Size:</label>
                        <button id="editAccountNavSmall" class="editAccountToggleButton" v-on:click="editAccount('navIconSize', 'small', 'true')">Small</button>
                        <button id="editAccountNavMedium" class="editAccountToggleButton" v-on:click="editAccount('navIconSize', 'medium', 'true')">Medium</button>
                        <button id="editAccountNavLarge" class="editAccountToggleButton" v-on:click="editAccount('navIconSize', 'large', 'true')">Large</button>
                    </div>
                </div>
                
                <!-- edit: account text -->
                <div id="editAccountText" class="editAccountSection">

                    <!-- title -->
                    <label class="editAccountTitle">Text</label>

                    <!-- toggle: text weight -->
                    <div id="editAccountTextStyle">
                        <label class="editAccountToggle">Style:</label>
                        <button id="editAccountTextNormal" class="editAccountToggleButton" v-on:click="editAccount('textStyle', 'normal', 'true')">Normal</button>
                        <button id="editAccountTextBold" class="editAccountToggleButton" v-on:click="editAccount('textStyle', 'bold', 'true')">Bold</button>
                    </div>
                </div>

                <!-- edit: account privacy -->
                <div id="editAccountPrivacy" class="editAccountSection">

                    <!-- title -->
                    <label class="editAccountTitle">Privacy</label>

                    <!-- toggle: access -->
                    <div id="editAccountSiteAccess">
                        <label class="editAccountToggle">Accessibility:</label>
                        <button id="editAccountSitePublic" class="editAccountToggleButton" v-on:click="editAccount('siteAccess', 'public', 'true')">Public</button>
                        <button id="editAccountSitePrivate" class="editAccountToggleButton" v-on:click="editAccount('siteAccess', 'private', 'true')">Private</button>
                    </div>
    
                    <!-- toggle: password protected -->
                    <div id="editAccountSitePasswordProtected">
                        <label class="editAccountToggle">Password Protected:</label>
                        <button id="editAccountSitePasswordProtectedYes" class="editAccountToggleButton" v-on:click="editAccount('sitePasswordProtected', 'true', 'true')">Yes</button>
                        <button id="editAccountSitePasswordProtectedNo" class="editAccountToggleButton" v-on:click="editAccount('sitePasswordProtected', 'false', 'true')">No</button>
                        <input id="editAccountPasswordProtectedPassword" class="editAccountInputText" type="text" placeholder="Site Password" maxlength="20" />
                    </div>
                </div>

                <!-- edit: account pages -->
                <div id="editAccountPages" class="editAccountSection">

                    <!-- title -->
                    <label class="editAccountTitle">Pages</label>

                    <!-- toggle: start page -->
                    <div id="editAccountStartPage">
                        <label class="editAccountToggle">Start:</label>
                        <button id="editAccountStartPageYes" class="editAccountToggleButton" v-on:click="editAccount('pageStart', 'true', 'true')">Yes</button>
                        <button id="editAccountStartPageNo" class="editAccountToggleButton" v-on:click="editAccount('pageStart', 'false', 'true')">No</button>
                        <input id="editAccountStartPageTitle" class="editAccountInputText" type="text" placeholder="Start Title" maxlength="100" />
                        <input id="editAccountStartPageText" class="editAccountInputText" type="text" placeholder="Start Text" maxlength="100" />
                        <input id="editAccountStartPageBackgroundImage" class="editAccountInputText" type="text" placeholder="Start Background Image Url" maxlength="1000" />
                    </div>
                    
                    <!-- toggle: end page -->
                    <div id="editAcountEndPage">
                        <label class="editAccountToggle">End:</label>
                        <button id="editAcountEndPageYes" class="editAccountToggleButton" v-on:click="editAccount('pageEnd', 'true', 'true')">Yes</button>
                        <button id="editAcountEndPageNo" class="editAccountToggleButton" v-on:click="editAccount('pageEnd', 'false', 'true')">No</button>
                        <input id="editAccountEndPageTitle" class="editAccountInputText" type="text" placeholder="End Title" maxlength="100" />
                        <input id="editAccountEndPageText" class="editAccountInputText" type="text" placeholder="End Text" maxlength="100" />
                        <input id="editAccountEndPageBackgroundImage" class="editAccountInputText" type="text" placeholder="End Background Image Url" maxlength="1000" />
                    </div>
                </div>

                <!-- edit: account buttons -->
                <div id="editAccountButtons" class="editAccountSection">

                    <!-- title -->
                    <label class="editAccountTitle">Buttons</label>

                    <!-- toggle: fullscreen button -->
                    <div id="editAccountFullscreenButton">
                        <label class="editAccountToggle">Fullscreen:</label>
                        <button id="editAccountFullscreenButtonYes" class="editAccountToggleButton" v-on:click="editAccount('buttonFullscreen', 'true', 'true')">Yes</button>
                        <button id="editAccountFullscreenButtonNo" class="editAccountToggleButton" v-on:click="editAccount('buttonFullscreen', 'false', 'true')">No</button>
                    </div>
    
                    <!-- toggle: search button -->
                    <div id="editAccountSearchButton">
                        <label class="editAccountToggle">Search:</label>
                        <button id="editAccountSearchButtonYes" class="editAccountToggleButton" v-on:click="editAccount('buttonSearch', 'true', 'true')">Yes</button>
                        <button id="editAccountSearchButtonNo" class="editAccountToggleButton" v-on:click="editAccount('buttonSearch', 'false', 'true')">No</button>
                    </div>
    
                    <!-- toggle: contact button -->
                    <div id="editAccountContactButton">
                        <label class="editAccountToggle">Contact:</label>
                        <button id="editAccountContactButtonYes" class="editAccountToggleButton" v-on:click="editAccount('buttonContact', 'true', 'true')">Yes</button>
                        <button id="editAccountContactButtonNo" class="editAccountToggleButton" v-on:click="editAccount('buttonContact', 'false', 'true')">No</button>
                    </div>
    
                    <!-- toggle: about button -->
                    <div id="editAccountAboutButton">
                        <label class="editAccountToggle">About:</label>
                        <button id="editAccountAboutButtonYes" class="editAccountToggleButton" v-on:click="editAccount('buttonAbout', 'true', 'true')">Yes</button>
                        <button id="editAccountAboutButtonNo" class="editAccountToggleButton" v-on:click="editAccount('buttonAbout', 'false', 'true')">No</button>
                        <input id="editAccountAboutText" class="editAccountInputText" type="text" placeholder="About Text" maxlength="400" />
                    </div>
                </div>

                <!-- edit: account extras -->
                <div id="editAccountExtras" class="editAccountSection">
                    
                    <!-- title -->
                    <label class="editAccountTitle">Extra</label>

                    <!-- toggle: slideshow mode -->
                    <div id="editAccountSlideshowMode">
                        <label class="editAccountToggle">Slideshow Mode:</label>
                        <button id="editAccountSlideshowModeYes" class="editAccountToggleButton" v-on:click="editAccount('modeSlideshow', 'true', 'true')">Yes</button>
                        <button id="editAccountSlideshowModeNo" class="editAccountToggleButton" v-on:click="editAccount('modeSlideshow', 'false', 'true')">No</button>
                    </div>
                    
                    <!-- toggle: section background image -->
                    <div id="editAccountSectionBackgroundImage">
                        <label class="editAccountToggle">Section Background Image:</label>
                        <button id="editAccountSectionBackgroundImageYes" class="editAccountToggleButton" v-on:click="editAccount('sectionBackgroundImage', 'true', 'true')">Yes</button>
                        <button id="editAccountSectionBackgroundImageNo" class="editAccountToggleButton" v-on:click="editAccount('sectionBackgroundImage', 'false', 'true')">No</button>
                        <input id="editAccountSectionBackgroundImageUrl" class="editAccountInputText" type="text" placeholder="Background Url" maxlength="1000"/>
                    </div>
    
                    <!-- toggle: loading screen -->
                    <div id="editAccountLoadingScreen">
                        <label class="editAccountToggle">Loading Screen:</label>
                        <button id="editAccountLoadingScreenYes" class="editAccountToggleButton" v-on:click="editAccount('loadingScreen', 'true', 'true')">Yes</button>
                        <button id="editAccountLoadingScreenNo" class="editAccountToggleButton" v-on:click="editAccount('loadingScreen', 'false', 'true')">No</button>
                    </div>
                </div>
            </div>

            <!-- edit account: danger -->
            <div id="editAccountDanger" class="editAccountSection">
                
                <!-- title -->
                <label class="editAccountTitle">Danger</label>

                <input id="editAccountDangerReset" type="button" class="editAccountInputDanger" value="Reset Account" v-on:click="dangerAccount('display', 'reset')">
                <input id="editAccountDangerDelete" type="button" class="editAccountInputDanger" value="Delete Account" v-on:click="dangerAccount('display', 'delete')">
                
                <div id="editAccountDangerConfirm">
                    <input id="editAccountDangerConfirmText" class="editAccountInputText" type="text" placeholder="Password" />
                    <input id="editAccountDangerConfirmResetButton" type="button" class="editAccountInputDanger" value="Confirm Reset" v-on:click="dangerAccount('account', 'reset')">
                    <input id="editAccountDangerConfirmDeleteButton" type="button" class="editAccountInputDanger" value="Confirm Delete" v-on:click="dangerAccount('account', 'delete')">
                    <label id="editAccountDangerStatusMessage" type="text" class=""></label>
                </div>
            </div>

            <!-- account: info -->
            <div id="editAccountInfo" class="editAccountSection" v-if="backendAccountLoginInfo">
            
                <!-- title -->
                <label class="editAccountTitle">Account</label>

                <!-- account status -->
                <label class="accountInfoItem">
                    <span class="accountInfoTitle">Status: </span> 
                    <span class="accountInfoText">{{backendAccountLoginInfo.accountStatus}}</span>
                </label>

                <!-- account last login -->
                <label class="accountInfoItem">
                    <span class="accountInfoTitle">Last Login: </span>
                    <span class="accountInfoText">{{backendAccountLoginInfo.lastLogin.substring(0, 19)}}</span>
                </label>

                <!-- account created at-->
                <label id="accountInfoCreatedAt" class="accountInfoItem">
                    <span class="accountInfoTitle">Created At: </span> 
                    <span class="accountInfoText">{{backendAccountLoginInfo.createdAt}}</span>
                </label>
            </div>

            <p id="updateStatusMessageUpdateSettings"></p>

            <!-- edit account: save checkbox -->
            <input id="checkboxSaveUpdateSettings" type="checkbox" class="checkbox" v-on:click="confirmCheckboxUpdateSettings()" />
            <label id="labelSaveUpdateSettings">Save</label>

            <!-- edit account: confirm save button -->
            <div id="confirmChangesUpdateSettings">
                <button id="buttonSaveUpdateSettings" v-on:click="saveChangesSettings()">Confirm Save</button>
            </div>
        </div>


        <!-- button: edit sections -->
        <div id="" v-if="backendSections">
            <img id="settingsSectionsIcon" src="/images/icons/iconSettingsSections.png" v-on:click="editSectionsModal(backendSections)"/>
        </div>


        <!-- button: edit account -->
        <div id="settingsAccount" v-on:click="editAccountModal(backendAccountSettings, backendAccountCredentials)">
            <p id="settingsAccountText">Settings</p>
        </div>


        <!-- button: checkout public site -->
        <div id="checkoutPublicSite" v-on:click="checkoutPublicSite('desktop')">
        </div>
        
        <!-- button: checkout public site -->
        <div id="reloadPage" v-on:click="reloadPage()">↻</div>


        <!-- button: logout account -->
        <div id="logoutAccount">
            <p id="logoutAccountText" v-on:click="logout()">⇠</p> <!-- ⬅ -->
        </div>

        <!-- mobile only -->
        <div id="mobileCheckoutPublicSite" v-on:click="checkoutPublicSite('mobile')">
        </div>
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
    const DEFAULT_DOMAIN = configs.DEFAULT_DOMAIN || "http://127.0.0.1:8000"
    const backendSections = computed(() => { return store.getters['storage/backendSections']})
    const backendCategories = computed(() => { return store.getters['storage/backendCategories']})
    const backendData = computed(() => { return store.getters['storage/backendData']})
    const backendCategoriesSelected = computed(() => { return store.getters['storage/backendCategoriesSelected']})
    const backendDataSelected = computed(() => { return store.getters['storage/backendDataSelected']})
    const backendDataObjModal = computed(() => { return store.getters['storage/backendDataObjModal']})
    const backendCategoryObjModal = computed(() => { return store.getters['storage/backendCategoryObjModal']})
    const backendSectionObjModal = computed(() => { return store.getters['storage/backendSectionObjModal']})
    const backendAccountSettings = computed(() => { return store.getters['storage/backendAccountSettings']})
    const backendAccountCredentials = computed(() => { return store.getters['storage/backendAccountCredentials']})
    const backendAccountLoginInfo = computed(() => { return store.getters['storage/backendAccountLoginInfo']})


    //globals
    var selectedCategory = ""
    var selectedSection = ""
    var selectedDataPos = ""
    var oldImagePos = ""
    var oldDataPos = ""
    var newImagePos = ""
    var newDataPos = ""
    var oldPos = ""
    var newPos = ""
    var oldCategoryPos = ""
    var newCategoryPos = ""
    var oldSectionPos = ""
    var newSectionPos = ""


    //lifecycle hooks
    onMounted(() => { 
        console.log("componentBackend mounted")
        document.title = "Backend"
        fetchSpecificUser()
        generatePwaManifest()
    })
    onUpdated(() => { console.log("componentBackend updated") })


    //event listeners
    document.addEventListener('wheel', function(e) {
        
        //elements 
        let backendCategoriesList = document.getElementById("backendCategoriesList")

        //horizontal scroll for categories
        if(e.deltaY > 0 && backendCategoriesList != null) 
        { 
            backendCategoriesList.scrollLeft += 60;
        }
        else if(backendCategoriesList != null) 
        { 
            backendCategoriesList.scrollLeft -= 60;
        }
    })
    

    //functions
    async function fetchSpecificUser()
    {   
        //variables
        let username = localStorage.getItem("cms-account")
        let token = localStorage.getItem("cms-token")
        let lastLogin = localStorage.getItem("cms-last-login")
        let obj = JSON.stringify({ "username": username, "token": token, "lastLogin": lastLogin })

        //null check
        if(username == null || token == null || lastLogin == null) { router.push("/"); return }
        
        //fetch specific user data
        await fetch(BACKEND_API + "/user-specific", {method: 'post', body: obj})
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
                store.dispatch('storage/actionSetBackendAccountSettings', data.settings)
                store.dispatch('storage/actionSetBackendAccountCredentials', data.credentials)
                store.dispatch('storage/actionSetBackendAccountLoginInfo',{
                    "createdAt": data.info.createdAt,
                    "lastLogin": data.info.lastLogin,
                    "accountStatus": data.info.accountStatus
                })

                //redirect
                router.push("/backend")
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
        for(let item in sectionElements) {
            let element = document.getElementById(sectionElements[item].id)
            if(element) { element.style.opacity = "0.2" }
        }
        for(let item in categoryElements) {
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
            if(e) { e.style.opacity = "0.2" }
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
        else { value = "Row " + data.pos + " · " + "<" + data.type + ">" }

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
        let editCategoriesModal = document.getElementById("editCategoriesModal")
        let editSectionsModal = document.getElementById("editSectionsModal")
        let editAccountModal = document.getElementById("editAccountModal")

        //update elements
        if(dataObjModal) { dataObjModal.style.display = "none" }
        if(addDataRowModal) { addDataRowModal.style.display = "none" }
        if(underlayModal) { underlayModal.style.display = "none" }
        if(editCategoriesModal) { editCategoriesModal.style.display = "none" }
        if(editSectionsModal) { editSectionsModal.style.display = "none" }
        if(editAccountModal) { editAccountModal.style.display = "none" }
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
        let inputAddGalleryImage = document.getElementById("inputAddGalleryImage")
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")
        let dataObjNew = document.getElementById("dataObjNew")
        let dataObjModalPreviewImage = document.getElementsByClassName("dataObjModalPreviewImage")

        //variables
        let pos = dataObjPosition.value
        let hidden = dataObjHidden.checked.toString()
        let title = dataObjTitle.value
        let imgUrl = inputAddGalleryImage.value
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
            inputAddGalleryImage.value = ""

            //handle data
            arrayData = JSON.parse(rowData)
            arrayData = JSON.parse(arrayData.data.replaceAll("'", "\""))
            totalItems = (arrayData.length + 1).toString()
            arrayData.push({pos: totalItems, image: imgUrl, description: ""})
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
            selectPreviewImage(totalItems, "")
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
        let inputImageDescription = document.getElementById("inputImageDescription")

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
        selectPreviewImage(newImagePos, inputImageDescription.value)
    }


    function imageGalleryUpdateImageDescription()
    {   
        //debugging
        // console.log("imageGalleryUpdateImageDescription")

        //elements
        let inputImageDescription = document.getElementById("inputImageDescription")
        let inputImagePosition = document.getElementById("inputImagePosition")
        let dataObjPosition = document.getElementById("dataObjPosition")
        let dataObjHidden = document.getElementById("dataObjHidden")
        let dataObjTitle = document.getElementById("dataObjTitle")
        let isNew = dataObjNew.checked

        //variables
        let rowData = localStorage.getItem('cms-edit-row')
        let galleryImages = ""
        let pos = dataObjPosition.value
        let hidden = dataObjHidden.checked.toString()
        let title = dataObjTitle.value
        let imageDescription = inputImageDescription.value.replaceAll("'", "’")  //replaceAll("'", "´")
        
        //null check
        if(inputImagePosition.value == '') { return }

        //set gallery images
        galleryImages = JSON.parse(rowData)
        galleryImages = galleryImages.data.replaceAll("'", "\"")
        galleryImages = JSON.parse(galleryImages)
        
        //set new image description
        for(let item in galleryImages)
        {   
            let imagePos = galleryImages[item].pos

            if(imagePos == inputImagePosition.value) 
            { 
                console.log(galleryImages[item])
                
                galleryImages[item].description = imageDescription
            }
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
            //update elements
            dataObjPosition.style.backgroundColor = "red"
            dataObjModalErrorMessage.style.display = "block"
            dataObjModalErrorMessage.innerText = "Position Invalid"
            
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
                if(selectedSection == backendData.value[item].section && selectedCategory == backendData.value[item].category)
                { 
                    for(let r in backendData.value[item].rows)
                    {
                        if(pos == JSON.parse(backendData.value[item].rows[r]).pos) 
                        { 
                            backendData.value[item].rows.splice((pos - 1), 1)
                        }
                    }
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
                    backendData.value[item].rows = rowsArray
                }
            }

            //debuggin
            // console.log(backendData.value)

            //save vuex
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
                    }
                }
            }
    
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

        //update user data
        await fetch(BACKEND_API + "/user-update-data", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {

            //debugging
            // console.log(data)

            //set update successful message
            if(data.status == "update user data successful") 
            { 
                    //save vuex
                    store.dispatch('storage/actionSetBackendData', backendData.value)

                if(confirmCheckbox) { confirmCheckbox.style.display = "none" }
                if(confirmChanges) { confirmChanges.style.display = "none" }
                if(updateStatusMessage) 
                { 
                    updateStatusMessage.style.color = "white"
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
        let obj = JSON.stringify([{ "username": username, "token": token, "lastLogin": lastLogin }, JSON.stringify(newCategories), JSON.stringify(newData)])

        //update user categories
        await fetch(BACKEND_API + "/user-update-categories", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {

            //debugging
            // console.log(data)

            //set update successful message
            if(data.status == "update user categories successful") 
            { 
                    //save vuex
                    store.dispatch('storage/actionSetBackendData', newData)
                    store.dispatch('storage/actionSetBackendCategories', newCategories)
                    store.dispatch('storage/actionSetBackendCategoriesSelected', newCategories)

                    //update local storage
                    localStorage.setItem("cms-edit-category", JSON.stringify(newCategories))

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
                    updateStatusMessage.style.color = "white"
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
        let obj = JSON.stringify([{ "username": username, "token": token, "lastLogin": lastLogin }, JSON.stringify(newSections)])

        //update user sections
        await fetch(BACKEND_API + "/user-update-sections", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {

            //debugging
            // console.log(data)

            //set update successful message
            if(data.status == "update user sections successful") 
            { 
                    //save vuex
                    store.dispatch('storage/actionSetBackendSections', newSections)

                    //update local storage
                    localStorage.setItem("cms-edit-section", JSON.stringify(newSections))

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
                    updateStatusMessage.style.color = "white"
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


    function selectPreviewImage(pos, description)
    {
        //debugging
        console.log("selectPreviewImage:" + pos)

        //elements
        let dataObjModalPreviewImage = document.getElementsByClassName("dataObjModalPreviewImage")
        let selectedImage = ""
        let dataObjModalEditImages = document.getElementById("dataObjModalEditImages")
        let inputImagePosition = document.getElementById("inputImagePosition")
        let inputImageDescription = document.getElementById("inputImageDescription")

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
            if(inputImageDescription) { inputImageDescription.value = description }
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
            { let element = document.getElementById(dataObjModalClass[e].id); if(element) { element.style.opacity = "0.2" } }
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

            //check forbidden characters
            dataObjModalText.value = dataObjModalText.value.replaceAll("'", "’") //replaceAll("'", "´")
            
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
        if(type == "") { addDataRowModal.style.display = "block"; underlayModal.style.display = "block" }
        else if(type != "") { addDataRowModal.style.display = "none" }
        if(type == "imageGallery") { loadDataObjModal(newObjImageGallery, true) }
        else if(type == "multiline") { loadDataObjModal(newObjMultiline, true) }
        else if(type == "timeline") { loadDataObjModal(newObjTimeline, true) }
        else if(type == "singleline") { loadDataObjModal(newObjSingleline, true) }
        else if(type == "linklist") { loadDataObjModal(newObjLinklist, true) }
        else if(type == "textlist") { loadDataObjModal(newObjTextlist, true) }
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
        let inputCategorySettingsBackgroundImageUrl = document.getElementById("inputCategorySettingsBackgroundImageUrl")
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
        inputCategorySettingsBackgroundImageUrl.value = ""
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

        //variables
        let categories = backendCategories.value.sort((a, b) => { return a.pos - b.pos })
        let data = backendData.value

        //sort sections by pos
        sections = sections.sort((a, b) => { return a.pos - b.pos })

        //set local storage
        localStorage.setItem("cms-edit-section", JSON.stringify(sections))
        localStorage.setItem("cms-edit-category", JSON.stringify(categories))
        localStorage.setItem("cms-edit-data", JSON.stringify(data))

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
        // console.log("editCategory: " + type)
        // console.log(category)
        
        //elements
        let editCategoryObj = ""
        let inputCategoryPos = document.getElementById("inputCategoryPos")
        let inputCategoryHidden = document.getElementById("inputCategoryHidden")
        let inputCategoryHiddenToggleHidden = document.getElementById("inputCategoryHiddenToggleHidden")
        let inputCategoryHiddenToggleShow = document.getElementById("inputCategoryHiddenToggleShow")
        let inputCategorySettingsBackgroundImageUrl = document.getElementById("inputCategorySettingsBackgroundImageUrl")
        let updateStatusMessageUpdateCategories = document.getElementById("updateStatusMessageUpdateCategories")
        let editCategoryObjects = document.getElementsByClassName("editCategoryObj")
        let lsCategories = JSON.parse(localStorage.getItem('cms-edit-category'))
        
        //variables
        let isChanged = false
        let totalItems = 0
        let id = category.pos

        //type: CLICK
        if(type == "click") 
        {   
            //set old position
            oldCategoryPos = id

            //check values
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) 
                { 
                    //update elements
                    inputCategoryHiddenToggleHidden.style.display = "none"
                    inputCategoryHiddenToggleShow.style.display = "none"

                    //set category hidden
                    if(lsCategories[item].hidden == "true") 
                    { inputCategoryHidden.checked = true; inputCategoryHiddenToggleHidden.style.display = "block" }

                    //set category show
                    else if(lsCategories[item].hidden == "false") 
                    { inputCategoryHidden.checked = false; inputCategoryHiddenToggleShow.style.display = "block" }

                    //set category background image
                    if(lsCategories[item].backgroundImage == undefined || lsCategories[item].backgroundImage == null || lsCategories[item].backgroundImage == "")
                    { inputCategorySettingsBackgroundImageUrl.value = "" }
                    else if(lsCategories[item].backgroundImage != "")
                    { inputCategorySettingsBackgroundImageUrl.value = lsCategories[item].backgroundImage }
                    else 
                    { inputCategorySettingsBackgroundImageUrl.value = "" }
                    
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
            lsCategories.push({hidden: 'false', pos: totalItems, section: selectedSection, title: 'category' + totalItems.toString(), backgroundImage: ""})

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
            let categoryAlreadyExists = "false"

            //check if category already exists
            for(let item in lsCategories)
            {
                if(oldCategoryPos == lsCategories[item].pos)
                {
                    let selectedElement = document.getElementById("buttonCategorySettingsTitle#" + lsCategories[item].pos)
                    let newTitle = selectedElement.value

                    for(let c in lsCategories)
                    {
                        if(lsCategories[c].section.toLowerCase() == selectedSection.toLowerCase() && newTitle.toLowerCase() == lsCategories[c].title.toLowerCase()) 
                        { 
                            categoryAlreadyExists = "true"
                        }
                    }
                }
            }

            //set new values
            for(let item in lsCategories) 
            { 
                if(lsCategories[item].section == selectedSection && oldCategoryPos == lsCategories[item].pos) 
                { 
                    let selectedElement = document.getElementById("buttonCategorySettingsTitle#" + lsCategories[item].pos)
                    let selectedElementBackgroundImageUrl = document.getElementById("inputCategorySettingsBackgroundImageUrl")
                    let newTitle = selectedElement.value
                    let fcc = forbiddenCharactersCheck(newTitle)

                    //error: category contains forbidden characters
                    if(fcc == true) 
                    {   
                        //update elements
                        updateStatusMessageUpdateCategories.style.color = "red"
                        updateStatusMessageUpdateCategories.innerText = "section " + newTitle.toLowerCase() + " contains forbidden characters"
                        updateStatusMessageUpdateCategories.style.display = "block"

                        return
                    }

                    //error: category already exists
                    if(lsCategories[item].title != newTitle)
                    {
                        //set old title
                        let oldTitle = lsCategories[item].oldTitle
                        if(oldTitle == null) { lsCategories[item].oldTitle = lsCategories[item].title }

                        //update elements
                        if(categoryAlreadyExists == "true" && lsCategories[item].oldTitle != newTitle)
                        {
                            updateStatusMessageUpdateCategories.style.color = "red"
                            updateStatusMessageUpdateCategories.innerText = "category " + newTitle.toLowerCase() + " already exists"
                            updateStatusMessageUpdateCategories.style.display = "block"
                            return
                        }
                    }

                    //set new title
                    lsCategories[item].title = selectedElement.value

                    //set new background image
                    if(selectedElementBackgroundImageUrl.value != "") 
                    { lsCategories[item].backgroundImage = selectedElementBackgroundImageUrl.value }
                    else
                    { lsCategories[item].backgroundImage = "" }

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
        for(let e in editCategoryObjects) { let c = document.getElementById(editCategoryObjects[e].id); if(c) { c.style.opacity = "0.2" } }
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
        let lsCategories = JSON.parse(localStorage.getItem('cms-edit-category'))
        let lsData = JSON.parse(localStorage.getItem("cms-edit-data"))
        let selectedElement = ""
        
        //variables
        let isChanged = false
        let totalItems = 0
        let id = section.pos
        let selectedSection = toRaw(section).title
        let lsCategoriesNew = []
        let backendDataNew = ""

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
                hidden: 'false', 
                pos: totalItems, 
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
            //check if section already exist
            for(let item in lsSections)
            {
                if(oldSectionPos == lsSections[item].pos)
                {
                    let selectedElement = document.getElementById("buttonSectionSettingsTitle#" + lsSections[item].pos)
                    let newTitle = selectedElement.value
                    let fcc = forbiddenCharactersCheck(newTitle)
                    
                    //error: section contains forbidden characters
                    if(fcc == true) 
                    {
                        //update elements
                        updateStatusMessageUpdateSections.style.color = "red"
                        updateStatusMessageUpdateSections.innerText = "section " + newTitle.toLowerCase() + " contains forbidden characters"
                        updateStatusMessageUpdateSections.style.display = "block"

                        return
                    }

                    //error: section already exists
                    for(let c in lsSections)
                    {
                        if(newTitle.toLowerCase() == lsSections[c].title.toLowerCase()) 
                        { 
                            console.log("section " + newTitle + " already exists") 
                            updateStatusMessageUpdateSections.style.color = "red"
                            updateStatusMessageUpdateSections.innerText = "section " + newTitle.toLowerCase() + " already exists"
                            updateStatusMessageUpdateSections.style.display = "block"

                            return
                        }
                    }
                }
            }

            //set new values
            for(let item in lsSections) 
            { 
                if(oldSectionPos == lsSections[item].pos) 
                { 
                    //set element
                    selectedElement = document.getElementById("buttonSectionSettingsTitle#" + lsSections[item].pos)
                    
                    //set old title
                    let oldTitle = lsSections[item].title
                    lsSections[item].oldTitle = oldTitle
                    
                    //set new title
                    let newTitle = selectedElement.value
                    lsSections[item].title = newTitle

                    //set categories new section
                    for(let item in lsCategories)
                    {
                        if(oldTitle == lsCategories[item].section) 
                        { 
                            lsCategories[item].section = newTitle 
                        }
                    }

                    //set data new section
                    for(let item in lsData)
                    {
                        if(oldTitle == lsData[item].section)
                        {
                            lsData[item].section = newTitle
                        }
                    }

                    //reload edit categories data
                    editSectionsModal(lsSections)
            
                    //select new section
                    editSection({pos: lsSections[item].pos}, "click")

                    //set status
                    isChanged = true
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
            let sectionTitle = ""

            //set remove item id
            for(let item in lsSections) 
            { if(oldSectionPos == lsSections[item].pos) { removeItem = item; sectionTitle = lsSections[item].title } }

            //remove selected section from array
            lsSections.splice(removeItem, 1)
            
            //count section categories
            sectionSectionsLength = lsSections.length + 1

            //update data positions
            for(let item in lsSections) 
            { 
                if(sectionSectionsCounter != sectionSectionsLength) 
                { 
                    sectionSectionsCounter++
                    lsSections[item].pos = sectionSectionsCounter.toString()
                }
            }

            //remove related section categories 
            let lsCategoriesNew = []           
            for(let item in lsCategories)
            {
                if(sectionTitle != lsCategories[item].section) { lsCategoriesNew.push(lsCategories[item]) }
            }

            lsCategories = lsCategoriesNew
            
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
        for(let e in editSectionObjects) { let c = document.getElementById(editSectionObjects[e].id); if(c) { c.style.opacity = "0.2" } }
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
            localStorage.setItem("cms-edit-category", JSON.stringify(lsCategories))
            localStorage.setItem("cms-edit-data", JSON.stringify(lsData))
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
        //elements
        let confirmChangesCheckboxUpdateCategories = document.getElementById("confirmChangesCheckboxUpdateCategories")
        let buttonSaveUpdateCategories = document.getElementById("buttonSaveUpdateCategories")
        let checkboxSaveUpdateCategories = document.getElementById("checkboxSaveUpdateCategories")

        //update elements
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

        //add old rows data
        for(let item in backendData.value)
        {
            for(let c in newBackendData)
            {
                if(backendData.value[item].section == newBackendData[c].section && backendData.value[item].category == newBackendData[c].oldTitle) 
                { 
                    newBackendData[c].rows = ""
                }
                else if(backendData.value[item].section == newBackendData[c].section && backendData.value[item].category == newBackendData[c].category) 
                { 
                    newBackendData[c].rows = toRaw(backendData.value[item].rows)
                }
            }
            
        }

        //add new rows data 1
        for(let c in newBackendData)
        {
            if(newBackendData[c].oldTitle != undefined) 
            { 
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

        //reload edit categories modal
        editCategoriesModal(ls)

        //update DB
        updateUserCategories(ls, newBackendData)
    }


    function saveChangesSections()
    {
        //debuging
        console.log("saveChangesSections")

        //variables
        let lsSections = JSON.parse(localStorage.getItem("cms-edit-section"))
        let lsCategories = JSON.parse(localStorage.getItem("cms-edit-category"))
        let lsData = JSON.parse(localStorage.getItem("cms-edit-data"))
        let newBackendSections = []
        
        //add sections to new array
        for(let item in lsSections)
        {
            newBackendSections.push(lsSections[item])
        }

        //reload edit sections modal
        editSectionsModal(lsSections)

        //update DB
        updateUserCategories(lsCategories, lsData)
        updateUserSections(newBackendSections)
    }
    
    
    function confirmCheckboxUpdateSections()
    {
        //elements
        let confirmChangesCheckboxUpdateSections = document.getElementById("confirmChangesCheckboxUpdateSections")
        let buttonSaveUpdateSections = document.getElementById("buttonSaveUpdateSections")
        let checkboxSaveUpdateSections = document.getElementById("checkboxSaveUpdateSections")

        //show update button
        if(checkboxSaveUpdateSections.checked == true) 
        { 
            confirmChangesCheckboxUpdateSections.style.display = "block"
            buttonSaveUpdateSections.style.display = "block"
            buttonSaveUpdateSections.scrollIntoView()
        }

        //hide update button
        else if(checkboxSaveUpdateSections.checked == false) 
        { 
            confirmChangesCheckboxUpdateSections.style.display = "none"
            buttonSaveUpdateSections.style.display = "none"
        }
    }

    
    function editAccountModal(settings, credentials)
    {
        //elements
        let editAccountModal = document.getElementById("editAccountModal")
        let underlayModal = document.getElementById("underlayModal")
        let editAccountUsername = document.getElementById("editAccountUsername")
        let editAccountDomain = document.getElementById("editAccountDomain")
        let editAccountEmail = document.getElementById("editAccountEmail")
        let editAccountName = document.getElementById("editAccountName")
        let editAccountPhone = document.getElementById("editAccountPhone")
        let editAccountCountry = document.getElementById("editAccountCountry")
        let editAccountChangePassword = document.getElementById("editAccountChangePassword")
        let editAccountPasswordOld = document.getElementById("editAccountPasswordOld")
        let editAccountPasswordNew = document.getElementById("editAccountPasswordNew")
        let editAccountPasswordNewAgain = document.getElementById("editAccountPasswordNewAgain")
        let labelSaveUpdateSettings = document.getElementById("labelSaveUpdateSettings")
        let checkboxSaveUpdateSettings = document.getElementById("checkboxSaveUpdateSettings")
        let editAccountDangerReset = document.getElementById("editAccountDangerReset")
        let editAccountDangerDelete = document.getElementById("editAccountDangerDelete")
        let editAccountDangerConfirm = document.getElementById("editAccountDangerConfirm")
        let editAccountDangerConfirmText = document.getElementById("editAccountDangerConfirmText")
        let editAccountDangerStatusMessage = document.getElementById("editAccountDangerStatusMessage")
        
        //set local storage
        localStorage.setItem("cms-edit-settings", JSON.stringify(settings))

        //update elements
        editAccountModal.style.display = "block"
        underlayModal.style.display = "block"
        editAccountChangePassword.style.display = "none"
        editAccountPasswordOld.value = ""
        editAccountPasswordNew.value = ""
        editAccountPasswordNewAgain.value = ""
        editAccountUsername.style.backgroundColor = "black"
        editAccountDomain.style.backgroundColor = "black"
        editAccountEmail.style.backgroundColor = "black"
        editAccountName.style.backgroundColor = "black"
        editAccountPhone.style.backgroundColor = "black"
        editAccountCountry.style.backgroundColor = "black"
        editAccountPasswordOld.style.backgroundColor = "black"
        editAccountPasswordNew.style.backgroundColor = "black"
        editAccountPasswordNewAgain.style.backgroundColor = "black"
        labelSaveUpdateSettings.style.display = "block"
        checkboxSaveUpdateSettings.style.display = "block"
        hidePasswordInputs()
        editAccountModal.scrollTo(0,0)
        editAccountDangerReset.style.display = "block"
        editAccountDangerDelete.style.display = "block"
        editAccountDangerStatusMessage.style.display = "none"
        editAccountDangerConfirm.style.display = "none"
        editAccountDangerConfirmText.value = ""
        editAccountDangerStatusMessage.value = ""
        editAccount("navPosition", settings.navPosition, 'false')
        editAccount("navIconType", settings.navIconType, 'false')
        editAccount("navIconSize", settings.navIconSize, 'false')
        editAccount("textStyle", settings.textStyle, 'false')
        // editAccount("textSize", settings.textSize, 'false')
        editAccount("siteAccess", settings.siteAccess, 'false')
        editAccount("sitePasswordProtected", settings.sitePasswordProtected, 'false')
        editAccount("pageStart", settings.pageStart, 'false')
        editAccount("pageEnd", settings.pageEnd, 'false')
        editAccount("pageIndex", settings.pageIndex, 'false')
        editAccount("buttonFullscreen", settings.buttonFullscreen, 'false')
        editAccount("buttonSearch", settings.buttonSearch, 'false')
        editAccount("buttonContact", settings.buttonContact, 'false')
        editAccount("buttonAbout", settings.buttonAbout, 'false')
        editAccount("modeSlideshow", settings.modeSlideshow, 'false')
        editAccount("sectionBackgroundImage", settings.sectionBackgroundImage, 'false')
        editAccount("loadingScreen", settings.loadingScreen, 'false')
        editAccount("username", '', 'false')
        editAccount("domain", '', 'false')
        editAccount("email", '', 'false')
        editAccount("name", '', 'false')
        editAccount("phone", '', 'false')
        editAccount("country", '', 'false')
        editAccount("colorNavBackground", settings.colorNavBackground, 'false')
        editAccount("colorNavIcons", settings.colorNavIcons, 'false')
        editAccount("colorNavIconsText", settings.colorNavIconsText, 'false')
        editAccount("colorText", settings.colorText, 'false')
        editAccount("colorSectionBackground", settings.colorSectionBackground, 'false')
        editAccount("colorLoadingScreen", settings.colorLoadingScreen, 'false')
        editAccount("iconImage192x192", settings.iconImage192x192, 'false')
        editAccount("iconImage512x512", settings.iconImage512x512, 'false')
    }

    
    function editAccount(type, value, clicked)
    {
        //elements
        let editAccountModal = document.getElementById("editAccountModal")
        let editAccountNavTop = document.getElementById("editAccountNavTop")
        let editAccountNavBottom = document.getElementById("editAccountNavBottom")
        let editAccountNavLeft = document.getElementById("editAccountNavLeft")
        let editAccountNavRight = document.getElementById("editAccountNavRight")
        let editAccountNavThumbnails = document.getElementById("editAccountNavThumbnails")
        let editAccountNavNumbers = document.getElementById("editAccountNavNumbers")
        let editAccountNavSquare = document.getElementById("editAccountNavSquare")
        let editAccountNavRounded = document.getElementById("editAccountNavRounded")
        let editAccountNavSmall = document.getElementById("editAccountNavSmall")
        let editAccountNavMedium = document.getElementById("editAccountNavMedium")
        let editAccountNavLarge = document.getElementById("editAccountNavLarge")
        let editAccountTextNormal = document.getElementById("editAccountTextNormal")
        let editAccountTextBold = document.getElementById("editAccountTextBold")
        let editAccountTextSmall = document.getElementById("editAccountTextSmall")
        let editAccountTextMedium = document.getElementById("editAccountTextMedium")
        let editAccountTextLarge = document.getElementById("editAccountTextLarge")
        let editAccountSitePublic = document.getElementById("editAccountSitePublic")
        let editAccountSitePrivate = document.getElementById("editAccountSitePrivate")
        let editAccountSitePasswordProtectedYes = document.getElementById("editAccountSitePasswordProtectedYes")
        let editAccountSitePasswordProtectedNo = document.getElementById("editAccountSitePasswordProtectedNo")
        let editAccountStartPageNo = document.getElementById("editAccountStartPageNo")
        let editAccountStartPageYes = document.getElementById("editAccountStartPageYes")
        let editAccountEndPageYes = document.getElementById("editAcountEndPageYes")
        let editAccountEndPageNo = document.getElementById("editAcountEndPageNo")
        // let editAccountIndexPageYes = document.getElementById("editAccountIndexPageYes")
        // let editAccountIndexPageNo = document.getElementById("editAccountIndexPageNo")
        let editAccountFullscreenButtonYes = document.getElementById("editAccountFullscreenButtonYes")
        let editAccountFullscreenButtonNo = document.getElementById("editAccountFullscreenButtonNo")
        let editAccountSearchButtonYes = document.getElementById("editAccountSearchButtonYes")
        let editAccountSearchButtonNo = document.getElementById("editAccountSearchButtonNo")
        let editAccountContactButtonYes = document.getElementById("editAccountContactButtonYes")
        let editAccountContactButtonNo = document.getElementById("editAccountContactButtonNo")
        let editAccountAboutButtonYes = document.getElementById("editAccountAboutButtonYes")
        let editAccountAboutButtonNo = document.getElementById("editAccountAboutButtonNo")
        let editAccountSlideshowModeYes = document.getElementById("editAccountSlideshowModeYes")
        let editAccountSlideshowModeNo = document.getElementById("editAccountSlideshowModeNo")
        let editAccountSectionBackgroundImageYes = document.getElementById("editAccountSectionBackgroundImageYes")
        let editAccountSectionBackgroundImageNo = document.getElementById("editAccountSectionBackgroundImageNo")
        let editAccountLoadingScreenYes = document.getElementById("editAccountLoadingScreenYes")
        let editAccountLoadingScreenNo = document.getElementById("editAccountLoadingScreenNo")
        let editAccountEndPageTitle = document.getElementById("editAccountEndPageTitle")
        let editAccountEndPageText = document.getElementById("editAccountEndPageText")
        let editAccountEndPageBackgroundImage = document.getElementById("editAccountEndPageBackgroundImage")
        let editAccountStartPageTitle = document.getElementById("editAccountStartPageTitle")
        let editAccountStartPageText = document.getElementById("editAccountStartPageText")
        let editAccountStartPageBackgroundImage = document.getElementById("editAccountStartPageBackgroundImage")
        let editAccountAboutText = document.getElementById("editAccountAboutText")
        let editAccountChangePassword = document.getElementById("editAccountChangePassword")
        let editAccountPasswordOld = document.getElementById("editAccountPasswordOld")
        let editAccountPasswordNew = document.getElementById("editAccountPasswordNew")
        let editAccountPasswordNewAgain = document.getElementById("editAccountPasswordNewAgain")
        let editAccountPasswordImgShow = document.getElementById("editAccountPasswordImgShow")
        let editAccountPasswordImgHide = document.getElementById("editAccountPasswordImgHide")
        let editAccountColorNavBackground = document.getElementById("editAccountColorNavBackground")
        let editAccountColorNavIcons = document.getElementById("editAccountColorNavIcons")
        let editAccountColorNavIconsText = document.getElementById("editAccountColorNavIconsText")
        let editAccountColorText = document.getElementById("editAccountColorText")
        let editAccountColorSectionBackground = document.getElementById("editAccountColorSectionBackground")
        let editAccountColorLoadingScreen = document.getElementById("editAccountColorLoadingScreen")
        let editAccountPasswordProtectedPassword = document.getElementById("editAccountPasswordProtectedPassword")
        // let editAccountPasswordProtectedPasswordConfirm = document.getElementById("editAccountPasswordProtectedPasswordConfirm")
        let updateStatusMessage = document.getElementById("updateStatusMessageUpdateSettings")
        let checkboxSaveUpdateSettings = document.getElementById("checkboxSaveUpdateSettings")
        let confirmChangesUpdateSettings = document.getElementById("confirmChangesUpdateSettings")
        let labelSaveUpdateSettings = document.getElementById("labelSaveUpdateSettings")
        let editAccountIconInput192x192 = document.getElementById("editAccountIconInput192x192")
        let editAccountIconInput512x512 = document.getElementById("editAccountIconInput512x512")

        //variables
        let settings = JSON.parse(localStorage.getItem("cms-edit-settings"))

        //update elements
        if(updateStatusMessage) { updateStatusMessage.innerText = ""; updateStatusMessage.color = "black"; updateStatusMessage.style.display = "none" }
        if(checkboxSaveUpdateSettings) { checkboxSaveUpdateSettings.checked = false; checkboxSaveUpdateSettings.style.display = "inline-block" }
        if(labelSaveUpdateSettings) { labelSaveUpdateSettings.style.display = "inline-block" }
        if(confirmChangesUpdateSettings) { confirmChangesUpdateSettings.style.display = "none" }
        // if(editAccountPasswordOld) { editAccountPasswordOld.value = ""; editAccountPasswordOld.style.backgroundColor = "black" }
        // if(editAccountPasswordNew) { editAccountPasswordNew.value = ""; editAccountPasswordNew.style.backgroundColor = "black" }
        // if(editAccountPasswordNewAgain) { editAccountPasswordNewAgain.value = ""; editAccountPasswordNewAgain.style.backgroundColor = "black" }
        // if(editAccountChangePassword) { editAccountChangePassword.style.display = "none" }

        //credentials
        if(type == "username") 
        { 
            editAccountUsername.value = backendAccountCredentials.value.username
        }
        else if(type == "password") 
        { 
            if(editAccountChangePassword.style.display == "none" || editAccountChangePassword.style.display == "")
            {
                editAccountChangePassword.style.display = "block"
            }
        }
        else if(type == "domain") { editAccountDomain.value = backendAccountCredentials.value.domain }
        else if(type == "name") { editAccountName.value = backendAccountCredentials.value.name }
        else if(type == "country") { editAccountCountry.value = backendAccountCredentials.value.country }
        else if(type == "email") { editAccountEmail.value = backendAccountCredentials.value.email }
        else if(type == "phone") { editAccountPhone.value = backendAccountCredentials.value.phone }


        //icon
        else if(type == "iconImage192x192") { editAccountIconInput192x192.value = value  }
        else if(type == "iconImage512x512") { editAccountIconInput512x512.value = value }

        //colors
        else if(type == "colorNavBackground") { editAccountColorNavBackground.value = value }
        else if(type == "colorNavIcons") { editAccountColorNavIcons.value = value }
        else if(type == "colorNavIconsText") { editAccountColorNavIconsText.value = value }
        else if(type == "colorText") { editAccountColorText.value = value }
        else if(type == "colorSectionBackground") { editAccountColorSectionBackground.value = value }
        else if(type == "colorLoadingScreen") { editAccountColorLoadingScreen.value = value }


        //settings
        else if(type == "navPosition") 
        { 
            if(clicked == "true")
            {
                settings.navPosition = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountNavTop.style.color = "white"; editAccountNavTop.style.opacity = "0.2"
            editAccountNavBottom.style.color = "white"; editAccountNavBottom.style.opacity = "0.2"
            editAccountNavLeft.style.color = "white"; editAccountNavLeft.style.opacity = "0.2"
            editAccountNavRight.style.color = "white"; editAccountNavRight.style.opacity = "0.2"

            if(value == "top") { editAccountNavTop.style.color = "#822c8b"; editAccountNavTop.style.opacity = "1" }
            else if(value == "bottom") { editAccountNavBottom.style.color = "#822c8b"; editAccountNavBottom.style.opacity = "1" }
            else if(value == "left") { editAccountNavLeft.style.color = "#822c8b"; editAccountNavLeft.style.opacity = "1" }
            else if(value == "right") { editAccountNavRight.style.color = "#822c8b"; editAccountNavRight.style.opacity = "1" }
        }

        else if(type == "navIconType") 
        {
            if(clicked == "true")
            {
                settings.navIconType = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountNavSquare.style.color = "white"; editAccountNavSquare.style.opacity = "0.2"
            editAccountNavRounded.style.color = "white"; editAccountNavRounded.style.opacity = "0.2"

            if(value == "square") { editAccountNavSquare.style.color = "#822c8b"; editAccountNavSquare.style.opacity = "1" }
            else if(value == "rounded") { editAccountNavRounded.style.color = "#822c8b"; editAccountNavRounded.style.opacity = "1" }
        }

        else if(type == "navIconSize") 
        {
            if(clicked == "true")
            {
                settings.navIconSize = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountNavSmall.style.color = "white"; editAccountNavSmall.style.opacity = "0.2"
            editAccountNavMedium.style.color = "white"; editAccountNavMedium.style.opacity = "0.2"
            editAccountNavLarge.style.color = "white"; editAccountNavLarge.style.opacity = "0.2"

            if(value == "small") { editAccountNavSmall.style.color = "#822c8b"; editAccountNavSmall.style.opacity = "1" }
            else if(value == "medium") { editAccountNavMedium.style.color = "#822c8b"; editAccountNavMedium.style.opacity = "1" }
            else if(value == "large") { editAccountNavLarge.style.color = "#822c8b"; editAccountNavLarge.style.opacity = "1" }
        }

        else if(type == "textStyle") 
        {
            if(clicked == "true")
            {
                settings.textStyle = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountTextNormal.style.color = "white"; editAccountTextNormal.style.opacity = "0.2"
            editAccountTextBold.style.color = "white"; editAccountTextBold.style.opacity = "0.2"

            if(value == "normal") { editAccountTextNormal.style.color = "#822c8b"; editAccountTextNormal.style.opacity = "1" }
            else if(value == "bold") { editAccountTextBold.style.color = "#822c8b"; editAccountTextBold.style.opacity = "1" }
        }

        // else if(type == "textSize") 
        // {
        //     if(clicked == "true")
        //     {
        //         settings.textSize = value
        //         localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
        //     }

        //     editAccountTextSmall.style.color = "white"; editAccountTextSmall.style.opacity = "0.2"
        //     editAccountTextMedium.style.color = "white"; editAccountTextMedium.style.opacity = "0.2"
        //     editAccountTextLarge.style.color = "white"; editAccountTextLarge.style.opacity = "0.2"

        //     if(value == "small") { editAccountTextSmall.style.color = "#822c8b"; editAccountTextSmall.style.opacity = "1" }
        //     else if(value == "medium") { editAccountTextMedium.style.color = "#822c8b"; editAccountTextMedium.style.opacity = "1" }
        //     else if(value == "large") { editAccountTextLarge.style.color = "#822c8b"; editAccountTextLarge.style.opacity = "1" }
        // }

        else if(type == "siteAccess") 
        {
            if(clicked == "true")
            {
                settings.siteAccess = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountSitePublic.style.color = "white"; editAccountSitePublic.style.opacity = "0.2"
            editAccountSitePrivate.style.color = "white"; editAccountSitePrivate.style.opacity = "0.2"

            if(value == "public") { editAccountSitePublic.style.color = "#822c8b"; editAccountSitePublic.style.opacity = "1" }
            else if(value == "private") { editAccountSitePrivate.style.color = "#822c8b"; editAccountSitePrivate.style.opacity = "1" }
        }

        else if(type == "sitePasswordProtected") 
        {
            if(clicked == "true")
            {
                settings.sitePasswordProtected = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountSitePasswordProtectedYes.style.color = "white"; editAccountSitePasswordProtectedYes.style.opacity = "0.2"
            editAccountSitePasswordProtectedNo.style.color = "white"; editAccountSitePasswordProtectedNo.style.opacity = "0.2"

            if(value == "true") 
            { 
                editAccountSitePasswordProtectedYes.style.color = "#822c8b"
                editAccountSitePasswordProtectedYes.style.opacity = "1"
                editAccountPasswordProtectedPassword.style.display = "block"
                editAccountPasswordProtectedPassword.value = settings.sitePasswordProtectedPassword
                // editAccountPasswordProtectedPasswordConfirm.style.display = "block"
            }
            else if(value == "false") 
            { 
                editAccountSitePasswordProtectedNo.style.color = "#822c8b"
                editAccountSitePasswordProtectedNo.style.opacity = "1" 
                editAccountPasswordProtectedPassword.style.display = "none"
                // editAccountPasswordProtectedPasswordConfirm.style.display = "none"
            }
        }

        else if(type == "pageStart") 
        {
            if(clicked == "true")
            {
                settings.pageStart = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
                settings.pageStartTitle = editAccountStartPageTitle.value
                settings.pageStartText = editAccountStartPageText.value
                settings.pageStartBackgroundImage = editAccountStartPageBackgroundImage.value
            }

            editAccountStartPageYes.style.color = "white"; editAccountStartPageYes.style.opacity = "0.2"
            editAccountStartPageNo.style.color = "white"; editAccountStartPageNo.style.opacity = "0.2"

            if(value == "true") 
            { 
                editAccountStartPageYes.style.color = "#822c8b"
                editAccountStartPageYes.style.opacity = "1"
                editAccountStartPageTitle.style.display = "block"
                editAccountStartPageText.style.display = "block"
                editAccountStartPageBackgroundImage.style.display = "block"
                editAccountStartPageTitle.value = settings.pageStartTitle
                editAccountStartPageText.value = settings.pageStartText
                editAccountStartPageBackgroundImage.value = settings.pageStartBackgroundImage
            }
            else if(value == "false") 
            { 
                editAccountStartPageNo.style.color = "#822c8b"
                editAccountStartPageNo.style.opacity = "1"
                editAccountStartPageTitle.style.display = "none"
                editAccountStartPageText.style.display = "none"
                editAccountStartPageBackgroundImage.style.display = "none"
            }
        }

        else if(type == "pageEnd") 
        {
            if(clicked == "true")
            {
                settings.pageEnd = value
                settings.pageEndTitle = editAccountEndPageTitle.value
                settings.pageEndText = editAccountEndPageText.value
                settings.pageEndBackgroundImage = editAccountEndPageBackgroundImage.value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }
            
            editAccountEndPageYes.style.color = "white"; editAccountEndPageYes.style.opacity = "0.2"
            editAccountEndPageNo.style.color = "white"; editAccountEndPageNo.style.opacity = "0.2"

            if(value == "true") 
            { 
                editAccountEndPageYes.style.color = "#822c8b"
                editAccountEndPageYes.style.opacity = "1"
                editAccountEndPageTitle.style.display = "block"
                editAccountEndPageText.style.display = "block"
                editAccountEndPageBackgroundImage.style.display = "block"
                editAccountEndPageTitle.value = settings.pageEndTitle
                editAccountEndPageText.value = settings.pageEndText
                editAccountEndPageBackgroundImage.value = settings.pageEndBackgroundImage
            }
            else if(value == "false") 
            { 
                editAccountEndPageNo.style.color = "#822c8b"
                editAccountEndPageNo.style.opacity = "1"
                editAccountEndPageTitle.style.display = "none"
                editAccountEndPageText.style.display = "none"
                editAccountEndPageBackgroundImage.style.display = "none"
            }
        }

        // else if(type == "pageIndex") 
        // {
        //     if(clicked == "true")
        //     {
        //         settings.pageIndex = value
        //         localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
        //     }
            
        //     editAccountIndexPageYes.style.color = "white"; editAccountIndexPageYes.style.opacity = "0.2"
        //     editAccountIndexPageNo.style.color = "white"; editAccountIndexPageNo.style.opacity = "0.2"

        //     if(value == "true") { editAccountIndexPageYes.style.color = "#822c8b"; editAccountIndexPageYes.style.opacity = "1" }
        //     else if(value == "false") { editAccountIndexPageNo.style.color = "#822c8b"; editAccountIndexPageNo.style.opacity = "1" }
        // }

        else if(type == "buttonFullscreen") 
        {
            if(clicked == "true")
            {
                settings.buttonFullscreen = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountFullscreenButtonYes.style.color = "white"; editAccountFullscreenButtonYes.style.opacity = "0.2"
            editAccountFullscreenButtonNo.style.color = "white"; editAccountFullscreenButtonNo.style.opacity = "0.2"

            if(value == "true") { editAccountFullscreenButtonYes.style.color = "#822c8b"; editAccountFullscreenButtonYes.style.opacity = "1" }
            else if(value == "false") { editAccountFullscreenButtonNo.style.color = "#822c8b"; editAccountFullscreenButtonNo.style.opacity = "1" }
        }

        else if(type == "buttonSearch") 
        {
            if(clicked == "true")
            {
                settings.buttonSearch = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountSearchButtonYes.style.color = "white"; editAccountSearchButtonYes.style.opacity = "0.2"
            editAccountSearchButtonNo.style.color = "white"; editAccountSearchButtonNo.style.opacity = "0.2"

            if(value == "true") { editAccountSearchButtonYes.style.color = "#822c8b"; editAccountSearchButtonYes.style.opacity = "1" }
            else if(value == "false") { editAccountSearchButtonNo.style.color = "#822c8b"; editAccountSearchButtonNo.style.opacity = "1" }
        }

        else if(type == "buttonContact") 
        {
            if(clicked == "true")
            {
                settings.buttonContact = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountContactButtonYes.style.color = "white"; editAccountContactButtonYes.style.opacity = "0.2"
            editAccountContactButtonNo.style.color = "white"; editAccountContactButtonNo.style.opacity = "0.2"

            if(value == "true") { editAccountContactButtonYes.style.color = "#822c8b"; editAccountContactButtonYes.style.opacity = "1" }
            else if(value == "false") { editAccountContactButtonNo.style.color = "#822c8b"; editAccountContactButtonNo.style.opacity = "1" }
        }

        else if(type == "buttonAbout") 
        {
            if(clicked == "true")
            {
                settings.buttonAbout = value
                settings.buttonAboutText = editAccountAboutText.value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountAboutButtonYes.style.color = "white"; editAccountAboutButtonYes.style.opacity = "0.2"
            editAccountAboutButtonNo.style.color = "white"; editAccountAboutButtonNo.style.opacity = "0.2"

            if(value == "true") 
            { 
                editAccountAboutButtonYes.style.color = "#822c8b"
                editAccountAboutButtonYes.style.opacity = "1"
                editAccountAboutText.style.display = "block"
                editAccountAboutText.value = settings.buttonAboutText
            }
            else if(value == "false") 
            { 
                editAccountAboutButtonNo.style.color = "#822c8b"
                editAccountAboutButtonNo.style.opacity = "1"
                editAccountAboutText.style.display = "none"
            }
        }

        else if(type == "modeSlideshow") 
        {
            if(clicked == "true")
            {
                settings.modeSlideshow = value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountSlideshowModeYes.style.color = "white"; editAccountSlideshowModeYes.style.opacity = "0.2"
            editAccountSlideshowModeNo.style.color = "white"; editAccountSlideshowModeNo.style.opacity = "0.2"

            if(value == "true") { editAccountSlideshowModeYes.style.color = "#822c8b"; editAccountSlideshowModeYes.style.opacity = "1" }
            else if(value == "false") { editAccountSlideshowModeNo.style.color = "#822c8b"; editAccountSlideshowModeNo.style.opacity = "1" }
        }

        else if(type == "sectionBackgroundImage") 
        {
            if(clicked == "true")
            {
                settings.sectionBackgroundImage = value
                settings.sectionBackgroundImageUrl = editAccountSectionBackgroundImageUrl.value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountSectionBackgroundImageYes.style.color = "white"; editAccountSectionBackgroundImageYes.style.opacity = "0.2"
            editAccountSectionBackgroundImageNo.style.color = "white"; editAccountSectionBackgroundImageNo.style.opacity = "0.2"

            if(value == "true") 
            { 
                editAccountSectionBackgroundImageYes.style.color = "#822c8b"
                editAccountSectionBackgroundImageYes.style.opacity = "1"
                editAccountSectionBackgroundImageUrl.style.display = "block"
                editAccountSectionBackgroundImageUrl.value = settings.sectionBackgroundImageUrl
            }
            else if(value == "false") 
            { 
                editAccountSectionBackgroundImageNo.style.color = "#822c8b"
                editAccountSectionBackgroundImageNo.style.opacity = "1"
                editAccountSectionBackgroundImageUrl.style.display = "none"
            }
        }

        else if(type == "loadingScreen") 
        {
            if(clicked == "true")
            {
                settings.loadingScreen = value
                // settings.loadingScreenUrl = editAccountLoadingScreenUrl.value
                localStorage.setItem("cms-edit-settings", JSON.stringify(settings))
            }

            editAccountLoadingScreenYes.style.color = "white"; editAccountLoadingScreenYes.style.opacity = "0.2"
            editAccountLoadingScreenNo.style.color = "white"; editAccountLoadingScreenNo.style.opacity = "0.2"

            if(value == "true") 
            { 
                editAccountLoadingScreenYes.style.color = "#822c8b"
                editAccountLoadingScreenYes.style.opacity = "1"
                // editAccountLoadingScreenUrl.style.display = "block"
                // editAccountLoadingScreenUrl.value = settings.loadingScreenUrl
            }
            else if(value == "false") 
            { 
                editAccountLoadingScreenNo.style.color = "#822c8b"
                editAccountLoadingScreenNo.style.opacity = "1"
                // editAccountLoadingScreenUrl.style.display = "none"
            }
        }
    }


    function sortAccountCredentials(data)
    {
        return toRaw(data)
    }


    async function saveChangesSettings()
    {
        //elements
        let editAccountUsername = document.getElementById("editAccountUsername")
        let editAccountDomain = document.getElementById("editAccountDomain")
        let editAccountEmail = document.getElementById("editAccountEmail")
        let editAccountName = document.getElementById("editAccountName")
        let editAccountPhone = document.getElementById("editAccountPhone")
        let editAccountCountry = document.getElementById("editAccountCountry")
        let editAccountPasswordOld = document.getElementById("editAccountPasswordOld")
        let editAccountPasswordNew = document.getElementById("editAccountPasswordNew")
        let editAccountPasswordNewAgain = document.getElementById("editAccountPasswordNewAgain")
        let editAccountColorNavBackground = document.getElementById("editAccountColorNavBackground")
        let editAccountColorNavIcons = document.getElementById("editAccountColorNavIcons")
        let editAccountColorNavIconsText = document.getElementById("editAccountColorNavIconsText")
        let editAccountColorText = document.getElementById("editAccountColorText")
        let editAccountColorSectionBackground = document.getElementById("editAccountColorSectionBackground")
        let editAccountColorLoadingScreen = document.getElementById("editAccountColorLoadingScreen")
        let updateStatusMessage = document.getElementById("updateStatusMessageUpdateSettings")
        let checkboxSaveUpdateSettings = document.getElementById("checkboxSaveUpdateSettings")
        let labelSaveUpdateSettings = document.getElementById("labelSaveUpdateSettings")
        let editAccountStartPageTitle = document.getElementById("editAccountStartPageTitle")
        let editAccountStartPageText = document.getElementById("editAccountStartPageText")
        let editAccountStartPageBackgroundImage = document.getElementById("editAccountStartPageBackgroundImage")
        let editAccountEndPageTitle = document.getElementById("editAccountEndPageTitle")
        let editAccountEndPageText = document.getElementById("editAccountEndPageText")
        let editAccountEndPageBackgroundImage = document.getElementById("editAccountEndPageBackgroundImage")
        let editAccountPasswordProtectedPassword = document.getElementById("editAccountPasswordProtectedPassword")
        let editAccountAboutText = document.getElementById("editAccountAboutText")
        let editAccountSectionBackgroundImageUrl = document.getElementById("editAccountSectionBackgroundImageUrl")
        let editAccountIconInput192x192 = document.getElementById("editAccountIconInput192x192")
        let editAccountIconInput512x512 = document.getElementById("editAccountIconInput512x512")

        //variables
        let credentials = {
            "usernameNew": '',
            "domain": '',
            "email": editAccountEmail.value,
            "name": editAccountName.value,
            "phone": editAccountPhone.value,
            "country": editAccountCountry.value,
            "passwordNew": '',
            "passwordOld": ''
        }
        let lsSettings = JSON.parse(localStorage.getItem("cms-edit-settings"))
        let lsAccount = localStorage.getItem("cms-account")
        let lsLastLogin = localStorage.getItem("cms-last-login")
        let lsToken = localStorage.getItem("cms-token")
        let userInfo = {"username": lsAccount, "lastLogin": lsLastLogin, "token": lsToken }
        let obj = ""
        let updateUsername = false
        let updateDomain = false
        let updateEmail = false
        let updateName = false
        let updatePhone = false
        let updateCountry = false

        //set settings
        lsSettings.colorNavBackground = editAccountColorNavBackground.value
        lsSettings.colorNavIcons = editAccountColorNavIcons.value
        lsSettings.colorNavIconsText = editAccountColorNavIconsText.value
        lsSettings.colorText = editAccountColorText.value
        lsSettings.colorSectionBackground = editAccountColorSectionBackground.value
        lsSettings.colorLoadingScreen = editAccountColorLoadingScreen.value
        lsSettings.pageStartTitle = editAccountStartPageTitle.value
        lsSettings.pageStartText = editAccountStartPageText.value
        lsSettings.pageStartBackgroundImage = editAccountStartPageBackgroundImage.value
        lsSettings.pageEndTitle = editAccountEndPageTitle.value
        lsSettings.pageEndText = editAccountEndPageText.value
        lsSettings.pageEndBackgroundImage = editAccountEndPageBackgroundImage.value
        lsSettings.buttonAboutText = editAccountAboutText.value
        lsSettings.sectionBackgroundImageUrl = editAccountSectionBackgroundImageUrl.value
        // lsSettings.loadingScreenUrl = editAccountLoadingScreenUrl.value
        lsSettings.sitePasswordProtectedPassword = editAccountPasswordProtectedPassword.value
        lsSettings.iconImage192x192 = editAccountIconInput192x192.value
        lsSettings.iconImage512x512 = editAccountIconInput512x512.value

        //check new username
        if(editAccountUsername.value != "" && editAccountUsername.value != backendAccountCredentials.value.username) 
        { credentials.usernameNew = editAccountUsername.value; updateUsername = true }
        
        //check new domain
        if(editAccountDomain.value != backendAccountCredentials.value.domain) 
        { credentials.domain = editAccountDomain.value; updateDomain = true}
        
        //check new email
        if(editAccountEmail.value != backendAccountCredentials.value.email) 
        { credentials.email = editAccountEmail.value; updateEmail = true}
        
        //check new name
        if(editAccountName.value != backendAccountCredentials.value.name) 
        { credentials.name = editAccountName.value; updateName = true}
        
        //check new phone
        if(editAccountPhone.value != backendAccountCredentials.value.phone) 
        { credentials.phone = editAccountPhone.value; updatePhone = true}
        
        //check new country
        if(editAccountCountry.value != backendAccountCredentials.value.country) 
        { credentials.country = editAccountCountry.value; updateCountry = true}

        //check new password
        if(editAccountPasswordNew.value != editAccountPasswordNewAgain.value)
        {
            updateStatusMessage.innerText = "new passwords does not match"
            updateStatusMessage.style.color = "red"
            updateStatusMessage.style.display = "block"
            editAccountPasswordNew.style.backgroundColor = "red"
            editAccountPasswordNewAgain.style.backgroundColor = "red"

            return
        }
        else if(editAccountPasswordNew != '' && editAccountPasswordNew.value == editAccountPasswordNewAgain.value)
        {
            credentials.passwordNew = editAccountPasswordNew.value
            credentials.passwordOld = editAccountPasswordOld.value
        }

        console.log(credentials)
        console.log(lsSettings)

        //set obj
        obj = {"userInfo": userInfo, "credentials": credentials, "settings": lsSettings}

        //update user settings
        await fetch(BACKEND_API + "/user-update-settings", {method: 'post', body: JSON.stringify(obj)})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            console.log(data)

            //set update successful message
            if(data.status == "update user settings successful") 
            { 
                //set vuex
                store.dispatch('storage/actionSetBackendAccountSettings', lsSettings)

                if(updateStatusMessage) 
                { 
                    //update elements
                    checkboxSaveUpdateSettings.style.display = "none"
                    labelSaveUpdateSettings.style.display = "none"
                    editAccountChangePassword.style.display = "none"
                    updateStatusMessage.style.color = "white"
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.style.marginBottom = "0px"
                    updateStatusMessage.innerText = "Update Successful!"
                    
                    //update credentials
                    if(updateUsername == true) { backendAccountCredentials.value.username = editAccountUsername.value.toLowerCase(); localStorage.setItem("cms-account", editAccountUsername.value.toLowerCase()) }
                    if(updateDomain == true) { backendAccountCredentials.value.domain = editAccountDomain.value.toLowerCase() }
                    if(updateEmail == true) { backendAccountCredentials.value.email = editAccountEmail.value.toLowerCase() }
                    if(updateName == true) { backendAccountCredentials.value.name = editAccountName.value }
                    if(updatePhone == true) { backendAccountCredentials.value.phone = editAccountPhone.value }
                    if(updateCountry == true) { backendAccountCredentials.value.country = editAccountCountry.value }
                }
                setTimeout(() => {undisplayModals()}, 1000) 
            }

            //set update failed messages
            else if(data.status == "update user settings failed: old password is incorrect")
            {
                editAccountPasswordOld.style.backgroundColor = "red"
                updateStatusMessage.style.color = "red"
                updateStatusMessage.style.display = "block"
                updateStatusMessage.innerText = "old password is incorrect"
            }

            else if(data.status == "update user settings failed: username is unavailable")
            {
                editAccountUsername.style.backgroundColor = "red"
                updateStatusMessage.style.color = "red"
                updateStatusMessage.style.display = "block"
                updateStatusMessage.innerText = "username is unavailable"
            }

            else if(data.status == "update user settings failed: domain is unavailable")
            {
                editAccountDomain.style.backgroundColor = "red"
                updateStatusMessage.style.color = "red"
                updateStatusMessage.style.display = "block"
                updateStatusMessage.innerText = "domain is unavailable"
            }

            else 
            { 
                updateStatusMessage.style.display = "block"
                updateStatusMessage.innerText = "Update Failed!"
            }
        })
    }


    function confirmCheckboxUpdateSettings()
    {
        //elements
        let confirmChangesUpdateSettings = document.getElementById("confirmChangesUpdateSettings")
        let buttonSaveUpdateSettings = document.getElementById("buttonSaveUpdateSettings")
        let checkboxSaveUpdateSettings = document.getElementById("checkboxSaveUpdateSettings")

        //show update button
        if(checkboxSaveUpdateSettings.checked == true) 
        { 
            confirmChangesUpdateSettings.style.display = "block"
            buttonSaveUpdateSettings.style.display = "block"
            buttonSaveUpdateSettings.scrollIntoView()
        }

        //hide update button
        else if(checkboxSaveUpdateSettings.checked == false) 
        { 
            confirmChangesUpdateSettings.style.display = "none"
            buttonSaveUpdateSettings.style.display = "none"
        }
    }


    async function dangerAccount(action, type)
    {
        //debugging
        console.log("resetAccount")

        //elements
        let editAccountDangerConfirm = document.getElementById("editAccountDangerConfirm")
        let editAccountDangerDelete = document.getElementById("editAccountDangerDelete")
        let editAccountDangerReset = document.getElementById("editAccountDangerReset")
        let editAccountDangerConfirmText = document.getElementById("editAccountDangerConfirmText")
        let editAccountDangerConfirmResetButton = document.getElementById("editAccountDangerConfirmResetButton")
        let editAccountDangerConfirmDeleteButton = document.getElementById("editAccountDangerConfirmDeleteButton")
        let updateStatusMessage = document.getElementById("editAccountDangerStatusMessage")
        
        //variables
        let lsAccount = localStorage.getItem("cms-account")
        let lsLastLogin = localStorage.getItem("cms-last-login")
        let lsToken = localStorage.getItem("cms-token")
        let userInfo = {"username": lsAccount, "lastLogin": lsLastLogin, "token": lsToken }
        let obj = {"userInfo": userInfo, "password": editAccountDangerConfirmText.value}
        
        //update elements
        editAccountDangerDelete.style.display = "none"
        editAccountDangerReset.style.display = "none"

        //display reset account
        if(action == 'display' && type == 'reset')
        {
            editAccountDangerConfirm.style.display = "block"
            editAccountDangerConfirmDeleteButton.style.display = "none"
            editAccountDangerConfirmResetButton.style.display = "block"
        }

        //display delete account
        else if(action == 'display' && type == 'delete')
        {
            editAccountDangerConfirm.style.display = "block"
            editAccountDangerConfirmDeleteButton.style.display = "block"
            editAccountDangerConfirmResetButton.style.display = "none"
        }

        //reset account
        else if(action == 'account' && type == 'reset') 
        {
            //update user categories
            await fetch(BACKEND_API + "/user-reset", {method: 'post', body: JSON.stringify(obj)})
            .then((response) => { return response.json() })
            .then((data) => {

                //debugging
                // console.log(data)

                //set update successful message
                if(data.status == "update user reset successful") 
                { 
                    //debugging
                    // console.log(backendAccountSettings.value)
                    // console.log(backendAccountCredentials.value)

                    //set vuex
                    store.dispatch('storage/actionSetBackendAccountSettings', backendAccountSettings.value)
                    store.dispatch('storage/actionSetBackendAccountCredentials', backendAccountCredentials.value)

                    updateStatusMessage.style.color = "white"
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.innerText = "Account Reset Succesful!"

                    // setTimeout(() => {undisplayModals()}, 1000) 
                    window.location.reload()
                }

                //set update failed messages
                else if(data.status == "update user reset failed: password is incorrect")
                {
                    updateStatusMessage.style.color = "red"
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.innerText = "password is incorrect"
                }

                else 
                { 
                    updateStatusMessage.style.color = "red"
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.innerText = "Update Failed!"
                }
            })
        }

        //delete account
        else if(action == 'account' && type == 'delete') 
        {
            console.log("password: " + editAccountDangerConfirmText.value)

            //delete user
            await fetch(BACKEND_API + "/user-delete", {method: 'post', body: JSON.stringify(obj)})
            .then((response) => { return response.json() })
            .then((data) => {

                //debugging
                console.log(data)

                //set update successful message
                if(data.status == "delete user successful") 
                { 
                    window.localStorage.clear()
                    router.push("/")
                }

                //set update failed messages
                else if(data.status == "delete user failed: password is incorrect")
                {
                    updateStatusMessage.style.color = "red"
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.innerText = "password is incorrect"
                }

                else 
                { 
                    updateStatusMessage.style.color = "red"
                    updateStatusMessage.style.display = "block"
                    updateStatusMessage.innerText = "Update Failed!"
                }
            })
        }
    }


    function showPasswordInputs()
    {
        //elements
        let editAccountPasswordImgShow = document.getElementById("editAccountPasswordImgShow")
        let editAccountPasswordImgHide = document.getElementById("editAccountPasswordImgHide")
        let editAccountPasswordOld = document.getElementById("editAccountPasswordOld")
        let editAccountPasswordNew = document.getElementById("editAccountPasswordNew")
        let editAccountPasswordNewAgain = document.getElementById("editAccountPasswordNewAgain")

        //update elements
        editAccountPasswordImgShow.style.display = "none"
        editAccountPasswordImgHide.style.display = "inline-block"
        editAccountPasswordOld.type = "text"
        editAccountPasswordNew.type = "text"
        editAccountPasswordNewAgain.type = "text"
    }


    function hidePasswordInputs()
    {
        //elements
        let editAccountPasswordImgShow = document.getElementById("editAccountPasswordImgShow")
        let editAccountPasswordImgHide = document.getElementById("editAccountPasswordImgHide")
        let editAccountPasswordOld = document.getElementById("editAccountPasswordOld")
        let editAccountPasswordNew = document.getElementById("editAccountPasswordNew")
        let editAccountPasswordNewAgain = document.getElementById("editAccountPasswordNewAgain")

        //update elements
        editAccountPasswordImgShow.style.display = "inline-block"
        editAccountPasswordImgHide.style.display = "none"
        editAccountPasswordOld.type = "password"
        editAccountPasswordNew.type = "password"
        editAccountPasswordNewAgain.type = "password"
    }


    function removeForbiddenCharacters(value)
    {
        //format value
        value = value.replaceAll("'","’")  
        value = value.replaceAll("\\", "")
        value = value.replaceAll("/", "")
        
        return value
    }


    function forbiddenCharactersCheck(value)
    {   
        //debugging
        console.log("forbiddenCharactersCheck: " + value)
        
        //variables
        let allowedCharacters = [
            "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
            "0","1","2","3","4","5","6","7","8","9"," "
        ]
        let valueString = value.toString().toLowerCase()
        let totalForbiddenCharacters = value.length

        //count forbidden characters
        for(let item in valueString)
        {
            for(let c in allowedCharacters)
            {
                if(valueString[item] == allowedCharacters[c]) { totalForbiddenCharacters-- ; break }
            }
        }

        //return value
        if(totalForbiddenCharacters == 0) { return false }
        else if(totalForbiddenCharacters != 0) { return true }
    }


    async function logout()
    {   
        //clear all local storage data
        window.localStorage.clear()

        //redirect to start
        router.push("/")
    }


    function checkoutPublicSite(type)
    {   
        //open site in new tab
        if(type == "desktop") { window.open("/" + backendAccountCredentials.value.domain,'_blank') }

        //open site in same tab
        else if(type == "mobile") { window.open("/" + backendAccountCredentials.value.domain, '_self') }
    }


    function generatePwaManifest()
    {
        //variables
        let manifest = ""
        let link = ""

        //set manifest
        manifest = {
            name: 'Backend',
            short_name: 'Backend',
            display: 'standalone',
            theme_color: '#000000',
            background_color: '#000000',
            icons: [
                { src: DEFAULT_DOMAIN + '/images/pwa/pwa-icon-192x192-blue.png', sizes: '192x192', type: 'image/png', purpose: "any" },
                { src: DEFAULT_DOMAIN + '/images/pwa/pwa-icon-512x512-blue.png', sizes: '512x512', type: 'image/png', purpose: "any" },
            ],
            description: '',
            start_url: window.location.href
        };
        
        //create base64 file
        link = document.createElement('link');
        link.rel = 'manifest';
        link.href = `data:application/json;base64,${btoa(JSON.stringify(manifest))}`;
        
        //add file link to html header
        document.head.appendChild(link);
    }


    function editIcon(type)
    {
        //elements
        let editAccountIconInput192x192 = document.getElementById("editAccountIconInput192x192")
        let editAccountIconInput512x512 = document.getElementById("editAccountIconInput512x512")
        let defaultIcons = document.getElementsByClassName("editAccountIcon")
        let icon = document.getElementById("icon" + firstLetterToUpperCase(type))
        
        console.log(icon)

        //update elements
        for(let item in defaultIcons)
        {
            let ele = document.getElementById(defaultIcons[item].id)
            if(ele) { ele.style.opacity = "0.1" }
        }
        icon.style.opacity = "1"
        editAccountIconInput192x192.value = DEFAULT_DOMAIN + "/images/pwa/pwa-icon-192x192-" + type + ".png"
        editAccountIconInput512x512.value = DEFAULT_DOMAIN + "/images/pwa/pwa-icon-512x512-" + type + ".png"
    }

    
    function firstLetterToUpperCase(value)
    {
        return value.toString().substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
    }


    function reloadPage()
    {
        window.location.reload()
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
        backendAccountSettings,
        backendAccountCredentials,

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
        editCategoriesModal,
        editSectionsModal,
        editAccountModal,
        editData,
        editCategory,
        editSection,
        editAccount,
        editIcon,
        sortBackendDataSelected,
        sortBackendCategories,
        sortBackendSections,
        sortAccountCredentials,
        confirmCheckboxes,
        confirmCheckboxUpdateCategories,
        confirmCheckboxUpdateSections,
        confirmCheckboxUpdateSettings,
        saveChangesData,
        saveChangesCategories,
        saveChangesSections,
        saveChangesSettings,
        dangerAccount,
        showPasswordInputs,
        hidePasswordInputs,
        backendAccountLoginInfo,
        imageGalleryUpdateImageDescription,
        logout,
        checkoutPublicSite,
        reloadPage
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
    #editAccountModal::-webkit-scrollbar { height: 0px; width: 0px; }
    #backendDataRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #editCategoriesList::-webkit-scrollbar { height: 0px; width: 0px; }
    #editSectionsList::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalMultilineRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalTimelineRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalLinklistRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalTextlistRows::-webkit-scrollbar { height: 0px; width: 0px; }
    #backendSectionsList::-webkit-scrollbar { height: 0px; width: 0px; }
    #dataObjModalPreviewImages::-webkit-scrollbar { height: 12px; width: 10px; }
    #dataObjModalPreviewImages::-webkit-scrollbar-track { background: black; }
    #dataObjModalPreviewImages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
    

    /*** elements ***/
    input[type='radio'] { accent-color:  #822c8b; }
    input[type='checkbox'] { accent-color:  #822c8b; }


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
        padding: 0px 18px 10vh 16px;
        /* overflow-y: scroll; */
        user-select: none;
        opacity: 1;
        /* border-right: 1px solid rgba(255, 255, 255, 0.6); */
        background-color: black;
    }
    #backendSectionsList { display: block; height: 78vh; overflow-y: scroll; }
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
        /* border: 3px solid #822c8b;  */
        background-color: transparent;
    }
    #confirmChanges { display: none; padding: 60px 0px 0px 0px; }
    #confirmChangesCheckboxUpdateCategories { display: none; padding: 60px 0px 0px 0px; }
    #confirmChangesCheckboxUpdateSections { display: none; padding: 60px 0px 0px 0px; }
    #confirmChangesUpdateSettings { display: none; padding: 60px 0px 0px 0px; }
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
    #buttonSaveUpdateSettings 
    { 
        display: block;
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
    #settingsAccount 
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
    #checkoutPublicSite 
    { 
        position: fixed; 
        display: block; 
        height: 80px; 
        width: 80px; 
        top: 130px; 
        right: 30px;
        opacity: 0.2;
        border-radius: 90%;
        background-color: white;
    }
    #checkoutPublicSite:hover { opacity: 1; }
    #checkoutPublicSite:active { opacity: 1; }
    #mobileCheckoutPublicSite { display: none; }
    #reloadPage 
    { 
        position: fixed; 
        display: block; 
        height: auto; 
        width: auto; 
        bottom: 49px;
        right: 22px;
        font-size: 49px;
        font-weight: normal;
        cursor: default;
        opacity: 0.2;
    }
    #reloadPage:hover { opacity: 1; }
    #reloadPage:active { opacity: 1; }
    #logoutAccount 
    { 
        position: fixed; 
        display: block; 
        height: auto; 
        width: auto; 
        bottom: 4px;
        right: 24px;
        font-size: 42px;
        font-weight: bold;
        opacity: 0.2;
    }
    #logoutAccount:hover { opacity: 1; }
    #logoutAccount:active { opacity: 1; }
    #logoutAccountText { margin: 0px; padding: 0px; cursor: default; }
    #settingsAccount:active { opacity: 1; }
    #settingsAccount:hover { opacity: 1; }
    #dataObjModal 
    { 
        position: fixed; 
        display: block; 
        max-height: 60vh; 
        width: 22vw; 
        left: 37%; 
        top: 11%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
        border: 3px solid #822c8b; 
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
        white-space: nowrap;
        overflow-x: scroll;
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
    #inputImageDescription 
    { 
        display: inline-block; 
        width: 76%;
        margin: 10px 0px 10px 10px;
        padding: 16px; 
        font-size: 20px; 
        font-weight: bold;
        text-align: center;
        color: white;
        border: 0px solid black;
        background-color: black; 
    }
    #buttonEditDescription {  margin-top: 16px; padding-right: 40px; padding-left: 10px; }
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
        width: 22%;
        padding: 10px 20px 10px 20px;
        font-size: 33px;
        font-weight: bold; 
        border: 6px solid black;
        border-right: 0px solid black;
        border-left: 0px solid black;
        color: lightgreen;
        background-color: black;
    }
    #buttonAddGalleryImage { border-bottom: 1px solid black; }
    #inputAddGalleryImage {  }
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
    #labelSaveUpdateSettings { display: inline-block; font-size: 24px; font-weight: bold; margin: 70px 32px 0px 0px; vertical-align: super; }
    #labelDelete { font-size: 24px; font-weight: bold; margin: 0px; vertical-align: super; }
    #updateStatusMessage { display: none; margin: 49px 0px 0px 0px; font-size: 24px; font-weight: bold; }
    #updateStatusMessageUpdateCategories { display: none; margin: 49px 0px 49px 0px; font-size: 24px; font-weight: bold; text-shadow: 0px 1px black; }
    #updateStatusMessageUpdateSections { display: none; margin: 49px 0px 49px 0px; font-size: 24px; font-weight: bold; text-shadow: 0px 1px black; }
    #updateStatusMessageUpdateSettings { display: none; margin: 70px 0px 0px 0px; font-size: 24px; font-weight: bold; text-shadow: 0px 1px black; }
    #confirmCheckbox { display: block; }
    #addDataRowModal 
    { 
        position: fixed; 
        display: none; 
        max-height: 60vh; 
        width: 22vw; 
        left: 37%; 
        top: 11%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        border: 3px solid #822c8b; 
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
    }
    #addDataRowTitle { display: block; margin: -9px 0px 40px 0px; font-size: 26px; font-weight: bold; text-shadow: 0px 1px black; color: white; }
    #addNewTypeTitle { display: block; margin: -9px 0px 40px 0px; font-size: 26px; font-weight: bold; text-shadow: 0px 1px black; color: white; }
    #editCategoryTitle { display: block; margin: -9px 0px 40px 0px; font-size: 26px; font-weight: bold; text-shadow: 0px 1px black; color: white; }
    #editSectionTitle { display: block; margin: -9px 0px 40px 0px; font-size: 26px; font-weight: bold; text-shadow: 0px 1px black; color: white; }
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
        /* border: 3px solid #822c8b; */
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
        opacity: 0.2;
    }
    #settingsSectionsIcon:hover { opacity: 1; }
    #settingsCategoriesIcon:hover { opacity: 1; }
    #editCategoriesModal
    {
        position: fixed; 
        display: none; 
        max-height: 60vh; 
        width: 27vw; 
        left: 32%; 
        top: 11%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        border: 3px solid #822c8b; 
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
    }
    #editSectionsModal
    {
        position: fixed; 
        display: none; 
        max-height: 60vh; 
        width: 27vw; 
        left: 32%; 
        top: 11%; 
        margin: 0px;
        padding: 60px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        border: 3px solid #822c8b; 
        background-color: #1D212E; /* #822c8b */ /* #2c9b2c */
    }
    #editAccountModal
    {
        position: fixed; 
        display: none; 
        max-height: 60vh; 
        width: 27vw; 
        left: 32%; 
        top: 11%; 
        margin: 0px;
        padding: 70px;
        z-index: 2;
        user-select: none;
        overflow-y: scroll;
        opacity: 1;
        /* transform: translate(-40%, -50%); */
        border: 3px solid #822c8b; 
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
    #editAccountNavIconType { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-bottom: 1px solid #ffffff1f; }
    #editAccountNavPosition { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-top: 1px solid #ffffff1f; border-bottom: 1px solid #ffffff1f; }
    #editAccountNavIconSize { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-bottom: 1px solid #ffffff1f; }
    #editAccountTextStyle { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-top: 1px solid #ffffff1f; border-bottom: 1px solid #ffffff1f; }
    /* #editAccountTextSize { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll;border-bottom: 1px solid #ffffff1f; } */
    #editAccountSiteAccess { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-top: 1px solid #ffffff1f; border-bottom: 1px solid #ffffff1f; }
    #editAccountSitePasswordProtected { display: block; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-bottom: 1px solid #ffffff1f; }
    /* #editAccountIndexPage { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-bottom: 1px solid #ffffff1f; } */
    #editAccountFullscreenButton { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-top: 1px solid #ffffff1f; border-bottom: 1px solid #ffffff1f; }
    #editAccountSearchButton { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-bottom: 1px solid #ffffff1f; }
    #editAccountContactButton { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-bottom: 1px solid #ffffff1f; }
    #editAccountSlideshowMode { display: flex; margin: 0px; padding: 20px 0px 20px 14px; overflow-x: scroll; border-top: 1px solid #ffffff1f; border-bottom: 1px solid #ffffff1f; }
    #editAccountAboutButton { display: block; margin: 0px; padding: 20px 0px 20px 14px; border-bottom: 1px solid #ffffff1f; }
    #editAccountStartPage { display: block; margin: 0px; padding: 20px 0px 20px 14px; border-top: 1px solid #ffffff1f; border-bottom: 1px solid #ffffff1f; }
    #editAccountLoadingScreen { display: block; margin: 0px; padding: 20px 0px 20px 14px; border-bottom: 1px solid #ffffff1f; }
    #editAccountSectionBackgroundImage { display: none; margin: 0px; padding: 20px 0px 20px 14px; border-bottom: 1px solid #ffffff1f; }
    #editAcountEndPage { display: block; margin: 0px; padding: 20px 0px 20px 14px; border-bottom: 1px solid #ffffff1f; }
    #editAccountDangerConfirm { display: none; }
    #editAccountPasswordProtectedPassword { display: none; }
    /* #editAccountPasswordProtectedPasswordConfirm { display: none; } */
    #editAccountStartPageTitle { display: none; }
    #editAccountStartPageText { display: none; }
    #editAccountStartPageBackgroundImage { display: none; }
    #editAccountEndPageTitle { display: none; }
    #editAccountEndPageText { display: none; }
    #editAccountEndPageBackgroundImage { display: none; }
    #editAccountAboutText { display: none; }
    #editAccountSectionBackgroundImageUrl { display: none; }
    /* #editAccountLoadingScreenUrl { display: none; } */
    #accountInfoCreatedAt { border-top: 1px solid #ffffff1f; }
    #editAccountTitleCredentials { padding-top: 0px; }
    #editAccountChangePassword { display: none; }
    #editAccountPassword { text-align: left; }
    #editAccountPasswordConfirm { display: none; }
    #editAccountPasswordImgHide { position: absolute; display: none; height: 49px; width: 49px; margin: 3px 0px 0px -60px; }
    #editAccountPasswordImgShow { position: absolute; display: inline-block; height: 49px; width: 49px; margin: 3px 0px 0px -60px; }
    #editAccountPasswordOld { padding-right: 70px; }
    #editAccountPasswordNew { padding-right: 70px; }
    #editAccountPasswordNewAgain { padding-right: 70px; }
    #editAccountNavBackgroundColor { border-top: 1px solid #ffffff1f; }
    #editAccountDangerStatusMessage 
    { 
        display: none; 
        margin: 20px 0px 0px 0px; 
        text-align: center; 
        font-size: 22px; 
        font-weight: bold;
        text-shadow: 0px 1px black;
        color: white; 
    }
    #dataObjModalEditImageDescription { display: flex; }
    #inputCategorySettingsBackgroundImageUrl 
    { 
        display: inline-block;
        width: -webkit-fill-available;
        margin: 1px 0px 0px 0px;
        padding: 20px;
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
    #settingsAccountText { display: none; }
    #editAccountIconDefaultIcons { display: flex; overflow-x: scroll; }


    /*** classes ***/
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
        font-size: 20px; 
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
    .buttonAddGalleryImage 
    {     
        display: inline-block;
        width: auto;
        margin: 21px 30px 0px 30px;
        padding: 0px;
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
    .inputAddGalleryImage 
    { 
        display: inline-block; 
        height: 40px; 
        width: 80%;
        margin: 20px 0px 0px 36px;
        padding: 0px 12px 0px 0px;
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
    .editAccountTitle { display: block; padding: 84px 0px 20px 0px; font-size: 26px; font-weight: bold; text-align: center; text-shadow: 0px 1px black; }
    .editAccountSection { display: block; margin: 0px; text-align: left; border: 0px solid white; background-color: #1D212E; }
    .accountInfoItem 
    { 
        display: flex;
        flex-direction: row; 
        padding: 16px 18px 16px 18px; 
        font-size: 20px; 
        font-weight: bold;
        text-shadow: 0px 1px black;
        overflow-x: scroll;
        border-bottom: 1px solid #ffffff1f; 
        background-color: #1D212E; 
    }
    .editAccountColors 
    { 
        display: flex;
        flex-direction: row; 
        padding: 0px; 
        font-size: 20px; 
        font-weight: bold; 
        border-bottom: 1px solid #ffffff1f; 
        background-color: #1D212E; 
    }
    .editAccountInputText 
    { 
        width: -webkit-fill-available; 
        padding: 14px 18px 14px 18px; 
        font-size: 22px; 
        font-weight: bold; 
        color: white;
        border: 0px solid white;
        border-bottom: 1px solid #ffffff1f;
        background-color: black; 
    }
    .editAccountInputDanger 
    { 
        width: -webkit-fill-available; 
        padding: 14px 18px 14px 18px; 
        font-size: 22px; 
        font-weight: bold; 
        color: #1D212E;
        border: 0px solid white;
        border-bottom: 1px solid #1D212E;
        background-color: #910000; 
    }
    .editAccountText 
    { 
        display: inline-block;
        width: 43%; 
        margin: 16px; 
        font-size: 22px; 
        font-weight: bold;
        text-shadow: 0px 1px black;
        white-space: nowrap;
        overflow-x: scroll;
    }
    .editAccountInputColor 
    { 
        width: 43%; 
        padding: 14px 18px 14px 18px; 
        font-size: 22px; 
        font-weight: bold; 
        color: white;
        border: 0px solid white;
        border-bottom: 1px solid #ffffff1f;
        background-color: black; 
    }
    .editAccountRadioButton { height: 30px; width: 30px; }
    .editAccountToggle { margin: 8px 4px 0px 0px; font-size: 22px; font-weight: bold; white-space: nowrap; color: white; }
    .editAccountToggleButton 
    { 
        margin: 0px 0px 0px 6px;
        padding: 8px; 
        font-size: 22px;
        font-weight: bold;
        opacity: 0.2;
        color: white;
        text-shadow: 0px 1px black;
        white-space: nowrap;
        border: 0px solid white;
        background-color: #1D212E; 
    }
    .editAccountSelectedSetting { color: #822c8b; opacity: 1; }
    .accountInfoTitle { font-size: 22px; white-space: nowrap;}
    .accountInfoText
    {     
        margin: 0px 0px 0px 10px;
        padding: 0px;
        font-size: 24px;
        font-weight: bold;
        opacity: 0.3;
        color: white;
        text-shadow: 0px 1px black;
        text-transform: capitalize;
        white-space: nowrap;
        border: 0px solid white;
        background-color: #1D212E;
    }
    .editAccountIcon { height: 100px; width: 100px; opacity: 0.1; }

    
    /*** mobile ***/
    @media screen and (max-width: 1000px) 
    {   
        #componentBackend { overflow-y: hidden; overflow-x: hidden }
        #backendSections 
        { 
            height: auto; 
            width: 80vw;
            top: 2px;
            bottom: initial;
            left: initial;
            right: initial;
            margin: 0px; 
            padding: 0px 0px 0px 20vw; 
            border-bottom: 2px solid black; 
            background-color: black; /* #1D212E */
        }
        #backendSectionsList { height: auto; display: flex; flex-direction: row; background-color: black; }
        #backendCategories 
        { 
            width: 100vw; 
            top: 11%; 
            left: initial; 
            right: initial; 
            margin: auto; 
            padding: 0px 0px 0px 0px;
            opacity: 0.6;
            /* border-bottom: 4px solid #822c8b;  */
        }
        #backendCategoriesList { width: auto; }
        #backendData { width: 100vw; top: 0px; left: 0px; margin: 0px; padding: 0px; top: 22%; left: initial; }
        
        #addDataRowModal { max-height: initial; height: 76vh; width: 80vw; top: 0%; left: 0%; padding: 40px 10vw 40px 10vw; border: 0px solid white; }
        #dataObjModal 
        { 
            max-height: initial; 
            height: 80vh; 
            width: 80vw; 
            top: 0%; 
            left: 0%; 
            padding: 20px 10vw 40px 10vw; 
            border: 0px solid white;
            border-bottom: 4px solid #822c8b; 
        }
        #editCategoriesModal 
        { 
            max-height: initial; 
            height: 80vh; 
            width: 88vw; 
            top: 0%; left: 0%; 
            padding: 20px 6vw 40px 6vw; 
            border: 0px solid white;
            border-bottom: 4px solid #822c8b;
        }
        #editAccountModal 
        { 
            max-height: initial; 
            height: 80vh; 
            width: 88vw; 
            top: 0%; 
            left: 0%; 
            padding: 20px 6vw 40px 6vw; 
            border: 0px solid white;
            border-bottom: 4px solid #822c8b;
        }
        #editSectionsModal 
        { 
            max-height: 80vh; 
            height: auto; 
            width: 88vw; 
            top: 0%; 
            left: 0%; 
            padding: 20px 6vw 40px 6vw; 
            border: 0px solid white;
            border-bottom: 4px solid #822c8b;
        }
        
        #backendDataRows { max-height: 56vh; }
        
        #editCategoriesList { max-height: 53vh; opacity: 0.6; }
        #editSectionsList { max-height: 53vh; opacity: 0.6; }
        
        #editCategoryTitle { margin: 0px 0px 20px 0px; }
        #editSectionTitle { margin: 0px 0px 20px 0px; }

        #editCategoriesInputs { padding: 12px; overflow-x: scroll; opacity: 0.6; }
        #editSectionsInputs { padding: 12px; overflow-x: scroll; opacity: 0.6; }
        #dataObjModalEditMultiline { padding: 10px; overflow-x: scroll; opacity: 0.6; }
        #dataObjModalEditTextlist { padding: 10px; overflow-x: scroll; opacity: 0.6; }
        #dataObjModalEditTimeline { padding: 10px; overflow-x: scroll; opacity: 0.6; }
        #dataObjModalEditLinklist { padding: 10px; overflow-x: scroll; opacity: 0.6; }
        
        #editAccountNavPosition { padding: 12px 24px 12px 24px; }
        #editAccountNavIconType { padding: 12px 24px 12px 24px; }
        #editAccountNavIconSize { padding: 12px 24px 12px 24px; }
        #editAccountTextStyle { padding: 12px 24px 12px 24px; }
        /* #editAccountTextSize { padding: 12px 24px 12px 24px; } */
        #editAccountSiteAccess { padding: 12px 24px 12px 24px; }
        #editAccountSitePasswordProtected { padding: 12px 24px 12px 24px; }
        #editAccountStartPage { padding: 12px 24px 12px 24px; }
        #editAcountEndPage { padding: 12px 24px 12px 24px; }
        /* #editAccountIndexPage { padding: 12px 24px 12px 24px; } */
        #editAccountFullscreenButton { padding: 12px 24px 12px 24px; }
        #editAccountSearchButton { padding: 12px 24px 12px 24px; }
        #editAccountContactButton { padding: 12px 24px 12px 24px; }
        #editAccountAboutButton { padding: 12px 24px 12px 24px; }
        #editAccountSlideshowMode { padding: 12px 24px 12px 24px; }
        #editAccountSectionBackgroundImage { padding: 12px 24px 12px 24px; }
        #editAccountLoadingScreen { padding: 12px 24px 12px 24px; }
        #editAccountTitleCredentials { padding-bottom: 16px; }
        #settingsAccountText { display: block; }
        #settingsAccount 
        { 
            height: auto; 
            width: 100vw; 
            top: initial; 
            bottom: 0px; 
            left: 0px; 
            right: initial;
            font-weight: bold;
            font-size: 20px;
            opacity: 1;
            color: white;
            border-radius: 0%;
            background-color: black;
        }
        #settingsSectionsIcon 
        { 
            height: 70px; 
            width: auto; 
            top: 0px;
            bottom: initial; 
            left: 0px; 
            right: initial;
            margin: 0px;
            padding: 0px; 
            opacity: 1; 
            background-color: black; 
        }
        #settingsCategoriesIcon 
        { 
            height: 70px; 
            width: auto; 
            top: initial;
            bottom: initial; 
            left: initial; 
            right: initial;
            margin: 0px;
            padding: 0px; 
            opacity: 1; 
            background-color: transparent; 
        }
        #labelSave { font-size: 22px; }
        #labelDelete{ font-size: 22px; }
        #editAccountDangerConfirm { width: 86vw; margin: auto; }
        #confirmCheckbox { margin-top: 40px; }
        #buttonSaveUpdateSections { width: 80vw; }
        #buttonSaveUpdateCategories { width: 80vw; }
        #buttonSaveUpdateSettings { width: 80vw; }
        #editAccountDanger { width: 80vw; margin: auto; }
        #logoutAccount { top: initial; bottom: 4px; left: 18px; right: initial; font-size: 49px; }
        #checkoutPublicSite { display: none; }
        #mobileCheckoutPublicSite 
        {
            position: fixed; 
            display: block; 
            height: 36px; 
            width: 36px;
            top: initial;
            bottom: 14px;
            left: initial;
            right: 14px;
            opacity: 0.4;
            border-radius: 90%;
            background-color: white;
        }
        #reloadPage { display: none; }

        .section { margin: 0px 6px 0px 6px; padding: 20px; background-color: transparent; }
        .category { margin: 0px 10px 0px 10px ; padding: 0px; font-size: 24px; font-weight: normal; }
        .data { padding: 20px 20px 20px 26px; font-size: 20px; font-weight: normal; opacity: 0.6; }
        .editPosDisplay { margin: 6px 12px 0px 12px; }
        .editPosDown { margin: 6px 12px 0px 12px; }
        .editPosUp { margin: 6px 12px 0px 12px; }
        .inputCategorySave { margin: 6px 12px 0px 12px; }
        .editItemDelete { margin: 6px 12px 0px 12px; }
        .editAddRow { margin: 6px 12px 0px 12px; }
        .editAccountColors { display: flex; }
        .editAccountText { width: 40%; white-space: nowrap; overflow-x: scroll; }
        .editAccountInputColor { width: 40%; font-size: 20px; }
        .editAccountInputText { font-size: 20px; padding: 14px 24px 14px 24px; }
        .editAccountText { font-size: 20px; }
        .editAccountToggle { font-size: 20px; }
        .editAccountToggleButton { font-size: 20px; }
        .editAccountTitle { font-size: 24px; padding-bottom: 10px; }
        .dataObjHeader { font-size: 22px; margin-bottom: -49px; }
        .dataObjModalRowTitle { font-size: 22px; }
        .editAccountInputDanger { font-size: 20px; }
        .accountInfoTitle { display: inline-block; width: auto; font-size: 20px; white-space: nowrap; }
        .accountInfoText 
        { 
            display: inline-block; 
            width: -webkit-fill-available; 
            margin: 0px 0px 0px 10px;
            font-size: 20px; 
            white-space: nowrap; 
            overflow-x: scroll; 
        }
        .inputMultilineText { padding: 10px; }
        .dataObjModalRowInput { padding: 3px 10px 3px 10px; }
        .inputMultilineSidebarPos { padding: 20px 10px 10px 20px; }
        .dataObjRow { margin: 80px 0px 0px 0px; }
        .editAddRow { margin-top: 0px; }
        .editItemDelete { margin-top: 3px; }
    }
</style>