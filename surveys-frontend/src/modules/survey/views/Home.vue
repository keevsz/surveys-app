<script setup lang="ts">
    import { onMounted, ref, Ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import Loading from '../../../components/Loading.vue'
    import { useSurvey } from '../composables/useSurvey'
    import { Survey1 } from '../interfaces/survey'

    const surveys : Ref<Array<Survey1>> = ref([])
    const offset : Ref<number> = ref(0)
    const count : Ref<number> = ref(0)
    const disabled : Ref<boolean> = ref(false)
    
    const route = useRoute()
    const router = useRouter()

    const allsurvey = async () => {
        const { allSurvey } = useSurvey()
        const { data } : any  = await allSurvey(offset.value)
        count.value = Object.keys(data).length
        surveys.value = data
    }

    const format = ( name: string, lastname: string ) => {
        const fullname = name + ' ' + lastname
        return fullname.length > 18 ? name : fullname
    }

    const answer = ( id : string ) => {
        router.push({ name: 'survey-answer', params: { id }, query: { history: route.name as string } })
    }

    const previous = () => {
        offset.value -= 10
    }

    const next = () => {
        offset.value += 10
    }

    watch(offset, () => {
        offset.value === 0 ? disabled.value = true : disabled.value = false
        allsurvey()
    })

    onMounted(async() => {
        allsurvey()
        disabled.value = true
    })

</script>

<template>
    <div class="col-span-12 mb-2">
        <h1 class="font-bold text-2xl mb-3">Encuestas</h1>
        <div class="grid gap-2 grid-cols-1 md:grid-cols-2">
            <div class="w-full col-span-1 sm:col-span-2 flex justify-between">
                <button @click="previous"
                    :disabled="disabled || surveys.length <= 0"
                    :class="[ disabled ? 'bg-cf-2/40 cursor-not-allowed' : 'bg-cf-2/60 text-gray-700 hover:text-gray-600 hover:bg-cf-2/70 hover:cursor-pointer' ]"
                    class="w-10 h-10 rounded-full flex items-center justify-center duration-150">
                    <font-awesome-icon icon="fa-solid fa-angle-left" />
                </button>
                <button @click="next"
                    :disabled="count < 10 || surveys.length <= 0"
                    :class="[ count < 10 || surveys.length <= 0 ? 'bg-cf-2/40 cursor-not-allowed' : 'bg-cf-2/60 text-gray-700 hover:text-gray-600 hover:bg-cf-2/70 hover:cursor-pointer' ]"
                    class="w-10 h-10 rounded-full flex items-center justify-center duration-150">
                    <font-awesome-icon icon="fa-solid fa-angle-right" />
                </button>
            </div>
            <div v-if="surveys.length > 0"
                v-for="(survey, index) in surveys" :key="index"
                class="border h-min rounded-md bg-gray-100 p-3 duration-200 ease-in
                    hover:bg-gray-50 hover:text-black/70">
                <h2 class="font-semibold">
                    {{ survey.title }}
                </h2>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-sm">
                        {{ format(survey.user?.name!, survey.user?.lastname!) }}
                    </span>
                    <span class="text-sm border border-cf-2 py-1 px-2 rounded-md duration-200
                        hover:bg-cf-2/50 hover:border-cf-2/25 hover:cursor-pointer"
                        @click="answer(survey.id!)">
                        Responder
                        <font-awesome-icon icon="fa-solid fa-arrow-right" />
                    </span>
                </div>
            </div>

            <Loading v-else class="col-span-2 pt-10 mt-16" />
        </div>

    </div>
</template>