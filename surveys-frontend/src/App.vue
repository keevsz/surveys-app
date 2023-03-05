<script lang="ts" setup>
  import { useSurveyStore } from './store/survey'

  const survey = useSurveyStore()

  document.onkeydown = (e) => {
    if (e.key === 'Escape') {
      if (survey.toggle) {
        survey.setToggleInit()
      }
    }
  }
  
  // document.addEventListener('click', () => {
  //   console.log('click');
  //   // survey.setToggle()
    
  // })
</script>

<template>
  <div class="select-none">
    <router-view />
  </div>
</template>