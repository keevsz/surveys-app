<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import { ref, Ref, onMounted } from 'vue'
    import { useSurvey } from '../modules/survey/composables/useSurvey'
    import { IItems } from '../interfaces'

    const { flagValue, changeFalseSidebar } = useSurvey()
    const router = useRouter()
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

    const links : Ref<IItems[]> = ref([
        {
            link: 'home-survey',
            name: 'Dashboard',
            icon: 'fa-solid fa-gauge-high',
            isExpanded: false
        },
        {
            name: 'Surveys',
            icon: 'fa-solid fa-square-poll-vertical',
            isExpanded: true,
            expanded: false,
            subLinks: [
                {
                    link: 'survey-create',
                    name: 'Create Survey',
                    icon: 'fa-solid fa-plus'
                },
                {
                    link: 'survey-list',
                    name: 'Survey List',
                    icon: 'fa-solid fa-list'
                }
            ]
        },
        {
            link: 'user-profile',
            name: 'User Profile',
            icon: 'fa-solid fa-user',
            isExpanded: false
        },
    ])

    const change = (link : string) => {
        changeFalseSidebar()
        router.push({ name: link })
    }

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
            <template v-for="(link, index) in links">
                <div v-if="link.subLinks">
                    <div @click="link.expanded = !link.expanded"
                        class="relative h-12 items-center flex pl-2 duration-150 hover:bg-cf-1 hover:cursor-pointer">
                        <font-awesome-icon :icon="link.icon" class="mr-2" />
                        {{ link.name }}
                        <div class="absolute right-2 top-0 h-full flex items-center">
                            <font-awesome-icon :icon="link.expanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'" />
                        </div>
                    </div>
                    <div v-if="link.expanded" class="bg-cf-3 rounded-md max-h-48 overflow-y-auto">
                        <router-link v-for="(subLink, subIndex) in link.subLinks" :key="subIndex"
                            class="h-12 items-center flex md:pl-3 duration-150 hover:bg-cf-1 hover:cursor-pointer"
                            :to="{ name: subLink.link }">
                            <font-awesome-icon :icon="subLink.icon" class="mr-2" />
                            {{ subLink.name }}
                        </router-link>
                    </div>
                </div>
                <router-link v-else :key="index"
                    class="h-12 items-center flex pl-2 duration-150 hover:bg-cf-1 hover:cursor-pointer"
                    :to="{ name: link.link }">
                    <font-awesome-icon :icon="link.icon" class="mr-2" />
                    {{ link.name }}
                </router-link>
            </template>
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
            <template v-if="flagValue" v-for="(link, index) in links">
                <div v-if="link.subLinks">
                    <div @click="link.expanded = !link.expanded"
                        class="h-12 flex items-center pl-2 duration-150 hover:bg-cf-1 cursor-pointer">
                        <font-awesome-icon :icon="link.icon" class="mr-2" />
                        {{ link.name }}
                        <div class="ml-auto">
                            <font-awesome-icon :icon="link.expanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'" />
                        </div>
                    </div>
                    <div v-if="link.expanded" class="ml-4 bg-cf-3 rounded-md max-h-48 overflow-y-auto">
                        <span v-for="(subLink, subIndex) in link.subLinks" :key="subIndex"
                                    class="h-12 flex items-center md:pl-3 pl-0 duration-150 hover:bg-cf-1 cursor-pointer"
                                    @:click="change(subLink.link)">
                            <font-awesome-icon :icon="subLink.icon" class="mr-2" />
                            {{ subLink.name }}
                        </span>
                    </div>
                </div>
                <span v-else :key="index"
                    class="h-12 flex items-center pl-2 duration-150 hover:bg-cf-1 cursor-pointer"
                    @:click="change(link.link as string)">
                    <font-awesome-icon :icon="link.icon" class="mr-2" />
                    {{ link.name }}
                </span>
            </template>
        </div>
    </div>

</template>

<style scoped>
.custom-height {
    height: calc(100vh - 64px);
}

.router-link-exact-active {
    background-color: #1F4068;
    border-radius: 5px;
}
</style>