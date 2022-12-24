<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { BoardContext } from './Board.svelte'
	import Card from './Card.svelte'

	export let word: string

	export let frameFuncs: ((t: number) => boolean)[] = []

	const boardContext = getContext<Writable<BoardContext>>('boardContext')
</script>

<div class="word">
	{#each word as letter, i}
		<Card {letter} placeInWord={i} wordLength={word.length} bind:frame={frameFuncs[i]} />
	{/each}
</div>

<style>
	.word {
		--gap: 0.2rem;

		font-family: var(--board-font), monospace;
		font-weight: 700;

		display: flex;
		gap: var(--gap);
		flex-wrap: wrap;

		padding-bottom: var(--gap);

		user-select: none;

		overflow: hidden;
	}
</style>
