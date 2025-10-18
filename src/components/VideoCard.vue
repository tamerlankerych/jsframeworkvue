<template>
  <div class="video-card">
    <img :src="thumbnail" alt="thumbnail" class="thumbnail" />
    <div class="video-info">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <img :src="avatar" alt="avatar" style="width:32px;height:32px;border-radius:50%;" />
        <h3>{{ title }}</h3>
      </div>
      <p class="channel">{{ channel }}</p>
      <p class="views">{{ views.toLocaleString() }} views</p>
      <button @click="$emit('toggle-like', id)">
        {{ liked ? '💔 Unlike' : '👍 Like' }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  channel: { type: String, required: true },
  views: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  avatar: { type: String, required: true },
  liked: { type: Boolean, default:false }
})
</script>
