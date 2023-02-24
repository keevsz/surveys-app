<script setup lang="ts">
    import { useSurveyStore } from '../../../store/survey'
    import { ref, onMounted } from 'vue'
    import { uid } from 'uid'

    const store = useSurveyStore()

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        ind: {
            type: Number
        }
    })

    const inp = ref<HTMLInputElement | null>(null)


    const removeAlternative = ( index : string ) => {
        props.data[0].alternatives = props.data[0].alternatives.filter((item:any) => item.uid !== index)
    }

    const addAlternative = () => {
        props.data[0].alternatives.push({
            uid: uid(),
            description: '',
            value: 0
        })
    }

    const saveChange = () => {
        store.questions[props.ind as number] = props.data[0]
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
                    <input type="text"
                            class="border border-gray-300 rounded-sm w-full pl-2 py-2 focus:outline-none"
                            placeholder="Ingresa la pregunta"
                            ref="inp"
                            v-model="data[0].title" />
                    <div v-for="item in props.data[0].alternatives" :key="item.uid"
                        class="py-2">
                        <div class="flex h-10 items-center mb-2 px-3">
                            <input type="text" class="border w-11/12 border-gray-300 focus:outline-none px-3 py-1"
                                v-model="item.description">
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