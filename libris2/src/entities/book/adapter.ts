import type { GoogleBooksVolume } from '@/shared/api/google-books'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface Book {
	id: string
	title: string
	authors: string[]
	publishedDate: string
	description: string
	publisher: string
	thumbnail: string | null
	previewLink: string | null
	pageCount: number | null
	language: string | null
	isbn: string | null
}

export function adaptGoogleBook(volume: GoogleBooksVolume): Book {
	const info = volume.volumeInfo
	const isbn = info.industryIdentifiers?.find(
		(i) => i.type === 'ISBN_13' || i.type === 'ISBN_10'
	)?.identifier ?? null

	return {
		id: volume.id,
		title: info.title ?? 'Título desconhecido',
		authors: info.authors ?? ['Autor desconhecido'],
		publishedDate: info.publishedDate?.length === 4
			? info.publishedDate
			: info.publishedDate
				? format(
					new Date(
						info.publishedDate.length === 7
							? `${info.publishedDate}-01`
							: info.publishedDate
					),
					'MMMM, yyyy',
					{ locale: ptBR }
				).replace(/^\w/, (c) => c.toUpperCase())
				: '—',
		description: info.description ?? 'Sem sinopse disponível.',
		publisher: info.publisher ?? '—',
		thumbnail: info.imageLinks?.thumbnail?.replace('http://', 'https://') ?? null,
		previewLink: info.previewLink ?? null,
		pageCount: info.pageCount ?? null,
		language: info.language ?? null,
		isbn,
	}
}