const { Router } = require('express')
const { getAllTransfer, createTransfer, updateTransfer } = require('../controller/transfer-controller.js')
const authorizationMiddleware = require('../middleware/authorization-middleware.js')

const transferRouter = Router()

transferRouter.use(authorizationMiddleware)

transferRouter.get('/', getAllTransfer)
transferRouter.post('/', createTransfer)
transferRouter.patch('/:id', updateTransfer)

module.exports = transferRouter
