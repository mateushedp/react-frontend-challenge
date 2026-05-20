import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../features/auth/model/store'
import { LoginPage } from '@/pages/login'
import { SearchPage } from '@/pages/search'
import { AppLayout } from './layouts/AppLayout'

const rootRoute = createRootRoute()

const requireAuth = () => {
	const { token } = useAuthStore.getState()
	if (!token) throw redirect({ to: '/login' })
}

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	beforeLoad: () => {
		const { token } = useAuthStore.getState()
		if (token) throw redirect({ to: '/' })
	},
	component: LoginPage,
})

const protectedLayout = createRoute({
	getParentRoute: () => rootRoute,
	id: 'protected',
	beforeLoad: requireAuth,
	component: AppLayout,
})

const searchRoute = createRoute({
	getParentRoute: () => protectedLayout,
	path: '/',
	component: SearchPage,
})

const shelfRoute = createRoute({
	getParentRoute: () => protectedLayout,
	path: '/shelf',
	component: () => <div>Estante</div>,
})

const bookRoute = createRoute({
	getParentRoute: () => protectedLayout,
	path: '/book/$bookId',
	component: () => <div>Detalhe do livro</div>,
})

const routeTree = rootRoute.addChildren([
	loginRoute,
	protectedLayout.addChildren([searchRoute, shelfRoute, bookRoute]),
])

export const router = createRouter({ routeTree })