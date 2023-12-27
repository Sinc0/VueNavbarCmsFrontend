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
      }
}}})