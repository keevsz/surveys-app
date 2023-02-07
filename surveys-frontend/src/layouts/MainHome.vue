<script setup lang="ts">
    import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
    <div class="w-full grid grid-cols-12">
        <Sidebar />

        <div class="col-span-12 lg:col-span-10">
            <Navbar />
        </div>
    </div>
</template>


<style scoped>

</style>