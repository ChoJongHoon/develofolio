import { registerAs } from '@nestjs/config'

export const awsConfig = registerAs('aws', () => ({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
}))
