// Валидаторы — проверяют данные, которые пришли в запросе.
// Каждый validateXxx возвращает массив ошибок: пустой массив = всё хорошо.
// data = {} — если тело запроса не прислали вообще, проверяем пустой объект.

// ---------- Маленькие проверки ----------

// Почта: что-то@что-то.что-то, без пробелов
export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Пароль: минимум 8 символов, хотя бы одна буква и одна цифра
export function isValidPassword(password) {
  return (
    typeof password === 'string' &&
    password.length >= 8 &&
    /[a-zA-Zа-яА-Я]/.test(password) &&
    /\d/.test(password)
  )
}

// Непустая строка
export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== ''
}

// Положительное число (цена)
export function isPositiveNumber(value) {
  return typeof value === 'number' && value > 0
}

// Целое число больше нуля (id, количество)
export function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0
}

// ---------- Проверки целых объектов ----------

// Регистрация: { name, email, password }
export function validateRegister(data = {}) {
  const errors = []
  if (!isNonEmptyString(data.name)) errors.push('name — обязательная строка')
  if (!isValidEmail(data.email)) errors.push('email — некорректная почта')
  if (!isValidPassword(data.password)) {
    errors.push('password — минимум 8 символов, хотя бы одна буква и одна цифра')
  }
  return errors
}

// Вход: { email, password }
export function validateLogin(data = {}) {
  const errors = []
  if (!isValidEmail(data.email)) errors.push('email — некорректная почта')
  if (!isNonEmptyString(data.password)) errors.push('password — обязательное поле')
  return errors
}

// Товар: { name, price }
export function validateProduct(data = {}) {
  const errors = []
  if (!isNonEmptyString(data.name)) errors.push('name — обязательная строка')
  if (!isPositiveNumber(data.price)) errors.push('price — число больше 0')
  return errors
}

// Заказ: { productId, quantity }
export function validateOrder(data = {}) {
  const errors = []
  if (!isPositiveInteger(data.productId)) errors.push('productId — целое число больше 0')
  if (!isPositiveInteger(data.quantity)) errors.push('quantity — целое число больше 0')
  return errors
}
