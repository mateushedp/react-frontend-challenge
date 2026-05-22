import { useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'
import { Sidebar } from '@/widgets/sidebar'
import { useThemeStore } from '@/features/theme/model/store'

export function AppLayout() {
	const { theme } = useThemeStore()

	useEffect(() => {
		document.documentElement.classList.remove('dark', 'light')
		document.documentElement.classList.add(theme)
	}, [theme])

	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 md:ml-[200px] pb-20 md:pb-0 overflow-x-hidden">
				<Outlet />
			</main>
		</div>
	)
}