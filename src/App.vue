<template>
  <div :class="['app-container', theme]">
    <div class="controls">
      <input v-model="searchQuery" placeholder="Search by title or channel..." />
      <button @click="sortByViews">Sort by Views</button>
      <button @click="toggleTheme">Toggle {{ theme === 'dark' ? 'Light' : 'Dark' }}</button>
    </div>

    <p v-if="loading">Loading videos...</p>
    <p v-else-if="filteredVideos.length === 0">No videos found.</p>

    <div v-else class="video-grid">
      <VideoCard
        v-for="video in filteredVideos"
        :key="video.id"
        :id="video.id"
        :title="video.title"
        :channel="video.channel"
        :views="video.views"
        :thumbnail="video.thumbnail"
        :avatar="video.avatar"
        :liked="video.liked"
        @toggle-like="toggleLikeVideo"
      />
    </div>

    <div v-if="!loading" class="likes-info">
      ❤️ Total Likes: {{ likes }} | 🎥 Found: {{ filteredVideos.length }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVideos } from './composables/useVideos'
import VideoCard from './components/VideoCard.vue'

const { videos, likes, searchQuery, filteredVideos, toggleLike, sortByViews, loading } = useVideos()
const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.body.className = theme.value === 'dark' ? 'dark' : ''
}

// обработчик события из VideoCard
function toggleLikeVideo(videoId) {
  const video = videos.value.find(v => v.id === videoId)
  if(video) toggleLike(video)
}
</script>
