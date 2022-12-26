<script context="module" lang="ts">
	export interface BoardContext {
		alphabet: string
		timePerLetter: number
		timePerCycle: number
		easing: (t: number) => number
	}
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import Word from './Word.svelte'

	const boardContext = writable<BoardContext>({
		alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		easing: (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2), // quad in/out
		timePerCycle: 7500,
		timePerLetter: 250,
	})

	export let words = ['sample', 'words']

	export let alphabet: string | undefined = undefined
	export let timePerLetter: BoardContext['timePerLetter']
	export let duration: BoardContext['timePerCycle']
	export let easing: BoardContext['easing'] | undefined = undefined

	$: $boardContext.alphabet =
		alphabet ||
		Array.from(new Set(capitalWords.join('')))
			.sort()
			.join('')

	$: if (easing) $boardContext.easing = easing
	$: if (duration) $boardContext.timePerCycle = duration
	$: if (timePerLetter) $boardContext.timePerLetter = timePerLetter

	setContext('boardContext', boardContext)

	let displayedWords: string[] = []

	$: wordLength = Math.max(...words.map((w) => w.length))
	$: capitalWords = words.map((w) => w.toUpperCase())
	$: paddedWords = capitalWords.map((w) => w.padEnd(wordLength, ' '))
	$: emptyWords = paddedWords.map((w) => ' '.repeat(w.length))

	let timer: NodeJS.Timeout

	const setPaddedWords = () => {
		displayedWords = paddedWords

		clearTimeout(timer)
		timer = setTimeout(setEmptyWords, duration)
	}

	const setEmptyWords = () => {
		displayedWords = emptyWords

		clearTimeout(timer)
		timer = setTimeout(setPaddedWords, 0.667 * duration)
	}

	onMount(() => {
		setPaddedWords()

		return () => {
			clearTimeout(timer)
		}
	})
</script>

<div data-hello-there-for-information-visit="https://github.com/Fruup/svelte-ticker-board">
	{#each displayedWords as word, i}
		<Word {word} wordIndex={i} />
	{/each}
</div>
