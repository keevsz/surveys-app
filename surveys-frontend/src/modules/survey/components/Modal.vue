<script setup lang="ts">
    import { useSurveyStore } from '../../../store/survey'
    import { ref, onMounted, Ref } from 'vue';
    import { uid } from 'uid'

    const store = useSurveyStore()

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        ind: {
            type: Number
        },
        mode: {
            type: String
        }
    })

    const inp = ref<HTMLInputElement | null>(null)

    const removeAlternative = ( index : string ) => {
        props.data[0].alternatives = props.data[0].alternatives.filter((item:any) => item.id !== index)
    }

    const addAlternative = () => {
        props.data[0].alternatives.push({
            id: uid(),
            description: '',
            value: 0
        })
    }
    
    const saveChange = () => {
        if (props.mode === 'create') {
            store.questions[props.ind as number] = { 
                id: props.data[0].id,
                title: props.data[0].title,
                required: props.data[0].required,
                valuable: props.data[0].valuable,
                alternatives: props.data[0].alternatives.filter((i : any) => i.description !== '')
            }
        } else {
            store.xquestions[props.ind as number] = { 
                id: props.data[0].id,
                title: props.data[0].title,
                required: props.data[0].required,
                valuable: props.data[0].valuable,
                alternatives: props.data[0].alternatives.filter((i : any) => i.description !== '')
            }
        }
        store.showModal = false
    }

    onMounted(() => {
        inp.value?.focus()
    })
    
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
        <div class="flex justify-center my-8 bg-white w-11/12 rounded-lg py-7">
            <div class="w-11/12 px-1">
                <div>
                    <label class="font-bold text-2xl">Editar Pregunta</label>
                    <button @click="store.showModal = false"
                        class="text-xl float-right mb-5">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>
                </div>
                <div class="w-full">
                    <div class="sm:flex mt-2">
                        <input type="text"
                                class="border border-gray-300 rounded-sm w-full pl-2 py-2 focus:outline-none"
                                placeholder="Ingresa la pregunta"
                                ref="inp"
                                v-model="data[0].title" />
    
                        <button class="border w-full mt-1 sm:mt-0 sm:w-1/4 text-gray-700  duration-200 ease-in-out"
                            @click="addAlternative">
                            Añadir alternativas
                            <font-awesome-icon icon="fa-solid fa-circle-plus" />
                        </button>
                    </div>

                    <div class="mb-1 mt-2 w-full flex items-center text-sm">
                        <input type="checkbox" name="" id="req"
                            class="mr-1"
                            v-model="props.data[0].required">
                        <label for="req">Obligatorio*</label>

                        <input type="checkbox" name="" id="valu"
                            class="mr-1 ml-2"
                            v-model="props.data[0].valuable">
                        <label for="valu">Valuable*</label>
                    </div>

                    <div v-for="item in props.data[0].alternatives" :key="item.id"
                        class="py-2">
                        <div class="flex h-10 items-center mb-2 px-3">
                            <input type="text" class="border w-11/12 border-gray-300 focus:outline-none px-3 py-1"
                                v-model="item.description">
                            <input type="number" v-if="props.data[0].valuable"
                                v-model="item.value"
                                class="border px-1 py-1 w-14 ml-1">

                            <div class="flex ml-3 w-fit">
                                <font-awesome-icon icon="fa-solid fa-circle-minus"
                                    class="text-2xl text-gray-300 hover:text-gray-600 hover:cursor-pointer duration-150 ease-in" 
                                    @click="removeAlternative(item.id)" />
                                <font-awesome-icon icon="fa-solid fa-circle-plus"
                                    class="text-2xl text-gray-300 hover:text-gray-600 hover:cursor-pointer duration-150 ease-in ml-2" 
                                    @click="addAlternative" />
                            </div>
                        </div>
                    </div>
                    <button @click="saveChange"
                        class="bg-green-500 p-2 rounded-lg block mx-auto text-white/90 hover:bg-green-600 duration-150">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom {
    height: calc(100vh - 4rem);
}
</style>