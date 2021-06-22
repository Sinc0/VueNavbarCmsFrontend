<template>
  
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

        //vuex
        const store = useStore()

        //router
        let sectionSpecified = useRouter().currentRoute.value.params.sectionId
        let categorySpecified = useRouter().currentRoute.value.params.sectionCategory

        //lifecycle hooks
        onMounted(() => {
            console.log("fetchSections mounted")

            //fetch all data
            fetchSections()
            .then(() => fetchCategories())
            .then(() => fetchData())
        })

        //functions
        async function fetchSections() {
        
        let url = "https://wq5can.deta.dev/sections"
        
        await fetch(url) //(url, {method: 'get'})
        .then((response) => response.json()) //convert response to json object
        .then(jsondata => {
            // console.log(jsondata.sections)

            //vuex
            store.dispatch('storage/actionSetSections', jsondata)
            // console.log(Sections.value.sections)

            //set specified section
            if (sectionSpecified != null)
            {
            var defaultSectionData = null
            //check if section id is specified by number
            // for (var o = 0; o < 10; o++)
            // {
            //   if (sectionSpecified[0] == o)
            //   {
            //     sectionSpecified = parseInt(sectionSpecified)
            //   }
            // }

            //section specified by title
            // if (typeof(sectionSpecified) == "string")
            // {
                // console.log("section specified by title")

                for (var c in jsondata.sections) 
                {
                    if (jsondata.sections[c].title == sectionSpecified)
                    {
                        defaultSectionTitle = jsondata.sections[c].title
                        defaultSectionNumber = jsondata.sections[c].pos
                        defaultSectionData = jsondata.sections[c]
                        // console.log(jsondata.sections[c].pos)
                        // store.dispatch('storage/actionSetSelectedSection', jsondata.sections[c])
                    }
                }
            // }

            //section specified by id
            // if (typeof(sectionSpecified) == "number")
            // {
                // console.log("section specified by id")
                
                for (var c in jsondata.sections) 
                {
                    if (jsondata.sections[c].pos == sectionSpecified)
                    {
                        defaultSectionTitle = jsondata.sections[c].title
                        defaultSectionNumber = jsondata.sections[c].pos
                        defaultSectionData = jsondata.sections[c]
                        // console.log(jsondata.sections[c].pos)
                        // store.dispatch('storage/actionSetSelectedSection', jsondata.sections[c])
                    }
                    }

                    store.dispatch('storage/actionSetSelectedSection', defaultSectionData)
            // }

            }
            //set default section
            else
            {
                for (var c in jsondata.sections)
                {
                    if (jsondata.sections[c].pos == defaultSectionNumber)
                    {
                    defaultSectionTitle = jsondata.sections[c].title
                    defaultSectionNumber = jsondata.sections[c].pos
                    defaultSectionData = jsondata.sections[c]
                    // console.log(jsondata.sections[c].pos)
                    }
                }

                store.dispatch('storage/actionSetSelectedSection', defaultSectionData)
            }

        })
        }

        async function fetchCategories()
        {
        let url = "https://wq5can.deta.dev/categories"
        await fetch(url) //(url, {method: 'get'})
        .then((response) => response.json()) //convert response to json object
        .then(jsondata => {
            // console.log(jsondata.categories)

            //vuex
            store.dispatch('storage/actionSetCategories', jsondata)
            // console.log(Categories.value.categories)

            //set default categories
            var sectionCategories = []
            for (var c in jsondata.categories)
            {
                if (jsondata.categories[c].section == defaultSectionTitle)
                {
                    sectionCategories.push(jsondata.categories[c])
                }
            }
            store.dispatch('storage/actionSetSelectedSectionCategories', sectionCategories)
            
            //set default or specified category
            if (categorySpecified != null)
            {
            
            //check if category is specified by title
            for (var c in sectionCategories)
            {
                if (sectionCategories[c].title == categorySpecified)
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

            // console.log("specifiedCategory: " + defaultCategoryTitle)
            }
            else
            {
                for (var c in sectionCategories)
                {
                    if (sectionCategories[c].pos == "1")
                    {
                        defaultCategoryTitle = sectionCategories[c].title
                    }
                }
        
            // console.log("defaultCategoryTitle: " + defaultCategoryTitle)
            }

        })
        }

        async function fetchData()
        {
        let url = "https://wq5can.deta.dev/data"
        await fetch(url) //(url, {method: 'get'})
        .then((response) => response.json()) //convert response to json object
        .then(jsondata => {
            // console.log(jsondata.data)

            //vuex
            store.dispatch('storage/actionSetData', jsondata)

            //set default selected section data
            var sectionData = []
            for (var c in jsondata.data)
            {
                if(jsondata.data[c].section == defaultSectionTitle)
                {
                    sectionData.push(jsondata.data[c])
                }
            }
            store.dispatch('storage/actionSetSelectedSectionData', sectionData)
            
            //set default selected section category data
            for (var c in sectionData) 
            {
                if (sectionData[c].category == defaultCategoryTitle)
                {
                    if (sectionData[c].title != "index")
                    {
                    var dataInArray = []
                    dataInArray.push(sectionData[c])
                    store.dispatch('storage/actionSetSelectedSectionCategoryData', dataInArray)
                    }
                }        
            
            //update color of category buttons
            // document.getElementById("category-" + sectionCategories[c].pos).style.textDecoration = "underline"
            if (categorySpecified != null)
            {
                for (var c = 1; c <= sectionData.length; c++)
                {
                    var categoryButton = document.getElementById("category-" + c)
                    // console.log(categoryButton)
                    // console.log(defaultCategoryNumber)
                    // console.log(sectionData.length)
                    categoryButton.style.textDecoration = "underline"
                    if (c == defaultCategoryNumber)
                    {
                        categoryButton.style.textDecoration = "underline"
                    }
                    else
                    {
                        categoryButton.style.textDecoration = "none"
                    }
                } 
            }
            
            }

            //update color of section 
            // var sectionButton = document.getElementById("section#" + defaultSectionNumber)
            // sectionButton.style.border = "2px solid black"
            // console.log(sectionButton)
            // console.log("defaultSectionNumber: " + defaultSectionNumber)
            // console.log(sectionData.length)
            
        })
        }

        return {
            
        }
    }
}
</script>

<style>

</style>