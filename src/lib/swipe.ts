import type { Action } from 'svelte/action'
import type { Writable } from 'svelte/store'

interface SwipeParams {
	swipeDelta: Writable<number>
	velocityThreshold?: number
	onNavigate?: (direction: 'left' | 'right') => void
}

export const swipe: Action<HTMLElement, SwipeParams> = (node, params) => {
	if (!params) return

	const velocityThreshold = params.velocityThreshold ?? 0.5

	let x0: number | null = null
	let x_ = 0,
		y_ = 0,
		t_ = 0
	let vx = 0,
		vy = 0

	const handleTouchStart = (e: TouchEvent) => {
		if (e.touches.length !== 1 || window.visualViewport?.scale !== 1) return

		const touch = e.touches[0]
		x0 = touch.clientX
	}

	const handleTouchEnd = () => {
		if (x0 === null) return

		if (Math.abs(vx) > velocityThreshold) {
			params?.onNavigate?.(vx > 0 ? 'right' : 'left')
		}

		x0 = null
		params.swipeDelta.set(0)
	}

	const handleTouchMove = (e: TouchEvent) => {
		if (x0 === null) return

		const x = e.touches[0].clientX
		const y = e.touches[0].clientY
		const dx = x - x0

		const t = e.timeStamp
		vx = (x - x_) / (t - t_)
		vy = (y - y_) / (t - t_)

		if (Math.abs(vx) > Math.abs(vy)) {
			params.swipeDelta.set(dx)
		}

		t_ = t
		x_ = x
		y_ = y
	}

	// register event listeners
	window.addEventListener('touchstart', handleTouchStart)
	window.addEventListener('touchmove', handleTouchMove)
	window.addEventListener('touchend', handleTouchEnd)

	return {
		destroy: () => {
			// remove event listeners
			window.removeEventListener('touchstart', handleTouchStart)
			window.removeEventListener('touchmove', handleTouchMove)
			window.removeEventListener('touchend', handleTouchEnd)
		},
	}
}
