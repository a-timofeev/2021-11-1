<script>
	import { huffmanDecode, huffmanEncode } from '$lib/scripts/huffman';
	import PerformanceCounter from '$lib/components/PerformanceCounter.svelte';
	import Frequency from '$lib/components/Frequency.svelte';

	let inputText = '';

	let decodedText = '';
	let frequency = '';
	let codes = '';
	$: {
		let decodedText = huffmanDecode(inputText);
		if (decodedText === undefined) decodedText = null;
		else {
			const result = huffmanEncode(decodedText);

			frequency = Object.entries(result.frequencies || {})
				.map(([letter, code]) => {
					return { letter, code };
				})
				.sort((a, b) => b.code - a.code);

			codes = frequency.map(({ letter }) => {
				return { letter, code: result.codes[letter] };
			});
		}
	}
</script>

<div>
	<h2>Decoding</h2>
	<lable>
		Input
		<textarea bind:value={inputText} />
	</lable>

	<lable>
		Result
		<textarea
			class:wrong={decodedText === null}
			value={decodedText === null ? 'wrong code' : decodedText}
			readonly
		/>
	</lable>
	<PerformanceCounter original={decodedText} encoded={inputText} />

	<Frequency {frequency} />
	<Frequency frequency={codes}>Codes</Frequency>
</div>

<style>
	div {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	textarea {
		display: block;
		margin-bottom: 8px;
	}

	textarea.wrong {
		color: gray;
	}
</style>
