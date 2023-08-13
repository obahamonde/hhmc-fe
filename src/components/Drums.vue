<template>
    <div class="flex items-center justify-center gap-4">
      <button @click="play({ id: 'kick' })" label="Kick">🥁</button>
      <button @click="play({ id: 'hihat' })" label="Hi-hat">🎩</button>
      <button @click="play({ id: 'snare' })" label="Snare">🍗</button>
      <button @click="play({ id: 'cowbell' })" label="Cowbell">🔔</button>
    </div>
</template>
<script>
import { onMounted, onUnmounted } from 'vue'
import { useSound } from '@vueuse/sound'
import drumSfx from '/drum.wav'
const useKeyboardBindings = (map) => {
  const handlePress = (ev) => {
    const handler = map[ev.key]
    if (typeof handler === 'function') {
      handler()
    }
  }
  onMounted(() => {
    window.addEventListener('keydown', handlePress)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', handlePress)
  })
}

    const { play } = useSound(drumSfx, {
      sprite: {
        kick: [0, 350],
        hihat: [374, 160],
        snare: [666, 290],
        cowbell: [968, 200],
      },
    })
    useKeyboardBindings({
      1: () => play({ id: 'kick' }),
      2: () => play({ id: 'hihat' }),
      3: () => play({ id: 'snare' }),
      4: () => play({ id: 'cowbell' }),
    })
   
</script>2 