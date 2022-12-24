<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import Board from '$lib/Board.svelte'
	import Page from '$lib/Page.svelte'

	$: isDynamic = getContext('isDynamic')
	let target: HTMLElement

	onMount(async () => {
		if (!isDynamic || !target) return

		await import('$output/index.css')
		const { Board } = await import('$output')

		new Board({
			target,
			props: {
				alphabet,
				words,
				durationPerLetter,
			},
		})
	})

	const words = ['Sydney', 'Melbourne', 'Berlin', 'New York']
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const durationPerLetter = 150
</script>

<Page>
	<h1>
		<span>_</span>TICKER<span>_</span>BOARD<span>_</span>
	</h1>

	{#if isDynamic}
		<p>
			The Svelte component is first compiled to plain JS and CSS and then dynamically instantiated
			on this page.
		</p>
	{/if}

	<div id="board-container">
		{#if isDynamic}
			<div bind:this={target} />
		{:else}
			<Board {durationPerLetter} {alphabet} {words} />
		{/if}
	</div>
</Page>

<style>
	h1 > span {
		color: var(--color-accent);
	}

	#board-container {
		font-size: 2rem;
		font-family: 'JetBrains Mono', monospace;
	}
</style>
