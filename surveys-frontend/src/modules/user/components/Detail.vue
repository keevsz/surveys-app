<script setup lang="ts">
    import { Ref, ref } from 'vue'
    import { useUserStore } from '../../../store/user'
    import { useUser } from '../composables/useUser'
    const user = useUserStore()

    const username : Ref<string> = ref('')

    const updateInfo = async () => {
        const { update } = useUser()

        try {
            const aux = await update(username.value)
            console.log(aux);
            
        } catch (error) {
            console.log(error);
            
        }
    }

</script>

<template>
    <div class="col-span-12 lg:col-span-8">
        <h1 class="text-2xl mb-8">Edit Profile</h1>
        <form @submit.prevent="updateInfo">
        <div class="grid grid-cols-12">
            <h2 class="uppercase col-span-12 mb-3">User information</h2>

            <div class="mb-4 col-span-12 lg:col-span-6 mx-1">
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input type="text" id="username" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full focus:outline-none p-2.5"
                    v-model="user.username">
            </div>
            <div class="mb-4 col-span-12 lg:col-span-6 mx-1">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                <input type="email" id="email" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full focus:outline-none p-2.5">
            </div>
            <div class="mb-4 col-span-12 lg:col-span-6 mx-1">
                <label for="first" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                <input type="text" id="first" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full focus:outline-none p-2.5">
            </div>
            <div class="mb-4 col-span-12 lg:col-span-6 mx-1">
                <label for="last" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                <input type="text" id="last" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full focus:outline-none p-2.5">
            </div>
        </div>

        <div class="w-full border my-5 mx-2 rounded bg-gray-200"></div>

        <div class="grid grid-cols-12">
            <h2 class="uppercase col-span-12 mb-3">Contact information</h2>
            <div class="mb-4 col-span-12 mx-1">
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                <input type="text" id="address" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full focus:outline-none p-2.5">
            </div>
            <div class="mb-4 col-span-12 lg:col-span-4 mx-1">
                <label for="city" class="block mb-2 text-sm font-medium text-gray-900">City</label>
                <input type="text" id="city" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full focus:outline-none p-2.5">
            </div>
            <div class="mb-4 col-span-12 lg:col-span-4 mx-1">
                <label for="city" class="block mb-2 text-sm font-medium text-gray-900">Country</label>
                <input type="text" id="city" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full focus:outline-none p-2.5">
            </div>
            <div class="mb-4 col-span-12 lg:col-span-4 mx-1">
                <label for="country" class="block mb-2 text-sm font-medium text-gray-900">Postal Code</label>
                <input type="text" id="country" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full focus:outline-none p-2.5">
            </div>
            <div class="mt-2 col-span-12">
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full lg:w-32 rounded-lg py-2">Save</button>
            </div>
        </div>
        </form>
    </div>
</template>