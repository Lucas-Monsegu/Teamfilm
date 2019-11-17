import Pool from "./pg"

class Comment {
  static async GetComments(filmId: Number): Promise<Object | null> {
    const text = "SELECT * from main.comment WHERE film_id=$1"
    const values = [filmId]
    try {
      const res = await Pool.query(text, values)
      return res.rows
    } catch (err) {
      console.error("error in GetMovieList", err.stack)
      return null
    }
  }
  static async AddComment(filmId: Number, message: String, rating: Number, userId: string): Promise<Boolean> {
    const text = "INSERT INTO main.comment(film_id, user_id, message, rating) VALUES ($1, $2, $3, $4, $5);"
    const values = [filmId, userId, message, rating]
    try {
      const res = await Pool.query(text, values)
      return true
    } catch (err) {
      console.error("error in GetMovieList", err.stack)
      return false
    }
  }
}
export default Comment