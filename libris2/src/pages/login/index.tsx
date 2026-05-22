import { useLoginForm } from '../../features/auth/ui/LoginForm'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import libraryBg from '@/assets/library-bg.jpg'

export function LoginPage() {
	const { form } = useLoginForm()

	return (
		<div className="min-h-screen flex">
			<div className="hidden md:block md:w-[60%] relative overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center scale-105"
					style={{
						backgroundImage: `url(${libraryBg})`,
						filter: 'brightness(0.6)'
					}}
				/>

				<div className="absolute inset-0 bg-black/30" />

				<div className="absolute top-10 left-10 z-10 flex flex-col">
					<h1 className="text-4xl font-semibold text-white leading-none">
						Libris
					</h1>

					<span className="text-sm uppercase text-white/60 mt-1">
						santuário digital
					</span>
				</div>
			</div>

			<div className="p-4 flex flex-col w-full items-center md:items-start md:p-16 md:w-[40%] md:justify-center">
				<h1 className="md:hidden">
					Libris
				</h1>

				<h1 className="hidden md:block">
					Bem vindo de volta.
				</h1>

				<h2 className="italic text-neutral text-base mt-2 text-center md:text-left">
					Acesse sua estante pessoal e continue sua jornada literária.
				</h2>

				<form
					onSubmit={(e) => {
						e.preventDefault()
						form.handleSubmit()
					}}
					className="flex flex-col gap-8 w-full mt-8"
				>
					<div className="flex flex-col gap-1">
						<Label className="uppercase text-neutral font-bold text-xs">
							E-mail
						</Label>

						<form.Field
							name="email"
							children={(field) => (
								<>
									<Input
										placeholder="seuemail@email.com"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										type='email'
										className="placeholder:text-neutral bg-sidebar"
									/>

									{field.state.meta.errors[0] && (
										<span className="text-red-400 text-sm">
											{field.state.meta.errors[0].message}
										</span>
									)}
								</>
							)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<Label className="uppercase text-neutral font-bold text-xs">
							Senha
						</Label>

						<form.Field
							name="password"
							children={(field) => (
								<>
									<Input
										type="password"
										placeholder="******"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										className="placeholder:text-neutral bg-sidebar"
									/>

									{field.state.meta.errors[0] && (
										<span className="text-red-400 text-sm">
											{field.state.meta.errors[0].message}
										</span>
									)}
								</>
							)}
						/>
					</div>

					<Button type="submit" className="w-full text-sm mt-4" size="lg">
						Entrar
						<ArrowRight />
					</Button>
				</form>
			</div>
		</div>
	)
}