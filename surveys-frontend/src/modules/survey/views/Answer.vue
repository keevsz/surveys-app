<script setup lang="ts">
    import { useSurvey } from '../composables/useSurvey'
    import { onMounted, ref, Ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import { Survey1 } from '../interfaces/survey'
    import Swal from 'sweetalert2'
    import { createAnswerAdapter } from '../adapter/index'

    const route = useRoute()
    const router = useRouter()

    const survey = ref<Survey1>()
    const res : Ref<Record<string, string>> = ref({})

    const back = () => {
        router.push({ name: route.query.history as string })
    }

    const saveAnswer = async () => {
        const data = createAnswerAdapter(res.value, survey.value?.id as string)

        const { saveAnswer } = useSurvey()
        try {
            await saveAnswer(data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Respuesta enviada!',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al registrar tu respuesta',
                showConfirmButton: false,
                timer: 1500
            })
        }
        router.push({ name: route.query.history as string })
    }

    onMounted(async() => {
        const { getOneSurvey } = useSurvey()
        const { data } : any = await getOneSurvey(route.params.id as string)
        survey.value = data
        
        // inicializamos res con las preguntas y respuestas en blanco
        survey.value?.questions.forEach((question) => {
            res.value[question.id!] = ""
        })
    })
</script>

<template>
    <div class="col-span-12 mb-5">
        <div class="h-10 flex items-center">
            <div class="text-lg text-cf-2 duration-300 hover:cursor-pointer hover:pr-4"
                @click="back">
                <font-awesome-icon icon="fa-solid fa-arrow-right" 
                    class="rotate-180" />
            </div>
            <h1 class="sm:text-2xl font-bold ml-1">{{ survey?.title }}</h1>
        </div>

        <h2 class="font-semibold mt-2 mb-4 sm:text-lg">Preguntas</h2>

        <div v-for="(item, index) in survey?.questions" :key="index"
            class="mt-2 p-3 bg-gray-100 rounded-md">
            <div class="mb-2">
                <div class="mb-1">
                    <span class="font-semibold">P{{ index + 1 }}</span>
                    <span class="ml-2">{{ item.item }}</span>
                </div>
            </div>
            <div v-for="(alternative, index) in item.alternatives" :key="index"
                class="mb-2 px-2">
                <div class="flex justify-between">
                    <div>
                        <span class="mr-2 font-semibold">{{ index + 1 }}.</span>
                        <span>{{ alternative.description }}</span>
                    </div>
                    <span class="block">
                        <input type="radio" :id="`${alternative.id}`"
                            :name="`${item.id}`"
                            :value="alternative.id!"
                            v-model="res[item.id!]"
                            class="w-4 h-4 hover:cursor-pointer">
                    </span>
                </div>
            </div>
        </div>
        <button @click="saveAnswer"
            class="border py-2 mt-3 rounded-lg bg-green-500/70 text-gray-600
                    w-full block mb-2 font-semibold sm:text-lg hover:cursor-pointer">
            Enviar Respuesta
        </button>
    </div>
</template>