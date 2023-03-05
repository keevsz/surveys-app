<script setup lang="ts">
    import { onMounted, Ref, ref } from 'vue'
    import Loading from '../../../components/Loading.vue'
    import Navbar from '../../../components/Navbar.vue'
    import Sidebar from "../../../components/Sidebar.vue"
    import Detail from '../components/Detail.vue'
    import Photo from '../components/Photo.vue'
    import { useUser } from '../composables/useUser'
    import { useUserStore } from '../../../store/user'

    const isLoading : Ref<boolean> = ref(false)

    const user = useUserStore()
    
    const changeLoading = () => {
        isLoading.value = true
        setTimeout(() => {
            isLoading.value = false
        }, 2000);
    }

    onMounted(async() => {
        const { userCurrent } = useUser()
        await userCurrent()
    })
</script>

<template>
    <div class="w-full grid grid-cols-12">
        <!-- sidebar -->
        <Sidebar />

        <div class="col-span-12 lg:col-span-10">
            <!-- navbar -->
            <Navbar />
        
            <!-- CONTENT -->
            <div class="p-7 grid grid-cols-12 custom-height overflow-x-hidden">
                <template v-if="!isLoading">
                    <Detail v-if="user.username" @is-loading="changeLoading" />
                    <Photo @is-loading="changeLoading" />
                </template>
                <div v-else
                class="fixed inset-0 z-50">
                    <div class="flex justify-center items-center h-full">
                        <Loading />
                    </div>
                </div>
            </div>
            
        </div>

        <!-- footer -->
    </div>
</template>

<style scoped>
.custom-height {
    height: calc(100vh - 64px);
}
</style>