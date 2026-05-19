# Public deploy package

Этот архив подготовлен не просто для переноса `HeroSection`, а для публичного деплоя двух маршрутов:

- `/` — главная страница с `HeroSection`
- `/roles` — страница выбора роли

Что внутри:
- `src/widgets/hero/ui/HeroSection.tsx` — основной hero-блок главной страницы.
- `src/shared/ui/Hero/Hero.scss` — все стили hero-блока, включая desktop и mobile.
- `src/pages/home/ui/index.tsx` — страница `/`, где подключены `Navigation`, `Background` и `HeroSection`.
- `src/pages/role-select/ui/*` — страница `/roles` и её стили.
- `src/shared/ui/Background/*` — фон, который используется и на `/`, и на `/roles`.
- `src/widgets/navigation/ui/navigation.tsx` — верхняя навигация главной страницы.
- `src/features/hero/*` — redux-логика для hero и фоновых состояний.
- `src/app/main.tsx`, `src/app/PublicApp.tsx`, `src/app/routes/PublicAppRouter.tsx`, `src/app/routes/publicRouter.tsx`, `src/app/store/publicStore.ts` — минимальная публичная точка входа и роутинг.
- `src/app/App.scss` — глобальные базовые стили и шрифты.
- `index.html` — важен для корректного mobile viewport.
- `vite.config.ts` и `.env.public` — нужны для публичной сборки через Vite.
- `src/shared/assets/*` — изображения, которые реально нужны для `/` и `/roles`.
- `package.json` — список зависимостей для сборки.

Что важно для деплоя:
1. Это публичная сборка на `React + TypeScript + Vite`.
2. Нужны `react-router-dom`, `react-redux`, `@reduxjs/toolkit` и `sass`.
3. Для публичного сценария ориентироваться нужно именно на `publicRouter` и `publicStore`.
4. Маршруты уже описаны в `src/app/routes/publicRouter.tsx`:
   `/` -> `HomePage`
   `/roles` -> `RoleSelectPage`
5. Адаптив для ПК и мобильных уже включён в `Hero.scss` и `src/pages/role-select/ui/index.scss`.
6. `index.html` должен сохранять `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`, иначе мобильная верстка будет выглядеть как сжатая десктопная.
7. Для сборки публичной версии нужен `VITE_APP_VARIANT=public`, он вынесен в `.env.public`.

Минимальный сценарий запуска:
1. Скопировать файлы с сохранением структуры `src`.
2. Убедиться, что ассеты лежат в `src/shared/assets`.
3. Поднять приложение через публичную точку входа:
   `main.tsx` -> `PublicApp` -> `PublicAppRouter` -> `publicRouter`
4. Убедиться, что в store подключён `heroReducer` через `publicStore`.
5. Собрать проект как публичную версию.

Если нужно перенести это в другой репозиторий, лучше забирать весь архив целиком: `/` и `/roles` завязаны на общие стили, общий фон, ассеты и `hero`-store.
