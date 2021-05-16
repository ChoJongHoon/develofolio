import React from 'react'
import { css, Global } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

export const globalStyle = (
	<Global
		styles={css`
			${emotionNormalize};
			html {
				font-size: 16px;
			}

			body {
				font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
					'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 나눔고딕,
					'Nanum Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', arial, 돋움, Dotum,
					Tahoma, Geneva, sans-serif;
			}
		`}
	/>
)
