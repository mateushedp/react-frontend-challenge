import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { loginSchema } from '../lib/schema'
import { useAuthStore } from '../model/store'

export function useLoginForm() {
	const login = useAuthStore((s) => s.login)
	const navigate = useNavigate()

	const form = useForm({
		defaultValues: { email: '', password: '' },
		validators: { onSubmit: loginSchema },
		onSubmit: async ({ value }) => {
			login(value.email)
			navigate({ to: '/' })
		},
	})

	return { form }
}