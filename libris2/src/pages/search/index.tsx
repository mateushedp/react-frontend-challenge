import { useState, useEffect, useRef } from 'react'
import { useBookSearch } from '@/features/search/model/useBookSearch'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { BookCard } from '@/entities/book/ui/BookCard'
import { BookCardSkeleton } from '@/entities/book/ui/BookCardSkeleton'
import { SearchBar } from '@/features/search/ui/SearchBar'
import { SearchFilters } from '@/widgets/search-filters'
import { Spinner } from '@/shared/ui/Spinner'
import { BookX } from 'lucide-react'
import { toast } from 'sonner'


export function SearchPage() {
	const [query, setQuery] = useState('')
	const [printType, setPrintType] = useState('all')
	const [orderBy, setOrderBy] = useState('relevance')
	const debouncedQuery = useDebounce(query, 500)
	const effectiveQuery = debouncedQuery.length > 2 ? debouncedQuery : 'fiction'

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useBookSearch({
		query: effectiveQuery,
		printType,
		orderBy,
	})

	const books = data?.pages.flatMap((page) => page.books) ?? []

	const sentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage()
				}
			},
			{ threshold: 0.1 }
		)

		if (sentinelRef.current) observer.observe(sentinelRef.current)
		return () => observer.disconnect()
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

	useEffect(() => {
		if (isError) toast.error('Erro ao buscar livros. Tente novamente.')
	}, [isError])

	return (
		<div className="p-8">
			<SearchBar value={query} onChange={setQuery} />
			<SearchFilters
				printType={printType}
				orderBy={orderBy}
				onPrintTypeChange={setPrintType}
				onOrderByChange={setOrderBy}
			/>

			<div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
				{isLoading
					? Array.from({ length: 12 }).map((_, i) => <BookCardSkeleton key={i} />)
					: books.map((book) => <BookCard key={book.id} book={book} />)
				}
			</div>

			{!isLoading && books.length === 0 && (
				<div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
					<BookX size={40} />
					<p className="text-sm">Nenhum livro encontrado para sua busca.</p>
				</div>
			)}

			<div ref={sentinelRef} className="h-10 mt-8" />

			{(isLoading || isFetchingNextPage) && (
				<div className="flex justify-center my-4">
					<Spinner className="w-8 h-8" />
				</div>
			)}
		</div>
	)
}