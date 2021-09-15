import { chain, flatten } from 'lodash'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Helmet } from 'react-helmet'
import { Descendant, Node } from 'slate'
import { initApolloClient } from '~/apollo/client'
import {
	GetPageBySlugDocument,
	GetPathsDocument,
	PagePartsFragment,
} from '~/graphql/document.generated'
import { Serialize } from '~/modules/editor/serialize'
import { deepFilter } from '~/utils/deep-filter'
import Head from 'next/head'

interface PortfolioPageParams extends ParsedUrlQuery {
	slug: string
}
interface PortfolioPageProps {
	page: PagePartsFragment
	logos: string[]
	name: string
	tagline: string
	profile: string
	description: string
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

	const logos = flatten(
		deepFilter(
			data.page.content,
			'children',
			(item) => item.type === 'skill-list-item-logos'
		).map((item) => item.logos)
	).map((item) => item.file)

	const name = Node.string(data.page.content[0].children[0])
	const tagline = Node.string(data.page.content[0].children[1])
	const description = Node.string(data.page.content[0].children[2])
	const profile = data.page.content[0].profile

	return {
		props: {
			page: data.page,
			logos,
			name,
			tagline,
			profile: profile ?? '',
			description,
		},
		revalidate: 60,
	}
}

const PortfolioPage: NextPage<PortfolioPageProps> = ({
	page,
	logos,
	name,
	tagline,
	profile,
	description,
}) => {
	return (
		<>
			<Head>
				<title>{page.title ?? `${page.slug} | DeveloFolio`}</title>
				<meta
					property="og:title"
					content={page.title ?? `${page.slug} | DeveloFolio`}
				/>
				<meta property="og:type" content="profile" />
				<meta property="og:description" content={description} />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_CLIENT_HOST}/${page.slug}`}
				/>
				<meta property="og:description" content={description} />
				<meta
					property="og:image"
					content={`${
						process.env.NEXT_PUBLIC_OG_IMAGE_HOST
					}/?name=${name}&tagline=${tagline}${
						profile ? `&image=${profile}` : ''
					}&${logos.map((logo) => `logos=${logo}`).join('&')}`}
				/>
			</Head>
			<main>
				<Serialize value={page.content} />
			</main>
		</>
	)
}

export default PortfolioPage
