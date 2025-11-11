/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,POST,PUT,DELETE,OPTIONS',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type, Authorization',
					},
				],
			},
		]
	},
	skipTrailingSlashRedirect: true,
	trailingSlash: true,
	images: {
		domains: [
			'via.placeholder.com',
			'picsum.photos',
			'github.com',
			'api.udemere.com',
		],
	},
	webpack: config => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
		}
		return config
	},
	experimental: {
		optimizeCss: false,
	},
}

export default withNextIntl(nextConfig)
