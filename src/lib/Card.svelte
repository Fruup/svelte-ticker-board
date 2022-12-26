<script lang="ts">
	import { getContext, onDestroy } from 'svelte'
	import { writable, type Writable } from 'svelte/store'
	import type { BoardContext } from './Board.svelte'

	export let letter: string
	export let placeInWord: number
	export let wordIndex: number
	export let backgroundColor: [number, number, number] = [31, 31, 31]

	const boardContext = getContext<Writable<BoardContext>>('boardContext')

	$: easing = $boardContext.easing
	$: timePerLetter = $boardContext.timePerLetter
	$: alphabet = $boardContext.alphabet

	$: _alphabet = ' ' + alphabet

	let sourceLetter: string
	let targetLetter: string
	let letters: string = ' '

	const _letter = writable<string>(' ')

	$: if (letter) _letter.update(updateLetter)

	$: k = timePerLetter * (letters.length - 1)

	let topElements: HTMLElement[] = []
	let bottomElements: HTMLElement[] = []

	let frameHandle: number | undefined = undefined
	let start = 0

	const updateLetter = (old: string): string => {
		sourceLetter = old
		targetLetter = letter

		const slice = _alphabet.slice(_alphabet.indexOf(sourceLetter)) + _alphabet
		letters = slice.slice(0, slice.indexOf(targetLetter) + 1) || ' '

		setTimeout(() => {
			if (typeof frameHandle !== 'undefined') cancelAnimationFrame(frameHandle)
			frameHandle = requestAnimationFrame(animation)
		}, (wordIndex + placeInWord) * 79)

		return letter
	}

	const frame = (timestamp: number): boolean => {
		const tn = Math.min(timestamp / k, 1)

		const t = (easing(tn) * k) / timePerLetter
		const i = Math.min(Math.floor(t), letters.length - 1) // letter index
		const t2 = t - i // [0, 1]

		const f = 1 - 0.3 * Math.sin(t2 * Math.PI)
		const background = `rgb(${backgroundColor.map((v) => f * v).join(',')})`

		if (letters.length > 1) {
			topElements.forEach((e) => {
				if (e) e.style.opacity = '0'
			})
			bottomElements.forEach((e) => {
				if (e) e.style.opacity = '0'
			})
		}

		if (t2 < 0.5) {
			if (topElements[i]) {
				topElements[i].style.opacity = '1'

				topElements[i].style.rotate = `x -${2 * t2 * 90}deg`
				topElements[i].style.backgroundColor = background
			}

			if (topElements[i + 1]) topElements[i + 1].style.opacity = '1'

			if (bottomElements[i]) bottomElements[i].style.opacity = '1'
		} else {
			if (bottomElements[i]) {
				bottomElements[i].style.opacity = '1'
				bottomElements[i].style.backgroundColor = background
			}

			if (bottomElements[i + 1]) {
				bottomElements[i + 1].style.opacity = '1'
				bottomElements[i + 1].style.rotate = `x ${2 * (1 - t2) * 90}deg`
			}

			if (topElements[i + 1]) topElements[i + 1].style.opacity = '1'
		}

		return tn < 1
	}

	const animation = (timestamp: number) => {
		if (!start) start = timestamp
		const t = timestamp - start

		if (frame(t)) frameHandle = requestAnimationFrame(animation)
		else start = 0
	}

	onDestroy(() => {
		if (frameHandle) cancelAnimationFrame(frameHandle)
	})
</script>

<div class="container">
	{#key letters}
		{#each letters as _, j}
			{@const i = letters.length - 1 - j}

			<div bind:this={topElements[i]} class="top" style:z-index={j} style:opacity={i === 0 ? 1 : 0}>
				<span>{letters[i]}</span>
			</div>

			<div
				bind:this={bottomElements[i]}
				class="bottom"
				style:z-index={i}
				style:opacity={i === 0 ? 1 : 0}
			>
				<span>{letters[i]}</span>
			</div>
		{/each}
	{/key}
</div>

<style>
	.container {
		position: relative;

		perspective: 6cm;
		perspective-origin: center;

		color: #eee;

		width: 1.25em;
		height: 1.75em;

		border-radius: var(--border-radius);
		background: #1f1f1f;

		--border-radius: 6px;
	}

	.top,
	.bottom {
		will-change: rotate, opacity, background-color;

		display: grid;
		place-content: center;

		position: absolute;
		left: 0;
		right: 0;

		opacity: 0;

		background: #1f1f1f;

		overflow: hidden;
	}

	.top {
		top: 0;
		bottom: 50%;

		border-bottom: 1px solid black;
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);

		transform-origin: bottom;
	}

	.bottom {
		top: 50%;
		bottom: 0;

		border-top: 1px solid black;
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);

		transform-origin: top;
	}

	.top span,
	.bottom span {
		position: absolute;
		left: 50%;
	}

	.top span {
		bottom: 0;
		translate: -50% 50%;
	}

	.bottom span {
		top: 0;
		translate: -50% -50%;
	}
</style>
