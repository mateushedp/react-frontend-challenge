import type { ShelfStatus } from '@/entities/shelf/model/store'

const statusConfig: Record<ShelfStatus, { label: string; className: string }> = {
	'want-to-read': {
		label: 'Quero ler',
		className: 'text-muted-foreground border border-border bg-transparent',
	},
	reading: {
		label: 'Lendo',
		className: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950',
	},
	completed: {
		label: 'Concluído',
		className: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950',
	},
}

interface StatusBadgeProps {
	status: ShelfStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
	const { label, className } = statusConfig[status]
	return (
		<span className={`text-[10px] md:text-xs font-medium px-2 md:px-2.5 py-0.5 md:py-1 rounded-sm uppercase tracking-wider whitespace-nowrap ${className}`}>
			{label}
		</span>
	)
}