<template>
  <div class="fixed top-0 right-0 mt-16  bg-gray-500 b-2 b-black overflow-y-auto w-full text-white max-w-72"
  :class="show ? 'h-full' : 'h-16 overflow-hidden'"
  >
  <div>{{  sample }}</div>
    <div class="text-mx text-caption text-white p-4 border-b bg-gray-800 border-gray-700 row text-lg center top-0 absolute w-full max-w-72 cp"
     @click="show = !show"
    >Explorer <Icon :icon="show ?'mdi-close':'mdi-open-in-app'" class="cp scale m-1"
     
      />
  </div>
      <ul class="p-4 mt-16" v-if="show">
     <li class="mb-2" v-for="asset in state.assets">
       <p class="font-mono font-xs cp scale col center"
       @click="handleAsset(asset)"

    >

        {{ handle(asset) }}</p>
     </li>
   </ul>
  </div>
 
</template>

<script setup lang="ts">
const { state } = useAssetsStore()

const sequencerStore = useSequencerStore()

const sample = ref([]) as Ref<number[]>

onMounted(async () => {
  const { data } = await useFetch("/api/assets").json()
  state.assets = unref(data)
})
const show = ref(false)

const handle = (asset: string) => {
  return asset.split("/").pop()!.split(".")[0].substring(0, 20)
}

const handleAsset = async(asset: string) => {
  await sequencerStore.loadUrl(asset)
}
</script>
