const express = require("express")
const notes = require('./data/notes')
const dotenv = require('dotenv')


const app = express()
dotenv.config()

app.get("/",(req,res) => {
    res.send("Hello from server")
})

app.get("/api/notes",(req,res)=>{
    res.json(notes)
})

app.get("/api/notes/:id",(req,res) => {
    const note = notes.find((n) => n._id === req.params.id)
    res.json(note)
})

app.listen(process.env.PORT,console.log("server started"))