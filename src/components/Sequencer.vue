<script setup lang="ts">
const props = defineProps({
    synth: null
})

const positionRef = ref(0)
const handleClick = (note:number,position:number)=>{
    sequencerStore.toggleNoteInMelody(note)
    props.synth.triggerAttackRelease(midiNoteToString(note), "8n");
    positionRef.value++

}
const thisPosition = computed(()=>{
    return positionRef.value
})

const sequencerStore = useSequencerStore()
</script>
<template>
    <div class="w-full overflow-y-auto h-full px-32" >
        <SequencerControls :synth="props.synth" />
        <div class="sequencer">
            <PianoColumn 
            class="left-20 absolute"
             @note-clicked="handleClick($event.note,$event.position)"
             :synth="props.synth"
             :position-in-melody="thisPosition"
            />
            <NoteColumn v-for="(note, i) in sequencerStore.melodyLength" :position-in-melody=i :synth="props.synth"
           
        
            />
        </div>
    </div>
</template>
  
  
<style scoped lang="scss">
  .sequencer{
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  }
  </style>
  