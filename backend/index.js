// const connectTOMongo = require("./db");

// connectTOMongo();

const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000

app.use(cors())
app.use(express.json())

//Avaliable Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`myNoteBook app listening on port ${port}`)
})