import { Router } from "express"
import { checkAuth } from "./middlewares"
import Film from "../models/film"
import { send } from "process"

const router = Router()

router.get("/get_list", async (req, res) => {
    const list = await Film.GetMovieList()
    res.send(list)
})
router.get("/get_movie/:id", async (req, res) => {
    try {
        parseInt(req.params.id)
    }
    catch {
        res.sendStatus(400)
        return
    }
    const movie = await Film.GetMovie(parseInt(req.params.id))
    if (movie === null) {
        res.sendStatus(500)
        return
    }
    res.send(movie)
})
router.post("/add_film/:id", checkAuth, async (req, res) => {

    try {
        const added = await Film.AddMovie(parseInt(req.params.id))
        res.sendStatus(added ? 201 : 500)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})
router.post('/update_poster/:id', async (req, res) => {
    try {
        const added = await Film.UpdatePoster(parseInt(req.params.id))
    }
    catch (err) {
    }
    finally {
        res.sendStatus(200)
    }
})

export default router