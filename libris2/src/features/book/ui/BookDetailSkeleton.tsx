export function BookDetailSkeleton() {
	const lines = ['w-full', 'w-full', 'w-full', 'w-5/6', 'w-full', 'w-3/4']

	return (
		<div className="p-6 md:p-12 max-w-6xl mx-auto animate-pulse">
			<div className="h-3 bg-muted rounded w-20 mb-8" />

			<div className="flex flex-col md:flex-row gap-8 md:gap-16">
				<div className="flex flex-col gap-4 md:w-[260px] shrink-0">
					<div className="w-full aspect-[2/3] bg-muted" />
					<div className="h-9 bg-muted rounded w-full" />
					<div className="h-3 bg-muted rounded w-24 mx-auto" />
				</div>

				<div className="flex flex-col gap-8 flex-1">
					<div className="flex flex-col gap-2">
						<div className="h-8 bg-muted rounded w-3/4" />
						<div className="h-8 bg-muted rounded w-1/2" />
						<div className="h-3 bg-muted rounded w-40 mt-1" />
					</div>

					<div className="flex flex-wrap gap-8 border-t border-b border-border py-6">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="flex flex-col gap-2">
								<div className="h-2 bg-muted rounded w-20" />
								<div className="h-3 bg-muted rounded w-16" />
							</div>
						))}
					</div>

					<div className="flex flex-col gap-3">
						<div className="h-2 bg-muted rounded w-16" />
						<div className="flex flex-col gap-2">
							{lines.map((w, i) => (
								<div key={i} className={`h-3 bg-muted rounded ${w}`} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}