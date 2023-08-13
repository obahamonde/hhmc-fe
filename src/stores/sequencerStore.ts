import { defineStore, acceptHMRUpdate } from 'pinia'
import { AudioAsset } from '~/types';
import * as Tone from 'tone'

interface SequencerState {
	melodyLength: number,
	melody: number[],
	lowestNote: number,
	highestNote: number,
	notes: number[],
	currentPosition: number,
}


function mapToNoteRange(value: number, min: number, max: number, lowestNote: number, highestNote: number): number {
	const normalizedValue = (value - min) / (max - min);
	return Math.round(normalizedValue * (highestNote - lowestNote) + lowestNote);
}

export const useSequencerStore = defineStore('sequencerStore', {

	state: () => ({
		melodyLength: 64,
		melody: [] as number[],
		lowestNote: 21,     // C4
		highestNote: 108,    // B5
		notes: [] as number[],
		currentPosition: 0,
	}),
	getters: {
		getNoteAtPosition: (state: SequencerState) => (position: number) => state.melody[position],
		getMelodyNotes: (state: SequencerState): number => state.melody.filter(note => note != 0).length,
		getMelody: (state: SequencerState) => state.melody.filter(note => note != 0),
	},
	actions: {
		initMelody() {
			this.notes = Array.from({ length: this.highestNote - this.lowestNote + 1 }, (_, i) => this.highestNote - i);
			this.melody = Array(this.melodyLength).fill(0);
		},

		changeNoteAtPosition(position:number, note:number) {
			this.melody[position] = note
		},

		resetMelody() {
			this.currentPosition = 0	
			this.melody = Array(this.melodyLength).fill(0);
		},
		pushNoteToMelody(note: number) {
			this.melody[this.melodyLength - 1] = note
		},
		toggleNoteInMelody(note: number) {
			const index = this.melody.lastIndexOf(note)
			this.melody[index+1] = note
				
		},
		addNoteToMelody(note: number) {
			this.melody.push(note)
		},
		pushNextNoteToMelody(note: number) {
			this.melody.shift()
			this.melody.push(note)
		},
		setActiveTrack(asset: AudioAsset) {
			this.resetMelody();
			this.currentPosition = 0;
		    const mappedMelody = asset.melody.map(note => mapToNoteRange(note, 21, 60, this.lowestNote, this.highestNote))
			this.melody = mappedMelody
		},
		async loadUrl(url:string) {
			const player = 	new Tone.Player(url)
			await player.load(url)
			const buffer = player.buffer
			const channelData = buffer.getChannelData(0)
			const melody = channelData
			this.resetMelody()
			this.setActiveTrack({
				name: url,
				url: url,
				melody: Array.from(melody)
			})
		}
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSequencerStore, import.meta.hot))
}