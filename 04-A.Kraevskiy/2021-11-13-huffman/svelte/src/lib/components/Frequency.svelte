<script>
	import { flip } from 'svelte/animate';

	export let frequency = [];
</script>

<div>
	<h4><slot>Frequency</slot></h4>
	{#each frequency as freq (freq.letter)}
		<span class="frequency-element" animate:flip>'{freq.letter}': {freq.code}</span>
	{/each}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@90&display=swap');
	.frequency-element {
		display: block;
		margin: 0px;
		font-family: 'Roboto', sans-serif;
		font-family: 'Roboto Mono', monospace;
		font-size: small;
	}

	h4 {
		margin-bottom: 5px;
		margin-top: 5px;
	}

	div {
		align-self: flex-start;
	}
</style>
