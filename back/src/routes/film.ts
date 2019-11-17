import { Router } from "express"
import { checkAuth } from "./middlewares"
import Film from "../models/film"

const router = Router()

router.get("/get_list", async (req, res) => {
  const list = await Film.GetMovieList()
  res.send(list)
})
router.post("/add_film/:id", checkAuth, (req, res) => {
  try {
    const added = Film.AddMovie(parseInt(req.params.id))
    res.sendStatus(added ? 201 : 500)
  }
  catch (err) {
    res.sendStatus(500)
  }
})

export default router