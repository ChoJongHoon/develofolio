import React from 'react'
import { css, Global } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

export const globalStyle = (
	<Global
		styles={css`
			${emotionNormalize}
		`}
	/>
)
