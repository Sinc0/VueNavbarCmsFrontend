<template>
    <div id="componentBackend">
        <div id="account">
        </div>

        <div id="backendSections">
            <div class="section" v-for="section in backendSections">({{section.pos}}) · {{section.title}}</div>
        </div>

        <div id="backendCategories">
            <div class="category" v-for="category in backendCategories"><span class="dot">·</span>({{category.pos}}) {{category.title}}</div>
        </div>

        <div id="backendData">
        </div>

        <div id="confirmChanges">
            <button id="buttonSave">Save</button>
            <button id="buttonDiscard">Discard</button>
        </div>
    </div>
</template>


<script>
import {useStore} from 'vuex'
import {computed, onMounted, onUpdated, resolveDirective} from 'vue'
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
            

    //lifecycle hooks
    onMounted(() => { 
        console.log("componentBackend mounted")

        fetchSpecificUser()
    })

    onUpdated(() => { console.log("componentBackend updated") })

    
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
            }

            //fetch user failed
            else if(data.status == "fetch specific user failed") 
            { 
                //redirect
                // router.push("/")
            }

        })
    }


    return {
        //variables
        backendSections,
        backendCategories,
        backendData,

        //functions
        fetchSpecificUser
    }
  }
}
</script>


<style scoped>
    #componentBackend { height: 100vh; width: 100vw; margin: auto; padding: 0px; color: white; background-color: black; }
    #backendSections 
    { 
        position: fixed; 
        display: block; 
        left: 20%; 
        top: 4%; 
        width: 13vw; 
        max-height: 88vh; 
        margin: 0px 0px 20px 0px;
        overflow-y: scroll;
        user-select: none;
        border: 2px solid white;
        background-color: #2c9b2c;
    }
    #backendCategories 
    { 
        position: fixed; 
        display: flex; 
        left: 34%; 
        top: 4%; 
        width: 40vw; 
        margin: 0px 0px 20px 0px;
        overflow-x: scroll;
        user-select: none;
        border: 2px solid white; 
    }
    #backendData 
    { 
        position: fixed; 
        display: block; 
        margin: 0px 0px 20px 0px; 
        height: 83vh; 
        width: 40vw; 
        left: 34%; 
        top: 10%;
        overflow-y: scroll;
        user-select: none;
        border: 2px solid white; 
    }
    #confirmChanges { position: fixed; display: block; bottom: 40px; right: 40px; }
    #buttonSave 
    { 
        padding: 10px 20px 10px 20px; 
        font-size: 20px; 
        font-weight: bold; 
        user-select: none;
        border-radius: 0%;
        border: 1px solid black; 
        background-color: lightgreen; 
    }
    #buttonDiscard 
    { 
        padding: 10px 20px 10px 20px; 
        font-size: 20px;
        font-weight: bold;
        user-select: none;
        border-radius: 0%; 
        border: 1px solid black; 
        background-color: red; 
    }
    #account { position: fixed; display: block; height: 80px; width: 80px; top: 0px; right: 0px; background-color: white; }

    .section { padding: 10px; font-size: 20px; font-weight: normal; text-align: left; user-select: none; border-bottom: 2px solid white; }
    .category { padding: 10px 0px 10px 0px; text-wrap: nowrap; font-size: 20px; font-weight: normal; }
    .dot { display: inline-block; padding: 0px 10px 0px 10px; }
</style>