export const useSpeech = () => {
	const speech = useSpeechRecognition({
		continuous: true,
	});
	const SpeechGrammarList =
		window.SpeechGrammarList || window.webkitSpeechGrammarList;
	const speechRecognitionList = new SpeechGrammarList();
	speechRecognitionList.addFromString(1);
	speech.recognition!.grammars = speechRecognitionList;
	speech.recognition!.lang = "es-MX";
	const { isListening, result } = speech;

	return {
		isListening,
		result,
		speech,
	};
};
