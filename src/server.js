import express from 'express'
import config from './config/config.js'
import ConnectedDB from './config/db.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
const app = express()
ConnectedDB()
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
