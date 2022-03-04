import { createTheme } from 'baseui'
import { ThemePrimitives } from 'baseui/theme'

const primitives: Partial<ThemePrimitives> = {
	primaryFontFamily: `Spoqa Han Sans Neo, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 나눔고딕, 'Nanum Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;`,
}

export const theme = createTheme(primitives)
