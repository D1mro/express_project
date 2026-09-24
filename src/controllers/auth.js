import express from 'express'

// Все маршруты /users живут в этом отдельном роутере
const router = express.Router()

// GET /users/:id — возвращает id, который пришёл в адресе
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id })
})

export default router
