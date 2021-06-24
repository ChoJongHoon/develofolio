import { css } from '@emotion/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Consumer, LayersContext } from './layers-manager'

export type LayerProps = {
	children: React.ReactNode
	host?: HTMLElement | null
	index?: number
	onEscape?: () => void
	onDocumentClick?: (event: MouseEvent) => void
	zIndex?: number
}

const LayerComponent = ({
	children,
	zIndex,
	index,
	onDocumentClick,
	onEscape,
	host: layersManagerHost,
}: LayerProps) => {
	const {
		addDocClickHandler,
		removeDocClickHandler,
		addEscapeHandler,
		removeEscapeHandler,
	} = useContext(LayersContext)

	const [container, setContainer] = useState<HTMLElement | null>(null)

	const addContainer = useCallback(
		(host: HTMLElement) => {
			if (host) {
				const containerDiv = host.ownerDocument.createElement('div')
				containerDiv.className = 'layer-container'
				const sibling = typeof index === 'number' ? host.children[index] : null
				sibling
					? host.insertBefore(containerDiv, sibling)
					: host.appendChild(containerDiv)
				setContainer(containerDiv)
			}
		},
		[index]
	)

	const handleDocumentClick = useCallback(
		(e: MouseEvent) => {
			onDocumentClick && onDocumentClick(e)
		},
		[onDocumentClick]
	)

	const handleEscape = useCallback(() => {
		if (onEscape) {
			onEscape()
		}
	}, [onEscape])

	useEffect(() => {
		const hasLayersManager = layersManagerHost !== undefined
		const host = hasLayersManager ? layersManagerHost : document.body
		if (host) {
			addContainer(host)
		}
	}, [addContainer, layersManagerHost])

	useEffect(() => {
		return () => {
			if (layersManagerHost && container) {
				if (layersManagerHost.contains(container)) {
					layersManagerHost.removeChild(container)
				}
			}
		}
	}, [container, layersManagerHost])

	useEffect(() => {
		addDocClickHandler(handleDocumentClick)
		addEscapeHandler(handleEscape)
		return () => {
			removeDocClickHandler(handleDocumentClick)
			removeEscapeHandler(handleEscape)
		}
	}, [
		addDocClickHandler,
		addEscapeHandler,
		handleDocumentClick,
		handleEscape,
		removeDocClickHandler,
		removeEscapeHandler,
	])

	const childrenToRender = zIndex ? (
		<div css={containerStyles(zIndex)}>{children}</div>
	) : (
		children
	)

	if (container) {
		return ReactDOM.createPortal(childrenToRender, container)
	}

	return null
}

export const Layer = (props: LayerProps) => {
	return (
		<Consumer>
			{({ host, zIndex }) => (
				<LayerComponent {...props} host={host} zIndex={zIndex} />
			)}
		</Consumer>
	)
}

const containerStyles = (zIndex: number) => css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: ${zIndex};
`
