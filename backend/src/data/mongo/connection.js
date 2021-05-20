const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/alcool-todo'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log(`Connected to ${uri}`)
})
