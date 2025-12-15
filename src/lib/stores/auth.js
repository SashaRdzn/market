// @ts-nocheck
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const AUTH_KEY = 'bike-auth-user';
const USERS_KEY = 'bike-users';

const readUsers = () => {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(USERS_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch (error) {
		console.warn('Не удалось прочитать список пользователей', error);
		return [];
	}
};

const saveUsers = (users) => {
	if (!browser) return;
	try {
		localStorage.setItem(USERS_KEY, JSON.stringify(users));
	} catch (error) {
		console.warn('Не удалось сохранить список пользователей', error);
	}
};

const readAuthUser = () => {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(AUTH_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch (error) {
		console.warn('Не удалось прочитать авторизацию', error);
		return null;
	}
};

const saveAuthUser = (user) => {
	if (!browser) return;
	try {
		if (user) {
			localStorage.setItem(AUTH_KEY, JSON.stringify(user));
		} else {
			localStorage.removeItem(AUTH_KEY);
		}
	} catch (error) {
		console.warn('Не удалось сохранить авторизацию', error);
	}
};

const auth = writable({ user: readAuthUser() });

const setUser = (user) => {
	auth.set({ user });
	saveAuthUser(user);
};

export const authStore = {
	subscribe: auth.subscribe,
	login({ email, password }) {
		const users = readUsers();
		const existing = users.find(
			(u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
		);

		if (!existing) {
			return { ok: false, message: 'Неверный email или пароль' };
		}

		setUser({ name: existing.name, email: existing.email });
		return { ok: true };
	},
	register({ name, email, password }) {
		const users = readUsers();
		const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

		if (emailExists) {
			return { ok: false, message: 'Пользователь с таким email уже существует' };
		}

		const nextUsers = [...users, { name, email, password }];
		saveUsers(nextUsers);
		return { ok: true };
	},
	logout() {
		setUser(null);
	}
};
