import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { Adapter } from 'next-auth/adapters'
import { Account, User, Session } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/lib/prisma'
import authConfig from '@/auth.config'
import { getUserById } from '@/data/user'
import { UserRole } from '@/lib/prisma-enums'
import { getAccountByUserId } from './data/account'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma) as Adapter,

	session: {
		strategy: 'jwt',
		maxAge: 30 * 60, // 30 minutes
		updateAge: 10 * 60, // 10 minutes
	},

	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},

	events: {
		async linkAccount({ user }: { user: User }) {
			await prisma.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},

	callbacks: {
		async signIn({ user, account }) {
			// Allow OAuth without email verification
			if (account?.provider !== 'credentials') return true

			if (!user.id) {
				return false // Reject sign-in if user ID is undefined
			}

			const existingUser = await getUserById(user.id)

			// Prevent sign in without email verification
			if (!existingUser?.emailVerified) return false

			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

				if (!twoFactorConfirmation) return false

				// Delete two-factor confirmation for next sign in
				await prisma.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				})
			}

			return true
		},

		async session({ session, token }: { session: Session; token: JWT }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
				session.user.name = token.name
				session.user.email = token.email
				session.user.isOAuth = token.isOAuth as boolean
			}

			return session
		},

		async jwt({ token }: { token: JWT }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			const existingAccount = await getAccountByUserId(existingUser.id)

			token.isOAuth = !!existingAccount
			token.name = existingUser.name
			token.email = existingUser.email
			token.role = existingUser.role
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token
		},
	},

	...authConfig,
})
