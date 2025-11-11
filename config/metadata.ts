import type { Metadata } from 'next'

// Language-specific configurations
const SITE_CONFIG = {
	uz: {
		name: 'Besh Vaqt Namoz',
		title: {
			template: '%s | Besh Vaqt Namoz',
			default: "Besh Vaqt Namoz - To'liq Tartib",
		},
		description:
			"Besh vaqt namozning to'liq tartibi, vaqtlari, duolari va sunnatlari. Islomiy ta'limotlar asosida tayyorlangan",
		keywords: [
			'namoz',
			'besh vaqt namoz',
			'islom',
			'ibodat',
			'duo',
			'sunnat',
			'farz',
			'musulmon',
		],
	},
	en: {
		name: 'Five Daily Prayers',
		title: {
			template: '%s | Five Daily Prayers',
			default: 'Five Daily Prayers - Complete Guide',
		},
		description:
			'Complete guide to the five daily prayers, times, prayers and sunnahs. Prepared based on Islamic teachings',
		keywords: [
			'prayer',
			'salah',
			'islam',
			'worship',
			'dua',
			'sunnah',
			'fard',
			'muslim',
		],
	},
	ru: {
		name: 'Пять Обязательных Молитв',
		title: {
			template: '%s | Пять Обязательных Молитв',
			default: 'Пять Обязательных Молитв - Полное Руководство',
		},
		description:
			'Полное руководство по пятикратной молитве, временам, молитвам и суннам. Подготовлено на основе исламских учений',
		keywords: [
			'намаз',
			'пятикратная молитва',
			'ислам',
			'поклонение',
			'дуа',
			'сунна',
			'фард',
			'мусульманин',
		],
	},
	tr: {
		name: 'Beş Vakit Namaz',
		title: {
			template: '%s | Beş Vakit Namaz',
			default: 'Beş Vakit Namaz - Tam Kılışı',
		},
		description:
			'Beş vakit namazın tam kılışı, vakitleri, duaları ve sünnetleri. İslami öğretilere dayalı olarak hazırlanmıştır',
		keywords: [
			'namaz',
			'beş vakit namaz',
			'islam',
			'ibadet',
			'dua',
			'sünnet',
			'farz',
			'müslüman',
		],
	},
	kz: {
		name: 'Бес Уақыт Намаз',
		title: {
			template: '%s | Бес Уақыт Намаз',
			default: 'Бес Уақыт Намаз - Толық Тәртібі',
		},
		description:
			'Бес уақыт намазының толық тәртібі, уақыттары, дұғалары және сүннеттері. Исламдық ілімдер негізінде дайындалған',
		keywords: [
			'намаз',
			'бес уақыт намаз',
			'ислам',
			'құлшылық',
			'дұға',
			'сүннет',
			'парыз',
			'мұсылман',
		],
	},
} as const

// Common configuration
const COMMON_CONFIG = {
	url: 'https://beshvaqtnamoz.uz',
	ogImage: '/og-image.jpg',
	twitter: {
		creator: '@beshvaqtnamoz',
		card: 'summary_large_image' as const,
	},
} as const

// Types
interface MetadataConfig {
	title?: string | { template: string; default: string }
	description?: string
	keywords?: readonly string[] | string[]
	openGraph?: {
		title?: string
		description?: string
		url?: string
		images?: string | string[]
		type?: 'website' | 'article' | 'profile'
	}
	twitter?: {
		title?: string
		description?: string
		images?: string | string[]
	}
	robots?: {
		index?: boolean
		follow?: boolean
		googleBot?: {
			index?: boolean
			follow?: boolean
			'max-video-preview'?: number
			'max-image-preview'?: 'none' | 'standard' | 'large'
			'max-snippet'?: number
		}
	}
	alternates?: {
		canonical?: string
		languages?: Record<string, string>
	}
}

// Utility functions
function getBaseURL(): URL {
	if (process.env.NODE_ENV === 'development') {
		return new URL('http://localhost:3000')
	}

	if (process.env.VERCEL_URL) {
		return new URL(`https://${process.env.VERCEL_URL}`)
	}

	return new URL(COMMON_CONFIG.url)
}

function formatTitle(title: string | undefined, template?: string): string {
	if (!title) return SITE_CONFIG.uz.name // fallback to Uzbek
	if (template) return template.replace('%s', title)
	return title
}

// Convert readonly array to mutable array
function toMutableArray<T>(arr: readonly T[]): T[] {
	return [...arr]
}

