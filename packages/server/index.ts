import * as dotenv from 'dotenv'
import cors from 'cors'
import express, { Express } from 'express'
import { createServer } from 'vite'
import { dbConnect, SystemRepos } from './db'
import { apiRouter } from './routers/index.router'
import { isDev, srcPath } from './data/app'
import staticMiddleware from './middleware/static.middleware'
import ssrMiddleware from './middleware/ssr.middleware'
const fileUpload = require('express-fileupload')
// import { getEmails } from './Mailer/getMailer'
import { getLastINC } from './utils/getLastINC'
import { taskCloseINCs } from './tasks'
import { ISystem } from './models/system'
const socket = require('./utils/socket')

async function init() {
  await dbConnect()
  dotenv.config({ path: '../../.env' })
  const app: Express = express()

  const systemOptions = (await SystemRepos.findAll({})) as ISystem[]
  const { additional } = systemOptions[0]
  const maxSizeFileUpload = additional.maxSizeFileUpload ?? 10
  app.use(
    fileUpload({
      createParentPath: true,
      limits: {
        fileSize: maxSizeFileUpload * 1024 * 1024 * 1024, //20MB max file(s) size
      },
      tempFileDir: '/Files/',
    }),
  )

  app.use(express.json({ limit: '50mb' }))
  const corsOptions = {
    origin: [
      `http://127.0.0.1:${process.env.CLIENT_PORT}`,
      `http://127.0.0.1:${process.env.CLIENT_PORT}`,
      `http://localhost:${process.env.CLIENT_PORT}`,
      `http://127.0.0.1:${process.env.SERVER_PORT}`,
      `http://172.18.0.0:${process.env.CLIENT_PORT}`,
      `http://172.18.0.0:${process.env.SERVER_PORT}`,
      `http://${process.env.SERVER_HOST}:${process.env.CLIENT_PORT}`,
      `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
      `https://${process.env.SERVER_HOST}:${process.env.CLIENT_PORT}`,
      `https://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
      // `http://sd.sb-i.ru:${process.env.CLIENT_PORT}`,
      // `http://sd.sb-i.ru:${process.env.SERVER_PORT}`,
      // `http://www.sd.sb-i.ru:${process.env.CLIENT_PORT}`,
      // `http://www.sd.sb-i.ru:${process.env.SERVER_PORT}`,
      // `https://sd.sb-i.ru:${process.env.CLIENT_PORT}`,
      // `https://sd.sb-i.ru:${process.env.SERVER_PORT}`,
    ],
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
  app.use(express.json())
  const port = Number(process.env.SERVER_PORT) || 3002

  app.use('/api', apiRouter)

  if (isDev) {
    const vite = await createServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.set('vite', vite)
    app.use(vite.middlewares)
  }

  app.use('/assets', staticMiddleware())
  app.use(ssrMiddleware)

  getLastINC()
  taskCloseINCs()

  // setInterval(() => {
  //   getEmails()
  // }, 60000)

  app.get('/', (_, res) => {
    res.json('👋 Server ready ')
  })

  const server = app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
  const io = socket.init(server)
  io.on('connection', () => {
    console.log('Socket IO Connected')
  })
}

init()
