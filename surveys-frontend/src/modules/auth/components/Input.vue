<script lang="ts" setup>
    import { toRef } from 'vue'
    import { useField } from 'vee-validate'

    const props = defineProps({
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
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
        }
    })
    
    const name = toRef(props, 'name')

    const { value: inputValue,
            errorMessage,
            handleChange,
            meta
        }
        = useField(name, undefined, {
        initialValue: props.value
    })

</script>

<template>
    <div class="relative w-full mb-3">
        <label
            class="block text-gray-600 text-xs font-bold mb-2"
            :for="props.name"
        >
        {{ props.label }}
        </label>

        <input
            :type="props.typeInput"
            class="border-2 px-3 py-3 placeholder-gray-400 text-gray-500 bg-white rounded-lg text-sm focus:outline-none w-full ease-linear transition-all duration-150"
            :class="{ 'border-red-400' : errorMessage, 'border-green-400' : meta.valid }"
            :id="props.name"
            :name="name"
            :value="inputValue"
            :placeholder="props.placeholder"
            @input="handleChange"
        />

        <p class="text-sm"
            :class="{ 'text-red-500' : errorMessage }"
            v-show="errorMessage || meta.valid">
            {{ errorMessage }}
        </p>

    </div>
</template>