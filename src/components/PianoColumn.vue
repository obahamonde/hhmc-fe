<script setup lang="ts">
const sequencerStore = useSequencerStore()
const determinePianoKey = (note:number)=>{
  let noteStr = midiNoteToString(note)
  if (noteStr.includes("#")) {
    return 'blackKey'
  }

  const lKeys = ["C", "E", "F", "B"]
  if (lKeys.some(el => noteStr.includes(el))) {
    return 'whiteKey L'
  }
  return 'whiteKey T'
}

const position = ref(0)

const selectNote = (note: number) => {
  if (note === sequencerStore.getNoteAtPosition(position.value)) {
    sequencerStore.changeNoteAtPosition(position.value, 0)
    position.value++
  } else {
    props.synth.triggerAttackRelease(midiNoteToString(note), "8n");
    sequencerStore.changeNoteAtPosition(position.value, note)
    position.value++
  }
}

const props = defineProps({
  synth: null
})

   

const keyToMidiNoteMapping: Record<string, number> = {
  q: 60,
  2: 61,
  w: 62,
  3: 63,
  e: 64,
  r: 65,
  5: 66,
  t: 67,
  6: 68,
  y: 69,
  7: 70,
  u: 71,
  i: 72,
  9: 73,
  o: 74,
  0: 75,
  p: 76,
  z: 77,
  s: 78,
  x: 79,
  d: 80,
  c: 81,
  v: 82,
  g: 83,
  b: 84,
  h: 85,
  n: 86,
  j: 87,
  m: 88,
  k: 89,
  ",": 90,
  l: 91,
}
const handleKey = (e:KeyboardEvent)=>{
  if (e.key in keyToMidiNoteMapping){
    const note = keyToMidiNoteMapping[e.key]
    selectNote(
      note
    )
  }
} 

const show = ref(false)


const handleClick = (e:KeyboardEvent)=>{
  show.value = !show.value
  if (show.value){
    addKey()
  } else {
    removeKey()
    sequencerStore.resetMelody()
    position.value = 0
  }
}

const addKey = ()=>{
  window.addEventListener('keydown', handleKey)
}

const removeKey = ()=>{
  window.removeEventListener('keydown', handleKey)
}

onBeforeUnmount(()=>{
  removeKey()
})

onMounted(()=>{
  addKey()
})

</script>


<template>
  <div class="piano">
    <Icon icon="mdi-piano" class="x3 cp scale top-0 absolute translate-y--12" @click="handleClick"/>
    <div v-for="(note,index) in sequencerStore.notes" :class="determinePianoKey(note)"
    @click="$emit('note-clicked',{note,position:index})" v-if="show">
    </div>
  </div>
</template>
  
  
<style scoped lang="scss">
  .piano {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  
  .whiteKey{
    height: 22px;
    width: 80px;
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    border-radius: 0 5px 5px 0;
    box-shadow: -1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background: linear-gradient(to bottom,#eee 0%,#fff 100%);
  }
  
  .whiteKey:active {
    border-left: 1px solid #777;
    border-bottom: 1px solid #999;
    border-right: 1px solid #999;
    box-shadow: 2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background: linear-gradient(to bottom,#fff 0%,#e9e9e9 100%);
  }
  
  .blackKey {
    height: 22px;
    margin-top: -11px;
    margin-bottom: -11px;
    width: 50px;
    box-shadow: -1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background: linear-gradient(45deg,#222 0%,#555 100%);
    z-index: 1;
  }

  .blackKey:active {
  box-shadow: 2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
  background: linear-gradient(45deg,#111 0%,#444 100%);
}
  
  .T{
    height: 44px;
  }
  .L {
    height: 33px;
  }
  </style>