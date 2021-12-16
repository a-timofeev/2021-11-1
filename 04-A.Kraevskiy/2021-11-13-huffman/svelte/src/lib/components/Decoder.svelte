<script>
	import { huffmanDecode } from '$lib/scripts/huffman';

	let inputText = '';

	let decodedText = '';
	$: {
		const result = huffmanDecode(inputText);
		if (result === undefined) decodedText = 'wrong code';
		else decodedText = result;
	}
</script>

<textarea bind:value={inputText} />
<textarea value={decodedText} readonly />
