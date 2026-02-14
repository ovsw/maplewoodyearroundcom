import { Analytics } from '@vercel/analytics/next'
import { Geist } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ViewTransition } from 'react'
import { preconnect } from 'react-dom'
import { dev } from '@/lib/env'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import VisualEditing from '@/ui/modules/visual-editing'
import '@/app.css'

const fontSans = Geist({
	subsets: ['latin'],
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	preconnect('https://cdn.sanity.io')
	preconnect('https://ic0n.dev')

	return (
		<html lang="en" className={fontSans.className}>
			<NuqsAdapter>
				<body className="bg-background text-foreground antialiased">
					<ViewTransition>
						<Header />
						<main>{children}</main>
						<Footer />

						<VisualEditing />
						{!dev && <Analytics />}
					</ViewTransition>
				</body>
			</NuqsAdapter>
		</html>
	)
}
