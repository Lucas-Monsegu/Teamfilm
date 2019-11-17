import conf from "../config/pg"
import { Pool } from "pg"
export default new Pool(conf)
