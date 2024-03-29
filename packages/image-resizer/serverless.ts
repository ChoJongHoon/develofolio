import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
	service: 'develofolio-image-resizer-v3',
	frameworkVersion: '2',
	plugins: ['serverless-plugin-typescript'],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		lambdaHashingVersion: '20201221',
	},
	resources: {
		Resources: {
			CloudFrontDistribution: {
				Type: 'AWS::CloudFront::Distribution',
				Properties: {
					DistributionConfig: {
						Aliases: ['images-v3.develofolio.com'],
						ViewerCertificate: {
							AcmCertificateArn:
								'arn:aws:acm:us-east-1:973252707640:certificate/96c5ca6c-ce45-4508-b199-56f64906c605',
							SslSupportMethod: 'sni-only',
							MinimumProtocolVersion: 'TLSv1.2_2021',
						},
					},
				},
			},
		},
	},
	functions: {
		cfLambda: {
			handler: 'src/handler.resize',
			role: 'arn:aws:iam::973252707640:role/EdgeLambdaRole',
			timeout: 30,
			memorySize: 1024,
			events: [
				{
					cloudFront: {
						origin: {
							DomainName:
								'develofolio-storage-v2.s3.ap-northeast-2.amazonaws.com',
							S3OriginConfig: {
								OriginAccessIdentity:
									'origin-access-identity/cloudfront/E30HO018Y9YY1S',
							},
						},
						eventType: 'origin-response',
						cachePolicy: {
							id: '482c8d95-2e89-44c3-bd7b-7ebd4a573474',
						},
						behavior: {
							ViewerProtocolPolicy: 'redirect-to-https',
							Compress: true,
						},
					},
				},
			],
		},
	},
}

module.exports = serverlessConfiguration
