<script>
	import { huffmanEncode } from '$lib/scripts/huffman';
	import PerformanceCounter from '$lib/components/PerformanceCounter.svelte';
	import Frequency from '$lib/components/Frequency.svelte';

	let inputText = '';

	let encodedText = '';
	let frequency = [];
	let codes = [];
	$: {
		const result = huffmanEncode(inputText);
		encodedText = result.fullCode;
		frequency = Object.entries(result.frequencies || {})
			.map(([letter, code]) => {
				return { letter, code };
			})
			.sort((a, b) => b.code - a.code);

		codes = frequency.map(({ letter }) => {
			return { letter, code: result.codes[letter] };
		});
	}
</script>

<div>
	<h2>Encoding</h2>

	<lable>
		Input
		<textarea bind:value={inputText} />
	</lable>

	<lable>
		Result
		<textarea value={encodedText} readonly />
	</lable>

	<PerformanceCounter original={inputText} encoded={encodedText} />

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
</style>
