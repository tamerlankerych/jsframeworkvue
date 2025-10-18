import { ref, computed, watch, onMounted } from 'vue'

export function useVideos() {
  const videos = ref([])
  const searchQuery = ref('')
  const likes = ref(0)
  const loading = ref(true)

  // добавим поле liked для каждого видео
  const mockData = [
    { id: 1, title: 'Vue 3 Tutorial', channel: 'Code Academy', views: 10234, thumbnail: 'https://i.ytimg.com/vi/FXpIoQ_rT_c/hqdefault.jpg', avatar:'https://i.pravatar.cc/40?img=1', liked:false },
    { id: 2, title: 'Learn Composition API', channel: 'Vue Mastery', views: 7450, thumbnail: 'https://i.ytimg.com/vi/ZqgiuPt5QZo/hqdefault.jpg', avatar:'https://i.pravatar.cc/40?img=2', liked:false },
    { id: 3, title: 'Build a YouTube Clone', channel: 'Web Dev Simplified', views: 25300, thumbnail: 'https://i.ytimg.com/vi/2FeymQoKvrk/hqdefault.jpg', avatar:'https://i.pravatar.cc/40?img=3', liked:false },
  ]

  onMounted(() => {
    setTimeout(() => {
      videos.value = mockData
      loading.value = false
    }, 1200) // тут и есть loading
  })

  const filteredVideos = computed(() =>
    videos.value.filter(v =>
      v.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )

  watch(searchQuery, (newVal) => {
    console.log('searchQuery changed:', newVal)
  })

  function toggleLike(video) {
    video.liked = !video.liked
    likes.value = videos.value.filter(v => v.liked).length
  }

  const sortByViews = () => {
    videos.value.sort((a,b) => b.views - a.views)
  }

  return { videos, searchQuery, likes, filteredVideos, toggleLike, sortByViews, loading }
}
