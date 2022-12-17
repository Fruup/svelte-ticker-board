# Ticker Board

[See live demo](https://svelte-ticker-board.netlify.app/)

TODO: screenshot

## Usage

The privided type declarations should give enough information about library's parameters.
There are two intended ways to use the component:

### As a Svelte component

```svelte
<script>
	import Board from 'path/to/component/Board.svelte'

	const words = ['Hello', 'World']
</script>

<Board {words} duration={7500} durationPerLetter={150} />
```

### As plain JS

You can compile the Svelte component to plain JavaScript using rollup:

```bash
pnpm run rollup
```

This generates a `.js` and a `.css` file in the `output` folder which can be imported into your project:

```js
// createBoard.js

import { Board } from 'path/to/output/index.js'

// Wait for the target element to be accessible.
document.addEventListener('DOMContentLoaded', () => {
	// Instantiate the component. Your IDE should be able to provide type information here.
	new Board({
		target: document.querySelector('#target'),
		props: {
			words: ['Hello', 'World'],
			durationPerLetter: 150,
			duration: 7500,
		},
	})
})
```

```html
<!-- index.html -->

<html>
	<head>
		<!-- Import the compiled style sheet. -->
		<link rel="stylesheet" href="path/to/output/index.css" />

		<!--
			Use module type as the bundle is compiled for ES module syntax.
			This can be customized in rollup.config.js.
		-->
		<script type="module" src="createBoard.js"></script>
	</head>
	<body>
		<div id="target" />
	</body>
</html>
```
