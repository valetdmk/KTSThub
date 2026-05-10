Полный список эндпоинтов (кратко)

    Регистрация/логин

        POST /api/auth/signup – регистрация

        POST /api/auth/signin – вход, получение JWT

    Профиль пользователя

        GET /api/user – свой профиль

        POST /api/user/{id} – обновить профиль

        POST /api/user/{id}/change-password – смена пароля

    Админка

        Управление навыками: POST /api/admin/add-skills, DELETE /api/admin/delete-skills

        Пользователи: GET /api/admin/getall-users, POST /api/admin/update-user/{id}, POST /api/admin/block-user/{id}, POST /api/admin/delete-user/{id}, POST /api/admin/add-points/{id}

        События: POST /api/admin/schedule/create-event, PUT /api/admin/schedule/update-event/{id}, DELETE /api/admin/schedule/delete-event/{id}

    Расписание (публичное)

        GET /api/schedule – список событий

        GET /api/schedule/{id} – детали события

    Навыки (публично)

        GET /api/skills/getall-skills – получить все навыки

    Регистрация на события

        POST /api/events/{eventId}/register-solo – записаться на событие

        GET /api/events/{eventId}/registrations – список участников (для ADMIN/JUDGE)

    Таблица лидеров

        GET /api/leaderboard – топ-25 по очкам

    Судья

        POST /api/judge/hackathon-results – заглушка, в разработке


📋 Тестовые пользователи (окружение dev)
Логин	Пароль	Роль
ivan_user	uspassword	USER
dima_dev	uspassword	USER
anna_code	uspassword	USER
sergey_it	uspassword	USER
elena_dev	uspassword	USER
max_code	uspassword	USER
maria_admin	adpassword	ADMIN
alex_judge	jupassword	JUDGE

Все пользователи активны и готовы к тестированию.

Базовый URL: http://localhost:8080 (если не указано иное)

Авторизация: JWT токен (получается через вход).
Заголовок запроса: Authorization: Bearer <ваш_токен>
🔐 1. Аутентификация (/api/auth)
#	Метод и путь	Доступ	Описание
1	POST /api/auth/signup	Публичный	Регистрация нового пользователя
2	POST /api/auth/signin	Публичный	Вход, получение JWT токена
POST /api/auth/signup – Регистрация

Тело запроса (JSON):
json

{
  "name": "Иван",
  "lastname": "Петров",
  "username": "ivan_user",
  "birthday": "1995-06-15",
  "email": "ivan@example.com",
  "password": "securePassword1",
  "gender": "MALE"
}

    gender – возможные значения: MALE, FEMALE, OTHER

    birthday – дата в формате YYYY-MM-DD

Успешный ответ (201 Created):
json

{
  "message": "успешная регистрация"
}

Возможные ошибки:

    400 – если email или username уже существуют, или не прошли валидацию (в том числе проверка на нецензурную лексику).

POST /api/auth/signin – Вход

Тело запроса:
json

{
  "username": "ivan_user",
  "password": "uspassword"
}

Успешный ответ (200 OK):
json

{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}

Полученный токен необходимо передавать во все защищённые запросы в заголовке:
text

Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

👤 2. Профиль пользователя (/api/user)

Требуется: авторизация (роль USER), можно изменять только свой профиль.
#	Метод и путь	Описание
3	GET /api/user	Получить полный профиль текущего пользователя
4	POST /api/user/{id}	Обновить свой профиль
5	POST /api/user/{id}/change-password	Сменить пароль
GET /api/user – Мой профиль

Не требует параметра в пути, использует данные из токена.

Ответ (200 OK):
json

{
  "id": "uuid-...",
  "name": "Иван",
  "lastName": "Петров",
  "fullName": "Иван Петров",
  "username": "ivan_user",
  "email": "ivan@example.com",
  "bio": "Backend разработчик...",
  "phone": "+79123456789",
  "telegram": "https://t.me/ivan_user",
  "github": "https://github.com/ivan_user",
  "birthday": "1995-06-15",
  "avatar": "avatar_user.png",
  "role": "USER",
  "status": "ACTIVE",
  "job": "BACK",
  "level": "BEGINNER",
  "points": 10,
  "createdAt": "2026-05-07",
  "gender": "MALE",
  "skills": [
    {
      "id": 1,
      "skill": { "id": 1, "name": "Java", "category": "HARD" },
      "level": 5
    }
  ],
  "achievements": [
    {
      "id": 1,
      "achievements": {
        "id": 1,
        "name": "Первый шаг",
        "description": "Набрать 0 очков",
        "icon": "novice.png",
        "pointsRequired": 0
      }
    }
  ]
}

