<script lang="ts" setup>
    import Navbar from '../../../components/Navbar.vue'
    import Sidebar from '../../../components/Sidebar.vue'
</script>

<template>
    <div class="w-full grid grid-cols-12">
        <!-- sidebar -->
        <Sidebar />

        <div class="col-span-12 lg:col-span-10">
            <!-- navbar -->
            <Navbar />
        
            <!-- los hijos ~= colocar home -->
            <div class="p-7 grid grid-cols-12 custom-height overflow-x-hidden">
                <router-view />
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