import express from 'express'
import * as authService from '../services/auth.js'
import { validateRegister, validateLogin } from '../utils/validators.js'

const router = express.Router()

// POST /auth/register — регистрация
router.post('/register', async (req, res) => {
  const errors = validateRegister(req.body)
  if (errors.length) return res.status(400).json({ errors })

  const user = await authService.register(req.body)
  if (!user) return res.status(409).json({ error: 'Эта почта уже занята' })
  res.status(201).json(user)
})

// POST /auth/login — вход
router.post('/login', async (req, res) => {
  const errors = validateLogin(req.body)
  if (errors.length) return res.status(400).json({ errors })

  const user = await authService.login(req.body)
  if (!user) return res.status(401).json({ error: 'Неверная почта или пароль' })
  res.json(user)
})

export default router
