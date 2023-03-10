<script setup lang="ts">
    import { ref, watch, Ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import Modal from '../components/Modal.vue'
    import { uid } from 'uid'
    import { useSurveyStore } from '../../../store/survey'
    import { createxSurveyAdapter } from '../adapter/index'
    import { useSurvey } from '../composables/useSurvey'
    import { Squeleton } from '../interfaces/survey'
    import Swal from 'sweetalert2'

    const route = useRoute()
    const router = useRouter()

    const xi = ref(0)
    const algo = ref([])

    const title = ref<HTMLInputElement | null>(null)

    const inputTi : Ref<string> = ref('')
    const titleQt : Ref<string> = ref('')
    const flagB :Ref<boolean> = ref(false)
    const required : Ref<boolean> = ref(false)
    const valuable : Ref<boolean> = ref(false)
    const xalternatives : Ref<Squeleton[]> = ref([])

    const store = useSurveyStore()

    const editTitle = () => {
        title.value?.focus()
    }

    const addAlternative = () => {
        xalternatives.value.push({
            uid: uid(),
            description: '',
            value: 0
        })
    }

    const removeAlternative = ( index : string ) => {
        xalternatives.value = xalternatives.value.filter( item => item.uid !== index )
    }

    const addQuestion = () => {
        const question = {
            id: uid(),
            title: titleQt.value,
            valuable: valuable.value,
            required: required.value,
            alternatives: xalternatives.value.filter((i : any) => i.description !== '')
        }
        store.xquestions.push(question)
        
        titleQt.value = ''
        xalternatives.value = []
        valuable.value = false
        required.value = false
    }

    const editQuestion = ( id : string, index : number ) => {
        store.showModal = true
        algo.value = store.xquestions.filter((item : any) => item.id === id)
        xi.value = index
    }

    const removeQuestion = async ( index : string ) => {
        const result = await Swal.fire({
            title: '??Est??s seguro?',
            text: '??Quieres eliminar esta pregunta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'S??',
            cancelButtonText: 'No'
        })

        if (result.isConfirmed) {
            store.xquestions = store.xquestions.filter( (item : any) => item.id !== index )
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Pregunta Eliminada',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const saveQuestion = async () => {
        const data = createxSurveyAdapter(store)
        
        const { updateSurvey } = useSurvey()
        try {
            await updateSurvey(route.params.id as string, data)
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Encuesta modificada',
                showConfirmButton: false,
                timer: 1500
            })
            store.clearStore()
            store.xquestions = []
            inputTi.value = ''
            
            router.push({ name: 'survey-list' })

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al modificar',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    watch(() => inputTi.value, () => store.xtitle = inputTi.value)


    watch(() => titleQt.value, (a : String) => {
        a.length > 0 ? flagB.value = true : flagB.value = false
    })

    onMounted( async () => {
        const { getOneSurvey } = useSurvey()

        const res : any = await getOneSurvey(route.params.id as string)
        
        store.xtitle = res.data.title
        store.xquestions = res.data.questions
        inputTi.value = store.xtitle
    })

</script>

<template>
    <div class="border w-full col-span-12 px-2 py-1">

        <!-- TODO: TITLE -->
        <div class="mb-5 flex justify-between">
            <input type="text" ref="title" placeholder="Ingrese t??tulo de la encuesta"
                class="w-full mr-4 pl-2 sm:text-2xl font-bold focus:outline-none
                    border-b"
                    v-model="inputTi">
            <button 
                class="border rounded-md px-3 py-1 text-gray-800 hover:text-gray-600 duration-200 ease-in-out
                        hover:shadow-sm"
                @click="editTitle">
                <span class="hidden sm:inline-block">Editar titulo</span>
                <font-awesome-icon class="ml-1"
                    icon="fa-solid fa-pen-to-square" />
            </button>
        </div>

        <!-- TODO: QUESTION CONTAINER -->
        <div class="border border-gray-100 rounded-md shadow-sm mb-2">
            <!-- QUESTION -->
            <div class="px-3 py-4">
                <div class="flex items-center mb-3 pb-2">
                    <div class="block w-full sm:flex sm:h-12">
                        <input type="text"
                            class="border border-gray-300 rounded-sm w-full pl-2 focus:outline-none
                                h-10 sm:h-auto"
                            placeholder="Ingresa la pregunta"
                            v-model="titleQt">

                        <button class="border w-full mt-1 sm:mt-0 sm:w-1/4 text-gray-700  duration-200 ease-in-out"
                            :class="[ flagB ? 'hover:pointer-events-auto hover:bg-gray-400 hover:text-white' : 'pointer-events-none' ]"
                            :disabled="!flagB"
                            @click="addAlternative">
                            A??adir alternativas
                            <font-awesome-icon icon="fa-solid fa-circle-plus" />
                        </button>
                    </div>
                </div>

                <div class="mb-2 w-full flex text-sm">
                    <div class="ml-2">
                        <input type="checkbox" name="" id="req"
                            class="mr-1"
                            v-model="required">
                        <label for="req">Obligatorio*</label>
                    </div>
                    <div class="ml-4">
                        <input type="checkbox" name="" id="valu"
                            class="mr-1"
                            v-model="valuable">
                        <label for="valu">Valuable*</label>
                    </div>
                </div>


                <div class="w-full border rounded bg-gray-200"></div>

                <!-- xALTERNATIVES -->
                <div v-for="item in xalternatives" :key="item.uid"
                    class="py-2">
                    <div class="flex h-10 items-center mb-2 px-3">
                        <input type="text" class="border w-11/12 border-gray-300 focus:outline-none px-3 py-1"
                            v-model="item.description">
                        <input type="number" v-if="valuable"
                            v-model="item.value"
                            class="border px-1 py-1 w-14 ml-1">
                        <div class="flex ml-3 w-fit">
                            <font-awesome-icon icon="fa-solid fa-circle-minus"
                                class="text-2xl text-gray-300 hover:text-gray-600 hover:cursor-pointer duration-150 ease-in" 
                                @click="removeAlternative(item.uid)" />
                            <font-awesome-icon icon="fa-solid fa-circle-plus"
                                class="text-2xl text-gray-300 hover:text-gray-600 hover:cursor-pointer duration-150 ease-in ml-2" 
                                @click="addAlternative" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- FIN QUESTION -->
            <div class="w-full text-center mb-3">
                <button @click="addQuestion"
                    class="border sm:text-lg text-gray-400 hover:cursor-pointer duration-300 ease-in
                        rounded-md px-3 py-2"
                    :class="[ flagB ? 'hover:pointer-events-auto hover:bg-gray-600 hover:text-white/90' : 'hover:cursor-not-allowed'  ]"
                    :disabled="!flagB">
                    A??adir Pregunta
                    <font-awesome-icon icon="fa-solid fa-circle-plus"
                                class="mr-1" />
                </button>
            </div>

            
            <div v-for="(question, index) in store.xquestions" :key="question.id" class="px-3 py-4">
                <div class="flex items-center mb-3 border-b pb-4">
                    <div class="block sm:flex w-full h-12">
                        <div class="flex overflow-x-scroll md:overflow-x-hidden w-full items-center">
                            <span class="font-bold text-lg mr-2">P{{ index+1 }}</span>
                            <input type="text"
                                class="w-full pl-2 focus:outline-none inline mb-1 sm:mb-0"
                                placeholder="Ingresa la pregunta"
                                readonly
                                v-model="question.title">
                        </div>
                        <div class="flex justify-center mt-1 sm:mt-0 sm:w-1/4">
                            <button class="w-auto mr-1 text-gray-700  duration-200 ease-in-out"
                                @click="editQuestion(question.id, index)">
                                Editar
                                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                            </button>
                            <button class="w-auto text-gray-700  duration-200 ease-in-out"
                                @click="removeQuestion(question.id)">
                                Borrar
                                <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- xALTERNATIVES -->
                <div v-for="item in question.alternatives" :key="item.id"
                    class="py-1">
                    <div class="flex h-10 items-center px-6">
                        <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <label class="w-full ml-3">{{ item.description }}</label>
                    </div>
                </div>
            </div>

            <div class="w-full px-3">
                <button class="border py-2 rounded-lg bg-green-500/70 text-gray-600
                    w-full block mb-2 font-semibold sm:text-lg hover:cursor-pointer"
                    @click="saveQuestion"
                    :disabled="!inputTi">
                    Guardar Cambios
                </button>
            </div>

            <Modal :data="algo" :ind="xi" v-if="store.showModal" mode="edit" />
            
        </div>
    </div>
</template>