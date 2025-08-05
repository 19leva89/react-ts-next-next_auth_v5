import { PropsWithChildren } from 'react'

import { Navbar } from './_components/navbar'

const ProtectedLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
			<Navbar />

			{children}
		</div>
	)
}

export default ProtectedLayout
