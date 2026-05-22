import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
	token: string | null
	login: (email: string) => void
	logout: () => void
	isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			token: null,
			login: (email) => {
				const token = btoa(`${email}:${Date.now()}`)
				set({ token })
			},
			logout: () => set({ token: null }),
			isAuthenticated: () => !!get().token,
		}),
		{ name: 'libris-auth' }
	)
)