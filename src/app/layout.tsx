import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import { Toaster } from '@/components/ui'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Next Auth v5',
	description: 'Next.js 16 + NextAuth v5 + Prisma + Postgres',
	icons: [
		{
			url: '/logo.png',
			href: '/logo.png',
		},
	],
}

export default async function RootLayout({ children }: PropsWithChildren) {
	const session = await auth()

	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body className={inter.className}>
					<Toaster />

					{children}
				</body>
			</html>
		</SessionProvider>
	)
}
