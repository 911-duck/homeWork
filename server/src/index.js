const express = require('express')
const cors = require('cors')
const storeRoutes = require('./routes/store.routes')
const connectDB = require('./config/db')

require('dotenv').config()
connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(
	cors({
		methods: 'GET, POST, DELETE, PATCH',
		origin: process.env.CLIENT_URL
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/store', storeRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`)
})
