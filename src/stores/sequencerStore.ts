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
		lowestNote: 0,
		highestNote: 127,
		notes: [] as number[],
		currentPosition: 0,
	}),
	getters: {
		getNoteAtPosition: (state: SequencerState) => (position: number) => state.melody[position],
		getMelodyNotes: (state: SequencerState): number => state.melody.length,
		getMelody: (state: SequencerState) => state.melody.map(note => midiNoteToString(note)),
		getCurrentPosition: (state: SequencerState) => state.currentPosition,
		getLowestNote: (state: SequencerState) => state.lowestNote,
		getHighestNote: (state: SequencerState) => state.highestNote,
		getNotes: (state: SequencerState) => state.notes,
	},
	actions: {
		initMelody() {
			this.notes = Array.from({ length: this.melodyLength }).fill(0)
			for (let i = 0; i < this.melodyLength; i++) {
				this.notes[i] = mapToNoteRange(i, 0, this.melodyLength, this.lowestNote, this.highestNote)
			}
		},
		changeNoteAtPosition(position: number, note: number) {
			this.melody[position] = note
		},

		resetMelody() {
			this.currentPosition = 0	
			this.melody = Array(this.melodyLength)
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
		setActiveTrack(asset: AudioAsset) {
			this.resetMelody();
			this.currentPosition = 0;
			const minMelodyValue = Math.min(...asset.melody);
			const maxMelodyValue = Math.max(...asset.melody);
			const mappedMelody = asset.melody.map(note => mapToNoteRange(note, minMelodyValue, maxMelodyValue, this.lowestNote, this.highestNote));
			this.melody = mappedMelody;
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