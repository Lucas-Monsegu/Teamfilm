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
    static async GetMovie(id: number): Promise<Object | null> {
        const text = "SELECT * from main.film WHERE tmdb_id=$1"
        const values = [id]
        try {
            const res = await Pool.query(text, values)
            return res.rows[0]
        } catch (error) {
            return null
        }
    }
    static async UpdatePoster(tmdbId: number): Promise<Boolean> {
        const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=e59fb866a5c3211ad38d145410a3598b&language=en-US`
        const res = await fetch(url)
        if (res.status != 200) {
            return false
        }
        let json
        try {
            json = await res.json()
        }
        catch{
            return false
        }
        const values = [tmdbId, json.poster_path]
        const text = "UPDATE main.film SET poster_path=$2 WHERE tmdb_id=$1"
        try {
            let ress = await Pool.query(text, values)
            return true
        } catch (error) {
            return false
        }
    }
    static async AddMovie(tmdbId: number): Promise<Boolean> {
        const text = "INSERT INTO main.film(tmdb_id, genres, title, language, release_date, runtime, poster_path, rating) VALUES($1, $2, $3, $4, $5, $6, $7, $8)"
        const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=e59fb866a5c3211ad38d145410a3598b&language=en-US`
        const res = await fetch(url)
        if (res.status != 200) {
            return false
        }
        let json
        try {
            json = await res.json()
        }
        catch{
            return false
        }
        const genres = json.genres.map((obj: any) => obj.name)
        let values = [tmdbId, genres, json.title, json.original_language, new Date(json.release_date), parseInt(json.runtime), json.poster_path, -1]
        try {
            let ress = await Pool.query(text, values)
            return true
        } catch (error) {
            return false
        }
    }
}

export default Film