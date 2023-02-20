<script setup lang="ts">
    import { ref, watch, Ref } from 'vue'
    import { uid } from 'uid'

    interface Squeleton {
        uid: string
    }

    const title = ref<HTMLInputElement | null>(null)

    const vTitle : Ref<String> = ref('')
    const flagB :Ref<boolean> = ref(false)
    const alternatives : Ref<Squeleton[]> = ref([])
    const questions : Ref<any> = ref([])

    const editTitle = () => {
        title.value?.focus()
    }

    const addAlternative = () => {
        alternatives.value.push({
            uid: uid()
        })
    }

    const removeAlternative = ( index : string ) => {
        alternatives.value = alternatives.value.filter( item => item.uid !== index )
    }

    const addQuestion = () => {
        questions.value.push({
            uid: uid()
        })
    }

    const removeQuestion = ( index : string ) => {
        // questions.value = questions.value.filter( item => item.uid !== index )
    }

    watch(() => vTitle.value, (a : String) => {
        a.length > 0 ? flagB.value = true : flagB.value = false
    })
</script>

<template>
    <div class="border w-full col-span-12 px-2 py-1">

        <!-- TODO: TITLE -->
        <div class="mb-5 flex justify-between">
            <input type="text" ref="title" placeholder="Ingrese título de la encuesta"
                class="w-full mr-4 pl-2 text-2xl font-bold focus:outline-none
                    border-b">
            <button 
                class="border rounded-md px-3 py-1 text-gray-800 hover:text-gray-600 duration-200 ease-in-out
                        hover:shadow-sm"
                @click="editTitle">
                Editar titulo
                <font-awesome-icon class="ml-1"
                    icon="fa-solid fa-pen-to-square" />
            </button>
        </div>

        <!-- TODO: QUESTION CONTAINER -->
        <div class="border border-gray-100 rounded-md shadow-sm mb-2">
            <!-- Question -->
            <div class="px-3 py-4">
                <div class="flex items-center mb-3 border-b pb-4">
                    <span class="font-bold text-lg mr-2">P1</span>
                    <div class="flex w-full h-12">
                        <!-- w-9/12 -->
                        <input type="text"
                            class="border border-gray-300 rounded-sm w-full pl-2 focus:outline-none"
                            placeholder="Ingresa la pregunta"
                            v-model="vTitle">
                        <button class="border w-1/4 text-gray-700  duration-200 ease-in-out"
                            :class="[ flagB ? 'hover:pointer-events-auto hover:bg-gray-400 hover:text-white' : 'pointer-events-none' ]"
                            :disabled="!flagB"
                            @click="addAlternative">
                            Añadir alernativas
                            <font-awesome-icon icon="fa-solid fa-circle-plus" />
                        </button>
                    </div>
                </div>

                <!-- ALTERNATIVES -->
                <div v-for="item in alternatives" :key="item.uid"
                    class="py-2">
                    <div class="flex h-10 items-center mb-2 px-3">
                        <input type="text" class="border w-11/12 border-gray-300 focus:outline-none px-3 py-1">
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

            <!-- mas -->
            <div v-for="q in questions"
                class="px-3 py-4">
                <div class="flex items-center mb-3 border-b pb-4">
                    <span class="font-bold text-lg mr-2">P1</span>
                    <div class="flex w-full h-12">
                        <!-- w-9/12 -->
                        <input type="text"
                            class="border border-gray-300 rounded-sm w-full pl-2 focus:outline-none"
                            placeholder="Ingresa la pregunta"
                            v-model="vTitle">
                        <button class="border w-1/4 text-gray-700  duration-200 ease-in-out"
                            :class="[ flagB ? 'hover:pointer-events-auto hover:bg-gray-400 hover:text-white' : 'pointer-events-none' ]"
                            :disabled="!flagB"
                            @click="addAlternative">
                            Añadir alernativas
                            <font-awesome-icon icon="fa-solid fa-circle-plus" />
                        </button>
                    </div>
                </div>

                <!-- ALTERNATIVES -->
                <div v-for="item in alternatives" :key="item.uid"
                    class="py-2">
                    <div class="flex h-10 items-center mb-2 px-3">
                        <input type="text" class="border w-11/12 border-gray-300 focus:outline-none px-3 py-1">
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

            

            <div class="w-full text-center mb-3">
                    <button @click="addQuestion"
                        class="border text-xl text-gray-400 hover:cursor-pointer duration-300 ease-in
                            rounded-md px-3 py-2"
                        :class="[ flagB ? 'hover:pointer-events-auto hover:bg-gray-600 hover:text-white/90' : 'hover:cursor-not-allowed'  ]"
                        :disabled="!flagB">
                        Nueva Pregunta
                        <font-awesome-icon icon="fa-solid fa-circle-plus"
                                    class="mr-1" />
                    </button>
                </div>
        </div>
    </div>
</template>