<template>
    <!-- empty -->
</template>


<script>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router' //instead of this.$route
import {onMounted} from 'vue'

export default {
    setup() {
      //variables
      var defaultSectionTitle = "defaultSectionTitle"
      var defaultSectionNumber = 0 //0 = index
      var defaultCategoryTitle = "defaultCategoryTitle"
      var defaultCategoryNumber = 0
      var baseUrl = "https://cmsrestapi2-1-e6070696.deta.app" //https://wq5can.deta.dev

      //vuex
      const store = useStore()

      //router
      let sectionSpecified = useRouter().currentRoute.value.params.sectionId
      let categorySpecified = useRouter().currentRoute.value.params.sectionCategory

      //lifecycle hooks
      onMounted(() => {
        console.log("fetchData mounted")

        //fetch all data
        fetchSections()
        .then(() => fetchCategories())
        .then(() => fetchData())
      })

    //functions
    async function fetchSections() 
    {
        //variables
        let url = baseUrl + "/sections"
        
        await fetch(url) //(url, {method: 'get'})
        .then((response) => response.json()) //convert response to json object
        // .then(jsondata => { console.log(jsondata) })
        .then(jsondata => {
            //debugging
            console.log(jsondata.sections)
            console.log(jsondata.sections[0])
            console.log("sectionSpecified: " + sectionSpecified)

            //vuex
            store.dispatch('storage/actionSetSections', jsondata)
            // store.dispatch('storage/actionSetSelectedSection', jsondata.sections[0])

            //set specified section
            if (sectionSpecified != null)
            {
                //variables
                var defaultSectionData = jsondata.sections[0]

                for (var c in jsondata.sections) 
                {
                    if (jsondata.sections[c].title == sectionSpecified)
                    {
                        defaultSectionTitle = jsondata.sections[c].title
                        defaultSectionNumber = jsondata.sections[c].pos
                        defaultSectionData = jsondata.sections[c]
                    }
                }
                
                for (var c in jsondata.sections) 
                {
                    if (jsondata.sections[c].pos == sectionSpecified)
                    {
                        defaultSectionTitle = jsondata.sections[c].title
                        defaultSectionNumber = jsondata.sections[c].pos
                        defaultSectionData = jsondata.sections[c]
                    }
                }

                //vuex
                store.dispatch('storage/actionSetSelectedSection', defaultSectionData)
            }
            //set default section
            else
            {
                // for (var c in jsondata.sections)
                // {
                //     if (jsondata.sections[c].pos == defaultSectionNumber)
                //     {
                //         defaultSectionTitle = jsondata.sections[c].title
                //         defaultSectionNumber = jsondata.sections[c].pos
                //         defaultSectionData = jsondata.sections[c]
                //     }
                // }

                //vuex
                store.dispatch('storage/actionSetSelectedSection', jsondata.sections[0])
            }

        })
    }


    async function fetchCategories()
    {
        //variables
        let url = baseUrl + "/categories"

        await fetch(url) //(url, {method: 'get'})
        .then((response) => response.json()) //convert response to json object
        .then(jsondata => {
            //debugging
            // console.log(jsondata.categories)
            // console.log(Categories.value.categories)
            
            //variables
            var sectionCategories = []

            //vuex
            store.dispatch('storage/actionSetCategories', jsondata)

            //set default categories
            for (var c in jsondata.categories)
            {
                if (jsondata.categories[c].section == defaultSectionTitle)
                {
                    sectionCategories.push(jsondata.categories[c])
                }
            }

            //vuex
            store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
            
            //set specified category
            if (categorySpecified != null)
            {
                //check if category is specified by title
                for (var c in sectionCategories)
                {
                    if (sectionCategories[c].title.toLowerCase() == categorySpecified)
                    {
                        defaultCategoryTitle = sectionCategories[c].title
                        defaultCategoryNumber = sectionCategories[c].pos
                    }
                }

                //check if category is specified by id
                for (var c in sectionCategories)
                {
                    if (sectionCategories[c].pos == categorySpecified)
                    {
                        defaultCategoryTitle = sectionCategories[c].title
                        defaultCategoryNumber = sectionCategories[c].pos
                    }
                }

            }
            //set default category
            else
            {
                for (var c in sectionCategories)
                {
                    if (sectionCategories[c].pos == "1")
                    {
                        defaultCategoryTitle = sectionCategories[c].title
                    }
                }
        
            }

        })
    }


    async function fetchData()
    {   
        //variables
        let url = baseUrl + "/data"
        
        await fetch(url) //(url, {method: 'get'})
        .then((response) => response.json()) //convert response to json object
        .then(jsondata => {
            //debugging
            console.log(jsondata.data)

            //vuex
            store.dispatch('storage/actionSetData', jsondata)
            
            //variables
            var sectionData = []
            
            //set default selected section data
            for (var c in jsondata.data)
            {
                if(jsondata.data[c].section == defaultSectionTitle)
                {
                    sectionData.push(jsondata.data[c])
                }
            }

            //vuex
            store.dispatch('storage/actionSetSelectedSectionData', sectionData)
            
            //set default selected section category data
            for (var c in sectionData) 
            {
                if (sectionData[c].category == defaultCategoryTitle)
                {
                    if (sectionData[c].title != "index" && sectionData[c].title != "search")
                    {
                        var dataInArray = []
                        dataInArray.push(sectionData[c])
                        store.dispatch('storage/actionSetSelectedSectionCategoryData', dataInArray)
                    }
                }

            }
        
        })
    }


    return {
        /* empty */
    }
  }
}
</script>


<style>
    /* empty */
</style>