Пояснения к полям пользователя:

    role: USER, ADMIN, JUDGE

    status: ACTIVE, BLOCKED, DELETED

    job: BACK, FRONT, DESIGNER, PROJECT, GAME

    level: BEGINNER, INTERMEDIATE, ADVANCED

    gender: MALE, FEMALE, OTHER

    skills – массив навыков пользователя. Каждый элемент: id (идентификатор связи), skill (объект навыка), level (уровень владения числом).

POST /api/user/{id} – Обновить профиль

{id} в URL должен совпадать с ID текущего авторизованного пользователя.

Тело запроса (все поля обязательны, кроме skills – его можно не передавать):
json

{
  "name": "Иван",
  "lastName": "Петров",
  "username": "ivan_user",
  "birthday": "1995-06-15",
  "avatar": "new_avatar.png",
  "email": "ivan@example.com",
  "bio": "Обновлённое описание",
  "gender": "MALE",
  "phone": "+79123456789",
  "telegram": "https://t.me/ivan_user",
  "github": "https://github.com/ivan_user",
  "job": "BACK",
  "level": "BEGINNER",
  "skills": [
    { "skillId": 1, "level": 7 },
    { "skillId": 2, "level": 3 }
  ]
}

    skills – если передан, полностью заменяет текущие навыки пользователя.

Ответ (200 OK): обновлённый объект пользователя (структура как в GET /api/user).
POST /api/user/{id}/change-password – Смена пароля

Тело запроса:
json

{
  "oldPassword": "uspassword",
  "newPassword": "newSecurePass123"
}

Ответ (200 OK):
json

{
  "message": "Password changed successfully"
}

Важно: после смены пароля все ранее выданные токены становятся недействительными. Потребуется повторный вход.
🛠️ 3. Админка (/api/admin)

Требуется: роль ADMIN (пользователь maria_admin).
Управление навыками
#	Метод и путь	Описание
6	POST /api/admin/add-skills	Добавить новые навыки
7	DELETE /api/admin/delete-skills	Удалить навыки по названию
POST /api/admin/add-skills – Добавить навыки

Тело запроса (массив объектов):
json

[
  { "name": "Kubernetes", "skillsCategory": "HARD" },
  { "name": "Командная работа", "skillsCategory": "HARD" }
]

    skillsCategory – в текущей версии только HARD.

Ответ (200 OK):
json

{
  "message": "Skills added successfully"
}

Если навык с таким названием уже существует, он тихо игнорируется.
DELETE /api/admin/delete-skills – Удалить навыки

Тело запроса:
json

[
  { "name": "Kubernetes" },
  { "name": "Командная работа" }
]

Ответ (200 OK):
json

{
  "message": "Skills deleted successfully"
}

Если какое-то из названий не найдено – возвращается ошибка 404.
Управление пользователями
#	Метод и путь	Описание
8	GET /api/admin/getall-users	Получить список всех пользователей
9	POST /api/admin/update-user/{id}	Изменить любого пользователя
10	POST /api/admin/block-user/{id}	Заблокировать пользователя
11	POST /api/admin/delete-user/{id}	Удалить пользователя (мягкое удаление)
12	POST /api/admin/add-points/{id}	Начислить баллы пользователю
GET /api/admin/getall-users – Список пользователей

Ответ: массив объектов пользователей (базовые поля, навыки и достижения могут не подгружаться – проверьте опытным путём).
POST /api/admin/update-user/{id} – Изменить пользователя

Тело запроса идентично обычному обновлению профиля (см. POST /api/user/{id}), но админ может указать любой ID.
POST /api/admin/block-user/{id} – Заблокировать

Тело не требуется. Переводит статус пользователя в BLOCKED, все его токены становятся недействительными.

Ответ: объект пользователя со статусом BLOCKED.
POST /api/admin/delete-user/{id} – Удалить (мягко)

Статус становится DELETED. Пользователь больше не сможет войти.

Ответ: объект пользователя со статусом DELETED.
POST /api/admin/add-points/{id} – Начислить баллы

Тело запроса:
json

{
  "points": 25
}

points – целое число >= 1.

