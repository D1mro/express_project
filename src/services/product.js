import { Product } from '../db.js'

// Получить все товары
export async function getAll() {
  return Product.findAll()
}

// Найти товар по id
export async function getById(id) {
  return Product.findByPk(id)
}

// Создать товар
export async function create(data) {
  return Product.create({ name: data.name, price: data.price })
}

// Обновить товар
export async function update(id, data) {
  const product = await getById(id)
  if (!product) return null
  return product.update({ name: data.name, price: data.price })
}

// Удалить товар
export async function remove(id) {
  const product = await getById(id)
  if (!product) return false
  await product.destroy()
  return true
}
