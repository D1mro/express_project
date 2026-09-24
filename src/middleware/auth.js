// Пропускает дальше, только если в запросе есть заголовок Authorization
export default function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Нет заголовка Authorization' })
  }
  next() // заголовок есть — идём к маршруту
}
