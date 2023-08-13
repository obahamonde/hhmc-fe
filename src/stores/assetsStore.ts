import { acceptHMRUpdate, defineStore } from 'pinia'
import { AudioAsset } from '../types';
export const useAssetsStore = defineStore('assets',()=>{
	const state = reactive({
		assets: [] as string[],
		asset: null as AudioAsset | null,
	})

	const assetToSample = async (name:string) => {
		const url = `/static/${name}`;
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();

		// Create an AudioContext
		const audioContext = new AudioContext();

		// Decode the audio data using the Web Audio API
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

		// Extract the samples for the first channel (e.g., left channel in a stereo file)
		const samples = audioBuffer.getChannelData(0);

		return {
			name,
			url,
			melody: Array.from(samples),
		};
	};



	const handleAssets = async (name: string) => {
		const asset = await assetToSample(name)
		state.asset = asset
	}

	return {
		state,
		handleAssets,
		
	}
})

if (import.meta.hot) {
	acceptHMRUpdate(useAssetsStore, import.meta.hot)
}