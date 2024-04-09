<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { pageNavigateDirection } from '$lib/Page.svelte'

	interface Link {
		url: string
		text?: string
		imageUrl?: string
	}

	const links: { url: string; text?: string; imageUrl?: string }[] = [
		{ url: '/', text: '/' },
		{ url: 'https://github.com/fruup/svelte-ticker-board', imageUrl: '/github-mark-white.svg' },
	]

	// let xDown: number | null = null
	// let yDown: number | null = null

	// const handleTouchStart = (e: TouchEvent) => {
	// 	const firstTouch = e.touches[0]
	// 	xDown = firstTouch.clientX
	// 	yDown = firstTouch.clientY
	// }

	// const handleTouchMove = (e: TouchEvent) => {
	// 	if (!xDown || !yDown) return

	// 	const xUp = e.touches[0].clientX
	// 	const yUp = e.touches[0].clientY

	// 	const xDiff = xDown - xUp
	// 	const yDiff = yDown - yUp

	// 	if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 10) {
	// 		const offset = xDiff > 0 ? 1 : -1
	// 		const index = links.indexOf($page.url.pathname.substring(1))
	// 		const dst = links[((index >= 0 ? index : 0) + links.length + offset) % links.length]

	// 		$pageNavigateDirection = xDiff > 0 ? 'l' : 'r'

	// 		goto('/' + dst)

	// 		xDown = null
	// 		yDown = null
	// 	}
	// }

	const handleClickLink = (link: Link) => {
		const fromIndex = links.findIndex(({ url }) => url === $page.url.pathname)
		const toIndex = links.indexOf(link)
		$pageNavigateDirection = fromIndex < toIndex ? 'l' : 'r'
	}
</script>

<!-- <svelte:window on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} /> -->

<nav>
	{#each links as link}
		{@const url = link.url}
		{@const text = link.text}
		{@const imageUrl = link.imageUrl}
		{@const isInternal = url.startsWith('/')}

		<a
			class:active={$page.url.pathname === url}
			href={url}
			on:click={() => handleClickLink(link)}
			target={isInternal ? '_blank' : undefined}
		>
			{#if text}
				{text}
			{:else if imageUrl}
				<img src={imageUrl} />
			{/if}
		</a>
	{/each}
</nav>

<style lang="sass">
	nav
		display: flex
		align-items: center
		gap: 2em
	
	a 
		color: white

	a:hover 
		color: grey

	a.active 
		color: var(--color-accent)
		text-decoration-color: white

	img
		width: 1.5em
</style>
