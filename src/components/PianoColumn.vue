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
  // If clicking the same note, deselect it instead
  if (note === sequencerStore.getNoteAtPosition(position.value)) {
    sequencerStore.changeNoteAtPosition(position.value, 0)
    position.value++
  } else {
    // play note
    props.synth.triggerAttackRelease(midiNoteToString(note), "8n");
    sequencerStore.changeNoteAtPosition(position.value, note)
    position.value++
  }
}

const props = defineProps({
  synth: null
})

   

const keyToMidiNoteMapping: Record<string, number> = {
  'z': 60,
  's': 61,
  'x': 62,
  'd': 63,
  'c': 64,
  'v': 65,
  'g': 66,
  'b': 67,
  'h': 68,
  'n': 69,
  'j': 70,
  'm': 71,
  ',': 72,
  'l': 73,
  '.': 74,
  ';': 75,
  '/': 76,
  'q': 72,
  '2': 73,
  'w': 74,
  '3': 75,
  'e': 76,
  'r': 77,
  '5': 78,
  't': 79,
  '6': 80,
  'y': 81,
  '7': 82,
  'u': 83,
  'i': 84,
  '9': 85,
  'o': 86,
  '0': 87,
  'p': 88,
  '[': 89,
  '=': 90,
  ']': 91,
  'Backspace': 92,
  'Enter': 93,
  '1': 94,
  '4': 95,
  '8': 96,
  'a': 96,
  'f': 97,
  'k': 98,
  ' ': 99,
  'ArrowUp': 100,
  'ArrowDown': 101,
  'ArrowLeft': 102,
  'ArrowRight': 103,
  'Shift': 104,
  'Control': 105,
  'Alt': 106,
  'Meta': 107,
  'Escape': 108,
  'Tab': 109,
  'CapsLock': 110,
  'F1': 111,
  'F2': 112,
  'F3': 113,
  'F4': 114,
  'F5': 115,
  'F6': 116,
  'F7': 117,
  'F8': 118,
  'F9': 119,
  'F10': 120,
  'F11': 121,
  'F12': 122
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