## Installation

Either copy the `*.svelte` files from the `lib` folder into your Svelte project and use them like any other Svelte component

_or_

compile the Svelte components to vanilla JavaScript using `pnpm run rollup` and use the generated files in the `output` folder.

## Usage

```html
<script>
	import Board from 'path/to/component/Board.svelte'

	const words = ['This', 'Is', 'Awesome']
</script>

<Board {words} timePerLetter="{250}" />
```

```html
<script type="module">
	import { Board } from 'path/to/library'

	const board = new Board({
		target: document.querySelector('#container'),
		props: {
			words: ['Hello', 'world', '!'],
			timePerLetter: 250,
		},
	})
</script>
```
