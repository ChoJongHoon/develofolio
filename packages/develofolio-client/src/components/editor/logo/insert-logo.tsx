import { Editor, Transforms } from 'slate'
import { LogoElement } from '../slate'

type Logo = Omit<LogoElement, 'type' | 'children'>

export const insertLogo = (editor: Editor, logo: Logo) => {
	const iconElement: LogoElement = {
		type: 'logo',
		children: [{ text: '' }],
		...logo,
	}
	Transforms.insertNodes(editor, iconElement)
	Transforms.move(editor)
}
