import Express from 'express'
import { routes } from './routes'
import { errorHandling } from './middlewares/error-handling'

const app = Express()
const PORT = 7070

app.use(Express.json())

app.use(routes)

app.use(errorHandling)

app.listen(PORT, () => console.log(`i'm running on http://localhost:${PORT}`))
