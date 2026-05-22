import type { Book } from '../adapter'
import { BookOpen } from 'lucide-react'
import { Link } from '@tanstack/react-router'


interface BookCardProps {
	book: Book
}

export function BookCard({ book }: BookCardProps) {
	return (
		<Link to="/book/$bookId" params={{ bookId: book.id }}>
			<div className="flex flex-col gap-2 cursor-pointer group w-full">
				<div className="flex flex-col gap-2 cursor-pointer group w-full">
					<div className="w-full aspect-[2/3] overflow-hidden bg-muted flex items-center justify-center">
						{book.thumbnail ? (
							<img
								src={book.thumbnail}
								alt={book.title}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						) : (
							<div className="flex flex-col items-center gap-2 text-muted-foreground">
								<BookOpen size={32} />
								<span className="text-xs text-center px-2">Sem capa disponível</span>
							</div>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-medium leading-tight line-clamp-2">{book.title}</h3>
						<span className="text-sm text-muted-foreground line-clamp-1">
							{book.authors.join(', ')}
						</span>
					</div>
				</div>
			</div>
		</Link>

	)
}