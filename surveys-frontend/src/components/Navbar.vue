<script lang="ts" setup>
    import { ref, Ref } from 'vue'
    import { useSurveyStore } from '../store/survey'
    import { useSurvey } from '../modules/survey/composables/useSurvey'

    interface List {
        link: string,
        name: string,
        icon: string
    }

    const storeSurvey = useSurveyStore()

    const options : Ref<List[]> = ref([
        {
            link: 'user-profile',
            name: 'Profile',
            icon: 'fa-solid fa-user'
        },
        {
            link: '',
            name: 'Settings',
            icon: 'fa-solid fa-gear'
        },
        {
            link: '',
            name: 'Logout',
            icon: 'fa-solid fa-arrow-right-from-bracket'
        }
    ])

    const handleToggle = () => {
        storeSurvey.changeToggle()
    }

    const handleSidebar = () => {
        const { handleSidebar } = useSurvey()
        handleSidebar()
    }

</script>

<template>
    <div class="bg-cf-3 flex justify-between items-center h-16 w-full
        lg:justify-end">
        <font-awesome-icon
            icon="fa-solid fa-bars" class="block lg:hidden ml-2 text-white/70 hover:cursor-pointer" @click="handleSidebar" />

        <div class="relative flex items-center hover:cursor-pointer mr-4"
            @click="handleToggle">
            <div class="flex justify-center items-center rounded-full h-11 w-11">
                <img src="/vite.svg" alt="profile"
                    class="">
            </div>
            <font-awesome-icon icon="fa-solid fa-caret-down" class="text-white/80" />
        </div>
        <div class="absolute z-50 right-5 top-14 border bg-white text-gray-500 w-32 rounded-sm text-center divide-y divide-solid" v-show="storeSurvey.toggle">
            
            <router-link v-for="(option, index) in options" :key="index"
             :to="{ name: option.link }"
             class="h-10 flex items-center justify-center text-xs hover:bg-gray-100 duration-300"
             @click="handleToggle">
                {{ option.name }}
                <font-awesome-icon :icon="option.icon" class="text-gray-600 ml-1" />
            </router-link>
        </div>
    </div>
</template>