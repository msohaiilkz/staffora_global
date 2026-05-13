require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const contactRoutes     = require('./routes/contact')
const healthCheckRoutes = require('./routes/healthCheck')
const applicationRoutes = require('./routes/applications')

const app  = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
]
app.use(cors({ origin: (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin)) }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/contact',         contactRoutes)
app.use('/api/hr-health-check', healthCheckRoutes)
app.use('/api/applications',    applicationRoutes)

app.get('/', (req, res) => {
  res.json({ status: 'Staffora API running ✅', version: '1.0.0' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
})

app.listen(PORT, () => {
  console.log(`Staffora API running on http://localhost:${PORT}`)
})
