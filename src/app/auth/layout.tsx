import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex h-full flex-col items-center justify-center border bg-radial from-sky-400 to-blue-800 shadow-md'>
			{children}
		</div>
	)
}

export default AuthLayout
