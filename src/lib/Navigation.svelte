<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { pageNavigateDirection } from '$lib/Page.svelte'

	export let links: string[]

	let xDown: number | null = null
	let yDown: number | null = null

	const handleTouchStart = (e: TouchEvent) => {
		const firstTouch = e.touches[0]
		xDown = firstTouch.clientX
		yDown = firstTouch.clientY
	}

	const handleTouchMove = (e: TouchEvent) => {
		if (!xDown || !yDown) return

		const xUp = e.touches[0].clientX
		const yUp = e.touches[0].clientY

		const xDiff = xDown - xUp
		const yDiff = yDown - yUp

		if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 10) {
			const offset = xDiff > 0 ? 1 : -1
			const index = links.indexOf($page.url.pathname.substring(1))
			const dst = links[((index >= 0 ? index : 0) + links.length + offset) % links.length]

			$pageNavigateDirection = xDiff > 0 ? 'l' : 'r'

			goto('/' + dst)

			xDown = null
			yDown = null
		}
	}

	const handleClickLink = (link: string) => {
		const fromIndex = links.indexOf($page.url.pathname.substring(1))
		const toIndex = links.indexOf(link)
		$pageNavigateDirection = fromIndex < toIndex ? 'l' : 'r'
	}
</script>

<svelte:window on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} />

<nav>
	{#each links as link}
		{@const href = '/' + link}

		<a class:active={$page.url.pathname === href} {href} on:click={() => handleClickLink(link)}>
			{link || '/'}
		</a>
	{/each}
</nav>

<style lang="sass">
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
