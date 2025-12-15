# Bike Accessories — Интернет-магазин велосипедных аксессуаров

## 🚀 Запуск проекта

```bash
# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Откроется на http://localhost:5173
```

## 📁 Структура проекта

```
src/
├── components/        # UI компоненты
│   ├── base/         # Navbar, Footer
│   ├── products/     # ProductCard
│   └── shopping-cart/ # ProductItem
├── routes/           # Страницы
│   ├── +page.svelte  # Главная
│   ├── products/     # Каталог
│   ├── shopping-cart/ # Корзина
│   └── auth/         # Вход/Регистрация
├── lib/
│   ├── data/         # Мок-данные товаров
│   ├── stores/       # Svelte stores (cart, auth)
│   └── utils/        # Утилиты
└── app.css           # Tailwind CSS стили
```

## 🎨 Технологии

- **SvelteKit** — метафреймворк
- **Tailwind CSS 4** — стилизация
- **Flowbite Svelte** — UI компоненты
- **Vite** — сборщик

## 💾 Хранение данных

Все данные хранятся в **localStorage**:
- `bike-cart` — корзина покупок
- `bike-auth-user` — текущий авторизованный пользователь
- `bike-users` — список зарегистрированных пользователей

## 📝 Функционал

- ✅ Главная страница с популярными товарами
- ✅ Каталог с поиском, фильтрами и сортировкой
- ✅ Страница товара с похожими товарами
- ✅ Корзина с управлением количеством
- ✅ Регистрация и вход (localStorage)
- ✅ Адаптивный дизайн
- ✅ Toast-уведомления