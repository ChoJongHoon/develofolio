import { APIGatewayProxyEventMultiValueQueryStringParameters } from 'aws-lambda'

export interface ParsedRequest {
	slug: string
}

export function parseRequest(
	qs: APIGatewayProxyEventMultiValueQueryStringParameters
) {
	const { slug } = qs ?? {}

	const parsedRequest: ParsedRequest = {
		slug: decodeURIComponent(slug[0]),
	}

	return parsedRequest
}
