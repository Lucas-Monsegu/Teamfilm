import { Router } from "express"
import { checkAuth } from "./middlewares"
const router = Router()

router.get("/test", checkAuth, (req, res) => {
  res.send("test")
})

export default router