<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue';
    import { useSurveyStore } from '../store/survey'
    import { useUserStore } from '../store/user'
    import { useUser } from '../modules/user/composables/useUser';
    import { useSurvey } from '../modules/survey/composables/useSurvey'
    import { useRouter } from 'vue-router'
    import { useLogout } from '../composables/useLogout'
    import { ISubItems } from '../interfaces/index'

    const storeSurvey = useSurveyStore()
    const storeUser = useUserStore()
    
    const router = useRouter()

    const options : Ref<ISubItems[]> = ref([
        {
            link: 'user-profile',
            name: 'Profile',
            icon: 'fa-solid fa-user'
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

    const changeRouter = async ( link : string ) => {
        const { logout } = useLogout()
        if (link !== '') {
            handleToggle()
            router.push({ name: link })
        } else {
            handleToggle()
            await logout()
            router.push('/')
        }
    }

    const handleSidebar = () => {
        const { handleSidebar } = useSurvey()
        handleSidebar()
    }

    onMounted( async () => {
        const {userCurrent} = useUser()
        await userCurrent()
    })

</script>

<template>
    <div class="bg-cf-3 flex justify-between items-center h-16 w-full
        lg:justify-end">
        <font-awesome-icon
            icon="fa-solid fa-bars" class="block lg:hidden ml-2 text-white/70 hover:cursor-pointer" @click="handleSidebar" />

        <div class="relative flex items-center hover:cursor-pointer mr-4"
            @click="handleToggle">
            <div class="flex justify-center items-center ">
                <img :src="storeUser.pic" alt="profile"
                    class="none-select rounded-full h-10 w-10">
            </div>
            <!-- <font-awesome-icon icon="fa-solid fa-caret-down" class="text-white/80" /> -->
        </div>
        <div class="absolute z-50 right-5 top-14 border bg-white text-gray-500 w-32 rounded-sm text-center divide-y divide-solid" v-show="storeSurvey.toggle">
            <span v-for="(option, index) in options" :key="index"
             class="h-10 flex items-center justify-center text-xs hover:bg-gray-100 hover:cursor-pointer duration-300"
             @click="changeRouter(option.link)">
                {{ option.name }}
                <font-awesome-icon :icon="option.icon" class="text-gray-600 ml-1" />
            </span>
        </div>
    </div>
</template>

<style scoped>
.none-select {
    user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
}
</style>