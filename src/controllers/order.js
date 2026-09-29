import express from 'express'
import * as orderService from '../services/order.js'
import { validateOrder } from '../utils/validators.js'

const router = express.Router()

// GET /orders — все заказы
router.get('/', async (req, res) => {
  res.json(await orderService.getAll())
})

// GET /orders/:id — один заказ
router.get('/:id', async (req, res) => {
  const order = await orderService.getById(req.params.id)
  if (!order) return res.status(404).json({ error: 'Заказ не найден' })
  res.json(order)
})

// POST /orders — создать заказ
router.post('/', async (req, res) => {
  const errors = validateOrder(req.body)
  if (errors.length) return res.status(400).json({ errors })

  const order = await orderService.create(req.body)
  if (!order) return res.status(404).json({ error: 'Товар не найден' })
  res.status(201).json(order)
})

// PUT /orders/:id — обновить заказ
router.put('/:id', async (req, res) => {
  const errors = validateOrder(req.body)
  if (errors.length) return res.status(400).json({ errors })

  const order = await orderService.update(req.params.id, req.body)
  if (!order) return res.status(404).json({ error: 'Заказ или товар не найден' })
  res.json(order)
})

// DELETE /orders/:id — удалить заказ
router.delete('/:id', async (req, res) => {
  const deleted = await orderService.remove(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Заказ не найден' })
  res.status(204).send()
})

export default router
