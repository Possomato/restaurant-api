import Express from 'express'

const app = Express()
const PORT = 7070

app.get('/', (req,res) => res.send('hello world'))

app.listen(PORT, () => console.log(`i'm running on http://localhost:${PORT}`))