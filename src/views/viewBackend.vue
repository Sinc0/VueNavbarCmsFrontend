<template>
  <div id="viewBackend">
    <ComponentBackend />
  </div>
</template>


<script>
import {onMounted, onUpdated} from 'vue'
import ComponentBackend from '@/components/componentBackend'

export default {
  name: 'Home',

  components: {
    ComponentBackend,
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