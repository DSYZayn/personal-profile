<template>
  <div class="h-screen overflow-hidden bg-white dark:bg-gradient-to-b dark:from-[#071025] dark:to-[#081226]">
    <div class="mx-auto md:w-3/4 w-full py-12 px-7 text-slate-900 dark:text-slate-100 h-full">
  <div class="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-7 h-full">
  <div class="min-h-0 flex flex-col gap-7">
        <ProfileCard
          :name="profile.name"
          :email="profile.email"
          :tagline="profile.tagline"
          :avatar="profile.avatar"
        >
          <template #social>
            <SocialButtons :links="socialLinks" :theme="theme" @toggle-theme="toggleTheme" />
          </template>
        </ProfileCard>

        <Section title="Education">
          <div v-for="e in education" :key="e.id || e.text" class="p-3 rounded-lg mb-2 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700">{{ e.text }}</div>
        </Section>
        
        <Section title="Work Experience">
          <div v-for="w in work" :key="w.id || w.text" class="p-3 rounded-lg mb-2 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700">{{ w.text }}</div>
        </Section>
      </div>
      <div class="min-h-0">
        <!-- Right column: split into three vertical sections that share height on md+ and stack on small screens -->
        <div class="flex flex-col h-full min-h-0 gap-7">
          <!-- Publications: scrolls internally when overflow -->
          <div class="min-h-0 flex flex-col md:max-h-[calc((100%-3.5rem)/3)]">
            <Section class="h-full">
              <template #title>
                <a :href="socialLinks.researchgate || '#'
                " target="_blank" rel="noopener" class="hover:underline">Publications ({{ publications.length }})</a>
              </template>
              <div class="overflow-auto min-h-0 flex-1 custom-scrollbar">
                <div class="divide-y divide-slate-100 dark:divide-slate-700">
                  <div v-for="p in publications" :key="p.id || p.title" class="p-3">
                    <div class="font-semibold">
                      <a :href="p.url || '#'" target="_blank" rel="noopener" class="hover:underline text-current block clamp-2">{{ p.title }}</a>
                    </div>
                    <div class="text-sm text-slate-400 mt-1">{{ (p.authors || p.author) ? (p.authors || p.author) + (p.year || p.date ? ' · ' + (p.year || p.date) : '') : (p.year || p.date || '') }}</div>
                    <div v-if="p.journal" class="text-sm text-slate-400">{{ p.journal }}</div>
                    <div v-else class="text-sm text-slate-400">{{ p.summary || p.abstract || '' }}</div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          <!-- Patents & Softwares -->
          <div class="min-h-0 flex flex-col md:max-h-[calc((100%-3.5rem)/3)]">
            <Section :title="`Patents & Softwares (${patents.length})`" class="h-full">
              <div class="overflow-auto min-h-0 flex-1 custom-scrollbar">
                <div class="divide-y divide-slate-100 dark:divide-slate-700">
                  <div v-for="pt in patents" :key="pt.id || pt.title" class="p-3">
                    <div class="font-semibold"><span class="clamp-2">{{ pt.title || pt.text || '' }}</span></div>
                    <div class="text-sm text-slate-400 mt-1">{{ pt.year || '' }}</div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          <!-- Rewards -->
          <div class="min-h-0 flex flex-col md:max-h-[calc((100%-3.5rem)/3)]">
            <Section :title="`Rewards (${rewards.length})`" class="h-full">
              <div class="overflow-auto min-h-0 flex-1 custom-scrollbar">
                <div class="divide-y divide-slate-100 dark:divide-slate-700">
                  <div v-for="r in rewards" :key="r.id || r.title" class="p-3">
                    <div class="font-semibold"><span class="clamp-2">{{ r.title || r.text || '' }}</span></div>
                    <div class="text-sm text-slate-400 mt-1">{{ r.year || '' }}</div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from '~/components/ProfileCard.vue'
import SocialButtons from '~/components/SocialButtons.vue'
import Section from '~/components/Section.vue'
import { ref, onMounted, watch } from 'vue'

// reactive state sourced from public/info.json
const profile = ref({ name: '', email: '', tagline: '', avatar: '' })
const socialLinks = ref({})
const publications = ref([])
const education = ref([])
const work = ref([])
const patents = ref([])
const rewards = ref([])

// default to light theme
const theme = ref('light')

function applyTheme(t) {
  if (t === 'dark') document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

onMounted(async () => {
  // restore persisted theme
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') theme.value = saved
  applyTheme(theme.value)

  // Load everything from /info.json (single source of truth)
  try {
    // Use the build/runtime base URL so this works when the site is served under a subpath
    const base = import.meta.env.BASE_URL || '/'
    const res = await fetch(`${base}info.json`)
    if (res.ok) {
      const json = await res.json()
      profile.value = json.profile || profile.value
      socialLinks.value = json.social || socialLinks.value
      publications.value = Array.isArray(json.publications) ? json.publications : publications.value
      education.value = Array.isArray(json.education) ? json.education : education.value
      work.value = Array.isArray(json.work) ? json.work : work.value
      patents.value = Array.isArray(json.patents) ? json.patents : patents.value
      rewards.value = Array.isArray(json.rewards) ? json.rewards : rewards.value
    } else {
      console.warn('Failed to load /info.json: ', res.status)
    }
  } catch (e) {
    console.warn('Error fetching /info.json, using defaults', e)
  }
})

watch(theme, (v) => applyTheme(v))
</script>
