import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Book } from '@/entities/book/adapter'

export type ShelfStatus = 'want-to-read' | 'reading' | 'completed'

export interface ShelfBook extends Book {
	status: ShelfStatus
	addedAt: string
}

interface ShelfStore {
	books: ShelfBook[]
	addBook: (book: Book) => void
	removeBook: (id: string) => void
	updateStatus: (id: string, status: ShelfStatus) => void
	isInShelf: (id: string) => boolean
}

export const useShelfStore = create<ShelfStore>()(
	persist(
		(set, get) => ({
			books: [],

			addBook: (book) => {
				if (get().isInShelf(book.id)) return
				set((state) => ({
					books: [...state.books, {
						...book,
						status: 'want-to-read',
						addedAt: new Date().toISOString(),
					}],
				}))
			},

			removeBook: (id) =>
				set((state) => ({
					books: state.books.filter((b) => b.id !== id),
				})),

			updateStatus: (id, status) =>
				set((state) => ({
					books: state.books.map((b) =>
						b.id === id ? { ...b, status } : b
					),
				})),

			isInShelf: (id) => get().books.some((b) => b.id === id),
		}),
		{ name: 'libris-shelf' }
	)
)