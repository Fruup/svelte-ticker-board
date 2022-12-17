<script lang="ts">
	import { onMount } from 'svelte'
	import Card from './Card.svelte'

	export let alphabet: string | undefined = undefined
	export let words = ['sample', 'words']
	export let durationPerLetter = 250
	export let duration = 7500
	export let easing = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2) // quad in/out

	$: _alphabet =
		alphabet ||
		Array.from(new Set(capitalWords.join('')))
			.sort()
			.join('')

	let _durationPerLetter = durationPerLetter
	let displayedWords: string[] = []

	$: wordLength = Math.max(...words.map((w) => w.length))
	$: capitalWords = words.map((w) => w.toUpperCase())
	$: paddedWords = capitalWords.map((w) => w.padEnd(wordLength, ' '))
	$: emptyWords = paddedWords.map((w) => ' '.repeat(w.length))

	onMount(() => {
		let timer: NodeJS.Timeout

		const setPaddedWords = () => {
			displayedWords = paddedWords

			_durationPerLetter = durationPerLetter
			timer = setTimeout(setEmptyWords, duration)
		}

		const setEmptyWords = () => {
			displayedWords = emptyWords

			_durationPerLetter = durationPerLetter / 2
			timer = setTimeout(setPaddedWords, 0.667 * duration)
		}

		setPaddedWords()

		return () => {
			clearTimeout(timer)
		}
	})

	let frameFuncs: ((t: number) => void)[] = []
</script>

{#if _alphabet}
	{#each displayedWords as word}
		<div>
			{#each word as letter, i}
				<Card
					alphabet={_alphabet}
					duration={_durationPerLetter}
					{letter}
					placeInWord={i}
					{wordLength}
					{easing}
					bind:frame={frameFuncs[i]}
				/>
			{/each}
		</div>
	{/each}
{/if}

<style>
	div {
		--gap: 0.2rem;

		font-family: var(--board-font), monospace;
		font-weight: 700;

		display: flex;
		gap: var(--gap);
		flex-wrap: wrap;

		padding-bottom: var(--gap);

		user-select: none;

		overflow: hidden;
	}
</style>
