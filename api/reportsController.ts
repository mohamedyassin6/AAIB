import { Request, Response} from 'express'
const fs = require('fs-extra')

const dbPath = './data/reports.json';

const getReports = async (req: Request, res: Response) => {

  const { elements } = await fetchReportsFromDB()
  res.status(200).send(elements)
}

const resolveTicket = async (req: Request, res: Response) => {
  const { body: { ticketState }, params: { reportId } } = req

  try {

    const reports = await fetchReportsFromDB()
    const report = reports.elements.find((x: { id: string }) => x.id == reportId)
    report.state = ticketState
    await updateReportsInDB(reports)
    return res.status(200).send('Ticket resolved!')

  } catch (e) {
    return res.status(500).send(e)
  }
}

const blockContent = async (req: Request, res: Response) => {
  const { params: { reportId } } = req

  try {

    const reports = await fetchReportsFromDB()
    const reportIdx = reports.elements.findIndex((x: { id: string }) => x.id == reportId)
    reports.elements.splice(reportIdx, 1)
    await updateReportsInDB(reports)
    return res.status(200).send('Content Blocked!')

  } catch (e) {
    return res.status(500).send(e)
  }
}

const fetchReportsFromDB = async () => {
  // Read data from JSON file
  let data = await fs.readJson(dbPath)
  const reports = data || {size: 0, elements: []}
  reports.elements = reports.elements.filter((x: any) => x.state == 'OPEN')
  return reports
}

const updateReportsInDB = async (reports: any) => {
  // Save data to JSON file
  return await fs.writeFile(dbPath, JSON.stringify(reports));
}

export { getReports, resolveTicket, blockContent }
