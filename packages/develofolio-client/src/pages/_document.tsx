import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { Server, Sheet } from 'styletron-engine-atomic'
import { styletron } from '~/styles/styletron'

export default class MyDocument extends Document<{
	styletronSheets: Sheet[]
}> {
	static async getInitialProps(context: DocumentContext) {
		const renderPage = () =>
			context.renderPage({
				enhanceApp: (App) => (props) =>
					(
						<StyletronProvider value={styletron}>
							<App {...props} />
						</StyletronProvider>
					),
			})

		const initialProps = await Document.getInitialProps({
			...context,
			renderPage,
		})

		const stylesheets =
			styletron instanceof Server ? styletron.getStylesheets() : []

		return { ...initialProps, stylesheets }
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<div id="portal" />
					<NextScript />
				</body>
			</Html>
		)
	}
}
