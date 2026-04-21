API Документация

Общая информация

для подключения использовать впн колледжа либо находиться внутри сети колледжа

Базовый URL: 10.3.25.106:8080/api

Все эндпоинты, кроме /auth/**, требуют аутентификации через JWT токен.
Токен передаётся в заголовке Authorization: Bearer <token>.
Аутентификация и регистрация (/api/auth)
Регистрация нового пользователя

POST /api/auth/signup

Создаёт нового пользователя с ролью USER и статусом ACTIVE (верификация email закомментирована).

Тело запроса (SignupRequest):
json

{
  "name": "Иван",
  "lastname": "Иванов",
  "username": "ivan123",
  "birthday": "1990-01-01",
  "email": "ivan@example.com",
  "password": "securePass123"
}

Ограничения полей:
Поле	Тип	Описание
name	string	2–100 символов, только буквы, пробелы, дефис, апостроф
lastname	string	2–100 символов, только буквы, пробелы, дефис, апостроф
username	string	не пустой, уникальный
birthday	date (ISO)	дата рождения
email	string	не пустой, уникальный
password	string	8–100 символов

Ответы:

    201 Created – пользователь успешно создан
    json

    { "message": "успешная регистрация" }

    400 Bad Request – если email или username уже заняты, или ошибки валидации.

Вход в систему

POST /api/auth/signin

Аутентифицирует пользователя и возвращает JWT токен.

Тело запроса (SigninRequest):
json

{
  "username": "ivan123",
  "password": "securePass123"
}

Ответы:

    200 OK – успешный вход
    json

    { "token": "eyJhbGciOiJIUzI1NiIs..." }

    401 Unauthorized – неверные учётные данные или пользователь не активен (статус не ACTIVE).

(Закомментировано) Подтверждение email

Эндпоинты временно отключены.

    POST /api/auth/verify-email/{email} – отправка кода подтверждения на email.

    POST /api/auth/verify-email – проверка кода подтверждения (VerificationRequest).

Пользователи (/api/user)
Получение профиля пользователя

GET /api/user/{id}

Требует роль USER.

Возвращает полные данные пользователя (сущность User).

Параметры пути:

    id (Long) – идентификатор пользователя.

Ответ: 200 OK с объектом User.

Пример ответа:
json

{
  "id": 1,
  "name": "Иван",
  "lastName": "Иванов",
  "username": "ivan123",
  "email": "ivan@example.com",
  "phone": null,
  "telegram": null,
  "birthday": "1990-01-01",
  "role": "USER",
  "status": "ACTIVE",
  "job": null,
  "level": null,
  "skills": []
}

Обновление профиля

POST /api/user/{id}

Требует роль USER и соответствие id текущего аутентифицированного пользователя.

Тело запроса (UpdateUserRequest):
json

{
  "name": "Иван",
  "lastName": "Петров",
  "username": "ivan_petrov",
  "birthday": "1990-01-01",
  "email": "ivan@newmail.com",
  "phone": "+79123456789",
  "telegram": "https://t.me/ivan_petrov",
  "job": "BACK",
  "level": "INTERMEDIATE",
  "skills": [
    { "skillId": 1, "level": 8 },
    { "skillId": 2, "level": 5 }
  ]
}

Ограничения полей:
Поле	Тип	Описание
name	string	2–100 символов, только буквы, пробелы, дефис, апостроф
lastName	string	2–100 символов, только буквы, пробелы, дефис, апостроф
username	string	не пустой, должен быть уникальным (если изменяется)
birthday	date	дата в прошлом
email	string	не пустой
phone	string (опционально)	формат: +79xxxxxxxxx
telegram	string (опционально)	формат: https://t.me/[a-zA-Z0-9_]{5,32}
job	enum (UserJob)	одно из: FRONT, BACK, DESIGNER, PROJECT, GAME
level	enum (UserLevel)	одно из: BEGINNER, INTERMEDIATE, ADVANCED
skills	массив SkillDto	список навыков с level от 1 до 10

SkillDto:
json

{
  "skillId": 1,
  "level": 8
}

Ответ: 200 OK с обновлённым объектом User.

Ошибки:

    400 Bad Request – если username уже занят другим пользователем, или не найдены навыки по skillId.

    404 Not Found – если пользователь с указанным id не существует.

Смена пароля

POST /api/user/{id}/change-password

Требует роль USER и соответствие id.

Тело запроса (ChangePasswordRequest):
json

{
  "oldPassword": "oldPass123",
  "newPassword": "newSecurePass456"
}

Ограничения:

    oldPassword – не пустой.

    newPassword – 8–100 символов.

Ответы:

    200 OK
    json

    { "message": "Password changed successfully" }

    400 Bad Request – если старый пароль неверен.

    404 Not Found – если пользователь не найден.

Администрирование (/api)
Проверка доступа администратора

GET /api/admin

Требует роль ADMIN.

Ответ: 200 OK
text

админка

Добавление нового навыка

POST /api/admin

Требует роль ADMIN.

Тело запроса (Skills):
json

{
  "name": "Java",
  "category": "HARD"
}

Поля:

    name – уникальное название навыка.

    category – SOFT или HARD.

Ответ: 200 OK (без тела).
Проверка доступа судьи

GET /api/judge

Требует роль JUDGE.

Ответ: 200 OK
text

судья

Модели данных
Перечисления

UserRole
USER, ADMIN, JUDGE, PARTNER

UserStatus
ACTIVE, BLOCKED, DELETED

UserJob
FRONT, BACK, DESIGNER, PROJECT, GAME

UserLevel
BEGINNER, INTERMEDIATE, ADVANCED

SkillsCategory
SOFT, HARD
DTO

SignupRequest
Поля: name, lastname, username, birthday, email, password

SigninRequest
Поля: username, password

UpdateUserRequest
Поля: name, lastName, username, birthday, email, phone, telegram, job, level, skills (массив SkillDto)

ChangePasswordRequest
Поля: oldPassword, newPassword

VerificationRequest (закомментирован)
Поля: email, code

ResponseDTO
Поле: message (String)

JwtResponse
Поле: token (String)
