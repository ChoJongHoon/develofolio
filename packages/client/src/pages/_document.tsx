import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentProps,
} from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { Server, Sheet } from 'styletron-engine-atomic'
import { styletron } from '~/styles/styletron'
interface MyDocumentProps extends DocumentProps {
	stylesheets: Sheet[]
}

export default class MyDocument extends Document<MyDocumentProps> {
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
		const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps

		return (
			<Html>
				<Head>
					{this.props.stylesheets.map((sheet, i) => (
						<style
							className="_styletron_hydrate_"
							dangerouslySetInnerHTML={{ __html: sheet.css }}
							media={sheet.attrs.media}
							data-hydrate={sheet.attrs['data-hydrate']}
							key={i}
						/>
					))}
				</Head>
				<body className={pageProps.bodyClassName}>
					<Main />
					<div id="portal" />
					<NextScript />
				</body>
			</Html>
		)
	}
}
