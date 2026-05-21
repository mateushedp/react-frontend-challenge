import { useState } from 'react'
import { MoreVertical, Trash2 } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { StatusSelect } from './StatusSelect'
import type { ShelfBook, ShelfStatus } from '@/entities/shelf/model/store'
import { useShelfStore } from '@/entities/shelf/model/store'
import { Button } from '@/components/ui/button'

interface BookActionsModalProps {
	book: ShelfBook
}

export function BookActionsModal({ book }: BookActionsModalProps) {
	const { updateStatus, removeBook } = useShelfStore()
	const [open, setOpen] = useState(false)

	const handleRemove = () => {
		removeBook(book.id)
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
					<MoreVertical size={16} />
				</button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-[calc(100vw-2rem)] md:max-w-sm bg-[rgb(var(--card))] border border-white/10 overflow-x-hidden">
				<DialogHeader className="flex min-w-0 flex-row items-center gap-3 space-y-0">
					<div className="w-10 h-16 bg-muted rounded-sm overflow-hidden flex-shrink-0">
						{book.thumbnail && (
							<img
								src={book.thumbnail}
								alt={book.title}
								className="w-full h-full object-cover"
							/>
						)}
					</div>

					<div className="min-w-0 flex-1">
						<DialogTitle className="text-base line-clamp-2 leading-snug">
							{book.title}
						</DialogTitle>

						<p className="text-xs text-muted-foreground mt-1 truncate">
							{book.authors.join(', ')}
						</p>
					</div>
				</DialogHeader>

				<div className="flex flex-col gap-3 pt-2">
					<div className="flex flex-col gap-2">
						<span className="text-xs uppercase tracking-widest text-muted-foreground">
							Alterar status
						</span>

						<StatusSelect
							value={book.status}
							onChange={(s: ShelfStatus) => updateStatus(book.id, s)}
						/>
					</div>

					<Button
						variant="destructive"
						className="w-full gap-2 mt-2"
						onClick={handleRemove}
					>
						<Trash2 size={14} />
						Remover da estante
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}