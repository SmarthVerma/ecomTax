import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// Route imports
import productRouter from './routes/product.route.js'
import userRouter from './routes/user.route.js'
import orderRouter from './routes/order.route.js'
//routes declaration
app.use("/api/v1/products", productRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/orders", orderRouter)


export {app}