<script setup lang="ts">
    import { Survey1 } from '../interfaces/survey'
    import { useRouter, useRoute } from 'vue-router'
    import { useSurvey } from '../composables/useSurvey'
    import { defineEmits } from 'vue'
    import Swal from 'sweetalert2'
    
    const props = defineProps<{
        data: Survey1
    }>()

    const emits = defineEmits(['deleteQuestion'])

    const router = useRouter()
    const route = useRoute()

    const viewDetail = () => {
        router.push({ name: 'survey-detail', params: { id: props.data.id  }, query: { history: route.name as string } })
    }
    
    const edit = () => {
        router.push({ name: 'survey-edit', params: { id: props.data.id } })
    }

    const deleteItem = async ( id : string ) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres eliminar esta encuesta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        })

        if (result.isConfirmed) {
            const { deleteSurvey } = useSurvey()
            await deleteSurvey(id)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Encuesta Eliminada',
                showConfirmButton: false,
                timer: 1500
            })
            
            emits('deleteQuestion', id)
        }
        
    }

</script>

<template>
    <div class="w-full mb-2 bg-gray-100 px-4 py-4 rounded-md block justify-between
        sm:flex">
        <span class="font-bold mr-2 block whitespace-nowrap overflow-hidden">{{ props.data.title }}</span>
        <div class="flex justify-center mt-1 ml-4 sm:mt-0">
            <span class="block px-2 py-1 rounded-lg bg-cf-2 text-white mr-2 hover:cursor-pointer"
                @click="viewDetail">
                <font-awesome-icon icon="fa-solid fa-arrow-right" />
            </span>
            <span class="block px-2 py-1 rounded-lg bg-green-800/50 text-white mr-2 hover:cursor-pointer"
                @click="edit">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </span>
            <span class="block px-2 py-1 rounded-lg bg-cf-4 text-white hover:cursor-pointer"
                @click="deleteItem(props.data.id!)">
                <font-awesome-icon icon="fa-solid fa-trash" />
            </span>
        </div>
    </div>
</template>