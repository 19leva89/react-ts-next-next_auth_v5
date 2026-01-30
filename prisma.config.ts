import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

import { getDatabaseUrl } from './src/lib/prisma-cert'

// Get the database connection string with SSL parameters
const databaseUrl = getDatabaseUrl()

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	datasource: {
		url: databaseUrl,
	},
})
