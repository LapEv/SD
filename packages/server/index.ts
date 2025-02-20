import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { createServer } from 'vite'
import { dbConnect } from './db'
import { apiRouter } from './routers/index.router'
import { isDev, srcPath } from './data/app'
import staticMiddleware from './middleware/static.middleware'
import ssrMiddleware from './middleware/ssr.middleware'
import fileUpload from 'express-fileupload'

async function init() {
  await dbConnect()
  dotenv.config({ path: '../../.env' })
  const app = express()
  app.use(
    fileUpload({
      createParentPath: true,
      limits: {
        fileSize: 200 * 1024 * 1024 * 1024, //20MB max file(s) size
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
  const port = Number(process.env.SERVER_PORT) || 3000

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

  app.get('/', (_, res) => {
    res.json('👋 Server ready ')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

init()
