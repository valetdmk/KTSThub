// ===============================
// Получение DOM-элементов формы
// Используются для управления вводом, валидацией и UI-состояниями
// ===============================
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const avatarInput = document.querySelector('#avatar');
const submitBtn = document.querySelector('#submit');
const dropZone = document.querySelector('#drop-zone');
const preview = document.querySelector('#preview');
const loader = document.querySelector('#loader');

// Регулярное выражение для проверки email
const emailRegex = /^\S+@\S+\.\S+$/;


// ===============================
// Утилитарные функции для работы с ошибками
// Отвечают за отображение ошибок и общее состояние валидности формы
// ===============================
function showError(input, message) {
  // Отображает текст ошибки рядом с полем и помечает поле как невалидное
  const error = input.parentElement.nextElementSibling;
  error.textContent = message;
  input.classList.add('invalid');
}

function clearError(input) {
  // Убирает сообщение об ошибке и визуальную пометку поля
  const error = input.parentElement.nextElementSibling;
  error.textContent = '';
  input.classList.remove('invalid');
}

function checkFormValidity() {
  // Блокирует кнопку отправки, если есть хотя бы одно невалидное поле
  const hasErrors = document.querySelectorAll('.invalid').length > 0;
  submitBtn.disabled = hasErrors;
}


// ===============================
// Валидация формы в реальном времени
// Проверки выполняются при вводе данных пользователем
// ===============================
nameInput.addEventListener('input', () => {
  // Проверка минимальной длины имени
  nameInput.value.length < 2
    ? showError(nameInput, 'Минимум 2 символа')
    : clearError(nameInput);

  checkFormValidity();
});

emailInput.addEventListener('input', () => {
  // Проверка email на соответствие формату
  !emailRegex.test(emailInput.value)
    ? showError(emailInput, 'Некорректный email')
    : clearError(emailInput);

  checkFormValidity();
});

phoneInput.addEventListener('input', () => {
  // Формирование маски телефона и удаление лишних символов
  let digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
  phoneInput.value = `+7 (${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7,9)}-${digits.slice(9,11)}`;
});


// ===============================
// Работа с аватаром
// Поддержка input-загрузки, drag & drop и предпросмотра изображения
// ===============================
function handleFile(file) {
  // Проверка, что загружается изображение
  if (!file.type.startsWith('image/')) {
    alert('Только изображения');
    return;
  }

  // Чтение файла и отображение preview
  const reader = new FileReader();
  reader.onload = () => preview.src = reader.result;
  reader.readAsDataURL(file);

  // Запуск асинхронной цепочки обработки файла
  handleAvatarFlow(file);
}

// Загрузка файла через input
avatarInput.addEventListener('change', () => {
  handleFile(avatarInput.files[0]);
});

// Разрешаем перетаскивание файла в drop-зону
dropZone.addEventListener('dragover', e => e.preventDefault());

// Обработка файла, перетащенного в drop-зону
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  handleFile(e.dataTransfer.files[0]);
});


// ===============================
// Сохранение состояния формы
// Данные сохраняются в localStorage и восстанавливаются при перезагрузке
// ===============================
form.addEventListener('input', () => {
  localStorage.setItem('formData', JSON.stringify({
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  }));
});

// Восстановление данных формы при загрузке страницы
const saved = JSON.parse(localStorage.getItem('formData'));
if (saved) {
  nameInput.value = saved.name || '';
  emailInput.value = saved.email || '';
  phoneInput.value = saved.phone || '';
}


// ===============================
// Асинхронные операции
// Симуляция загрузки, обработки и отправки данных
// ===============================
const delay = ms => new Promise(r => setTimeout(r, ms));

async function uploadAvatar(file) {
  // Симуляция загрузки файла
  await delay(1000);
  return file;
}

async function preprocessAvatar(file) {
  // Симуляция предварительной обработки изображения
  await delay(500);
  return { name: file.name, size: file.size };
}

async function sendAvatar(data) {
  // Симуляция отправки данных на сервер
  await delay(1000);
  return { success: true };
}

async function handleAvatarFlow(file) {
  // Последовательное выполнение асинхронных операций с обработкой ошибок
  try {
    loader.style.display = 'block';

    await uploadAvatar(file);
    const processed = await preprocessAvatar(file);
    await sendAvatar(processed);

  } catch (e) {
    alert('Ошибка загрузки');
  } finally {
    loader.style.display = 'none';
  }
}


// ===============================
// Работа с Fetch API
// Универсальная функция для выполнения HTTP-запросов
// ===============================
async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

// Тестовая обработка ошибки HTTP-запроса
async function testFetch() {
  try {
    await request('https://jsonplaceholder.typicode.com/invalid');
  } catch (e) {
    console.error('HTTP ошибка');
  }
}
testFetch();


// ===============================
// Кэширование GET-запросов
// Позволяет избежать повторных сетевых запросов
// ===============================
const cache = new Map();

async function cachedGet(url) {
  if (cache.has(url)) return cache.get(url);

  const data = await request(url);
  cache.set(url, data);
  return data;
}
