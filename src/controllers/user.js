import express from 'express'
import * as userService from '../services/user.js'

const router = express.Router()

// GET /users — все пользователи
router.get('/', async (req, res) => {
  res.json(await userService.getAll())
})

// GET /users/:id — один пользователь
router.get('/:id', async (req, res) => {
  const user = await userService.getById(req.params.id)
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' })
  res.json(user)
})

export default router
