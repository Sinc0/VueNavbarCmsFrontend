<template>
  <div id="viewBackend">
    <componentBackend />
  </div>
</template>


<script>
import {onMounted, onUpdated} from 'vue'
import componentBackend from '@/components/componentBackend'

export default {
  name: 'Home',

  components: {
    componentBackend,
  },

  setup() {
    //lifecycle hooks
    onMounted(() => { console.log("viewBackend mounted")})
    onUpdated(() => { console.log("viewBackend updated")})

    return { 
        
    }
  }
}
</script>


<style scoped>

</style>