import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

class Entity {
  constructor(data) {
    Object.assign(this, data)
    this.id = this.constructor.nextId++
  }

  static create(data) {
    const item = new this(data)
    this.items.push(item)
    return item
  }

  static getAll() {
    return this.items
  }

  static getById(id) {
    return this.items.find((i) => i.id === Number(id))
  }

  static update(id, data) {
    const item = this.getById(id)
    if (item) Object.assign(item, data)
    return item
  }

  static remove(id) {
    const index = this.items.findIndex((i) => i.id === Number(id))
    if (index === -1) return false
    this.items.splice(index, 1)
    return true
  }
}


class Product extends Entity {
  static items = []
  static nextId = 1
}

class User extends Entity {
  static items = []
  static nextId = 1
}

class Order extends Entity {
  static items = []
  static nextId = 1
}


function crudRoutes(path, EntityClass) {
  app.get(path, (req, res) => res.json(EntityClass.getAll()))

  app.get(`${path}/:id`, (req, res) => {
    const item = EntityClass.getById(req.params.id)
    item ? res.json(item) : res.status(404).json({ error: 'Not found' })
  })

  app.post(path, (req, res) => res.status(201).json(EntityClass.create(req.body)))

  app.put(`${path}/:id`, (req, res) => {
    const item = EntityClass.update(req.params.id, req.body)
    item ? res.json(item) : res.status(404).json({ error: 'Not found' })
  })

  app.delete(`${path}/:id`, (req, res) => {
    EntityClass.remove(req.params.id) ? res.status(204).send() : res.status(404).json({ error: 'Not found' })
  })
}

crudRoutes('/products', Product)
crudRoutes('/users', User)
crudRoutes('/orders', Order)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
