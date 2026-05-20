import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface SearchFiltersProps {
	printType: string
	orderBy: string
	onPrintTypeChange: (value: string) => void
	onOrderByChange: (value: string) => void
}

const printTypes = [
	{ value: 'all', label: 'Tudo' },
	{ value: 'books', label: 'Livros' },
	{ value: 'magazines', label: 'Revistas' },
]

const orderByOptions = [
	{ value: 'relevance', label: 'Relevância' },
	{ value: 'newest', label: 'Mais recentes' },
]

export function SearchFilters({ printType, orderBy, onPrintTypeChange, onOrderByChange }: SearchFiltersProps) {
	return (
		<div className="flex gap-4 mt-4">
			<div className="flex flex-col gap-2">
				<span className="text-xs uppercase tracking-widest text-muted-foreground">Tipo de mídia</span>
				<Select value={printType} onValueChange={onPrintTypeChange}>
					<SelectTrigger className="w-[160px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{printTypes.map((type) => (
							<SelectItem key={type.value} value={type.value}>
								{type.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex flex-col gap-2">
				<span className="text-xs uppercase tracking-widest text-muted-foreground">Ordenar por</span>
				<Select value={orderBy} onValueChange={onOrderByChange}>
					<SelectTrigger className="w-[160px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{orderByOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}