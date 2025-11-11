/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Globe, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PrayerGuide() {
	const t = useTranslations('PrayerGuide')
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const router = useRouter()

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true)
	}, [])

	const changeLanguage = (locale: string) => {
		const currentPath = window.location.pathname
		const newPath = currentPath.replace(/^\/(en|ru|uz|kz|tr)/, `/${locale}`)
		router.push(newPath)
	}

	const prayers = [
		{
			title: t('prayers.fajr.title'),
			description: t('prayers.fajr.description'),
			sunnatRakats: [
				{
					title: t('prayers.fajr.sunnatRakats.0.title'),
					niyat: t('prayers.fajr.sunnatRakats.0.niyat'),
					steps: [
						t('prayers.fajr.sunnatRakats.0.steps.0'),
						t('prayers.fajr.sunnatRakats.0.steps.1'),
						t('prayers.fajr.sunnatRakats.0.steps.2'),
					],
				},
			],
			farzRakats: [
				{
					title: t('prayers.fajr.farzRakats.0.title'),
					niyat: t('prayers.fajr.farzRakats.0.niyat'),
					steps: [
						t('prayers.fajr.farzRakats.0.steps.0'),
						t('prayers.fajr.farzRakats.0.steps.1'),
						t('prayers.fajr.farzRakats.0.steps.2'),
					],
				},
			],
		},
		{
			title: t('prayers.dhuhr.title'),
			description: t('prayers.dhuhr.description'),
			sunnatRakats: [
				{
					title: t('prayers.dhuhr.sunnatRakats.0.title'),
					steps: [
						t('prayers.dhuhr.sunnatRakats.0.steps.0'),
						t('prayers.dhuhr.sunnatRakats.0.steps.1'),
						t('prayers.dhuhr.sunnatRakats.0.steps.2'),
						t('prayers.dhuhr.sunnatRakats.0.steps.3'),
					],
				},
				{
					title: t('prayers.dhuhr.sunnatRakats.1.title'),
					steps: [
						t('prayers.dhuhr.sunnatRakats.1.steps.0'),
						t('prayers.dhuhr.sunnatRakats.1.steps.1'),
						t('prayers.dhuhr.sunnatRakats.1.steps.2'),
					],
				},
			],
			farzRakats: [
				{
					title: t('prayers.dhuhr.farzRakats.0.title'),
					steps: [
						t('prayers.dhuhr.farzRakats.0.steps.0'),
						t('prayers.dhuhr.farzRakats.0.steps.1'),
						t('prayers.dhuhr.farzRakats.0.steps.2'),
						t('prayers.dhuhr.farzRakats.0.steps.3'),
					],
				},
			],
		},
		{
			title: t('prayers.asr.title'),
			description: t('prayers.asr.description'),
			farzRakats: [
				{
					title: t('prayers.asr.farzRakats.0.title'),
					steps: [
						t('prayers.asr.farzRakats.0.steps.0'),
						t('prayers.asr.farzRakats.0.steps.1'),
						t('prayers.asr.farzRakats.0.steps.2'),
						t('prayers.asr.farzRakats.0.steps.3'),
					],
				},
			],
		},
		{
			title: t('prayers.maghrib.title'),
			description: t('prayers.maghrib.description'),
			farzRakats: [
				{
					title: t('prayers.maghrib.farzRakats.0.title'),
					steps: [
						t('prayers.maghrib.farzRakats.0.steps.0'),
						t('prayers.maghrib.farzRakats.0.steps.1'),
						t('prayers.maghrib.farzRakats.0.steps.2'),
						t('prayers.maghrib.farzRakats.0.steps.3'),
					],
				},
			],
			sunnatRakats: [
				{
					title: t('prayers.maghrib.sunnatRakats.0.title'),
					steps: [
						t('prayers.maghrib.sunnatRakats.0.steps.0'),
						t('prayers.maghrib.sunnatRakats.0.steps.1'),
						t('prayers.maghrib.sunnatRakats.0.steps.2'),
					],
				},
			],
		},
		{
			title: t('prayers.isha.title'),
			description: t('prayers.isha.description'),
			farzRakats: [
				{
					title: t('prayers.isha.farzRakats.0.title'),
					steps: [
						t('prayers.isha.farzRakats.0.steps.0'),
						t('prayers.isha.farzRakats.0.steps.1'),
						t('prayers.isha.farzRakats.0.steps.2'),
						t('prayers.isha.farzRakats.0.steps.3'),
					],
				},
			],
			sunnatRakats: [
				{
					title: t('prayers.isha.sunnatRakats.0.title'),
					steps: [
						t('prayers.isha.sunnatRakats.0.steps.0'),
						t('prayers.isha.sunnatRakats.0.steps.1'),
						t('prayers.isha.sunnatRakats.0.steps.2'),
					],
				},
			],
		},
		{
			title: t('prayers.witr.title'),
			description: t('prayers.witr.description'),
			farzRakats: [
				{
					title: t('prayers.witr.farzRakats.0.title'),
					niyat: t('prayers.witr.farzRakats.0.niyat'),
					steps: [
						t('prayers.witr.farzRakats.0.steps.0'),
						t('prayers.witr.farzRakats.0.steps.1'),
						t('prayers.witr.farzRakats.0.steps.2'),
						t('prayers.witr.farzRakats.0.steps.3'),
					],
				},
			],
		},
	]

	const recitations = [
		{
			title: t('recitations.subhanaka.title'),
			content: t('recitations.subhanaka.content'),
		},
		{
			title: t('recitations.fatiha.title'),
			content: t('recitations.fatiha.content'),
		},
		{
			title: t('recitations.ikhlas.title'),
			content: t('recitations.ikhlas.content'),
		},
		{
			title: t('recitations.kawthar.title'),
			content: t('recitations.kawthar.content'),
		},
		{
			title: t('recitations.tashahhud.title'),
			content: t('recitations.tashahhud.content'),
		},
		{
			title: t('recitations.salawat.title'),
			content: t('recitations.salawat.content'),
		},
		{
			title: t('recitations.dua.title'),
			content: t('recitations.dua.content'),
		},
		{
			title: t('recitations.salam.title'),
			content: t('recitations.salam.content'),
		},
		{
			title: t('recitations.qunut.title'),
			content: t('recitations.qunut.content'),
		},
	]

	const notes = [t('notes.0'), t('notes.1'), t('notes.2'), t('notes.3')]

	return (
		<div className='min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800'>
			<div className='container mx-auto px-4 py-8'>
				{/* Header with controls */}
				<header className='mb-8 text-center relative'>
					{/* Controls */}
					<div className='absolute top-0 right-0 flex gap-2'>
						{/* Language Switcher */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline' size='icon' className='h-9 w-9'>
									<Globe className='h-4 w-4' />
									<span className='sr-only'>Change language</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem onClick={() => changeLanguage('uz')}>
									O'zbek
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => changeLanguage('en')}>
									English
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => changeLanguage('ru')}>
									Русский
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => changeLanguage('kz')}>
									Қазақша
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => changeLanguage('tr')}>
									Türkçe
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Theme Toggle */}
						<Button
							variant='outline'
							size='icon'
							className='h-9 w-9'
							onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
						>
							{!mounted ? (
								<Sun className='h-4 w-4' />
							) : theme === 'light' ? (
								<Sun className='h-4 w-4' />
							) : (
								<Moon className='h-4 w-4' />
							)}
							<span className='sr-only'>Toggle theme</span>
						</Button>
						{/* <label className='relative inline-flex items-center cursor-pointer'>
							<input onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className='sr-only peer' type='checkbox' />
							<div className="w-20 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"></div>
							<span className='ml-3 text-sm font-medium text-gray-900 sr-only'>Theme</span>
						</label> */}
					</div>

					<h1 className='text-3xl font-bold text-green-800 dark:text-green-400 mb-2'>
						{t('title')}
					</h1>
					<p className='text-green-600 dark:text-green-300'>{t('subtitle')}</p>
				</header>

				<Tabs defaultValue='prayers' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='prayers'>{t('tabs.prayers')}</TabsTrigger>
						<TabsTrigger value='recitations'>
							{t('tabs.recitations')}
						</TabsTrigger>
					</TabsList>

					<TabsContent value='prayers' className='space-y-6 mt-6'>
						{prayers.map((prayer, idx) => (
							<PrayerCard key={idx} {...prayer} />
						))}
					</TabsContent>

					<TabsContent value='recitations' className='space-y-6 mt-6'>
						<Card className='border-green-100 dark:border-gray-700 shadow-sm'>
							<CardHeader className='bg-green-50 dark:bg-gray-800 rounded-t-lg'>
								<CardTitle className='text-green-800 dark:text-green-400'>
									{t('recitationsTitle')}
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<Accordion type='single' collapsible className='w-full'>
									{recitations.map((recitation, idx) => (
										<RecitationItem key={idx} {...recitation} />
									))}
								</Accordion>
							</CardContent>
						</Card>

						<Card className='border-green-100 dark:border-gray-700 shadow-sm'>
							<CardHeader className='bg-green-50 dark:bg-gray-800 rounded-t-lg'>
								<CardTitle className='text-green-800 dark:text-green-400'>
									{t('notesTitle')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className='list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300'>
									{notes.map((note, idx) => (
										<li key={idx}>{note}</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

function RecitationItem({ title, content }: any) {
	return (
		<AccordionItem value={title.toLowerCase().replace(/\s/g, '-')}>
			<AccordionTrigger className='text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300'>
				{title}
			</AccordionTrigger>
			<AccordionContent>
				<div className='whitespace-pre-line pl-4 border-l-2 border-green-200 dark:border-green-800 text-gray-700 dark:text-gray-300'>
					{content}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export interface Rakat {
	title: string
	niyat?: string
	steps: string[]
}

export interface PrayerCardProps {
	title: string
	description: string
	sunnatRakats?: Rakat[]
	farzRakats?: Rakat[]
}

function PrayerCard({
	title,
	description,
	sunnatRakats = [],
	farzRakats = [],
}: PrayerCardProps) {
	const t = useTranslations('PrayerGuide')

	return (
		<Card className='border-green-100 dark:border-gray-700 shadow-sm'>
			<CardHeader className='bg-green-50 dark:bg-gray-800 rounded-t-lg'>
				<CardTitle className='text-green-800 dark:text-green-400'>
					{title}
				</CardTitle>
				<CardDescription className='dark:text-gray-400'>
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className='pt-6'>
				<div className='space-y-4'>
					{farzRakats.map((rakat, index) => (
						<div key={`farz-${index}`} className='space-y-2'>
							<h3 className='font-semibold text-green-700 dark:text-green-400'>
								{rakat.title}
							</h3>
							{rakat.niyat && (
								<div className='pl-4 border-l-2 border-green-200 dark:border-green-800 mb-2'>
									<p className='italic text-green-700 dark:text-green-300'>
										{t('niyat')}: "{rakat.niyat}"
									</p>
								</div>
							)}
							<ul className='list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300'>
								{rakat.steps.map((step, stepIndex) => (
									<li key={stepIndex}>{step}</li>
								))}
							</ul>
						</div>
					))}

					{sunnatRakats.map((rakat, index) => (
						<div key={`sunnat-${index}`} className='space-y-2'>
							<h3 className='font-semibold text-green-700 dark:text-green-400'>
								{rakat.title}
							</h3>
							{rakat.niyat && (
								<div className='pl-4 border-l-2 border-green-200 dark:border-green-800 mb-2'>
									<p className='italic text-green-700 dark:text-green-300'>
										{t('niyat')}: "{rakat.niyat}"
									</p>
								</div>
							)}
							<ul className='list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300'>
								{rakat.steps.map((step, stepIndex) => (
									<li key={stepIndex}>{step}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
