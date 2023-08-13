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