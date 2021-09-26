import React from 'react'
import { useStyletron } from 'styletron-react'
import { EditorSidebar } from '~/modules/editor/editor-sidebar'

interface EditorLayoutProps {
	children?: React.ReactNode
}

export const EditorLayout = ({ children }: EditorLayoutProps) => {
	const [css] = useStyletron()

	return (
		<div>
			<div
				className={css({
					minHeight: '100vh',
				})}
			>
				<div
					className={css({
						position: 'fixed',
						top: '0px',
						left: '0px',
						bottom: '0px',
						width: '72px',
					})}
				>
					<EditorSidebar />
				</div>
				<div
					className={css({
						marginLeft: '72px',
						width: 'calc(100% - 72px)',
					})}
				>
					{children}
				</div>
			</div>
		</div>
	)
}
