<script setup lang="ts">
const title = ref("Hip Hop Movimiento Cultural")
const thisTitle = ref("")
const typewrite = () => {
  for (let i = 0; i < title.value.length; i++) {
    setTimeout(() => {
      thisTitle.value += title.value[i]
    }, 100 * i)
  }
  }
watchEffect(() => {
  typewrite()
})
const router = useRouter()
</script>


<template>
  <div class="container col center h-full w-full top-0 fixed" style="background-image: url('/bg.png'); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed; background-blend-mode: multiply; background-color: rgba(0,0,0,0.5);">
      <h1 class="font-script text-success top-0 absolute z-50 top-72 font-extrabold text-2xl">{{ thisTitle }}</h1>
    <img src="/favicon.svg" class="x16 rf sh top-4 fixed sh-lg" />
    <button class="btn-get bottom-16 absolute " @click="router.push('/studio')">HHMC Studio</button>
  </div>
  
</template>

<style scoped lang="scss">
*{
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body{
  overflow: hidden;
}


</style>



<route lang="yaml">
meta:
  title: Hip Hop Movimiento Cultural
  description: Hip Hop Movimiento Cultural
  metaTags:
    - name: keywords
      content: Hip Hop Movimiento Cultural
  layout: home
</route>