import { useParams, Link } from '@tanstack/react-router'
import { useBookDetail } from '@/features/search/model/useBookDetail'
import { useShelfStore } from '@/entities/shelf/model/store'
import { BookOpen, ArrowLeft, ExternalLink, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookDetailSkeleton } from '@/features/book/ui/BookDetailSkeleton'
import { toast } from 'sonner'

export function BookDetailPage() {
	const { bookId } = useParams({ strict: false })
	const { data: book, isLoading, isError } = useBookDetail(bookId)
	const { addBook, removeBook, isInShelf } = useShelfStore()

	const inShelf = isInShelf(bookId)

	if (isLoading) return <BookDetailSkeleton />

	if (isError || !book) {
		return (
			<div className="flex justify-center items-center min-h-screen text-muted-foreground text-sm">
				Erro ao carregar o livro.
			</div>
		)
	}

	return (
		<div className="p-6 md:p-12 max-w-6xl mx-auto">
			<Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
				<ArrowLeft size={16} />
				Voltar
			</Link>

			<div className="flex flex-col md:flex-row gap-8 md:gap-16">
				{/* Capa */}
				<div className="w-[250px] md:w-[260px] self-center md:self-auto shrink-0 flex flex-col gap-4">
					<div className="w-full aspect-[2/3] overflow-hidden bg-muted flex items-center justify-center">
						{book.thumbnail ? (
							<img
								src={book.thumbnail}
								alt={book.title}
								onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
								className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
							/>
						) : (
							<div className="flex flex-col items-center gap-2 text-muted-foreground">
								<BookOpen size={32} />
								<span className="text-xs text-center px-2">Sem capa disponível</span>
							</div>
						)}
					</div>

					<Button
						variant="outline"
						className="w-full gap-2"
						onClick={() => {
							if (inShelf) {
								removeBook(book.id)
								toast.success('Livro removido da estante.')
							} else {
								addBook(book)
								toast.success('Livro adicionado à estante.')
							}
						}}
					>
						<Bookmark size={16} className={inShelf ? 'fill-current' : ''} />
						{inShelf ? 'Remover da Estante' : 'Adicionar à Estante'}
					</Button>

					{book.previewLink && (
						<a
							href={book.previewLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							<ExternalLink size={14} />
							Ver preview
						</a>
					)}
				</div>

				{/* Informações */}
				<div className="flex flex-col gap-8 flex-1">
					<div>
						<h1 className="text-3xl md:text-4xl mb-2">{book.title}</h1>
						<p className="text-muted-foreground">{book.authors.join(', ')}</p>
					</div>

					<div className="flex flex-wrap gap-8 border-t border-b border-border py-6">
						{book.publishedDate && (
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-widest text-muted-foreground">Publicado em</span>
								<span className="text-sm">{book.publishedDate}</span>
							</div>
						)}
						{book.pageCount && (
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-widest text-muted-foreground">Páginas</span>
								<span className="text-sm">{book.pageCount}</span>
							</div>
						)}
						{book.isbn && (
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-widest text-muted-foreground">ISBN-13</span>
								<span className="text-sm">{book.isbn}</span>
							</div>
						)}
						{book.language && (
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-widest text-muted-foreground">Idioma</span>
								<span className="text-sm uppercase">{book.language}</span>
							</div>
						)}
					</div>

					<div className="flex flex-col gap-3">
						<span className="text-xs uppercase tracking-widest text-muted-foreground border-l-2 border-foreground/20 pl-3">
							Sinopse
						</span>
						<p className="text-sm leading-relaxed text-muted-foreground text-justify">{book.description}</p>
					</div>
				</div>
			</div>
		</div >
	)
}