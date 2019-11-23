import { Router } from "express"
import { checkAuth, noCache } from "./middlewares"
import Comments from "../models/comments"

const router = Router()

router.get("/get_comments/:id", async (req, res) => {
  const list = await Comments.GetComments(parseInt(req.params.id))
  res.send(list)
})
router.delete("/delete_comment", checkAuth, async (req, res) => {
  !["filmId"].every(x => {
    return x in req.body
  })
  const user: any = req.user

  const deleted = await Comments.DeleteComment(req.body.filmId, user.id)
  res.sendStatus(deleted ? 200 : 500)
})
router.patch("/edit_comment", checkAuth, async (req, res) => {
  if (
    !["filmId", "text", "rating"].every(x => {
      return x in req.body
    })
  ) {
    console.log(
      req.body,
      !["filmId", "text", "rating"].every(x => {
        return x in req.body
      })
    )
    return res.sendStatus(400)
  }
  try {
    const body = req.body
    const user: any = req.user
    const added = await Comments.EditComment(
      body.filmId,
      body.text,
      body.rating,
      user.id
    )
    console.log("added", added)
    res.sendStatus(added ? 201 : 500)
  } catch (err) {
    res.sendStatus(500)
  }
})
router.post("/add_comment", checkAuth, async (req, res) => {
  if (
    !["filmId", "text", "rating"].every(x => {
      return x in req.body
    })
  ) {
    console.log(
      req.body,
      !["filmId", "text", "rating"].every(x => {
        return x in req.body
      })
    )
    return res.sendStatus(400)
  }
  try {
    const body = req.body
    const user: any = req.user
    const added = await Comments.AddComment(
      body.filmId,
      body.text,
      body.rating,
      user.id
    )
    res.sendStatus(added ? 201 : 500)
  } catch (err) {
    res.sendStatus(500)
  }
})
export default router
