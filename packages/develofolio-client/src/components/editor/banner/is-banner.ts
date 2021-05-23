import { BannerElement } from '../custom-types'

export const isBanner = (element: any): element is BannerElement =>
	element.type === 'banner'
