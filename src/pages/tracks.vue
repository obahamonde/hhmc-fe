<script setup lang="ts">
const count = ref(0)
const embedding = ref()
const handleUpload = async (data: File) => {
  const formData = new FormData()
  formData.append('file', data)
  const { data:response } = await useFetch("/api/upload", {
    method: "POST",
    body: formData,
  })
  embedding.value = unref(response)
}

</script>
<template>
  <div>
    <h1>Home</h1>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
  <div>{{ embedding }}</div>
  <Upload @upload="handleUpload($event)">
    <template #data="{ data }">
 
      <div>
        <p>Name: {{ data.name }}</p>
        <p>Size: {{ data.size }}</p>
        <p>Type: {{ data.contentType }}</p>
        <p>Last Modified: {{ data.lastModified }}</p>
        <p>URL: {{ data.url }}</p>
        <p>File: {{ data.file }}</p>
      </div>
      </template>
      
    </Upload>
</template>