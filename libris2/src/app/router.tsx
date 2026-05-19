import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../features/auth/model/store'
import { LoginPage } from '@/pages/login'

const rootRoute = createRootRoute()

const requireAuth = () => {
	const { token } = useAuthStore.getState()
	if (!token) throw redirect({ to: '/login' })
}

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	// beforeLoad: () => {
	// 	const { token } = useAuthStore.getState()
	// 	if (token) throw redirect({ to: '/' })
	// },
	component: LoginPage,
})

const searchRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: requireAuth,
	component: () => <div>Busca</div>,
})

const shelfRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/shelf',
	beforeLoad: requireAuth,
	component: () => <div>Estante</div>,
})

const bookRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/book/$bookId',
	beforeLoad: requireAuth,
	component: () => <div>Detalhe do livro</div>,
})

const routeTree = rootRoute.addChildren([
	loginRoute,
	searchRoute,
	shelfRoute,
	bookRoute,
])

export const router = createRouter({ routeTree })