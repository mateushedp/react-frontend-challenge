import { useState, useEffect, useRef } from 'react'
import { useBookSearch } from '@/features/search/model/useBookSearch'
import { useDebounce } from '@/shared/hooks/useDebounce'

export function SearchPage() {
	const [query, setQuery] = useState('')
	const [printType, setPrintType] = useState('all')
	const [orderBy, setOrderBy] = useState('relevance')
	const debouncedQuery = useDebounce(query, 500)
	const effectiveQuery = debouncedQuery.length > 2 ? debouncedQuery : 'fiction'

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useBookSearch({
		query: effectiveQuery,
		printType,
		orderBy,
	})

	const books = data?.pages.flatMap((page) => page.books) ?? []
	console.log({ data, books, isLoading })

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

	return (
		<div className="p-8">
			<input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Buscar livros..."
				className="border p-2 w-full mb-4"
			/>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{books.map((book) => (
					<div key={book.id} className="border p-2">
						{book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
						<p>{book.title}</p>
						<p className="text-sm text-neutral">{book.authors.join(', ')}</p>
					</div>
				))}
			</div>

			<div ref={sentinelRef} className="h-10 mt-8" />

			{isFetchingNextPage && (
				<p className="text-center text-sm text-neutral mt-4">Carregando mais títulos...</p>
			)}

			{isLoading && (
				<p className="text-center text-sm text-neutral">Carregando...</p>
			)}
		</div>
	)
}