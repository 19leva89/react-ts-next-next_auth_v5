'use client'

import { ReactNode } from 'react'
import { UserRole } from '@prisma/client'

import { FormError } from '@/components/form-error'
import { useCurrentRole } from '@/hooks/use-current-role'

interface Props {
	children: ReactNode
	allowedRole: UserRole
}

export const RoleGate = ({ children, allowedRole }: Props) => {
	const role = useCurrentRole()

	if (role !== allowedRole) {
		return <FormError message='You do not have permission to view this content!' />
	}

	return <>{children}</>
}
