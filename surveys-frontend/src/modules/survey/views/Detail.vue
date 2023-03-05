<script setup lang="ts">
    import { useSurvey } from '../composables/useSurvey'
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import { Survey1 } from '../interfaces/survey'

    const route = useRoute()
    const router = useRouter()

    const survey = ref<Survey1>()

    const back = () => {
        router.push({ name: route.query.history as string })
    }

    onMounted(async() => {
        const { getOneSurvey } = useSurvey()
        const { data } : any = await getOneSurvey(route.params.id as string)
        survey.value = data
    })
</script>

<template>
    <div class="col-span-12">
        <div class="h-10 flex items-center">
            <div class="text-lg text-cf-2 duration-300 hover:cursor-pointer hover:pr-4"
                @click="back">
                <font-awesome-icon icon="fa-solid fa-arrow-right" 
                    class="rotate-180" />
            </div>
            <h1 class="text-2xl font-bold ml-1">{{ survey?.title }}</h1>
        </div>

        <h2 class="font-semibold mt-2 mb-4 text-lg">Preguntas</h2>

        <div v-for="(item, index) in survey?.questions" :key="index"
            class="mt-2 p-3 bg-gray-100 rounded-md">
            <div class="mb-2">
                <div class="mb-1">
                    <span class="font-semibold">P{{ index + 1 }}</span>
                    <span class="ml-2">{{ item.item }}</span>
                </div>
                <div class="flex justify-between px-1">
                    <span class="font-semibold">Alternativas</span>
                    <span class="font-semibold">Respuestas</span>
                </div>
            </div>
            <div v-for="(alternative, index) in item.alternatives" :key="index"
                class="mb-2 px-2">
                <div class="flex justify-between">
                    <div>
                        <span class="mr-2 font-semibold">{{ index + 1 }}.</span>
                        <span>{{ alternative.description }}</span>
                    </div>
                    <span class="block">{{ alternative.answers?.length }}</span>
                </div>
            </div>
        </div>
    </div>
</template>