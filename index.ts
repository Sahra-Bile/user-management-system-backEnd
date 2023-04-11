import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { userRoutes } from './src/routes/userRoutes'

const app: Application = express()
const port = process.env.PORT || 4444

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('We are on home page!')
})

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`server lisner on port: http://localhost:${port}`)
    })
  } catch (e) {
    console.log(`we have some error: ${e}`)
    return e
  }
}

start()
