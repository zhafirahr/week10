const { MongoClient } = require('mongodb')

const databaseMiddleware = async (req, res, next) => {
  const mongoClient = await new MongoClient('mongodb://localhost:27017').connect()
  db = mongoClient.db('revou')

  req.db = db

  next()
}

module.exports = databaseMiddleware
