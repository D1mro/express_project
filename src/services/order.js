import { Order } from '../db.js'
import * as productService from './product.js'

// Получить все заказы
export async function getAll() {
  return Order.findAll()
}

// Найти заказ по id
export async function getById(id) {
  return Order.findByPk(id)
}

// Создать заказ. Если такого товара нет — вернёт null
export async function create(data) {
  const product = await productService.getById(data.productId)
  if (!product) return null

  return Order.create({
    productId: data.productId,
    quantity: data.quantity,
    total: product.price * data.quantity, // сумму считает сервис, а не клиент
  })
}

// Обновить заказ. Если заказа или товара нет — вернёт null
export async function update(id, data) {
  const order = await getById(id)
  const product = await productService.getById(data.productId)
  if (!order || !product) return null

  return order.update({
    productId: data.productId,
    quantity: data.quantity,
    total: product.price * data.quantity,
  })
}

// Удалить заказ
export async function remove(id) {
  const order = await getById(id)
  if (!order) return false
  await order.destroy()
  return true
}
