<template>
  <div class="flex gap-2 items-center">
    <a
      v-if="links.github"
      :href="links.github"
      target="_blank"
      rel="noopener"
      aria-label="GitHub"
      :title="'GitHub'"
      class="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 dark:border-white/5 text-current hover:bg-slate-100 dark:hover:bg-white/5 hover:border-indigo-500 hover:text-indigo-500 transition"
    >
      <span class="w-4 h-4 inline-block" aria-hidden v-html="icons.github"></span>
    </a>

    <a
      v-if="links.zhihu"
      :href="links.zhihu"
      target="_blank"
      rel="noopener"
      aria-label="Zhihu"
      :title="'Zhihu'"
      class="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 dark:border-white/5 text-current hover:bg-slate-100 dark:hover:bg-white/5 hover:border-indigo-500 hover:text-indigo-500 transition"
    >
      <span class="w-4 h-4 inline-block" aria-hidden v-html="icons.zhihu"></span>
    </a>

    <a
      v-if="links.xiaohongshu"
      :href="links.xiaohongshu"
      target="_blank"
      rel="noopener"
      aria-label="Xiaohongshu"
      :title="'Xiaohongshu'"
      class="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 dark:border-white/5 text-current hover:bg-slate-100 dark:hover:bg-white/5 hover:border-indigo-500 hover:text-indigo-500 transition"
    >
      <span class="w-4 h-4 inline-block" aria-hidden v-html="icons.xiaohongshu"></span>
    </a>

    <a
      v-if="links.blog"
      :href="links.blog"
      target="_blank"
      rel="noopener"
      aria-label="Blog"
      :title="'Blog'"
      class="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 dark:border-white/5 text-current hover:bg-slate-100 dark:hover:bg-white/5 hover:border-indigo-500 hover:text-indigo-500 transition"
    >
      <span class="w-4 h-4 inline-block" aria-hidden v-html="icons.blog"></span>
    </a>

    <button
      @click="emit('toggle-theme')"
      aria-label="Toggle theme"
      class="px-3 py-2 rounded-md border border-slate-200 dark:border-white/5 flex items-center gap-2 whitespace-nowrap hover:bg-slate-100 dark:hover:bg-white/5 hover:border-indigo-500 hover:text-indigo-500 transition"
    >
      <span v-if="theme === 'light'" class="flex items-center gap-2"><span aria-hidden>🌞</span><span>Light</span></span>
      <span v-else class="flex items-center gap-2"><span aria-hidden>🌙</span><span>Dark</span></span>
    </button>
  </div>
</template>

<script setup>
import githubRaw from '~/public/icons/github.svg?raw'
import zhihuRaw from '~/public/icons/zhihu.svg?raw'
import xiaohongshuRaw from '~/public/icons/xiaohongshu.svg?raw'
import blogRaw from '~/public/icons/blog.svg?raw'

const props = defineProps({
  links: { type: Object, default: () => ({}) },
  theme: { type: String, default: 'light' }
})

const emit = defineEmits(['toggle-theme'])

// Expose raw SVGs so they can be inlined and inherit currentColor
const icons = {
  github: githubRaw,
  zhihu: zhihuRaw,
  xiaohongshu: xiaohongshuRaw,
  blog: blogRaw
}
</script>
