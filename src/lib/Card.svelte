<script lang="ts">
	import { onDestroy } from 'svelte'
	import { writable } from 'svelte/store'

	export let letter: string
	export let placeInWord: number
	export let wordLength: number
	export let duration: number // per letter in ms
	export let backgroundColor: [number, number, number] = [31, 31, 31]
	export let alphabet: string
	export let easing: (x: number) => number
	export let wordIndex = 0

	$: _alphabet = ' ' + alphabet

	const _letter = writable<string>(' ')

	const updateLetter = (old: string): string => {
		sourceLetter = old
		targetLetter = letter

		start = undefined

		const slice = _alphabet.slice(_alphabet.indexOf(sourceLetter)) + _alphabet
		letters = slice.slice(0, slice.indexOf(targetLetter) + 1)

		currentLetter = letters[0]
		nextLetter = letters[1] ?? currentLetter
		centerLetter = currentLetter

		setTimeout(() => {
			cancelAnimationFrame(frameHandle)
			frameHandle = requestAnimationFrame(_frame)
		}, (placeInWord + wordIndex) * 125)

		return letter
	}

	$: if (letter) _letter.update(updateLetter)

	let sourceLetter
	let targetLetter

	let centerElem: HTMLElement

	let currentLetter: string, nextLetter: string
	let centerLetter: string

	let letters: string = ' '

	let centerElemClass = 'top'

	$: f = placeInWord / (wordLength - 1)

	let frameHandle: number
	let start: number | undefined

	const resetState = () => {
		centerLetter = ' '
		currentLetter = ' '
		nextLetter = ' '

		if (centerElem?.style) {
			centerElem.style.background = `rgb(
				${backgroundColor[0]},
				${backgroundColor[1]},
				${backgroundColor[2]}
			)`
			centerElem.style.rotate = `x 0deg`
		}

		cancelAnimationFrame(frameHandle)
	}

	export const frame = (t: number) => {
		if (!centerElem?.style) return resetState()

		const i = Math.floor(t)

		currentLetter = letters[i] ?? ''
		nextLetter = letters[i + 1] ?? currentLetter

		if (!currentLetter) {
			// This happens sometimes when changing tabs...
			// Reset state.
			return resetState()
		}

		const t2 = 2 * (t - i)
		const f = 1 - 0.3 * Math.sin((t - i) * Math.PI)

		centerElem.style.background = `rgb(
			${f * backgroundColor[0]},
			${f * backgroundColor[1]},
			${f * backgroundColor[2]}
		)`
		centerElem.style.rotate = `x ${((t2 >= 1 ? 1 : 0) * 2 - t2) * 90}deg`

		if (t2 < 1) {
			centerLetter = currentLetter
			centerElemClass = 'top'
		} else {
			centerLetter = nextLetter
			centerElemClass = 'bottom'
		}
	}

	const _frame = (timestamp: number) => {
		if (!start) start = timestamp

		// t in [0, letters.length)
		let t = (timestamp - start) / duration
		t = easing(t / letters.length) * letters.length

		if (t < letters.length - 1) {
			frame(t)
			cancelAnimationFrame(frameHandle)
			frameHandle = requestAnimationFrame(_frame)
		} else {
			frame(letters.length - 1)

			start = undefined
		}
	}

	onDestroy(() => {
		cancelAnimationFrame(frameHandle)
	})
</script>

<span style:perspective-origin={`${-200 * (2 * f - 1)}%`}>
	<div class="top">
		<span class="letter">{nextLetter ?? ' '}</span>
	</div>

	<div bind:this={centerElem} class={centerElemClass + ' center'}>
		<span class="letter">{centerLetter ?? ' '}</span>
	</div>

	<div class="bottom back">
		<span class="letter">{currentLetter ?? ' '}</span>
	</div>
</span>

<style>
	span {
		perspective: 5cm;

		position: relative;

		display: grid;
		place-content: center;

		width: 1.25em;
		height: 1.75em;

		--border-radius: 0.15em;
		--gap: 1px;
	}

	.top,
	.bottom,
	.center {
		display: grid;
		place-content: center;

		overflow: hidden;

		position: absolute;
		left: 0;
		right: 0;

		height: 50%;

		background: #1f1f1f;
	}

	.top {
		border-bottom: 1px solid black;
	}
	.bottom {
		border-top: 1px solid black;
	}

	.center {
		z-index: 1;
	}

	.top {
		top: 0;
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);

		transform-origin: bottom;
	}

	.bottom {
		bottom: 0;
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);

		transform-origin: top;
	}

	.top .letter,
	.center .letter {
		translate: 0 25%;
	}

	.bottom .letter {
		translate: 0 -25%;
	}
</style>
