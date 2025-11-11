<template>
  <div class="min-h-screen bg-white dark:bg-gradient-to-b dark:from-[#071025] dark:to-[#081226]">
    <div class="mx-auto md:w-3/4 w-full py-12 px-7 text-slate-900 dark:text-slate-100">
  <div class="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-7">
  <div class="min-h-0 flex flex-col gap-2">
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
        
        <Section title="Memo">
          <!-- limit visible height to roughly two items; enable internal scroll when more -->
          <div class="overflow-auto max-h-[12rem] custom-scrollbar">
            <div class="divide-y divide-slate-100 dark:divide-slate-700">
              <div v-for="m in memos" :key="m.id || m.text" class="p-3 rounded-lg mb-2 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                <!-- Memo only needs note; limit each item to 2 lines -->
                <div class="text-sm clamp-4 whitespace-pre-wrap break-words">{{ m.note || m.text || '' }}</div>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <div class="min-h-0">
        <!-- Right column: split into vertical sections that share height on md+ and stack on small screens -->
  <div class="flex flex-col md:h-full min-h-0 gap-2">
          <!-- Publications: scrolls internally when overflow -->
          <div class="min-h-0 flex flex-col max-h-[50vh] md:max-h-[25vh] overflow-hidden">
            <Section class="flex-1 min-h-0">
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

          <!-- Grants -->
          <div class="min-h-0 flex flex-col max-h-[50vh] md:max-h-[25vh] overflow-hidden">
            <Section :title="`Grants (${grants.length})`" class="flex-1 min-h-0">
              <div class="overflow-auto min-h-0 flex-1 custom-scrollbar">
                <div class="divide-y divide-slate-100 dark:divide-slate-700">
                  <div v-for="g in grants" :key="g.id || g.title" class="p-3">
                    <div class="font-semibold"><span class="clamp-2">{{ g.title || g.text || '' }}</span></div>
                    <div class="text-sm text-slate-400 mt-1">{{ g.year || g.amount || '' }}</div>
                    <div v-if="g.sponsor" class="text-sm text-slate-400">{{ g.sponsor }}</div>
                  </div>
                  <div v-if="!grants.length" class="p-3 text-sm text-slate-400">No grants to display yet.</div>
                </div>
              </div>
            </Section>
          </div>

          <!-- Awards & Honors -->
          <div class="min-h-0 flex flex-col max-h-[50vh] md:max-h-[25vh] overflow-hidden">
            <Section :title="`Awards & Honors (${rewards.length})`" class="flex-1 min-h-0">
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

          <!-- Patents & Softwares -->
          <div class="min-h-0 flex flex-col max-h-[50vh] md:max-h-[25vh] overflow-hidden">
            <Section :title="`Patents & Softwares (${patents.length})`" class="flex-1 min-h-0">
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
        </div>
      </div>
      </div>
    </div>
  </div>
    <!-- Floating action buttons (desktop) / bottom CTA (mobile) -->
    <div class="md:fixed md:right-4 md:bottom-6 z-50 flex flex-col items-end gap-3">
      <!-- Back to top: visible on md+ only (polished for light mode contrast) -->
      <button
        @click="scrollToTop"
        class="hidden md:inline-flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-2xl hover:scale-105 active:scale-100 transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-300/40"
        title="Back to top"
        aria-label="Back to top"
      >
        <!-- polished up arrow (higher contrast on light mode) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-sky-600" viewBox="0 0 20 20" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 11.5L10 6l5.5 5.5" />
        </svg>
      </button>

      <!-- Details / Download button: fixed on md+, static (full-width) on small screens -->
      <a
        href="/cv_xingyuchen_planetary_science_AI.pdf"
        download
        class="w-full md:w-auto inline-flex items-center justify-center gap-3 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-md shadow-xl hover:scale-105 transform transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm md:text-base h-12 md:h-10"
        aria-label="Download my CV pdf for more details"
        title="Download my CV for more details"
      >
        <!-- download icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zM9 7a1 1 0 012 0v4.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586V7z" clip-rule="evenodd" />
        </svg>
        <span class="font-medium">More details?</span>
      </a>
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
const memos = ref([])
const patents = ref([])
const rewards = ref([])
const grants = ref([])

function extractYear(value) {
  if (value === undefined || value === null) return Number.NEGATIVE_INFINITY
  const match = String(value).match(/\d{4}/)
  return match ? Number(match[0]) : Number.NEGATIVE_INFINITY
}

function sortByYearDesc(items, valueResolver) {
  if (!Array.isArray(items)) return []
  return [...items].sort((a, b) => extractYear(valueResolver(b)) - extractYear(valueResolver(a)))
}

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

// Smooth scroll to top for the "Back to top" button
function scrollToTop() {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    // fallback
    window.scrollTo(0, 0)
  }
}

onMounted(async () => {
  // restore persisted theme
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') theme.value = saved
  applyTheme(theme.value)

  // Load everything from /info.json (single source of truth)
  try {
    const res = await fetch(`/info.json`)
    if (res.ok) {
      const json = await res.json()
      profile.value = json.profile || profile.value
      socialLinks.value = json.social || socialLinks.value
      publications.value = Array.isArray(json.publications)
        ? sortByYearDesc(json.publications, (item) => item.year || item.date)
        : publications.value
      education.value = Array.isArray(json.education) ? json.education : education.value
      work.value = Array.isArray(json.work) ? json.work : work.value
      memos.value = Array.isArray(json.memos) ? json.memos : memos.value
      patents.value = Array.isArray(json.patents)
        ? sortByYearDesc(json.patents, (item) => item.year)
        : patents.value
      rewards.value = Array.isArray(json.rewards)
        ? sortByYearDesc(json.rewards, (item) => item.year)
        : rewards.value
      grants.value = Array.isArray(json.grants)
        ? sortByYearDesc(json.grants, (item) => item.year || item.amount)
        : grants.value
    } else {
      console.warn('Failed to load /info.json: ', res.status)
    }
  } catch (e) {
    console.warn('Error fetching /info.json, using defaults', e)
  }
})

watch(theme, (v) => applyTheme(v))
</script>
