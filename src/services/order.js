// "База данных" — обычный массив в памяти
const orders = []
let nextId = 1

// Получить все заказы
export function getAll() {
  return orders
}

// Найти заказ по id
export function getById(id) {
  return orders.find((order) => order.id === Number(id))
}

// Создать заказ
export function create(data) {
  const order = { id: nextId++, ...data }
  orders.push(order)
  return order
}

// Обновить заказ
export function update(id, data) {
  const order = getById(id)
  if (!order) return null
  Object.assign(order, data)
  return order
}

// Удалить заказ
export function remove(id) {
  const index = orders.findIndex((order) => order.id === Number(id))
  if (index === -1) return false
  orders.splice(index, 1)
  return true
}
