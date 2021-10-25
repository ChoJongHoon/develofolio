import { GetServerSideProps, NextPage } from 'next'
import { initApolloClient } from '~/apollo/client'
import { GetPathsDocument } from '~/graphql/document.generated'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const client = initApolloClient()

	const staticPages = [
		'https://develofolio.com',
		'https://develofolio.com/login',
	]

	const {
		data: { paths },
	} = await client.query({
		query: GetPathsDocument,
	})

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
				.map((url) => {
					return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
				})
				.join('')}
      ${paths
				.map((path) => {
					return `
            <url>
              <loc>https://${path}.develofolio.com</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>always</changefreq>
              <priority>0.5</priority>
            </url>
          `
				})
				.join('')}
    </urlset>
  `

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {},
	}
}

const Sitemap: NextPage = () => {
	return <></>
}

export default Sitemap
