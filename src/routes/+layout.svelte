<script lang="ts">
	import '../styles/app.sass'
	import Navigation from '$lib/Navigation.svelte'

	const links = ['', 'docs']
</script>

<header>
	<Navigation {links} />
</header>

<main>
	<slot />
</main>

<style lang="sass">
	header
		position: sticky
		top: 0
		padding: 1em
		z-index: 1

		font-size: max(21px, 1rem)

		background-color: #111

		border-bottom: 5px solid var(--color-accent)

		display: grid
		place-content: center

	main
		position: relative

		width: 100%
		height: 100%

		margin: auto

		max-width: 720px

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

		overflow-x: clip
</style>
