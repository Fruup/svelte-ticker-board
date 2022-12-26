<script lang="ts">
	import Board from '$lib/Board.svelte'
	import Page from '$lib/Page.svelte'
	import Heading from '$lib/Heading.svelte'

	const words = ['Sydney', 'Melbourne', 'Berlin', 'New York']
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const timePerLetter = 150
</script>

<Page>
	<Heading text="ticker board" />

	<div id="board-container">
		<Board {timePerLetter} duration={7500} {alphabet} {words} />
	</div>
</Page>

<style>
	#board-container {
		font-size: 2rem;
		font-family: 'JetBrains Mono', monospace;
	}
</style>
