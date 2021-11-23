const express = require("express")
const notes = require('./data/notes')
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const userRoutes  = require('./routes/userRoutes.js')
const noteRoutes  = require('./routes/noteRoutes.js')
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")
    const path = require("path")


const app = express() 
dotenv.config()
connectDB()
app.use(express.json())


app.use('/api/users',userRoutes)
app.use('/api/notes',noteRoutes)

// ------------------------DEPLOYMENT---------------------

__dirname=path.resolve()
if(process.env.NODE_ENV === 'production'){
 app.use(express.static(path.join(__dirname,'/frontend/build')))

 app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
 })
} else {
    app.get("/",(req,res) => {
        res.send("Hello from server")
    })
}


// ------------------------DEPLOYMENT---------------------
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT,console.log("server started"))