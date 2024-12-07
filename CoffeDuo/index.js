import express from 'express'
import mapIntent from './intentMapping.js'
import { createTables } from './db/database.js'
import seedDatabase from './seed/seed.js'


const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('static'))


await createTables()
await seedDatabase()

app.post('/webhook', async (req, res) => {
  const intent = req.body.queryResult.intent.displayName
  const params = req.body.queryResult.parameters
  const session = req.body.session

  const intentFunction = mapIntent(intent)
  const response = await intentFunction(params, session)
  res.json(
    {
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              response
            ]
          }
        }
      ]
    }
  )
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})