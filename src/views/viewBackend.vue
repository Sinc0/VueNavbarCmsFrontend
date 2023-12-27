<template>
  <div id="viewBackend">
    <componentBackend />
  </div>
</template>


<script>
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import componentBackend from '@/components/componentBackend'

export default {
  name: 'Home',

  components: {
    componentBackend,
  },

  setup() {
    //vuex
    const store = useStore()

    //variables
    // const Sections = computed(() => { return store.getters['storage/sections']})
    // const Categories = computed(() => { return store.getters['storage/categories']})
    // const Data = computed(() => { return store.getters['storage/data']})


    //lifecycle hooks
    onMounted(() => {
        console.log("viewBackend mounted")
    })


    //functions
    

    return { 
        
    }

  }
}
</script>


<style scoped>

</style>