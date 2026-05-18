import express from 'express'
import config from './config/config.js'
import ConnectedDB from './config/db.js'
import authRouter from './routes/auth.route.js'
import jobRouter from './routes/job.route.js'
import applicationRouter from './routes/application.route.js'
import userRouter from './routes/user.route.js'
import connectCloudinary from './config/cloudinary.js'
import cookieParser from 'cookie-parser'
import resetPasswordRouter from './routes/resetPassword.route.js'
import adminRouter from './routes/admin.route.js'
import promptAI from './util/ai.js'


const app = express()
ConnectedDB()
connectCloudinary()
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter)
app.use("/api/jobs", jobRouter)
app.use("/api/application", applicationRouter);
app.use("/api/user", userRouter);
app.use("/api/password", resetPasswordRouter);
app.use("/api/admin", adminRouter);
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
