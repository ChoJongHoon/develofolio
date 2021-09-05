import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Helmet } from 'react-helmet'
import { initApolloClient } from '~/apollo/client'
import {
	GetPageBySlugDocument,
	GetPathsDocument,
	PagePartsFragment,
} from '~/graphql/document.generated'
import { Serialize } from '~/modules/editor/serialize'

interface PortfolioPageParams extends ParsedUrlQuery {
	slug: string
}
interface PortfolioPageProps {
	page: PagePartsFragment
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

	return {
		props: {
			page: data.page,
		},
		revalidate: 60,
	}
}

const PortfolioPage: NextPage<PortfolioPageProps> = ({ page }) => {
	return (
		<>
			<Helmet>
				<title>{page.title ?? `${page.slug} | DeveloFolio`}</title>
			</Helmet>
			<main>
				<Serialize value={page.content} />
			</main>
		</>
	)
}

export default PortfolioPage
