<script lang="ts">
	export let text: string
	export let element: string = 'h1'

	$: _text = text.toUpperCase().split(' ')
</script>

<svelte:element this={element}>
	{#each _text as word, i}
		{#if i === 0}
			<span>_</span>{word}<span>_</span>
		{:else}
			{word}<span>_</span>
		{/if}
	{/each}
</svelte:element>

<style>
	span {
		color: var(--color-accent);
	}
</style>
