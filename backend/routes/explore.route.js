import express from "express"
import { explorePopularRepos } from "../controllers/explore.controller.js"

const router = express.Router()

router.get("/repos/:language", explorePopularRepos)
// TODO => GET - likes
// TODO => POST - like a profile

export default router
