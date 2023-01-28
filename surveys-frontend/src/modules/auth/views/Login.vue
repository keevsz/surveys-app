<script lang="ts" setup>
    import Input from '../components/Input.vue'
    import type { Ref } from 'vue'
    import { ref } from 'vue'
    import { useAuthStore } from '../../../store/auth'
    import api from '../../../api'

    const username : Ref<string> = ref('')
    const password :  Ref<string> = ref('')

    const auth = useAuthStore()
    
    const login = async () => {
        const res = await api.post('/auth/login', {
            username,
            password
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
                            <span class="block font-bold mb-2 text-blue-500 text-2xl">Inicio de Sesión</span>
                        </div>

                        <form @submit.prevent="login">
                            
                            <Input ide="email" label="Email" type-input="text" placeholder="example@gmail.com"
                                    v-model="username" />
                            
                            <Input ide="password" label="Password" type-input="password" placeholder="********" 
                                    v-model="password" />

                            <div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" class="sr-only peer">
                                    <div class="w-11 h-6 bg-transparent peer-focus:outline-none rounded-full peer dark:bg-slate-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span class="ml-3 text-sm font-normal text-gray-400">Remember me</span>
                                </label>
                            </div>

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
                        ¿No tienes una cuenta?
                        <router-link :to="{ name: 'register' }"
                            class="text-blue-500">
                            <small class="ml-1 text-sm font-semibold">Regístrate</small>
                        </router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
    
</template>