// Main metadata creation function with locale support
export function createMetadata(
	config: MetadataConfig = {},
	locale: string = 'uz'
): Metadata {
	const {
		title,
		description,
		keywords = [],
		openGraph = {},
		twitter = {},
		robots = {},
		alternates = {},
	} = config

	const baseURL = getBaseURL()

	// Get language-specific configuration
	const langConfig =
		SITE_CONFIG[locale as keyof typeof SITE_CONFIG] || SITE_CONFIG.uz

	const finalTitle =
		typeof title === 'string'
			? title
			: title?.default || langConfig.title.default
	const finalDescription = description || langConfig.description

	// Handle keywords conversion from readonly to mutable array
	const finalKeywords =
		keywords.length > 0
			? toMutableArray(keywords)
			: toMutableArray(langConfig.keywords)

	// Language-specific OpenGraph locale
	const ogLocale =
		{
			uz: 'uz_UZ',
			en: 'en_US',
			ru: 'ru_RU',
		}[locale] || 'uz_UZ'

	// Language-specific alternates
	const languageAlternates = {
		'uz-UZ': `${COMMON_CONFIG.url}/uz`,
		'en-US': `${COMMON_CONFIG.url}/en`,
		'ru-RU': `${COMMON_CONFIG.url}/ru`,
	}

	// Create the metadata object
	const metadata: Metadata = {
		title: title || langConfig.title,
		description: finalDescription,
		keywords: finalKeywords,
		metadataBase: baseURL,

		// Open Graph (OG) metadata
		openGraph: {
			title: formatTitle(openGraph.title || finalTitle),
			description: openGraph.description || finalDescription,
			url: openGraph.url || COMMON_CONFIG.url,
			siteName: langConfig.name,
			images: openGraph.images || COMMON_CONFIG.ogImage,
			type: openGraph.type || 'website',
			locale: ogLocale,
		},

		// Twitter metadata
		twitter: {
			card: COMMON_CONFIG.twitter.card,
			creator: COMMON_CONFIG.twitter.creator,
			title: formatTitle(twitter.title || openGraph.title || finalTitle),
			description:
				twitter.description || openGraph.description || finalDescription,
			images: twitter.images || openGraph.images || COMMON_CONFIG.ogImage,
		},

		// Robots
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},

		// Alternates
		alternates: {
			canonical: alternates.canonical || COMMON_CONFIG.url,
			languages: languageAlternates,
		},

		// Verification
		verification: {
			google: 'google-site-verification-code',
			yandex: 'yandex-verification-code',
		},

		// Category
		category: 'religion',

		// Other metadata
		manifest: '/manifest.json',
		themeColor: '#16a34a', // Green color for Islamic theme

		// Authors and creator
		authors: [{ name: langConfig.name }],
		creator: langConfig.name,
		publisher: langConfig.name,
	}

	// Apply overrides for optional properties
	if (Object.keys(openGraph).length > 0) {
		metadata.openGraph = { ...metadata.openGraph, ...openGraph }
	}

	if (Object.keys(twitter).length > 0) {
		metadata.twitter = { ...metadata.twitter, ...twitter }
	}

	if (typeof metadata.robots === 'object') {
		metadata.robots = { ...metadata.robots, ...robots }
	}

	if (Object.keys(alternates).length > 0) {
		metadata.alternates = { ...metadata.alternates, ...alternates }
	}

	return metadata
}

// Specialized metadata creators for different page types with locale support
export function createPageMetadata(
	title: string,
	description?: string,
	options: Omit<MetadataConfig, 'title' | 'description'> = {},
	locale: string = 'uz'
): Metadata {
	const langConfig =
		SITE_CONFIG[locale as keyof typeof SITE_CONFIG] || SITE_CONFIG.uz

	return createMetadata(
		{
			title,
			description: description || langConfig.description,
			...options,
		},
		locale
	)
}

export function createPrayerGuideMetadata(locale: string = 'uz'): Metadata {
	const langConfig =
		SITE_CONFIG[locale as keyof typeof SITE_CONFIG] || SITE_CONFIG.uz

	return createMetadata(
		{
			title: langConfig.title.default,
			description: langConfig.description,
			openGraph: {
				type: 'website',
			},
		},
		locale
	)
}

// Export constants for external use
export const SITE_METADATA = {
	name: SITE_CONFIG.uz.name,
	url: COMMON_CONFIG.url,
	description: SITE_CONFIG.uz.description,
	twitter: COMMON_CONFIG.twitter,
} as const

export const baseURL = getBaseURL()
