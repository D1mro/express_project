import bcrypt from 'bcryptjs'
import * as userService from './user.js'

// Регистрация. Если почта уже занята — вернёт null
export async function register(data) {
  if (await userService.findByEmail(data.email)) return null

  // 10 — "сложность" хэширования: чем больше, тем дольше и надёжнее
  const hash = await bcrypt.hash(data.password, 10)

  const user = await userService.create({
    name: data.name,
    email: data.email,
    password: hash,
  })
  return userService.withoutPassword(user)
}

// Вход. Если почта или пароль неверные — вернёт null
export async function login(data) {
  const user = await userService.findByEmail(data.email)
  if (!user) return null

  // compare сам хэширует введённый пароль и сравнивает с сохранённым хэшем
  const isCorrect = await bcrypt.compare(data.password, user.password)
  if (!isCorrect) return null

  return userService.withoutPassword(user)
}
