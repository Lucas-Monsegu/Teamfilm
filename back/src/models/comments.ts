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
    const text = "INSERT INTO main.comment(film_id, user_id, message, rating) VALUES ((SELECT id FROM main.film WHERE tmdb_id=$1), $2, $3, $4, $5)";
    const values = [filmId, userId, message, rating]
    try {
      const res = await Pool.query(text, values)
      const updateText = "UPDATE main.film as F SET rating=(SELECT AVG(rating) from main.comment WHERE film_id=F.id) WHERE tmdb_id=$1;"
      const updateValues = [filmId]
      const updateRes = await Pool.query(updateText, updateValues)
      return true
    } catch (err) {
      console.error("error in GetMovieList", err.stack)
      return false
    }
  }
}
export default Comment