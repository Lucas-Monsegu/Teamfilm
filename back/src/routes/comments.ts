import { Router } from "express"
import { checkAuth, noCache } from "./middlewares"
import Comments from '../models/comments'

const router = Router()

router.get("/get_comments/:id", async (req, res) => {
  const list = await Comments.GetComments(parseInt(req.params.id))
  res.send(list)
})

router.post("/add_comment", checkAuth, (req, res) => {
  if (!['filmId', 'text', 'rating'].every(x => { return x in req.body })) {
    console.log(req.body, !['filmId', 'text', 'rating'].every(x => { return x in req.body }))
    return res.sendStatus(400)
  }
  try {
    const body = req.body
    const user: any = req.user
    const added = Comments.AddComment(body.filmId, body.message, body.rating, user.id)
    res.sendStatus(added ? 201 : 500)
  }
  catch (err) {
    res.sendStatus(500)
  }
})
export default router