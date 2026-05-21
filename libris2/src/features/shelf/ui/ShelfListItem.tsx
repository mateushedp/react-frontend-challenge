import type { ShelfBook } from '@/entities/shelf/model/store'
import { StatusBadge } from './StatusBadge'
import { BookActionsModal } from './BookActionsModal'

interface ShelfListItemProps {
	book: ShelfBook
}

export function ShelfListItem({ book }: ShelfListItemProps) {
	return (
		<div className="flex w-full min-w-0 items-center gap-3 py-4">
			<div className="w-9 h-14 bg-muted flex-shrink-0 rounded-sm overflow-hidden">
				{book.thumbnail && (
					<img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
				)}
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium truncate">{book.title}</p>
				<p className="text-xs text-muted-foreground truncate">{book.authors.join(', ')}</p>
				<div className="mt-1">
					<StatusBadge status={book.status} />
				</div>
			</div>
			<BookActionsModal book={book} />
		</div>
	)
}