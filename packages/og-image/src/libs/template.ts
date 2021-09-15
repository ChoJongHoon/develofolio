import { ParsedRequest } from './types'
import OpenColor from 'open-color'

const getCss = () => {
	return `
	@font-face {
		font-family: 'Spoqa Han Sans Neo';
		font-style:  normal;
		font-weight: normal;
		src: url(${process.env.NEXT_PUBLIC_CLIENT_HOST}/fonts/SpoqaHanSansNeo-Regular.woff2) format('woff2');
	}
	@font-face {
		font-family: 'Spoqa Han Sans Neo';
		font-style:  normal;
		font-weight: bold;
		src: url(${process.env.NEXT_PUBLIC_CLIENT_HOST}/fonts/SpoqaHanSansNeo-Bold.woff2) format('woff2');
	}

	body {
		background-color: #f1f3f5;
		height: 100vh;
		font-family: 'Spoqa Han Sans Neo', sans-serif, 'Apple Color Emoji';
		padding: 160px;
	}

	.header {
		display: flex;
		box-sizing: border-box;
		margin-bottom: 160px;
	}

	.info {
		margin-right: 32px;
		flex: 1 1 0;
	}

	.name {
		font-size: 160px;
		margin-top: 0px;
		line-height: 1.2;
		margin-bottom: 0px;
		color: ${OpenColor.gray[8]};
	}

	.tagline {
		font-size: 80px;
		margin-top: 0px;
		line-height: 1.2;
		margin-bottom: 0px;
		color: ${OpenColor.gray[6]};
	}

	.profile {
		width: 600px;
		height: 450px;
		object-fit: cover;
		border-radius: 32px;
	}

	.logos {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	
	.logo {
		width: 100px;
		height: 100px;
	}

	`
}

export function getHtml(parsedReq: ParsedRequest) {
	const { name, tagline, image, logos } = parsedReq

	return `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Generated Image</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<style>
			${getCss()}
		</style>
	</head>
	<body>
		<div class="header">
			<div class="info">
				<h1 class="name">${name}</h1>
				<h2 class="tagline">${tagline}</h2>
			</div>
			${
				image
					? `<img src="${process.env.IMAGES_HOST}/${image
							.split('/')
							.slice(1)
							.join('/')}" class="profile" />`
					: ''
			}
		</div>
		<div class="logos">
			${logos
				.map(
					(logo) =>
						`<img src="${process.env.CLIENT_HOST}/logos/${logo}" class="logo" />`
				)
				.join('')}
		</div>
	</body>
</html>`
}
