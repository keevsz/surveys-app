<script lang="ts" setup>
    import type { Ref } from 'vue'
    import { ref } from 'vue'
    import Input from '../components/Input.vue'
    import api from '../../../api'

    const email : Ref<string> = ref('')
    const password :  Ref<string> = ref('')

    const register = async () => {
        const res : any = await api.post('/users', {
            username: email.value,
            password: password.value
        })

        console.log(res)
    }

</script>

<template>
    <div class="container mx-auto px-4">
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
                <div
                class="relative flex flex-col min-w-0 break-words w-full"
                >
                
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div class="mb-4">
                            <span class="block font-bold mb-2 text-blue-500 text-2xl">Regístrate</span>
                        </div>

                        <form @submit.prevent="register">
                            
                            <Input ide="email" label="Email" type-input="text" placeholder="example@gmail.com"
                                    v-model="email" />
                            
                            <Input ide="password" label="Password" type-input="password" placeholder="********" 
                                    v-model="password" />

                            
                            <div class="text-center mt-6">
                                <button
                                    class="bg-blue-500 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="w-full text-center">
                    <span class="text-gray-500">
                        ¿Tienes una cuenta?
                        <router-link :to="{ name: 'login' }"
                            class="text-blue-500">
                            <small class="ml-1 text-sm font-semibold">Inicio sesión</small>
                        </router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
    
</template>