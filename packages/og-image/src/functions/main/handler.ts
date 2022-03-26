import { APIGatewayProxyHandler } from 'aws-lambda'
import axios from 'axios'
import { flatten } from 'lodash'
import { Node } from 'slate'
import { getScreenshot } from '~/libs/chromium'
import { deepFilter } from '~/libs/deep-filter'
import { parseRequest } from '~/libs/parser'
import { getHtml } from '~/libs/template'

const isDev = process.env.NODE_ENV === 'development'
const isHtmlDebug = false

export const main: APIGatewayProxyHandler = async (event) => {
	const parsedReq = parseRequest(event.multiValueQueryStringParameters)

	const { data } = await axios.post<{
		data: {
			getPageBySlug: { content: any }
		}
	}>(
		'https://api.develofolio.com/graphql',
		{
			query: `
				query GetPageBySlug($slug: String!) {
					getPageBySlug(slug: $slug){
						content
					}
				}
			`,
			variables: {
				slug: parsedReq.slug,
			},
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
	const content = data.data.getPageBySlug.content

	const logos = flatten(
		deepFilter(
			content,
			'children',
			(item) => item.type === 'skill-list-item-logos'
		).map((item) => item.logos)
	).map((item) => item.file)
	const name = Node.string(content[0].children[0])
	const tagline = Node.string(content[0].children[1])
	const image = content[0].profile

	const html = getHtml({
		logos,
		name,
		tagline,
		image,
	})
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
