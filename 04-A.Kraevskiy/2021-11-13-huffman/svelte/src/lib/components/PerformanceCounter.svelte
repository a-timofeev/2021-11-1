<script>
	export let encoded = '';
	export let original = '';

	let sizeOriginal = null;
	$: {
		if (original !== null) sizeOriginal = original.length * 16;
	}
	$: sizeEncoded = encoded.length;
</script>

<p>
	{#if sizeOriginal !== null}
		Original {sizeOriginal} bites
		<br />
		Encoded {sizeEncoded} bites<br />
		Ratio
		{#if sizeOriginal}
			{Math.floor((sizeEncoded / sizeOriginal) * 100) / 100}
		{/if}
	{:else}
		Wrong code :(
		<br />
		Encoded {encoded.length} bites ¯\_(ツ)_/¯
	{/if}
</p>

<style>
	p {
		align-self: flex-start;
	}
</style>
