export declare interface BoardProps {
	/**
	 * The characters that are used on the board.
	 * If this is `undefined`, the alphabet is constructed
	 * from all words in the `words` array.
	 */
	alphabet?: string

	/**
	 * The words that are displayed on the board.
	 * They are converted to upper-case and aligned row-wise.
	 */
	words: string[]

	/**
	 * The time in milliseconds it takes for one letter to disappear.
	 * Note that when using an easing function, not all letters take the same amount of time.
	 */
	durationPerLetter?: number

	/**
	 * The time in milliseconds the board waits until all characters are reset.
	 */
	duration?: number
}

export declare class Board {
	constructor(args: { target: HTMLElement | null; props: BoardProps })
}
