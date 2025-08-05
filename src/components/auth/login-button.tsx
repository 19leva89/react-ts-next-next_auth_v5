'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import { LoginForm } from '@/components/auth/login-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui'

interface Props {
	children: ReactNode
	mode?: 'modal' | 'redirect'
	asChild?: boolean
}

export const LoginButton = ({ children, mode = 'redirect', asChild }: Props) => {
	const router = useRouter()

	const onClick = () => {
		router.push('/auth/login')
	}

	if (mode === 'modal') {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>{children}</DialogTrigger>

				<DialogContent className='w-auto border-none bg-transparent p-0'>
					<LoginForm />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<span onClick={onClick} className='cursor-pointer'>
			{children}
		</span>
	)
}
