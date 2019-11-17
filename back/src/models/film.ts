import Pool from "./pg"
import fetch from "node-fetch"

class Film {
  // id: number | null = null
  // constructor
  //   (public tmdbId: number,
  //     public genres: string[],
  //     public title: string,
  //     public language: string,
  //     public releaseDate: Date,
  //     public runtime: number,
  //     public posterPath: string) { }

  static async GetMovieList(): Promise<Object | null> {
    const text = "SELECT * from main.film"
    try {
      const res = await Pool.query(text)
      return res.rows
    } catch (err) {
      console.error("error in GetMovieList", err.stack)
      return null
    }
  }

  static async AddMovie(tmdbId: number): Promise<Boolean> {
    const text = "INSERT INTO main.film(tmdb_id, genres, title, language, release_date, runtime, poster_path, rating) VALUES($1, $2, $3, $4, $5, $6, $7, $8)"
    const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=e59fb866a5c3211ad38d145410a3598b&language=en-US`
    const res = await fetch(url)
    const json = await res.json()
    const genres = json.genres.map((obj: any) => obj.name)
    let values = [tmdbId, genres, json.title, json.original_language, new Date(json.release_date), parseInt(json.runtime), json.poster_path, -1]
    try {
      await Pool.query(text, values)
      return true
    } catch (error) {
      return false
    }
  }
}

export default Film