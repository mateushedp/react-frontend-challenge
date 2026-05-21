import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import type { ShelfStatus } from '@/entities/shelf/model/store'

const options: { value: ShelfStatus; label: string }[] = [
	{ value: 'want-to-read', label: 'Quero ler' },
	{ value: 'reading', label: 'Lendo' },
	{ value: 'completed', label: 'Concluído' },
]

interface StatusSelectProps {
	value: ShelfStatus
	onChange: (status: ShelfStatus) => void
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
	return (
		<Select value={value} onValueChange={(v) => onChange(v as ShelfStatus)}>
			<SelectTrigger className="w-full">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}