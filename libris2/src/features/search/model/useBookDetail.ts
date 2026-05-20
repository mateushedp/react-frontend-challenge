import { useQuery } from '@tanstack/react-query'
import { adaptGoogleBook } from '@/entities/book/adapter'

async function fetchBookById(id: string) {
	const res = await fetch(
		`${import.meta.env.VITE_GOOGLE_BOOKS_API_URL}/volumes/${id}?key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
	)
	if (!res.ok) throw new Error('Erro ao buscar livro')
	return res.json()
}

export function useBookDetail(id: string) {
	return useQuery({
		queryKey: ['book', id],
		queryFn: async () => {
			const data = await fetchBookById(id)
			return adaptGoogleBook(data)
		},
		staleTime: 1000 * 60 * 10,
	})
}