import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BookDetailPage } from './index'
import { useShelfStore } from '@/entities/shelf/model/store'
import * as useBookDetailModule from '@/features/search/model/useBookDetail'
import type { Book } from '@/entities/book/adapter'

const mockBook: Book = {
	id: 'abc123',
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

const mockedUseBookDetail = vi.spyOn(
	useBookDetailModule,
	'useBookDetail'
)

vi.mock('@tanstack/react-router', () => ({
	useParams: () => ({ bookId: 'abc123' }),
	Link: ({ children, ...props }: { children: React.ReactNode }) => <a {...props}>{children}</a>,
}))

beforeEach(() => {
	useShelfStore.setState({ books: [] })
})

afterEach(() => {
	vi.clearAllMocks()
})

describe('BookDetailPage — fluxo da estante', () => {
	beforeEach(() => {
		mockedUseBookDetail.mockReturnValue({
			data: mockBook,
			isLoading: false,
			isError: false,
		} as ReturnType<typeof useBookDetailModule.useBookDetail>)
	})

	it('renderiza o título do livro', () => {
		render(<BookDetailPage />)
		expect(screen.getByText('O Alquimista')).toBeInTheDocument()
	})

	it('adiciona livro à estante ao clicar no botão', () => {
		render(<BookDetailPage />)
		fireEvent.click(screen.getByText('Adicionar à Estante'))
		expect(useShelfStore.getState().isInShelf('abc123')).toBe(true)
	})

	it('botão muda para Remover da Estante após adicionar', () => {
		render(<BookDetailPage />)
		fireEvent.click(screen.getByText('Adicionar à Estante'))
		expect(screen.getByText('Remover da Estante')).toBeInTheDocument()
	})

	it('remove livro da estante ao clicar em Remover', () => {
		render(<BookDetailPage />)
		fireEvent.click(screen.getByText('Adicionar à Estante'))
		fireEvent.click(screen.getByText('Remover da Estante'))
		expect(useShelfStore.getState().isInShelf('abc123')).toBe(false)
	})
})