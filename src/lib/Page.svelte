<script context="module" lang="ts">
	import { writable } from 'svelte/store'

	export const pageNavigateDirection = writable<'r' | 'l'>()
</script>

<script lang="ts">
	import { fly } from 'svelte/transition'

	$: xIn = 16 * ($pageNavigateDirection === 'l' ? 1 : -1)
	$: xOut = -xIn

	const duration = 500
</script>

<div
	class="page"
	in:fly={{ x: xIn, duration, delay: duration / 2 }}
	out:fly={{ x: xOut, duration }}
>
	<slot />
</div>

<style>
	.page {
		position: absolute;
	}
</style>
