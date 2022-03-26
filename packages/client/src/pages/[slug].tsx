import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Node } from 'slate'
import { initApolloClient } from '~/apollo/client'
import {
	GetPageBySlugDocument,
	GetPathsDocument,
	PagePartsFragment,
} from '~/graphql/document.generated'
import { Serialize } from '~/modules/editor/serialize'
import Head from 'next/head'
import { useStyletron } from 'baseui'
import OpenColor from 'open-color'
import { LabelXSmall } from 'baseui/typography'
import LogoSvg from 'public/images/logo.svg'
import Script from 'next/script'
import { useMemo } from 'react'

interface PortfolioPageParams extends ParsedUrlQuery {
	slug: string
}
interface PortfolioPageProps {
	page: PagePartsFragment
	name: string
	description: string
	lang: string
	slug: string
}

export const getStaticPaths: GetStaticPaths<PortfolioPageParams> = async () => {
	const client = initApolloClient()

	const {
		data: { paths },
	} = await client.query({
		query: GetPathsDocument,
	})

	return {
		paths: paths.map((slug) => ({
			params: {
				slug,
			},
		})),
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps<
	PortfolioPageProps,
	PortfolioPageParams
> = async ({ params }) => {
	if (!params?.slug) {
		return {
			notFound: true,
		}
	}
	const client = initApolloClient()

	const { data } = await client.query({
		query: GetPageBySlugDocument,
		variables: {
			slug: params.slug,
		},
	})

	const name = Node.string(data.page.content[0].children[0])
	const description = Node.string(data.page.content[0].children[2])

	return {
		props: {
			page: data.page,
			name,
			description,
			lang: data.page.language.toLowerCase(),
			slug: params.slug,
		},
		revalidate: 60,
	}
}

const PortfolioPage: NextPage<PortfolioPageProps> = ({
	page,
	name,
	description,
	slug,
}) => {
	const [css] = useStyletron()
	const ogImageUrl = useMemo(() => {
		const url = new URL(process.env.NEXT_PUBLIC_OG_IMAGE_HOST)

		url.searchParams.set('slug', slug)
		return url.toString()
	}, [slug])

	return (
		<>
			<Head>
				<title>{page.title ?? `${page.slug} | DeveloFolio`}</title>
				<meta name="description" content={description} />
				{/* OG */}
				<meta
					property="og:title"
					content={page.title ?? `${page.slug} | DeveloFolio`}
				/>
				<meta property="og:type" content="profile" />
				<meta property="og:description" content={description} />
				<meta
					property="og:url"
					content={`https://${page.slug}.develofolio.com`}
				/>
				<meta property="og:description" content={description} />
				<meta property="og:image" content={ogImageUrl} />
				{/* TWITTER */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={name} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image:src" content={ogImageUrl} />
			</Head>
			{page.gtag && (
				<>
					<Script
						strategy="afterInteractive"
						src={`https://www.googletagmanager.com/gtag/js?id=${page.gtag}`}
					/>
					<Script strategy="afterInteractive">
						{`window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${page.gtag}');`}
					</Script>
				</>
			)}
			<main
				className={css({
					paddingBottom: '32px',
				})}
			>
				<Serialize value={page.content} />
			</main>
			<footer
				className={css({
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					paddingTop: '16px',
					paddingBottom: '16px',
				})}
			>
				<LabelXSmall
					$style={{
						marginRight: '4px',
						fontWeight: 300,
					}}
					color={OpenColor.gray[5]}
				>
					Powered by
				</LabelXSmall>
				<a href="https://develofolio.com" target="_blank" rel="noreferrer">
					<LogoSvg height="12px" />
				</a>
			</footer>
		</>
	)
}

export default PortfolioPage
