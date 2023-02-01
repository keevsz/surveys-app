<script lang="ts" setup>
    import type { Ref } from 'vue'
    import { ref } from 'vue'
    import Input from '../components/Input.vue'
    import { useAuth } from '../composables/useAuth'
    import { useRouter } from 'vue-router'
    import Swal from 'sweetalert2'

    const router = useRouter()

    const email : Ref<string> = ref('')
    const password :  Ref<string> = ref('')

    const signup = async () => {

        const { register } = useAuth()
        let user = {
            username: email.value,
            password: password.value
        }

        try {
            const aux : any = await register(user)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${aux.statusText}`,
                showConfirmButton: false,
                timer: 2000
            })
            router.push({ name: 'login' })
        } catch (error : any) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 2000
            })
            email.value = ""
        }
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

                        <form @submit.prevent="signup">
                            
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