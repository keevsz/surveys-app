<script setup lang="ts">
    import Item from '../components/Item.vue'
    import Loading from '../../../components/Loading.vue'
    import { useSurvey } from '../composables/useSurvey'
    import { onMounted, ref, Ref } from 'vue'
    import { Survey1 } from '../interfaces/survey'
    import { useUser } from '../../user/composables/useUser'
    
    const { getSurveysByUser } = useSurvey()
    
    const mySurveys : Ref<Array<Survey1>> = ref([])

    const deleteItem = ( id:string ) => {
        mySurveys.value = mySurveys.value.filter((item : any) => item.id !== id)
    }

    onMounted(async() => {
        const { userCurrent } = useUser()
        await userCurrent()
        const { data } : any = await getSurveysByUser()
        mySurveys.value = data
    })
    
</script>

<template>
    <div class="col-span-12">

        <h1 class="mb-2 font-extrabold text-xl">
            Mis encuestas
        </h1>

        <div v-if="mySurveys.length <= 0"
            class="custom-height flex items-center">
            <Loading  />
        </div>

        <Item v-else 
            v-for="item in mySurveys"
            :data="item" @delete-question="deleteItem" />
    </div>
</template>

<style scoped>
.custom-height {
    height: calc(100vh - 64px);
}
</style>