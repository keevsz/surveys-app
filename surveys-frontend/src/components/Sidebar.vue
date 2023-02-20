<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import { ref, Ref, onMounted } from 'vue'
    import { useSurvey } from '../modules/survey/composables/useSurvey'

    interface Items {
        link: string,
        name: string,
        icon: string
    }

    const { flagValue } = useSurvey()
    const widthScreen : Ref<Number> = ref(0)
        
    const handleSidebar = () => {
        const { handleSidebar } = useSurvey()
        handleSidebar()
    }
        
    const checkScreen = () => {
        const { changeFalseSidebar } = useSurvey()
        widthScreen.value = window.innerWidth
        if (widthScreen.value > 639) {
            changeFalseSidebar()
            return
        }
    }

    const links : Ref<Items[]> = ref([
        {
            link: 'home-survey',
            name: 'Dashboard',
            icon: 'fa-solid fa-gauge-high'
        },
        {
            link: 'survey-uno',
            name: 'Surveys',
            icon: 'fa-solid fa-square-poll-vertical'
        },
        {
            link: 'user-profile',
            name: 'User Profile',
            icon: 'fa-solid fa-user'
        },
    ])

    onMounted(() => {
        window.addEventListener('resize', checkScreen)
    })
</script>

<template>
    <div class="bg-cf-3 h-screen text-white/90 hidden lg:block md:col-span-2"
        :class="{ 'block' : flagValue }">

        <div class="flex justify-center items-center h-16">
            <h1>Logo</h1>
        </div>
        <div class="ml-4 mr-4 mt-2 flex flex-col">
            <router-link v-for="(link, index) in links" :key="index"
                class="h-12 items-center flex pl-2 duration-150 hover:bg-cf-1 hover:cursor-pointer"
                :to="{ name: link.link }">
                <font-awesome-icon :icon="link.icon" class="mr-2" />
                {{ link.name }}
            </router-link>
        </div>
    </div>

    <div :class="[ flagValue ? 'w-1/2 border-r rounded-tr-xl' : 'w-0' ]"
        class="min-h-screen absolute top-0 z-50 bg-cf-3 text-white/90 duration-300">
        <div class="flex flex-col ml-4 mr-4 mt-2">
            <div class="flex justify-end mt-1">
                <font-awesome-icon :class="[ flagValue ? 'block duration-300' : 'hidden' ]"
                    class="text-xl"
                    icon="fa-solid fa-xmark" @click="handleSidebar" />
            </div>
            <router-link v-for="(link, index) in links" :key="index"
                :to="{ name: link.link }"
                class="h-12 flex items-center pl-2 duration-150 hover:bg-cf-1"
                :class="[ flagValue ? 'block duration-300' : 'hidden' ]"
                @click="handleSidebar"
                >
                <font-awesome-icon :icon="link.icon" class="mr-1" />
                {{ link.name }}
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.custom-height {
    height: calc(100vh - 64px);
}
</style>