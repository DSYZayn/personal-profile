<template>
  <div v-bind="$attrs" class="rounded-xl p-4 bg-white border border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 flex flex-col">
    <h3 class="mb-2 text-lg font-semibold">
      <slot name="title">{{ title }}</slot>
    </h3>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({ title: { type: String, required: false, default: '' } })
</script>
