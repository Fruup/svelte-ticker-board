<script lang="ts">
	import Card from './Card.svelte'

	export let word: string
	export let wordIndex: number
</script>

<div class="word">
	{#each word as letter, i}
		<Card {letter} placeInWord={i} {wordIndex} />
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
