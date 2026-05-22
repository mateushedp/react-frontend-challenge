import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import type { ShelfBook } from '@/entities/shelf/model/store'
import { StatusBadge } from './StatusBadge'
import { BookActionsModal } from './BookActionsModal'
import { Link } from '@tanstack/react-router'

const columnHelper = createColumnHelper<ShelfBook>()

export function ShelfTable({ books }: { books: ShelfBook[] }) {
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = [
		columnHelper.display({
			id: 'thumbnail',
			header: 'Capa',
			cell: ({ row }) => (
				<Link to="/book/$bookId" params={{ bookId: row.original.id }}>
					<div className="w-9 h-14 bg-muted rounded-sm overflow-hidden flex-shrink-0">
						{row.original.thumbnail ? (
							<img
								src={row.original.thumbnail}
								alt={row.original.title}
								className="w-full h-full object-cover hover:opacity-80 transition-opacity"
							/>
						) : null}
					</div>
				</Link>
			),
		}),
		columnHelper.accessor('title', {
			header: 'Título',
			cell: ({ row }) => (
				<Link
					to="/book/$bookId"
					params={{ bookId: row.original.id }}
					className="text-sm font-medium hover:underline"
				>
					{row.original.title}
				</Link>
			),
		}),
		columnHelper.accessor('authors', {
			header: 'Autor',
			cell: ({ getValue }) => (
				<span className="text-sm text-muted-foreground">{getValue().join(', ')}</span>
			),
			enableSorting: false,
		}),
		columnHelper.accessor('publishedDate', {
			header: 'Data pub.',
			cell: ({ getValue }) => (
				<span className="text-sm text-muted-foreground">{getValue()}</span>
			),
			enableSorting: false,
		}),
		columnHelper.accessor('status', {
			header: 'Status',
			cell: ({ row }) => <StatusBadge status={row.original.status} />,
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Ações',
			cell: ({ row }) => <BookActionsModal book={row.original} />,
		}),
	]

	const table = useReactTable({
		data: books,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="border-b border-border">
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="text-left py-3 px-4 text-xs uppercase tracking-widest text-muted-foreground font-normal"
								>
									{header.column.getCanSort() ? (
										<button
											onClick={header.column.getToggleSortingHandler()}
											className="flex items-center gap-1 uppercase tracking-widest hover:text-foreground transition-colors"
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{header.column.getIsSorted() === 'asc' ? (
												<ChevronUp size={12} />
											) : header.column.getIsSorted() === 'desc' ? (
												<ChevronDown size={12} />
											) : (
												<ChevronDown size={12} className="opacity-30" />
											)}
										</button>
									) : (
										flexRender(header.column.columnDef.header, header.getContext())
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="border-b border-border hover:bg-muted/30 transition-colors">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="py-3 px-4">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}