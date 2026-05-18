import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'

const rootRoute = createRootRoute()

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: () => <div>Login</div>,
})

const searchRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: () => <div>Busca</div>,
})

const shelfRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/shelf',
	component: () => <div>Estante</div>,
})

const bookRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/book/$bookId',
	component: () => <div>Detalhe do livro</div>,
})

const routeTree = rootRoute.addChildren([
	loginRoute,
	searchRoute,
	shelfRoute,
	bookRoute,
])

export const router = createRouter({ routeTree })