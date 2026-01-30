// src/lib/db-cert-setup.ts
import fs from 'fs'
import path from 'path'

/**
 * Creates a temporary SSL certificate file for connecting to the database.
 * Returns the file path or null if the certificate is not set.
 */
export function setupDatabaseCert(): string | null {
	const certContent = process.env.CA_CERT

	if (!certContent) {
		if (process.env.NODE_ENV === 'production') {
			console.warn('CA_CERT is not set. SSL verification may fail.')
		}

		return null
	}

	// Create a unique filename to avoid conflicts
	const certFileName = `db-ca-${Date.now()}.pem`
	const certPath = path.join('/tmp', certFileName)

	try {
		// Important: the variable must contain the correct line breaks
		fs.writeFileSync(certPath, certContent)

		// Set strict access rights
		fs.chmodSync(certPath, 0o600)

		console.log(`SSL certificate written to: ${certPath}`)

		return certPath
	} catch (error) {
		console.error('Failed to write SSL certificate file:', error)

		return null
	}
}

/**
 * Returns the database connection string with SSL parameters
 */
export function getDatabaseUrl(): string {
	const baseUrl = process.env.DATABASE_URL

	if (!baseUrl) {
		throw new Error('DATABASE_URL is not set')
	}

	const certPath = setupDatabaseCert()

	// If there is a certificate, add SSL parameters
	if (certPath) {
		// Check if there are already parameters in the URL
		const hasParams = baseUrl.includes('?')
		const sslParams = `sslmode=verify-full&sslrootcert=${certPath}`

		return hasParams ? `${baseUrl}&${sslParams}` : `${baseUrl}?${sslParams}`
	}

	// In production without a certificate, use require (less secure)
	if (process.env.NODE_ENV === 'production') {
		const hasParams = baseUrl.includes('?')
		const sslParams = 'sslmode=require'

		return hasParams ? `${baseUrl}&${sslParams}` : `${baseUrl}?${sslParams}`
	}

	// In development, return as is (assuming DATABASE_URL already has the necessary parameters)
	return baseUrl
}