Ответ: объект пользователя с обновлённым количеством баллов. При пересечении порогов достижений они будут выданы автоматически.
Управление событиями (расписанием)
#	Метод и путь	Описание
13	POST /api/admin/schedule/create-event	Создать новое событие
14	PUT /api/admin/schedule/update-event/{id}	Обновить событие
15	DELETE /api/admin/schedule/delete-event/{id}	Удалить событие
POST /api/admin/schedule/create-event – Создать событие

Тело запроса:
json

{
  "name": "Spring Hack 2026",
  "briefDescription": "Краткое описание хакатона",
  "description": "Полное описание мероприятия...",
  "skillIds": [1, 2, 3],
  "startDateTime": "2026-06-01T10:00:00",
  "endDateTime": "2026-06-02T18:00:00"
}

    skillIds – массив идентификаторов навыков (из справочника).

Ответ (201 Created):
json

{
  "id": 1,
  "name": "Spring Hack 2026",
  "briefDescription": "Краткое описание хакатона",
  "description": "Полное описание...",
  "skills": [
    { "id": 1, "name": "Java", "category": "HARD" },
    { "id": 2, "name": "Spring Boot", "category": "HARD" }
  ],
  "startDateTime": "2026-06-01T10:00:00",
  "endDateTime": "2026-06-02T18:00:00"
}

PUT /api/admin/schedule/update-event/{id} – Обновить событие

Тело запроса – полный объект расписания, включая id:
json

{
  "id": 1,
  "name": "Spring Hack 2026 (обновлённый)",
  "briefDescription": "Обновлённое краткое описание",
  "description": "Обновлённое полное",
  "skills": [
    { "id": 1, "name": "Java", "category": "HARD" }
  ],
  "startDateTime": "2026-06-01T09:00:00",
  "endDateTime": "2026-06-03T20:00:00"
}

Ответ (200): обновлённый объект.
DELETE /api/admin/schedule/delete-event/{id} – Удалить событие

Ответ 200 OK при успехе.
📅 4. Публичное расписание (/api/schedule)
#	Метод и путь	Описание
16	GET /api/schedule	Список всех событий
17	GET /api/schedule/{id}	Информация о конкретном событии

Оба доступны без авторизации. Ответ – объект(ы) ScheduleDto, аналогичный показанному выше.
🏅 5. Навыки (/api/skills)
#	Метод и путь	Описание
18	GET /api/skills/getall-skills	Получить все навыки

Пример ответа:
json

[
  { "id": 1, "name": "Java", "category": "HARD" },
  { "id": 2, "name": "Spring Boot", "category": "HARD" }
]

📝 6. Регистрация на события (/api/events)
#	Метод и путь	Роль	Описание
19	POST /api/events/{eventId}/register-solo	USER	Записать текущего пользователя на событие
20	GET /api/events/{eventId}/registrations	ADMIN или JUDGE	Список всех регистраций на событие
POST /api/events/{eventId}/register-solo – Записаться

Тело запроса не требуется. Пользователь определяется из токена.

Ответ (200):
json

{
  "message": "Успешная регистрация"
}

При повторной регистрации – ошибка 400.
GET /api/events/{eventId}/registrations – Список участников

Ответ:
json

[
  {
    "id": 1,
    "userId": "uuid-...",
    "fullName": "Иван Петров",
    "scheduleId": 1,
    "type": "SINGLE",
    "status": "ACTIVE",
    "registeredAt": "2026-05-07T12:30:00"
  }
]

🏆 7. Лидерборд (/api/leaderboard)
#	Метод и путь	Описание
21	GET /api/leaderboard	Топ 25 пользователей по количеству баллов

Ответ:
json

[
  { "place": 1, "fullName": "Максим Волков", "points": 70 },
  { "place": 2, "fullName": "Сергей Кузнецов", "points": 60 }
]

⚖️ 8. Судья (/api/judge)
#	Метод и путь	Роль	Описание
22	POST /api/judge/hackathon-results	JUDGE	Заглушка (в разработке)

Пока эндпоинт не реализован; принимает ResultsHackatonRequest, возвращает пустую строку.
❗ Формат ошибок

Любая ошибка возвращается в виде:
json

{
  "message": "Bad request",
  "detailedMessage": "Описание ошибки",
  "errorTime": "2026-05-07T15:30:00"
}

Коды состояния: 400 (неверный запрос), 401 (не авторизован), 403 (доступ запрещён), 404 (не найдено), 409 (конфликт), 500 (внутренняя ошибка).

Обратите внимание: при блокировке, удалении пользователя или смене пароля старый токен инвалидируется. Клиент должен отловить 401 и перенаправить пользователя на страницу входа.
