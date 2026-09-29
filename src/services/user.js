import { User } from '../db.js'

// Убираем пароль, чтобы никогда не отдавать его наружу
export function withoutPassword(user) {
  const { password, ...rest } = user.toJSON() // toJSON() — из модели в обычный объект
  return rest
}

// Получить всех пользователей (без паролей)
export async function getAll() {
  const users = await User.findAll()
  return users.map(withoutPassword)
}

// Найти пользователя по id (без пароля)
export async function getById(id) {
  const user = await User.findByPk(id) // findByPk = найти по первичному ключу (id)
  return user ? withoutPassword(user) : null
}

// Найти пользователя по почте (с паролем — нужно для входа)
export async function findByEmail(email) {
  return User.findOne({ where: { email } })
}

// Создать пользователя
export async function create(data) {
  return User.create({ name: data.name, email: data.email, password: data.password })
}
