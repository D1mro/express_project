import express from 'express'
import * as orderService from '../services/order.js'

const router = express.Router()

// GET /orders — все заказы
router.get('/', (req, res) => {
  res.json(orderService.getAll())
})

// GET /orders/:id — один заказ
router.get('/:id', (req, res) => {
  const order = orderService.getById(req.params.id)
  if (!order) return res.status(404).json({ error: 'Заказ не найден' })
  res.json(order)
})

// POST /orders — создать заказ
router.post('/', (req, res) => {
  const order = orderService.create(req.body)
  res.status(201).json(order)
})

// PUT /orders/:id — обновить заказ
router.put('/:id', (req, res) => {
  const order = orderService.update(req.params.id, req.body)
  if (!order) return res.status(404).json({ error: 'Заказ не найден' })
  res.json(order)
})

// DELETE /orders/:id — удалить заказ
router.delete('/:id', (req, res) => {
  const deleted = orderService.remove(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Заказ не найден' })
  res.status(204).send()
})

export default router
