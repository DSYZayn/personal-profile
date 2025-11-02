<template>
  <div class="rounded-xl p-5 shadow-lg bg-white border border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100">
    <div class="flex items-center gap-4">
      <div class="w-28 h-28 rounded-lg flex-none overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-200 to-slate-100 dark:border-white/5 dark:from-slate-900 dark:to-slate-800">
        <img :src="avatar" alt="avatar" class="w-full h-full object-cover" />
      </div>
      <div>
        <div class="text-xl font-bold">{{ name }}</div>
        <div class="text-sm text-slate-400">{{ email }}</div>
        <div class="mt-1 text-sm text-slate-400">{{ tagline }}</div>
      </div>
    </div>

    <div class="mt-3 flex gap-2">
      <slot name="social" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  tagline: { type: String, default: '' },
  avatar: { type: String, default: '' }
})
</script>
