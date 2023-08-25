const express = require('express')
const databaseMiddleware = require('./middleware/database-middleware.js')
const authRouter = require('./routes/auth.js')
const transferRouter = require('./routes/transfer.js')
const authmiddleware = require('./middleware/authentication-middleware.js')
const authorizationMiddleware = require('./middleware/authorization-middleware.js')

const app = express();

app.use(express.json())

app.use(databaseMiddleware)

app.get('/', (req, res) => {
    res.send('Test')
})

app.use('/v1/auth/', authRouter)
app.use('/v1/transfer/', authmiddleware, authorizationMiddleware, transferRouter)
app.use('/v1/transfer/', authmiddleware, transferRouter)

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
