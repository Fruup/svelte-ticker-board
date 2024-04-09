import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	base: '/svelte-ticker-board',
	server: {
		fs: {
			allow: ['output'],
		},
		port: 8080,
	},
	resolve: {
		alias: {
			$output: path.resolve(__dirname, './output'),
		},
	},
}

export default config
