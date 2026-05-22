import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../model/store'

interface ThemeToggleProps {
	iconOnly?: boolean
}

export function ThemeToggle({ iconOnly }: ThemeToggleProps) {
	const { theme, toggleTheme } = useThemeStore()

	if (iconOnly) {
		return (
			<button
				onClick={toggleTheme}
				className="text-foreground/50 hover:text-foreground transition-colors"
			>
				{theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
			</button>
		)
	}

	return (
		<button
			onClick={toggleTheme}
			className="flex items-center gap-1 p-1 rounded-full bg-foreground/10 transition-colors"
		>
			<span className={`p-1 rounded-full transition-colors ${theme === 'light' ? 'bg-foreground text-background' : 'text-foreground/40'}`}>
				<Sun size={12} />
			</span>
			<span className={`p-1 rounded-full transition-colors ${theme === 'dark' ? 'bg-foreground text-background' : 'text-foreground/40'}`}>
				<Moon size={12} />
			</span>
		</button>
	)
}