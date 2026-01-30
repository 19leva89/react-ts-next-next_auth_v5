import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'

//! Do not change the path, made for seed.ts
import { PrismaClient } from '../generated/prisma/client'

const isProduction = process.env.NODE_ENV === 'production'

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
	connectionParams: {
		ssl: {
			rejectUnauthorized: true,
			ca: process.env.CA_CERT,
		},
	},
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
