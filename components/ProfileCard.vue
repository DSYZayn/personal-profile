<template>
  <div class="rounded-xl p-5 shadow-lg bg-white border border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100">
    <div class="flex items-center gap-4">
      <div class="w-28 h-28 rounded-lg flex-none overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-200 to-slate-100 dark:border-white/5 dark:from-slate-900 dark:to-slate-800">
        <img :src="avatar" alt="avatar" class="w-full h-full object-cover" />
      </div>
      <div class="min-w-0">
        <div class="text-xl font-bold whitespace-pre-wrap break-words">{{ displayName }}</div>
        <div class="text-sm text-slate-400 whitespace-normal break-words">{{ email }}</div>
        <div class="mt-1 text-sm text-slate-400 whitespace-pre-wrap break-words">{{ displayTagline }}</div>
      </div>
    </div>

    <div class="mt-3 flex gap-2">
      <slot name="social" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  tagline: { type: String, default: '' },
  avatar: { type: String, default: '' }
})

// Support both actual newlines and literal "\\n" sequences from JSON or other sources
const displayName = computed(() => (props.name ?? '').replace(/\\n/g, '\n'))
const displayTagline = computed(() => (props.tagline ?? '').replace(/\\n/g, '\n'))
</script>
