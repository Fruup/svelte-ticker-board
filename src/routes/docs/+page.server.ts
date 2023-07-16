import { marked } from 'marked'
import hljs from 'highlight.js/lib/common'
import type { PageServerLoad } from './$types'

marked.setOptions({
	highlight: (code, language, callback) => {
		return hljs.highlight(code, { language }).value
	},
})

export const load: PageServerLoad = async () => {
	const files = import.meta.glob('./docs.md', { as: 'raw' })
	const text = await Object.values(files)[0]()

	const html = marked(text)

	return {
		html,
	}
}

export const prerender = true
