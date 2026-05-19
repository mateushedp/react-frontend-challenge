import type { GoogleBooksVolume } from '@/shared/api/google-books'

export interface Book {
	id: string
	title: string
	authors: string[]
	publishedDate: string
	description: string
	publisher: string
	thumbnail: string | null
	previewLink: string | null
}

export function adaptGoogleBook(volume: GoogleBooksVolume): Book {
	const info = volume.volumeInfo
	return {
		id: volume.id,
		title: info.title ?? 'Título desconhecido',
		authors: info.authors ?? ['Autor desconhecido'],
		publishedDate: info.publishedDate ?? '—',
		description: info.description ?? 'Sem sinopse disponível.',
		publisher: info.publisher ?? '—',
		thumbnail: info.imageLinks?.thumbnail?.replace('http://', 'https://') ?? null,
		previewLink: info.previewLink ?? null,
	}
}