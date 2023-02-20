<script setup lang="ts">
    import { useUserStore } from '../../../store/user'

    const user = useUserStore()
</script>

<template>
    <div class="col-span-12 lg:col-span-4 ml-6 mt-7">
        <div class="flex justify-center relative">
            <img v-if="user.photo"
                :src="user.photo" alt="asd"
                class="border-2 border-purple-300 w-40 rounded-full">
            <img v-else
                src="/npm.png" alt=""
                class="border-2 border-purple-300 w-40 rounded-full">
            <!-- <div class="absolute text-gray-600 text-2xl bottom-0 right-32">
                <font-awesome-icon icon="fa-solid fa-camera" />
            </div> -->
        </div>
        <div class="p-2 mt-1 leading-relaxed text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id perferendis cumque rerum ad expedita doloremque, obcaecati alias animi optio voluptas necessitatibus deleniti magnam. Dolore non repudiandae facilis sed accusamus adipisci!
        </div>
    </div>
</template>