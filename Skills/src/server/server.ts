// eslint-disable-next-line @typescript-eslint/no-unused-vars
import newrelic from 'newrelic'
import express from 'express'
import MessagesController from '../controllers/messages'

const server = express()

server.use(express.json({ limit: '32mb' }))

// In production redirect to https
/**
if (process.env.NODE_ENV === "production") {
  const { redirectToHTTPS } = require('express-http-to-https')
  server.use(redirectToHTTPS())
}

*/

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("No credentials")
    res.status(403).json({ error: 'Invalid credentials' })
    return
  }
  if (req.headers.authorization !== `Token token=${process.env.AUTH_TOKEN}`) {
    console.log("Invalid token")
    res.status(403).json({ error: 'Invalid credentials' })
    return
  }
  next()
}


server.get('*', authMiddleware, (req, res, next) => {
  const contype = req.headers.accept

  if (!contype || contype.indexOf('application/json') !== 0) {
    res.redirect(process.env.WEB_CLIENT)
  }
  next()
})

server.get('/ping', (req, res) => {
  const data = { status: "ok" }
  res.status(200).json(data)
})

server.post('/messages/new', authMiddleware, (req, res) => {
  MessagesController.new(req, res)
})

export default server
