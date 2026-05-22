export function BookCardSkeleton() {
	return (
		<div className="flex flex-col gap-2 animate-pulse">
			<div className="aspect-[2/3] bg-muted" />
			<div className="flex flex-col gap-1">
				<div className="h-3 bg-muted rounded w-3/4" />
				<div className="h-3 bg-muted rounded w-1/2" />
			</div>
		</div>
	)
}