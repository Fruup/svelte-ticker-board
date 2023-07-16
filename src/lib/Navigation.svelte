<script context="module" lang="ts">
	import { writable } from 'svelte/store'

	export const pageNavigateDirection = writable<'r' | 'l'>()
	export const pageSwipeDelta = writable(0)
</script>

<script lang="ts">
	import { page } from '$app/stores'

	export let links: string[]

	const handleClickLink = (link: string) => {
		const fromIndex = links.indexOf($page.url.pathname.substring(1))
		const toIndex = links.indexOf(link)
		$pageNavigateDirection = fromIndex < toIndex ? 'l' : 'r'
	}
</script>

<nav>
	{#each links as link}
		{@const href = '/' + link}

		<a class:active={$page.url.pathname === href} {href} on:click={() => handleClickLink(link)}>
			{link || '/'}
		</a>
	{/each}
</nav>

<style lang="sass">
	:global(.page)
		transition: translate 100ms ease-out

	nav
		display: flex
		gap: 2em
	
	a 
		color: white

	a:hover 
		color: grey

	a.active 
		color: var(--color-accent)
		text-decoration-color: white
</style>
