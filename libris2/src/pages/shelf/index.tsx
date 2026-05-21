import { useShelfStore } from '@/entities/shelf/model/store'
import { ShelfTable } from '@/features/shelf/ui/ShelfTable'
import { ShelfListItem } from '@/features/shelf/ui/ShelfListItem'


export function ShelfPage() {
	const { books } = useShelfStore()

	if (books.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] gap-2 text-muted-foreground">
				<span className="text-sm">Sua estante está vazia.</span>
				<span className="text-xs">Adicione livros pela busca.</span>
			</div>
		)
	}

	return (
		<div className="p-6 md:p-12 max-w-6xl mx-auto overflow-x-hidden w-full">
			<div className="mb-12">
				<h1 className="text-3xl md:text-4xl mb-2">Minha estante</h1>
				<p className="text-sm text-muted-foreground upper">
					{books.length} livro{books.length !== 1 ? 's' : ''} na sua coleção pessoal.
				</p>
			</div>

			<div className="hidden md:block">
				<ShelfTable books={books} />
			</div>

			<div className="flex w-full flex-col divide-y divide-border border-y border-border md:hidden">
				{books.map((book) => (
					<ShelfListItem key={book.id} book={book} />
				))}
			</div>
		</div>
	)
}