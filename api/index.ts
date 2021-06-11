import express, { Request, Response} from 'express'
import bodyParser from 'body-parser'
const cors = require('cors')

import { getReports, resolveTicket, blockContent } from './reportsController'

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({ origin: true }))

app.get('/', (req: Request, res: Response) => res.send('Welcome to AAIB Reporting System!'))
app.get('/reports', getReports)
app.put('/reports/:reportId', resolveTicket)
app.delete('/reports/:reportId', blockContent)

app.listen(5000, () => console.log('The app is listening on port 5000'))
