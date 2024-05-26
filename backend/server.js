import express from "express"
const app = express()

import * as dotenv from "dotenv"
dotenv.config()

import passport from "passport"
import session from "express-session"

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
)
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize())
app.use(passport.session())

import cors from "cors"

import "./passport/github.auth.js"

import connectMongoDB from "./db/connectMongoDB.js"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"

app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectMongoDB()
})
