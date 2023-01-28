<script lang="ts" setup>

    const props = defineProps({
        ide: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        typeInput: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            required: true
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const handleChange = ( event: any ) => {
        emit('update:modelValue', event.target.value)     
    }


</script>

<template>
    <div class="relative w-full mb-3">
        <label
            class="block text-gray-600 text-xs font-bold mb-2"
            :for="props.ide"
        >
        {{ props.label }}
        </label>
        <input
            :type="props.typeInput"
            class="border-2 px-3 py-3 placeholder-gray-400 text-gray-500 bg-white rounded-lg text-sm focus:outline-none w-full ease-linear transition-all duration-150"
            :id="props.ide"
            :placeholder="props.placeholder"
            @input="handleChange"
        />
    </div>
</template>