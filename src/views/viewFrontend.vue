<template>
  <div id="viewFrontend">
    <ComponentFrontend />
  </div>
</template>


<script>
import {onMounted, onUpdated} from 'vue'
import ComponentFrontend from '@/components/componentFrontend.vue'

export default {
  name: 'Home',

  components: {
    ComponentFrontend
  },

  setup() {
    //lifecycle hooks
    // onMounted(() => { console.log("viewFrontend mounted") })
    // onUpdated(() => { console.log("viewFrontend updated") })

    return {

    }
  }
}
</script>


<style scoped>

</style>