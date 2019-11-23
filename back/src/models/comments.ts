import Pool from "./pg"

class Comment {
  static async GetComments(filmId: Number): Promise<Object | null> {
    const text =
      "SELECT C.id, film_id, user_id,U.avatar,U.name, message, rating FROM main.comment as C INNER JOIN main.user as U on C.user_id=U.id WHERE C.film_id=(SELECT id FROM main.film WHERE tmdb_id=$1)"
    const values = [filmId]
    try {
      const res = await Pool.query(text, values)
      return res.rows
    } catch (err) {
      console.error("error in GetCommentList", err.stack)
      return null
    }
  }
  static async DeleteComment(filmId: Number, userId: Number): Promise<Boolean> {
    const text =
      "DELETE FROM main.comment WHERE film_id=(SELECT id FROM main.film WHERE tmdb_id=$1) and user_id=$2;"
    const values = [filmId, userId]
    try {
      const res = await Pool.query(text, values)
      const updateText =
        "UPDATE main.film as F SET rating=coalesce((SELECT AVG(rating) from main.comment WHERE film_id=$1), -1.0) WHERE tmdb_id=$1;"
      const updateValues = [filmId]
      const updateRes = await Pool.query(updateText, updateValues)
      return true
    } catch (err) {
      console.error("error in Delete comment", err.stack)
      return false
    }
  }
  static async AddComment(
    filmId: Number,
    message: String,
    rating: Number,
    userId: string
  ): Promise<Boolean> {
    const text =
      "INSERT INTO main.comment(film_id, user_id, message, rating) VALUES ((SELECT id FROM main.film WHERE tmdb_id=$1), $2, $3, $4)"
    const values = [filmId, userId, message, rating]
    try {
      const res = await Pool.query(text, values)
      const updateText =
        "UPDATE main.film as F SET rating=(SELECT AVG(rating) from main.comment WHERE film_id=F.id) WHERE tmdb_id=$1;"
      const updateValues = [filmId]
      const updateRes = await Pool.query(updateText, updateValues)
      return true
    } catch (err) {
      console.error("error in GetMovieList", err.stack)
      return false
    }
  }
  static async EditComment(
    filmId: Number,
    message: String,
    rating: Number,
    userId: String
  ): Promise<Boolean> {
    const text =
      "UPDATE main.comment SET message=$3, rating=$4 WHERE film_id=(SELECT id FROM main.film WHERE tmdb_id=$1) AND user_id=$2"
    const values = [filmId, userId, message, rating]
    try {
      const res = await Pool.query(text, values)
      const updateText =
        "UPDATE main.film as F SET rating=(SELECT AVG(rating) from main.comment WHERE film_id=F.id) WHERE tmdb_id=$1;"
      const updateValues = [filmId]
      const updateRes = await Pool.query(updateText, updateValues)
      return true
    } catch (err) {
      console.error("error in Edit Comment", err.stack)
      return false
    }
  }
}
export default Comment
