<template>
    <ComponentFrontend />
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
    onMounted(() => { console.log("viewMain mounted") })
    onUpdated(() => { console.log("viewMain updated") })

    return {

    }
  }
}
</script>


<style scoped>

</style>