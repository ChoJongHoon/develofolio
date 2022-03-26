import OpenColor from 'open-color'

const getCss = () => {
	return `
	@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    src: local('Spoqa Han Sans Neo Bold'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf') format('truetype');
	}

	@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    src: local('Spoqa Han Sans Neo Medium'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf') format('truetype');
	}

	@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
    src: local('Spoqa Han Sans Neo Regular'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf') format('truetype');
	}

	@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 300;
    src: local('Spoqa Han Sans Neo Light'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.ttf') format('truetype');
	}

	@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 100;
    src: local('Spoqa Han Sans Neo Thin'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.ttf') format('truetype');
	}

	body {
		background-color: #f1f3f5;
		height: 100vh;
		font-family: 'Spoqa Han Sans Neo', sans-serif, 'Apple Color Emoji';
		padding: 60px;
	}

	.header {
		display: flex;
		box-sizing: border-box;
		margin-bottom: 60px;
	}

	.info {
		margin-right: 32px;
		flex: 1 1 0;
	}

	.name {
		font-size: 80px;
		margin-top: 0px;
		line-height: 1.2;
		margin-bottom: 0px;
		color: ${OpenColor.gray[8]};
	}

	.tagline {
		font-size: 40px;
		margin-top: 0px;
		line-height: 1.2;
		margin-bottom: 0px;
		color: ${OpenColor.gray[6]};
	}

	.profile {
		width: 400px;
		height: 300px;
		object-fit: cover;
		border-radius: 16px;
	}

	.logos {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	
	.logo {
		width: 60px;
		height: 60px;
	}

	`
}

type Params = {
	name: string
	tagline: string
	image?: string
	logos: string[]
}

export function getHtml({ name, tagline, image, logos }: Params) {
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
