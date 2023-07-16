<script lang="ts">
	import { fly } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import { spring } from 'svelte/motion'
	import { pageNavigateDirection, pageSwipeDelta } from '$lib/Navigation.svelte'
	import type { TransitionConfig } from 'svelte/transition'
	import { browser } from '$app/environment'
	import { navigating } from '$app/stores'

	const duration = 750

	const offset = spring(0, { damping: 1, stiffness: 0.5 })

	$: $offset = $pageSwipeDelta
	$: xIn = 16 * ($pageNavigateDirection === 'l' ? 1 : -1)

	let s0 = 0
	let t0 = 0
	let v = 0
	let translate = ''

	$: if (browser && !$navigating) {
		const t = window.performance.now()
		v = (1000 * ($offset - s0)) / (t - t0)
		s0 = $offset
		t0 = t

		translate = `${$offset}px`
	}

	const outro = (e: Element): TransitionConfig => ({
		duration,
		css: (u, t) => {
			return `
			translate: ${s0 + t * v - 0.5 * v * t * t}px;
			opacity: ${1 - cubicOut(t)};
		`
		},
	})
</script>

<div class="page" style:translate in:fly={{ x: xIn, duration, delay: 0.5 * duration }} out:outro>
	<slot />
</div>

<style>
	.page {
		position: absolute;

		padding: 1rem 0.5rem;
	}
</style>
