import express from 'express'
import cors from 'cors'

import authRouter from './controllers/auth.js'
import usersRouter from './controllers/user.js'
import productsRouter from './controllers/product.js'
import ordersRouter from './controllers/order.js'
import auth from './middleware/auth.js'
import { sequelize } from './db.js'

const app = express()

// ---------- CORS: разрешаем только адреса из списка ----------
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000']

app.use(
  cors({
    origin: (origin, callback) => {
      // origin нет у запросов не из браузера (curl, Postman) — пропускаем
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Этот адрес не разрешён CORS'))
      }
    },
  })
)

// ---------- Логгер: метод, путь и время каждого запроса ----------
app.use((req, res, next) => {
  console.log(req.method, req.url, new Date())
  next()
})

// ---------- Ограничение: не больше 5 запросов с одного IP за 10 секунд ----------
const requests = new Map() // ip -> массив времени запросов

app.use((req, res, next) => {
  const now = Date.now()

  // оставляем только запросы за последние 10 секунд
  const times = (requests.get(req.ip) || []).filter((time) => now - time < 10000)
  times.push(now)
  requests.set(req.ip, times)

  if (times.length > 5) {
    return res.status(429).json({ error: 'Слишком много запросов' })
  }
  next()
})

// Чтобы express понимал JSON в теле запроса
app.use(express.json())

// ---------- Маршруты ----------

// GET /search?q=... — возвращает параметр q
app.get('/search', (req, res) => {
  const q = req.query.q
  if (!q) {
    return res.status(400).json({ error: 'Не передан параметр q' })
  }
  res.json({ q })
})

// POST /echo — возвращает обратно то, что прислали
app.post('/echo', (req, res) => {
  res.json(req.body)
})

// GET /admin — middleware auth подключён только сюда
app.get('/admin', auth, (req, res) => {
  res.json({ message: 'Добро пожаловать в админку' })
})

// Подключаем роутеры
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)

// ---------- Обработчик ошибок: если где-то что-то упало (например, база) ----------
// У него 4 параметра — так express понимает, что это обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Ошибка сервера' })
})

// Сначала создаём таблицы в базе (если их ещё нет), потом запускаем сервер
await sequelize.sync()

app.listen(3000, () => {
  console.log('Сервер запущен: http://localhost:3000')
})
