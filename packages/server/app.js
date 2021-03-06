require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use(cors())

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
  console.log('connected to DB')
})

app.use('/graphql', graphqlHTTP({ schema }))

app.listen(4000, () => {
  console.log('now listening for requests on port 4000')
})
