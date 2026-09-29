import express from 'express'
import * as productService from '../services/product.js'
import { validateProduct } from '../utils/validators.js'

const router = express.Router()

// GET /products — все товары
router.get('/', async (req, res) => {
  res.json(await productService.getAll())
})

// GET /products/:id — один товар
router.get('/:id', async (req, res) => {
  const product = await productService.getById(req.params.id)
  if (!product) return res.status(404).json({ error: 'Товар не найден' })
  res.json(product)
})

// POST /products — создать товар
router.post('/', async (req, res) => {
  const errors = validateProduct(req.body)
  if (errors.length) return res.status(400).json({ errors })

  res.status(201).json(await productService.create(req.body))
})

// PUT /products/:id — обновить товар
router.put('/:id', async (req, res) => {
  const errors = validateProduct(req.body)
  if (errors.length) return res.status(400).json({ errors })

  const product = await productService.update(req.params.id, req.body)
  if (!product) return res.status(404).json({ error: 'Товар не найден' })
  res.json(product)
})

// DELETE /products/:id — удалить товар
router.delete('/:id', async (req, res) => {
  const deleted = await productService.remove(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Товар не найден' })
  res.status(204).send()
})

export default router
