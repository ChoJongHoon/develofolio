import React, { useCallback, useEffect, useRef, useState } from 'react'

export type LayersContextType = {
	host: HTMLElement | null
	zIndex?: number
	addDocClickHandler: (fn: (e: MouseEvent) => void) => void
	removeDocClickHandler: (fn: (e: MouseEvent) => void) => void
	addEscapeHandler: (fn: (e: KeyboardEvent) => void) => void
	removeEscapeHandler: (fn: (e: KeyboardEvent) => void) => void
}

export const LayersContext = React.createContext<LayersContextType>({
	addDocClickHandler: defaultEventHandlerFn,
	removeDocClickHandler: defaultEventHandlerFn,
	addEscapeHandler: defaultEventHandlerFn,
	removeEscapeHandler: defaultEventHandlerFn,
	host: null,
	zIndex: undefined,
})

export const Provider = LayersContext.Provider
export const Consumer = LayersContext.Consumer

export type LayersManagerProps = {
	children: React.ReactNode
	zIndex?: number
}

export const LayersManager = ({ zIndex, children }: LayersManagerProps) => {
	const hostRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const [docClickHandlers, setDocClickHandlers] = useState<
		Array<(event: MouseEvent) => void>
	>([])

	const [escapeKeyHandlers, setEscapeKeyHandlers] = useState<
		Array<(event: KeyboardEvent) => void>
	>([])

	const onDocumentClick = useCallback(
		(event: MouseEvent) => {
			const docClickHandler = docClickHandlers[docClickHandlers.length - 1]
			if (docClickHandler) {
				docClickHandler(event)
			}
		},
		[docClickHandlers]
	)

	const onAddDocClickHandler = useCallback(
		(docClickHandler: (event: MouseEvent) => void) => {
			setDocClickHandlers((prev) => [...prev, docClickHandler])
		},
		[]
	)

	const onRemoveDocClickHandler = useCallback(
		(docClickHandler: (event: MouseEvent) => void) => {
			setDocClickHandlers((prev) => {
				return prev.filter((handler) => handler !== docClickHandler)
			})
		},
		[]
	)

	const onKeyUp = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				const escapeKeyHandler = escapeKeyHandlers[escapeKeyHandlers.length - 1]
				if (escapeKeyHandler) {
					escapeKeyHandler(event)
				}
			}
		},
		[escapeKeyHandlers]
	)

	const onAddEscapeHandler = useCallback(
		(escapeKeyHandler: (event: KeyboardEvent) => void) => {
			setEscapeKeyHandlers((prev) => [...prev, escapeKeyHandler])
		},
		[]
	)

	const onRemoveEscapeHandler = useCallback(
		(escapeKeyHandler: (event: KeyboardEvent) => void) => {
			setEscapeKeyHandlers((prev) => {
				return prev.filter((handler) => handler !== escapeKeyHandler)
			})
		},
		[]
	)

	useEffect(() => {
		document.addEventListener('mousedown', onDocumentClick)
		document.addEventListener('keyup', onKeyUp)
		return () => {
			document.removeEventListener('mousedown', onDocumentClick)
			document.removeEventListener('keyup', onKeyUp)
		}
	}, [onDocumentClick, onKeyUp])

	return (
		<Provider
			value={{
				host: hostRef.current,
				zIndex: zIndex,
				addDocClickHandler: onAddDocClickHandler,
				removeDocClickHandler: onRemoveDocClickHandler,
				addEscapeHandler: onAddEscapeHandler,
				removeEscapeHandler: onRemoveEscapeHandler,
			}}
		>
			<div ref={containerRef}>{children}</div>
			<div ref={hostRef} />
		</Provider>
	)
}

function defaultEventHandlerFn() {
	if (process.env.NODE_ENV === 'development') {
		console.warn(
			'`LayersManager` was not found. This occurs if you are attempting to use a component requiring `Layer` without using the `BaseProvider` at the root of your app. Please visit https://baseweb.design/components/base-provider/ for more information'
		)
	}
}
