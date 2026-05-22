import { describe, it, expect, beforeEach } from 'vitest'
import { useShelfStore } from './store'
import type { Book } from '@/entities/book/adapter'

const mockBook: Book = {
	id: '1',
	title: 'O Alquimista',
	authors: ['Paulo Coelho'],
	publishedDate: '1988',
	description: 'Um livro.',
	publisher: 'HarperCollins',
	thumbnail: null,
	previewLink: null,
	pageCount: 208,
	language: 'pt',
	isbn: null,
}

beforeEach(() => {
	useShelfStore.setState({ books: [] })
})

describe('useShelfStore', () => {
	it('adiciona um livro com status want-to-read', () => {
		useShelfStore.getState().addBook(mockBook)
		const books = useShelfStore.getState().books
		expect(books).toHaveLength(1)
		expect(books[0].status).toBe('want-to-read')
	})

	it('não adiciona o mesmo livro duas vezes', () => {
		useShelfStore.getState().addBook(mockBook)
		useShelfStore.getState().addBook(mockBook)
		expect(useShelfStore.getState().books).toHaveLength(1)
	})

	it('remove um livro pelo id', () => {
		useShelfStore.getState().addBook(mockBook)
		useShelfStore.getState().removeBook('1')
		expect(useShelfStore.getState().books).toHaveLength(0)
	})

	it('atualiza o status do livro', () => {
		useShelfStore.getState().addBook(mockBook)
		useShelfStore.getState().updateStatus('1', 'completed')
		expect(useShelfStore.getState().books[0].status).toBe('completed')
	})

	it('isInShelf retorna true se livro está na estante', () => {
		useShelfStore.getState().addBook(mockBook)
		expect(useShelfStore.getState().isInShelf('1')).toBe(true)
	})

	it('isInShelf retorna false se livro não está na estante', () => {
		expect(useShelfStore.getState().isInShelf('99')).toBe(false)
	})
})