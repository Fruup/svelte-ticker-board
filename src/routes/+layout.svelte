<script lang="ts">
	import '../styles/index.css'
	import { page } from '$app/stores'
	import { setContext } from 'svelte'
	import Navigation from '$lib/Navigation.svelte'

	$: setContext('isDynamic', $page.url.searchParams.has('dynamic'))
</script>

<header>
	<Navigation />
</header>

<main>
	<slot />
</main>

<style lang="sass">
	header
		font-size: max(21px, 1rem)

		width: 100%
		padding: 1em

		background-color: #111

		border-bottom: 5px solid var(--color-accent)

		display: grid
		place-content: center

	main 
		width: 100%
		height: 100%

		padding: 1rem 0.5rem

		margin: auto
		max-width: 768px

		text-align: center

		display: flex
		flex-direction: column
		gap: 1rem
		align-items: center

	:global(body) 
		margin: 0 auto

		/* max-width: 768px; */
		min-height: -webkit-fill-available
		min-height: 100vh

		display: grid
		grid-template-rows: auto 1fr
</style>
