<script setup lang="ts">
const showChat = ref(false)
const { state } = useStore()
const { isListening, result, speech } = useSpeech()
const message = ref('')
const wsRef = ref(null) as Ref<WebSocket | null>
const isTyping = ref(false)
	const sendMessage = (text: string) => {
  wsRef.value?.send(text);
 
	state.messages.unshift({
		content: text,
		role: 'user',
		namespace: "default"
	})
	 message.value = '';
	isTyping.value = true; // Update the typing status
};

const handleReceive = (e: any) => {
  state.messages.unshift({
		content: "",
		role: 'assistant',
		namespace: "default"
	})
  isTyping.value = false; // Update the typing status
};

const toggleSpeech = () => {
  if (isListening.value) {
    speech.stop();
  } else {
    speech.start();
    watch(result, (result:any) => {
      if (result) {
        message.value = result;
      }
    });
  }
};






</script>
<template>
<main v-if="state.user && showChat" class="pt-20 gap-4 min-w-32  h-90vh mt-6 sh w-90vw ml-24 mr-24 bg-gray-300 rounded lg br m-4"
>
<section  v-if="showChat">
<div v-if="showChat" class="z-50 rounded-lg scroll-y-auto">
<div class="col center">
	<Icon icon="mdi-close" class="x2 cp text-info hover:text-white scale cp right-4 rf bg-error p-1 x3 top-16 absolute" @click="showChat = !showChat" />
<WebSocket :url="'ws://localhost:8080/api/hhmc/'+state.user.ref" ref="wsRef" @receive="handleReceive($event)">
</WebSocket>	
</div>
<div class="col start" v-if="state.user">
  <div v-for="msg in state.messages" class="row center">
		<img :src="msg.role == 'user' ? state.user.picture : '/chatbot.svg'" class="x4 rf br m-8 scale" />
		<p :class="msg.role == 'assistant' ? 'right-4':'left-4'"
		class="bg-light text-primary p-2 rounded-lg"
		>{{ msg.content }}</p>


  </div>
</div>

</div>
<p class="flex row items-center justify-center bottom-0 absolute  w-90vw bg-primary py-2">
	<Icon :icon="isListening ? 'mdi-microphone-off' : 'mdi-microphone'" class="mx-2 x3 cp text-light scale" @click="toggleSpeech()" />
	<input  class="input  w-90vw mx-4"
	:class="isDark ? 'text-success':'text-primary'"
	v-model="message" @keyup.enter="sendMessage(message)" />

</p>
</section>
	</main>
	<img src="/chatbot.svg" class="x4 br m-8 fixed scale cp" v-else
	@click="showChat = !showChat"
	/>

</template>
