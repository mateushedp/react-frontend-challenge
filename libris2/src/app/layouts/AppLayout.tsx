import { Outlet } from '@tanstack/react-router'
import { Sidebar } from '@/widgets/sidebar'

export function AppLayout() {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 md:ml-[200px] pb-20 md:pb-0">
				<Outlet />
			</main>
		</div>
	)
}