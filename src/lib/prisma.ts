import 'dotenv/config'

import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

//! Do not change the path, made for seed.ts
import { PrismaClient } from '../generated/prisma/client'

const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `${process.env.DATABASE_URL}`

console.log('[Prisma] Initializing with environment DATABASE_URL')

const pool = new pg.Pool({ connectionString })

const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
	adapter,
	log: isProduction ? ['warn', 'error'] : ['info', 'warn', 'error'],
	errorFormat: 'pretty',
})

// Простая проверка
async function initializePrisma() {
	try {
		await prisma.$connect()
		console.log('[Prisma] Successfully connected')
		console.log('[Prisma] ✅ Successfully connected')

		try {
			// Проверяем существование таблицы users
			const users = await prisma.user.findMany({ take: 1 })
			console.log(`[Prisma] Found ${users.length} users`)
		} catch (error: any) {
			if (error.code === 'P2021' || error.message.includes('does not exist')) {
				console.log('[Prisma] ℹ️  User table does not exist yet')
				console.log('[Prisma] Run: npx prisma db push')
			}
		}
	} catch (error: any) {
		console.error('[Prisma] ❌ Failed to connect:', error.message)

		// Полезные советы по ошибкам
		if (error.code === 'P1001') {
			console.log('[Prisma] 💡 Cannot reach database server')
			console.log('[Prisma] Check your DATABASE_URL and network connection')
		}

		if (error.code === 'P1000') {
			console.log('[Prisma] 💡 Authentication failed')
			console.log('[Prisma] Check username and password')
		}

		if (error.code === 'P1003') {
			console.log('[Prisma] 💡 Database does not exist')
			console.log('[Prisma] Create database: next-auth')
		}
	}
}

if (!isProduction) {
	initializePrisma()
}

export default prisma
