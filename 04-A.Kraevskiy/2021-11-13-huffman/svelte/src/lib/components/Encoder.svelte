<script>
	import { huffmanEncode } from '$lib/scripts/huffman';

	let inputText = '';

	let encodedText = '';
	$: {
		const result = huffmanEncode(inputText);
		encodedText = result.fullCode;
	}
</script>

<textarea bind:value={inputText} />
<textarea value={encodedText} readonly />
