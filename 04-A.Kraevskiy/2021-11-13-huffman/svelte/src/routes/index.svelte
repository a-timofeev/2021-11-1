<script>
	import Encoder from '$lib/components/Encoder.svelte';
	import Decoder from '$lib/components/Decoder.svelte';
</script>

<main>
	<h1>Huffman</h1>
	<div>
		<Encoder />
		<Decoder />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
	}

	h1 {
		align-self: center;
	}
	div {
		display: flex;
		flex-flow: row wrap;
		gap: 10px;
		justify-content: center;
	}

	:global(body) {
		background-color: #f0f0f0;
	}

	:global(textarea) {
		border-radius: 0px 3px 3px 3px;
		border-width: 0px;
		margin-top: 2px;
	}
</style>
