'use server'

import { UserRole } from '@/lib/prisma-enums'
import { currentRole } from '@/lib/auth'

export const admin = async () => {
	const role = await currentRole()

	if (role === UserRole.ADMIN) {
		return { success: 'Allowed Server Action!' }
	}

	return { error: 'Forbidden Server Action!' }
}
