<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errors = {};
	let message = '';

	const validate = () => {
		const nextErrors = {};
		if (!name.trim()) nextErrors.name = 'Введите имя';
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			nextErrors.email = 'Введите корректный email';
		}
		if (!password || password.length < 6 || password.length > 20) {
			nextErrors.password = 'Пароль должен быть от 6 до 20 символов';
		}
		if (password !== confirmPassword) {
			nextErrors.confirmPassword = 'Пароли не совпадают';
		}
		errors = nextErrors;
		return Object.keys(nextErrors).length === 0;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!validate()) return;

		const result = authStore.register({ name, email, password });
		if (!result.ok) {
			message = result.message;
			return;
		}

		message =
			'Пользователь создан. Теперь можно войти, используя email и пароль, указанными ниже.';
		setTimeout(() => goto('/auth/login'), 800);
	};
</script>

<section class="page-section">
	<div class="mx-auto max-w-xl">
		<div class="card space-y-6 p-6 sm:p-8">
			<div>
				<p class="text-sm font-semibold uppercase tracking-wide text-brand-700">Регистрация</p>
				<h1 class="text-3xl font-bold text-slate-900">Создайте учётную запись</h1>
				<p class="mt-1 text-sm text-slate-500">
					Укажите имя, email и пароль. Все данные сохраняются в localStorage для учебного примера.
				</p>
			</div>
			<form class="space-y-4" onsubmit={handleSubmit} novalidate>
				<div class="space-y-2">
					<label class="text-sm font-semibold text-slate-700" for="name">Имя</label>
					<input
						id="name"
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
						type="text"
						placeholder="Ваше имя"
						bind:value={name}
					/>
					{#if errors.name}
						<p class="text-sm text-red-600">{errors.name}</p>
					{/if}
				</div>
				<div class="space-y-2">
					<label class="text-sm font-semibold text-slate-700" for="email">Email</label>
					<input
						id="email"
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
						type="email"
						placeholder="you@example.com"
						bind:value={email}
					/>
					{#if errors.email}
						<p class="text-sm text-red-600">{errors.email}</p>
					{/if}
				</div>
				<div class="space-y-2">
					<label class="text-sm font-semibold text-slate-700" for="password">Пароль</label>
					<input
						id="password"
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
						type="password"
						minlength="6"
						maxlength="20"
						placeholder="6–20 символов"
						bind:value={password}
					/>
					{#if errors.password}
						<p class="text-sm text-red-600">{errors.password}</p>
					{/if}
				</div>
				<div class="space-y-2">
					<label class="text-sm font-semibold text-slate-700" for="confirm">Подтверждение пароля</label>
					<input
						id="confirm"
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
						type="password"
						placeholder="Повторите пароль"
						bind:value={confirmPassword}
					/>
					{#if errors.confirmPassword}
						<p class="text-sm text-red-600">{errors.confirmPassword}</p>
					{/if}
				</div>
				<button
					class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
					type="submit"
					disabled={!name || !email || !password || !confirmPassword}
				>
					Зарегистрироваться
				</button>
				<p class="text-sm text-slate-500">
					Уже есть аккаунт?
					<a class="font-semibold text-brand-700 hover:text-brand-800" href="/auth/login">
						Войти
					</a>
				</p>
			</form>
			{#if message}
				<div
					class="rounded-lg px-4 py-3 text-sm {message.includes('создан') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}"
				>
					{message}
				</div>
			{/if}
		</div>
	</div>
</section>
