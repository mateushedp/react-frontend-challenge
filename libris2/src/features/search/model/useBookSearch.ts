import { useInfiniteQuery } from '@tanstack/react-query'
import { searchBooks } from '@/shared/api/google-books'
import { adaptGoogleBook } from '@/entities/book/adapter'

interface UseBookSearchParams {
	query: string
	printType: string
	orderBy: string
}

const PAGE_SIZE = 12

export function useBookSearch({ query, printType, orderBy }: UseBookSearchParams) {
	return useInfiniteQuery({
		queryKey: ['books', query, printType, orderBy],
		queryFn: async ({ pageParam = 0 }) => {
			const data = await searchBooks(query, pageParam * PAGE_SIZE, printType, orderBy)
			return {
				books: (data.items ?? []).map(adaptGoogleBook),
				totalItems: data.totalItems,
			}
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			const loaded = allPages.length * PAGE_SIZE
			return loaded < lastPage.totalItems ? allPages.length : undefined
		},
		enabled: query.length > 2,
		staleTime: 1000 * 60 * 5,
	})
}