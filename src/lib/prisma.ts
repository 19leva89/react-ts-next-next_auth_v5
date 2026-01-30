import 'dotenv/config'

import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

//! Do not change the path, made for seed.ts
import { PrismaClient } from '../generated/prisma/client'

const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `${process.env.DATABASE_URL}`

const pool = new pg.Pool({ connectionString })

const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
	adapter,
	log: isProduction ? ['warn', 'error'] : ['info', 'warn', 'error'],
})
