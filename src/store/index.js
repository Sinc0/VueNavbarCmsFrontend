import { createStore } from 'vuex'


export default createStore({
  //global
  state: {},
  getters: {},
  mutations: {},
  actions: {},

  //modules
  modules: {
    storage: {
      namespaced: true,
      
      state: 
      {
        sections: null,
        categories: null,
        data: null,
        searchResults: null,
        searchString: null,
        selectedMovie: null,
        selectedSection: null,
        selectedSectionCategories: null,
        selectedSectionData: null,
        selectedSectionCategoryData: null,
        backendSections: null,
        backendCategories: null,
        backendData: null,
        backendCategoriesSelected: null,
        backendDataSelected: null,
        backendDataObjModal: null,

        backendCategoryObjModal: null,
        backendSectionObjModal: null,
      },
      
      getters: 
      {
        selectedMovie(state) { return state.selectedMovie },
        sections(state) { return state.sections },
        selectedSection(state) { return state.selectedSection },
        categories(state) { return state.categories },
        selectedSectionCategories(state) { return state.selectedSectionCategories },
        data(state) { return state.data },
        selectedSectionData(state) { return state.selectedSectionData },
        selectedSectionCategoryData(state) { return state.selectedSectionCategoryData },
        searchResults(state) { return state.searchResults },
        searchString(state) { return state.searchString },
        backendSections(state) { return state.backendSections },
        backendCategories(state) { return state.backendCategories },
        backendData(state) { return state.backendData },
        backendCategoriesSelected(state) { return state.backendCategoriesSelected },
        backendDataSelected(state) { return state.backendDataSelected },
        backendDataObjModal(state) { return state.backendDataObjModal },

        backendCategoryObjModal(state) { return state.backendCategoryObjModal },
        backendSectionObjModal(state) { return state.backendSectionObjModal },
      },

      mutations: 
      {      
        mutationSetSelectedMovie (state, value) { state.selectedMovie = value},
        mutationSetSections (state, value) { state.sections = value },
        mutationSetSelectedSection (state, value) { state.selectedSection = value },
        mutationSetCategories (state, value) { state.categories = value },
        mutationSetSelectedSectionCategories (state, value) { state.selectedSectionCategories = value },
        mutationSetData (state, value) { state.data = value },
        mutationSetSelectedSectionData(state, value) { state.selectedSectionData = value },
        mutationSetSelectedSectionCategoryData(state, value) { state.selectedSectionCategoryData = value },
        mutationSetSearchResults(state, value) { state.searchResults = value },
        mutationSetSearchString(state, value) { state.searchString = value },
        mutationSetBackendSections(state, value) { state.backendSections = value },
        mutationSetBackendCategories(state, value) { state.backendCategories = value },
        mutationSetBackendData(state, value) { state.backendData = value },
        mutationSetBackendCategoriesSelected(state, value) { state.backendCategoriesSelected = value },
        mutationSetBackendDataSelected(state, value) { state.backendDataSelected = value },
        mutationSetBackendDataObjModal(state, value) { state.backendDataObjModal = value },

        mutationSetBackendCategoryObjModal(state, value) { state.backendCategoryObjModal = value },
        mutationSetBackendSectionObjModal(state, value) { state.backendSectionObjModal = value },
      },

      actions: 
      {   
        actionSetSelectedMovie({commit}, value) { commit('mutationSetSelectedMovie', value) },
        actionSetSections({commit}, value) { commit('mutationSetSections', value) },
        actionSetSelectedSection({commit}, value) { commit('mutationSetSelectedSection', value) },
        actionSetCategories({commit}, value) { commit('mutationSetCategories', value) },
        actionSetSelectedSectionCategories({commit}, value) { commit('mutationSetSelectedSectionCategories', value) },
        actionSetData({commit}, value) { commit('mutationSetData', value) },
        actionSetSelectedSectionData({commit}, value) { commit('mutationSetSelectedSectionData', value) },
        actionSetSelectedSectionCategoryData({commit}, value) { commit('mutationSetSelectedSectionCategoryData', value) },
        actionSetSearchResults({commit}, value) { commit('mutationSetSearchResults', value) },
        actionSetSearchString({commit}, value) { commit('mutationSetSearchString', value) },
        actionSetBackendSections({commit}, value) { commit('mutationSetBackendSections', value) },
        actionSetBackendCategories({commit}, value) { commit('mutationSetBackendCategories', value) },
        actionSetBackendData({commit}, value) { commit('mutationSetBackendData', value) },
        actionSetBackendCategoriesSelected({commit}, value) { commit('mutationSetBackendCategoriesSelected', value) },
        actionSetBackendDataSelected({commit}, value) { commit('mutationSetBackendDataSelected', value) },
        actionSetBackendDataObjModal({commit}, value) { commit('mutationSetBackendDataObjModal', value) },

        actionSetBackendCategoryObjModal({commit}, value) { commit('mutationSetBackendCategoryObjModal', value) },
        actionSetBackendSectionObjModal({commit}, value) { commit('mutationSetBackendSectionObjModal', value) },
      }
}}})