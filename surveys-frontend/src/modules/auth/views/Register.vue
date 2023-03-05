<script lang="ts" setup>
    import Input from '../components/Input.vue'
    import { useAuth } from '../composables/useAuth'
    import { useRouter } from 'vue-router'
    import Swal from 'sweetalert2'
    import { Form } from 'vee-validate'
    import { schemaRegister } from '../utils/schemaValidation'

    const router = useRouter()

    const signup = async (values : any) => {

        const { register } = useAuth()

        try {
            await register(values)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successful registration',
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
                timer: 2500
            })
        }
    }

</script>

<template>
    <div class="container mx-auto my-10">
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
                <div
                class="relative flex flex-col min-w-0 break-words w-full"
                >
                
                    <div class="flex-auto px-4 lg:px-10 pb-2 pt-0">
                        <div class="mb-4">
                            <span class="block font-bold mb-2 text-blue-500 text-2xl">Regístrate</span>
                        </div>

                        <Form @submit="signup"
                            :validation-schema="schemaRegister"
                            autocomplete="off">
                            
                            <Input name="name"
                                label="Nombres"
                                type-input="text"
                                placeholder="Ingrese nombre"
                                 />

                            <Input name="lastname"
                                label="Apellidos"
                                type-input="text"
                                placeholder="Ingrese apellidos"
                                 />

                            <Input name="username"
                                label="Nombre usuario"
                                type-input="text"
                                placeholder="Ingrese nombre usuario"
                                 />

                            <Input name="email"
                                label="Email"
                                type-input="email"
                                placeholder="Ingrese email"
                                 />
                            
                            <Input name="password"
                                label="Password"
                                type-input="password"
                                placeholder="********"
                                 />
                            
                            <div class="text-center mt-6">
                                <button
                                    class="bg-blue-500 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                Ingresar
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div class="w-full text-center">
                    <span class="text-gray-500 text-sm">
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