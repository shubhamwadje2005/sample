const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path");
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(express.static("dist"));
app.use(cors({
    origin: "https://sample-kcc8.onrender.com",
    credentials: true
}))

app.use("/api/todo", require("./routes/todo.routes"))
app.use("*", (req, res) => {
    // res.status(404).json({ message: "resource not found" })
    res.sendFile(path.join(__dirname, "dist", "index.html"));

})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "server error", error: err.message })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongo connected")
    app.listen(process.env.PORT, console.log("server running..."))
})
