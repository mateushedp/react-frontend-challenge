import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
	value: string
	onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<div className="flex flex-col gap-1">
			<span className="text-xs uppercase tracking-widest text-muted-foreground">
				Buscar na biblioteca
			</span>
			<div className="relative">
				<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
				<Input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Título, autor ou ISBN..."
					className="pl-9 bg-sidebar"
				/>
			</div>
		</div>
	)
}