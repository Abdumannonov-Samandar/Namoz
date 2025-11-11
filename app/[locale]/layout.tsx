/* eslint-disable react-refresh/only-export-components */
import { ThemeProvider } from '@/components/theme-provider'
import { createMetadata } from '@/config/metadata'
import '@/styles/globals.css'
import { Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Fira_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import type { Metadata } from 'next'

const firaSans = Fira_Sans({
	subsets: ['latin'],
	weight: ['400', '700'],
	display: 'swap',
})

/**
 * ✅ Yangi tip deklaratsiyasi
 */
type LocaleLayoutProps = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

// ✅ generateMetadata
export async function generateMetadata({
	params,
}: LocaleLayoutProps): Promise<Metadata> {
	const { locale } = await params
	return createMetadata({}, locale)
}

// ✅ viewport konfiguratsiyasi
export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: dark)', color: '#0f172a' }, // slate-900
		{ media: '(prefers-color-scheme: light)', color: '#f0fdf4' }, // green-50
	],
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
}

// ✅ Root layout
export default async function RootLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale } = await params
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${firaSans.className} antialiased bg-gray-200 min-h-screen`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<NextIntlClientProvider messages={messages} locale={locale}>
						{children}
					</NextIntlClientProvider>
				</ThemeProvider>

				<Toaster position='bottom-right' className='z-50' richColors />
			</body>
		</html>
	)
}
