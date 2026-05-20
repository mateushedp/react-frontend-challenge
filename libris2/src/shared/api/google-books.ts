const BASE_URL = import.meta.env.VITE_GOOGLE_BOOKS_API_URL ?? 'https://www.googleapis.com/books/v1'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY ?? ''

export interface GoogleBooksResponse {
	totalItems: number
	items: GoogleBooksVolume[]
}

export interface GoogleBooksVolume {
	id: string
	volumeInfo: {
		title?: string
		authors?: string[]
		publishedDate?: string
		description?: string
		publisher?: string
		imageLinks?: {
			thumbnail?: string
			smallThumbnail?: string
		}
		previewLink?: string
	}
}

export async function searchBooks(
	query: string,
	startIndex = 0,
	printType = 'all',
	orderBy = 'relevance'
): Promise<GoogleBooksResponse> {
	const params = new URLSearchParams({
		q: query,
		startIndex: String(startIndex),
		maxResults: '12',
		printType,
		orderBy,
		...(API_KEY && { key: API_KEY }),
	})

	const res = await fetch(`${BASE_URL}/volumes?${params}`)
	if (!res.ok) throw new Error('Erro ao buscar livros')
	return res.json()
}