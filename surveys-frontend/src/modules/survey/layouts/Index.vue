<script lang="ts" setup>
    import Navbar from '../components/Navbar.vue'
    import Sidebar from '../components/Sidebar.vue'
    import Home from '../views/Home.vue'
</script>

<template>
    <div class="w-full grid grid-cols-12">
        <!-- sidebar -->
        <Sidebar />

        <div class="col-span-10">
            <!-- navbar -->
            <Navbar />
        
            <!-- los hijos ~= colocar home -->
            <router-view />
        </div>

        <!-- footer -->
    </div>
</template>