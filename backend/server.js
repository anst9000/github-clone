import express from "express"
import * as dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"

const app = express()
app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
