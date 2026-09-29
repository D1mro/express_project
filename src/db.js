import { Sequelize, DataTypes } from 'sequelize'

// Подключение к базе: SQLite хранит всё в одном файле database.sqlite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // не печатать SQL-запросы в консоль
})

// ---------- Модели = таблицы в базе ----------

// Таблица Users
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // двух одинаковых почт быть не может
  },
  password: {
    type: DataTypes.STRING, // тут лежит ХЭШ, а не сам пароль
    allowNull: false,
  },
})

// Таблица Products
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
})

// Таблица Orders
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
})

export { sequelize, User, Product, Order }
