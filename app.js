const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const routes = require("./routes") // Adjust the path

const app = express()

// Use cors middleware
app.use(cors())

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json())

// Use the routes
app.use("/api", routes) // Base route for your APIs

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
