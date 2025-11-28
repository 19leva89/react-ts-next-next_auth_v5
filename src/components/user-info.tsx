import { ExtendedUser } from '../../@types/next-auth'
import { Badge, Card, CardContent, CardHeader } from '@/components/ui'

interface Props {
	user?: ExtendedUser
	label: string
}

export const UserInfo = ({ user, label }: Props) => {
	return (
		<Card className='w-150 shadow-md'>
			<CardHeader>
				<p className='text-center text-2xl font-semibold'>{label}</p>
			</CardHeader>

			<CardContent className='space-y-4'>
				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs'>
					<p className='text-sm font-medium'>ID</p>

					<p className='max-w-45 truncate rounded-md bg-slate-100 p-1 font-mono text-xs'>{user?.id}</p>
				</div>

				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs'>
					<p className='text-sm font-medium'>Name</p>

					<p className='max-w-45 truncate rounded-md bg-slate-100 p-1 font-mono text-xs'>{user?.name}</p>
				</div>

				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs'>
					<p className='text-sm font-medium'>Email</p>

					<p className='max-w-45 truncate rounded-md bg-slate-100 p-1 font-mono text-xs'>
						{user?.email}
					</p>
				</div>

				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs'>
					<p className='text-sm font-medium'>Role</p>
					<p className='max-w-45 truncate rounded-md bg-slate-100 p-1 font-mono text-xs'>{user?.role}</p>
				</div>

				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs'>
					<p className='text-sm font-medium'>Two Factor Authentication</p>

					<Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
						{user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
					</Badge>
				</div>
			</CardContent>
		</Card>
	)
}
