import { defineConfig } from 'rollup'
import svelte from 'rollup-plugin-svelte'
import typescript from '@rollup/plugin-typescript'
import sveltePreprocess from 'svelte-preprocess'
import css from 'rollup-plugin-css-only'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

const production = true
const minify = false

const name = 'index'

export default [
	// types
	defineConfig({
		input: 'src/types/index.d.ts',
		output: [{ file: 'output/index.d.ts', format: 'esm' }],
		plugins: [dts()],
	}),

	// JS
	defineConfig({
		input: 'src/lib/index.ts',
		output: {
			dir: 'output',
			name,
			// format: 'iife',
			format: 'esm',
			sourcemap: minify,
		},
		plugins: [
			svelte({
				compilerOptions: {
					dev: !production,
					sourcemap: minify,
				},
				preprocess: sveltePreprocess(),
			}),
			css({ output: name + '.css' }),
			resolve({ browser: true, dedupe: ['svelte'] }),
			commonjs(),
			typescript(),
			minify && terser(),
		],
	}),
]
