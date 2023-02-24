<script setup lang="ts">
    import { useUserStore } from '../../../store/user'
    import { useUser } from '../composables/useUser'
    import { ref} from 'vue'

    const storeUser = useUserStore()
    const imageSelector = ref<HTMLInputElement | null>(null)

    const load = () => {
        imageSelector.value!.click()
    }

    const handleImageUpload = ( event : Event ) => {
        const input = event.target as HTMLInputElement
        const file = input.files?.[0]
        if (!file) return

        const { updateImage, loadImage } = useUser()

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            const res : any = await updateImage(reader.result as string)
            await loadImage(res.data.url)
        }
    }
</script>

<template>
    <div class="col-span-12 lg:col-span-4 ml-6 mt-7">
        <div class="flex justify-center relative">
            <img v-if="storeUser.pic"
                :src="storeUser.pic" alt="asd"
                class="border-2 w-40 h-40 rounded-full none-select hover:cursor-pointer"
                @click="load">

            <input type="file" ref="imageSelector" v-show="false"  @input="handleImageUpload" accept="image/png, image/jpeg, image/jpg">
        </div>
        <div class="p-2 mt-1 leading-relaxed text-center">
            <p class="font-bold text-xl">
                {{ storeUser.name }} {{ storeUser.lastname }}
            </p>
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