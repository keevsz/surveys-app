<script lang="ts" setup>
  import { onBeforeMount, onMounted } from 'vue';
  import IndexAuth from './modules/auth/layouts/Index.vue'
  import IndexMain from './modules/survey/layouts/Index.vue'

  import { useAuthStore } from './store/auth'
  import { useAuth } from './modules/auth/composables/useAuth'

  // const auth = useAuthStore()

  // const { initAuth } = useAuth()

  // onBeforeMount(async() => {
  //   await initAuth()
  // })

    // onMounted(async() => {
    //   await initAuth()
    //   console.log(auth.cookie);
      
    // })

</script>

<template>
  <div>
    <router-view />
    <!-- <IndexAuth v-if="!auth.cookie" />

    <IndexMain v-else /> -->
  </div>
</template>