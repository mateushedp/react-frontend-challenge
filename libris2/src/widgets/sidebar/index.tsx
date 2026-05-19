import { Link, useNavigate } from '@tanstack/react-router'
import { BookMarked, Search, LogOut } from 'lucide-react'
import { useAuthStore } from '@/features/auth/model/store'
import { Button } from '@/components/ui/button'


const navItems = [
	{ to: '/shelf', label: 'Minha Estante', icon: BookMarked },
	{ to: '/', label: 'Buscar Livros', icon: Search },
]

export function Sidebar() {
	const logout = useAuthStore((s) => s.logout)
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate({ to: '/login' })
	}

	return (
		<>
			{/* Desktop */}
			<aside className="hidden md:flex flex-col w-[200px] min-h-screen border-r border-white/10 p-6 fixed top-0 left-0 bg-sidebar">
				<div className="mb-12">
					<h1 className="text-2xl font-semibold">Libris</h1>
					<span className="text-xs uppercase text-neutral tracking-widest">Santuário Digital</span>
				</div>

				<nav className="flex flex-col gap-1 flex-1">
					{navItems.map(({ to, label, icon: Icon }) => (
						<Link
							key={to}
							to={to}
							className="flex items-center gap-3 px-3 py-2 text-sm text-neutral hover:text-foreground transition-colors"
							activeProps={{ className: 'text-foreground border-l-2 border-white text-white' }}
						>
							<Icon size={16} />
							{label}
						</Link>
					))}
				</nav>

				<Button variant={"ghost"}
					onClick={handleLogout}
					className="flex items-center gap-3 px-3 py-2 text-sm text-neutral hover:text-foreground transition-colors"
				>
					<LogOut size={16} />
					Sair
				</Button>
			</aside>

			{/* Mobile */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[rgb(var(--background))] flex justify-around py-3 z-50 bg-sidebar">
				{navItems.map(({ to, label, icon: Icon }) => (
					<Link
						key={to}
						to={to}
						className="flex flex-col items-center gap-1 text-xs text-neutral"
						activeProps={{ className: 'text-white' }}
					>
						<Icon size={20} />
						{label}
					</Link>
				))}
				<button
					onClick={handleLogout}
					className="flex flex-col items-center gap-1 text-xs text-neutral"
				>
					<LogOut size={20} />
					Sair
				</button>
			</nav>
		</>
	)
}