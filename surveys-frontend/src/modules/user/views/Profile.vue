<script setup lang="ts">
    import { onMounted } from 'vue'
    import Navbar from '../../../components/Navbar.vue'
    import Sidebar from '../../../components/Sidebar.vue'
    import Detail from '../components/Detail.vue'
    import Photo from '../components/Photo.vue'
    import { useUser } from '../composables/useUser'

    import { useUserStore } from '../../../store/user'

    const user = useUserStore()

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
                <Detail v-if="user.username" />
                <Photo />
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