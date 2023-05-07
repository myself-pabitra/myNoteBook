
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
// const mongoURI = "mongodb://localhost:27017"
// const mongoURI = "mongodb://192.168.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;