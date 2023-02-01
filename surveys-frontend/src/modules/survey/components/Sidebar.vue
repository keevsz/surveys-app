<template>
    <!-- <div class="custom-height w-60 border-2"> -->
    <div class="col-span-2 h-screen border-2">
        <h1>Sidebar</h1>
        <router-link :to="{ name: 'home-survey' }">home</router-link>
        <br>
        <router-link :to="{ name: 'survey-uno' }">uno</router-link>
        <br>
        <router-link :to="{ name: 'survey-dos' }">dos</router-link>
    </div>
</template>

<style scoped>
.custom-height {
    height: calc(100vh - 64px);
}
</style>