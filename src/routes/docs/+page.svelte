<script lang="ts">
	import Heading from '$lib/Heading.svelte'
	import Page from '$lib/Page.svelte'
	import type { PageServerData } from './$types'
	import './style.sass'

	export let data: PageServerData
	const { html } = data
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/kimbie-dark.min.css"
	/>
</svelte:head>

<Page>
	<Heading text="docs" />

	<div class="docs-content">
		{@html html}
	</div>
</Page>

<style>
	.docs-content {
		width: 100%;
		text-align: left;
	}
</style>
