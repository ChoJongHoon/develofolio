import { APIGatewayProxyEventMultiValueQueryStringParameters } from 'aws-lambda'
import { ParsedRequest } from './types'

export function parseRequest(
	qs: APIGatewayProxyEventMultiValueQueryStringParameters
) {
	const { name, tagline, image, logos = [] } = qs ?? {}

	const parsedRequest: ParsedRequest = {
		name: decodeURIComponent(name?.[0] ?? ''),
		tagline: decodeURIComponent(tagline?.[0] ?? ''),
		image: image?.[0],
		logos,
	}

	return parsedRequest
}
