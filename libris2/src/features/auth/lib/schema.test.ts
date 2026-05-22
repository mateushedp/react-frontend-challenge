import { describe, it, expect } from 'vitest'
import { loginSchema } from './schema'

describe('loginSchema', () => {
	it('valida dados corretos', () => {
		const result = loginSchema.safeParse({
			email: 'user@email.com',
			password: '123456',
		})
		expect(result.success).toBe(true)
	})

	it('rejeita email inválido', () => {
		const result = loginSchema.safeParse({
			email: 'emailinvalido',
			password: '123456',
		})
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe('E-mail inválido')
	})

	it('rejeita senha com menos de 6 caracteres', () => {
		const result = loginSchema.safeParse({
			email: 'user@email.com',
			password: '123',
		})
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe('Senha deve ter ao menos 6 caracteres')
	})

	it('rejeita campos vazios', () => {
		const result = loginSchema.safeParse({ email: '', password: '' })
		expect(result.success).toBe(false)
	})
})