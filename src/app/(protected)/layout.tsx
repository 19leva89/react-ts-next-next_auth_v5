import { PropsWithChildren } from 'react'

import { Navbar } from './_components/navbar'

const ProtectedLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex size-full flex-col items-center justify-center gap-y-10 from-sky-400 to-blue-800 bg-radial'>
			<Navbar />

			{children}
		</div>
	)
}

export default ProtectedLayout
