import { Descendant } from 'slate'
import { generateBannerElement } from '../banner/banner'
import { generateParagraphElement } from '../elements/paragraph'

export const generateInitialContent = (): Descendant[] => [
	generateBannerElement(),
	generateParagraphElement(),
]
