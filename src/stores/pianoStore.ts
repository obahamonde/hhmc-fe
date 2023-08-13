import { defineStore, acceptHMRUpdate } from 'pinia'

interface PianoState {
	showSettings: boolean,
	minMelodyLengthSearch: number,
	searchResults: null | Array<Array<number>>,
	searchFn: ((a: Array<number>, b: Array<number>) => number) | null,
	chosenSearchFn: string,
	numOfResults: number,
	playing: boolean,
	callbackId: any,
	playPosition: number,
	sequencerPlaying: boolean,
}



const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const midiNoteToString = (note: number) => {
	let octave = Math.floor(note / 12) - 1;
	let noteName = notes[note % 12];
	return noteName + octave.toString();
};



export const usePianoStore = defineStore('store', {

	state: ():PianoState => ({
		showSettings: false,
		minMelodyLengthSearch: 3,
		searchResults: null,
		searchFn: null,
		chosenSearchFn: "lcs",
		numOfResults: 5,
		playing: false,
		callbackId: null,
		playPosition: -1,
		sequencerPlaying: false,
		
	}),
	getters: {
	},
	actions: {
		stopPlaying() {
			this.playing = false
			this.sequencerPlaying = false
			this.playPosition = -1
			clearInterval(this.callbackId)
		}
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePianoStore, import.meta.hot))
}