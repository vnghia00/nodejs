import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'
import cors from 'cors'
import 'dotenv/config'

const port = process.env.PORT || 8080
const portClient = process.env.PORT_CLIENT || 3000

const app = express()

const corsOptions = {
    origin: `http://localhost:${portClient}`,
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))

viewEngine(app)
initWebRoutes(app)

connectDB()


app.listen(port, () => {
    console.log(`*** Backend Nodejs is runing on the port : http://localhost:${port}`)
})



