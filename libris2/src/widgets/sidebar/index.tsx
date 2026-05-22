import { Link, useNavigate } from '@tanstack/react-router'
import { BookMarked, Search, LogOut } from 'lucide-react'
import { useAuthStore } from '@/features/auth/model/store'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/features/theme/ui/ThemeToggle'

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
							className="flex items-center gap-3 px-3 py-2 text-sm transition-colors"
							activeProps={{ className: 'text-nav-active border-l-2 border-foreground' }}
							inactiveProps={{ className: 'text-foreground/40 hover:text-foreground' }}
						>
							<Icon size={16} />
							{label}
						</Link>
					))}
				</nav>

				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between px-3 py-2">
						<span className="text-sm text-foreground/40">Tema</span>
						<ThemeToggle />
					</div>
					<Button
						variant="ghost"
						onClick={handleLogout}
						className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/40 hover:text-foreground transition-colors justify-start"
					>
						<LogOut size={16} />
						Sair
					</Button>
				</div>
			</aside>

			{/* Mobile */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-sidebar flex justify-around z-50">
				{navItems.map(({ to, label, icon: Icon }) => (
					<Link
						key={to}
						to={to}
						className="flex flex-col items-center gap-1 text-xs transition-colors py-3 px-2"
						activeProps={{ className: 'text-nav-active border-t-2 border-foreground -mt-px' }}
						inactiveProps={{ className: 'text-foreground/50' }}
					>
						<Icon size={20} />
						{label}
					</Link>
				))}
				<div className="flex flex-col items-center gap-1 py-3 px-4">
					<ThemeToggle iconOnly />
					<span className="text-xs text-foreground/50">Tema</span>
				</div>
				<button
					onClick={handleLogout}
					className="flex flex-col items-center gap-1 text-xs text-foreground/50 hover:text-foreground transition-colors py-3 px-4"
				>
					<LogOut size={20} />
					Sair
				</button>
			</nav>
		</>
	)
}