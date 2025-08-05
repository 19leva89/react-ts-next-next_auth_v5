import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
			{children}
		</div>
	)
}

export default AuthLayout
