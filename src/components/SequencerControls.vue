
<script setup>
const props = defineProps({
    synth: null
})

const speed = ref(0.01)

const sequencerStore = useSequencerStore()
const store = usePianoStore()

const play = ()=>{
    if (!store.playing) {
        store.playPosition = -1
        store.playing = true
        store.sequencerPlaying = true
        store.callbackId = setInterval(playNote, speed.value)
    } else {
        stop()
    }
}

const stop = ()=>{
    store.stopPlaying()
}

const playNote = ()=>{
    store.playPosition++
    if (store.playPosition >= sequencerStore.notes.length) {
        store.playPosition = 0
    }
    const note = sequencerStore.notes[store.playPosition]
    if (note !== 0) {
        props.synth.triggerAttackRelease(midiNoteToString(note), "8n");
    }
}           

const resetMelody = ()=>{
    sequencerStore.resetMelody()
}

    

</script>


<template>
    <div class="
    row center bg-gray-500 text-info sh rounded-lg
    w-auto
    ">
        <input type="range" v-model="speed" :min="0.01" :max="200" />

        <button class="btn-icon m-2" @click="play()">
           <Icon v-if="store.playing" 
           class="x2"
           icon="mdi-stop" />
            <Icon v-else
            class="x2"
            icon="mdi-play" />
        </button>
        <button class="btn-icon m-2" @click="sequencerStore.resetMelody()">
           <Icon icon="mdi-trash-can-outline"
           class="x2"
           />
        </button>
    </div>
</template>
  