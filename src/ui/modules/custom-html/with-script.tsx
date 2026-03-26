'use client'

import { useEffect, useRef } from 'react'
import type { CustomHtml } from '@/sanity/types'

/**
 * @description If the code includes a <script> tag, ensure the script is re-run on each render
 */
export default function WithScript({
	code,
	className,
	...props
}: Partial<CustomHtml['html']> & React.ComponentProps<'div'>) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = ref.current
		if (!element || !code) return

		const parsed = document.createRange().createContextualFragment(code)
		element.appendChild(parsed)

		return () => {
			element.innerHTML = ''
		}
	}, [code])

	if (!code) return null

	return <div ref={ref} className={className} {...props} />
}
