import { APIGatewayProxyHandler } from 'aws-lambda'
import { getScreenshot } from '~/libs/chromium'
import { parseRequest } from '~/libs/parser'
import { getHtml } from '~/libs/template'

const isDev = process.env.NODE_ENV === 'development'
const isHtmlDebug = false

export const main: APIGatewayProxyHandler = async (event) => {
	const parsedReq = parseRequest(event.multiValueQueryStringParameters)
	const html = getHtml(parsedReq)
	if (isHtmlDebug) {
		return {
			body: html,
			headers: {
				'Content-Type': 'text/html',
			},
			statusCode: 200,
		}
	}

	const file = await getScreenshot(html, isDev)

	return {
		body: file.toString('base64'),
		statusCode: 200,
		headers: {
			'Content-Type': `image/png`,
			'Cache-Control': `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
		},
		isBase64Encoded: true,
	}
}
