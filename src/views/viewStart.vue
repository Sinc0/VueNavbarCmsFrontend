<template>
  <div id="viewStart">
    <ComponentStart />
  </div>
</template>


<script>
import {onMounted, onUpdated} from 'vue'
import ComponentStart from '@/components/componentStart.vue'


export default {
  name: 'Home',

  components: {
    ComponentStart,
  },

  setup() {
    //lifecycle hooks
    onMounted(() => { console.log("viewStart mounted") })
    onUpdated(() => { console.log("viewStart updated") })

    return { 
        
    }
  }
}
</script>


<style scoped>
  
</style>