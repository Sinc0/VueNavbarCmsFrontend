<template>
  <div id="viewStart">
    <ComponentStart />
  </div>
</template>


<script>
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import ComponentStart from '@/components/componentStart.vue'

export default {
  name: 'Home',

  components: {
    ComponentStart,
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
        console.log("viewStart mounted")
    })


    //functions
    

    return { 
        
    }

  }
}
</script>


<style scoped>
  
</style>