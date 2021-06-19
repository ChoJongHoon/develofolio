export const getScrollbarWidth = () => {
	if (typeof document === 'undefined') {
		return 15
	}

	const outer = document.createElement('div')
	outer.style.width = '100px'
	outer.style.overflow = 'scroll'
	outer.style.position = 'absolute'

	document.body.appendChild(outer)

	const widthNoScroll = outer.offsetWidth
	// force scrollbars

	// add innerdiv
	const inner = document.createElement('div')
	inner.style.width = '100%'
	outer.appendChild(inner)

	const widthWithScroll = inner.offsetWidth

	// remove divs
	outer.parentNode?.removeChild(outer)

	return widthNoScroll - widthWithScroll
}
