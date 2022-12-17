<script lang="ts">
	import '../styles/index.css'
	import { page } from '$app/stores'
	import { setContext } from 'svelte'

	let isDynamic = $page.url.searchParams.has('dynamic')

	setContext('isDynamic', isDynamic)

	const links = ['', 'docs']
</script>

<header>
	<nav>
		{#each links as link}
			{@const href = '/' + link}

			<a class:active={$page.url.pathname === href} {href}>
				{link || '/'}
			</a>
		{/each}
	</nav>
</header>

<main>
	<slot />
</main>

<style>
	header {
		width: 100%;
		padding: 1rem;

		background-color: #111;

		border-bottom: 5px solid var(--color-accent);

		display: grid;
		place-content: center;
	}

	nav {
		display: flex;
		gap: 2rem;
	}

	a {
		color: white;
	}

	a:hover {
		color: grey;
	}

	a.active {
		color: var(--color-accent);
		text-decoration-color: white;
	}

	main {
		width: 100%;
		height: 100%;

		padding: 1rem 0.5rem;

		margin: auto;
		max-width: 768px;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	:global(body) {
		margin: 0 auto;

		/* max-width: 768px; */
		min-height: -webkit-fill-available;
		min-height: 100vh;

		display: grid;
		grid-template-rows: auto 1fr;
	}
</style>
