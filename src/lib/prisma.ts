import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { getDatabaseUrl } from './prisma-cert'

//! Do not change the path, made for seed.ts
import { PrismaClient } from '../generated/prisma/client'

const isProduction = process.env.NODE_ENV === 'production'

// Get the database connection string with SSL parameters
const databaseUrl = getDatabaseUrl()

const adapter = new PrismaPg({
	connectionString: databaseUrl,
	// connectionParams: {
	// 	ssl: {
	// 		rejectUnauthorized: true,
	// 		ca: process.env.CA_CERT,
	// 	},
	// },
})

const globalForPrisma = global as unknown as {
	prisma: PrismaClient
}

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
		log: isProduction ? ['warn', 'error'] : ['info', 'warn', 'error'],
	})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
