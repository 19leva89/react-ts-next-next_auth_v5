import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex h-full flex-col items-center justify-center border shadow-md from-sky-400 to-blue-800 bg-radial'>
			{children}
		</div>
	)
}

export default AuthLayout
