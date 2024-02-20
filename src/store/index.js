import { createStore } from 'vuex'


export default createStore({
  modules: { storage: { namespaced: true,
      
      state: 
      {
        //standalone
        sections: null,
        categories: null,
        data: null,
        // searchResults: null,
        // searchString: null,

        //selected
        selectedSection: null,
        selectedSectionCategories: null,
        selectedSectionData: null,
        selectedSectionCategoryData: null,

        //backend
        backendSections: null,
        backendCategories: null,
        backendData: null,
        backendCategoriesSelected: null,
        backendDataSelected: null,
        backendDataObjModal: null,
        backendCategoryObjModal: null,
        backendSectionObjModal: null,
        backendAccountSettings: null,
        backendAccountCredentials: null,
        backendAccountLoginInfo: null,

        //frontend
        frontendSections: null,
        frontendCategories: null,
        frontendData: null,
        frontendCategoriesSelected: null,
        frontendDataSelected: null,
        frontendSettings: null,
        frontendContact: null,
      },
      
      getters: 
      {
        sections(state) { return state.sections },
        selectedSection(state) { return state.selectedSection },
        categories(state) { return state.categories },
        selectedSectionCategories(state) { return state.selectedSectionCategories },
        data(state) { return state.data },
        selectedSectionData(state) { return state.selectedSectionData },
        selectedSectionCategoryData(state) { return state.selectedSectionCategoryData },
        // searchResults(state) { return state.searchResults },
        // searchString(state) { return state.searchString },
        
        backendSections(state) { return state.backendSections },
        backendCategories(state) { return state.backendCategories },
        backendData(state) { return state.backendData },
        backendCategoriesSelected(state) { return state.backendCategoriesSelected },
        backendDataSelected(state) { return state.backendDataSelected },
        backendDataObjModal(state) { return state.backendDataObjModal },
        backendCategoryObjModal(state) { return state.backendCategoryObjModal },
        backendSectionObjModal(state) { return state.backendSectionObjModal },
        backendAccountSettings(state) { return state.backendAccountSettings },
        backendAccountCredentials(state) { return state.backendAccountCredentials },
        backendAccountLoginInfo(state) { return state.backendAccountLoginInfo },

        frontendSections(state) { return state.frontendSections },
        frontendCategories(state) { return state.frontendCategories },
        frontendData(state) { return state.frontendData },
        frontendCategoriesSelected(state) { return state.frontendCategoriesSelected },
        frontendDataSelected(state) { return state.frontendDataSelected },
        frontendSettings(state) { return state.frontendSettings },
        frontendContact(state) { return state.frontendContact },
      },

      mutations: 
      {      
        mutationSetSections (state, value) { state.sections = value },
        mutationSetSelectedSection (state, value) { state.selectedSection = value },
        mutationSetCategories (state, value) { state.categories = value },
        mutationSetSelectedSectionCategories (state, value) { state.selectedSectionCategories = value },
        mutationSetData (state, value) { state.data = value },
        mutationSetSelectedSectionData(state, value) { state.selectedSectionData = value },
        mutationSetSelectedSectionCategoryData(state, value) { state.selectedSectionCategoryData = value },
        // mutationSetSearchResults(state, value) { state.searchResults = value },
        // mutationSetSearchString(state, value) { state.searchString = value },
        
        mutationSetBackendSections(state, value) { state.backendSections = value },
        mutationSetBackendCategories(state, value) { state.backendCategories = value },
        mutationSetBackendData(state, value) { state.backendData = value },
        mutationSetBackendCategoriesSelected(state, value) { state.backendCategoriesSelected = value },
        mutationSetBackendDataSelected(state, value) { state.backendDataSelected = value },
        mutationSetBackendDataObjModal(state, value) { state.backendDataObjModal = value },
        mutationSetBackendCategoryObjModal(state, value) { state.backendCategoryObjModal = value },
        mutationSetBackendSectionObjModal(state, value) { state.backendSectionObjModal = value },
        mutationSetBackendAccountSettings(state, value) { state.backendAccountSettings = value },
        mutationSetBackendAccountCredentials(state, value) { state.backendAccountCredentials = value },
        mutationSetBackendAccountLoginInfo(state, value) { state.backendAccountLoginInfo = value },

        mutationSetFrontendSections(state, value) { state.frontendSections = value },
        mutationSetFrontendCategories(state, value) { state.frontendCategories = value },
        mutationSetFrontendData(state, value) { state.frontendData = value },
        mutationSetFrontendCategoriesSelected(state, value) { state.frontendCategoriesSelected = value },
        mutationSetFrontendDataSelected(state, value) { state.frontendDataSelected = value },
        mutationSetFrontendSettings(state, value) { state.frontendSettings = value },
        mutationSetFrontendContact(state, value) { state.frontendContact = value },
      },

      actions: 
      {   
        actionSetSections({commit}, value) { commit('mutationSetSections', value) },
        actionSetSelectedSection({commit}, value) { commit('mutationSetSelectedSection', value) },
        actionSetCategories({commit}, value) { commit('mutationSetCategories', value) },
        actionSetSelectedSectionCategories({commit}, value) { commit('mutationSetSelectedSectionCategories', value) },
        actionSetData({commit}, value) { commit('mutationSetData', value) },
        actionSetSelectedSectionData({commit}, value) { commit('mutationSetSelectedSectionData', value) },
        actionSetSelectedSectionCategoryData({commit}, value) { commit('mutationSetSelectedSectionCategoryData', value) },
        // actionSetSearchResults({commit}, value) { commit('mutationSetSearchResults', value) },
        // actionSetSearchString({commit}, value) { commit('mutationSetSearchString', value) },
       
        actionSetBackendSections({commit}, value) { commit('mutationSetBackendSections', value) },
        actionSetBackendCategories({commit}, value) { commit('mutationSetBackendCategories', value) },
        actionSetBackendData({commit}, value) { commit('mutationSetBackendData', value) },
        actionSetBackendCategoriesSelected({commit}, value) { commit('mutationSetBackendCategoriesSelected', value) },
        actionSetBackendDataSelected({commit}, value) { commit('mutationSetBackendDataSelected', value) },
        actionSetBackendDataObjModal({commit}, value) { commit('mutationSetBackendDataObjModal', value) },
        actionSetBackendCategoryObjModal({commit}, value) { commit('mutationSetBackendCategoryObjModal', value) },
        actionSetBackendSectionObjModal({commit}, value) { commit('mutationSetBackendSectionObjModal', value) },
        actionSetBackendAccountSettings({commit}, value) { commit('mutationSetBackendAccountSettings', value) },
        actionSetBackendAccountCredentials({commit}, value) { commit('mutationSetBackendAccountCredentials', value) },
        actionSetBackendAccountLoginInfo({commit}, value) { commit('mutationSetBackendAccountLoginInfo', value) },
        
        actionSetFrontendSections({commit}, value) { commit('mutationSetFrontendSections', value) },
        actionSetFrontendCategories({commit}, value) { commit('mutationSetFrontendCategories', value) },
        actionSetFrontendData({commit}, value) { commit('mutationSetFrontendData', value) },
        actionSetFrontendCategoriesSelected({commit}, value) { commit('mutationSetFrontendCategoriesSelected', value) },
        actionSetFrontendDataSelected({commit}, value) { commit('mutationSetFrontendDataSelected', value) },
        actionSetFrontendSettings({commit}, value) { commit('mutationSetFrontendSettings', value) },
        actionSetFrontendContact({commit}, value) { commit('mutationSetFrontendContact', value) },
      }
}}})