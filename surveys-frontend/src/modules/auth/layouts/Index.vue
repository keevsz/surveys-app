<script lang="ts" setup>
    import { ref, Ref, onMounted } from 'vue';
    import Loading from '../../../components/Loading.vue'

    const isLoading : Ref<boolean> = ref(true)

    onMounted(() => {
        setTimeout(() => {
            isLoading.value = false
        }, 2000)
    })
</script>

<template>
    <div class="flex min-h-screen">
        <loading v-if="isLoading" />
        <!-- formulario -->
            <router-view v-else />
        <!-- end -->
    </div>
</template>