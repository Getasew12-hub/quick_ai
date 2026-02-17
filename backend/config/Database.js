import {neon} from "@neondatabase/serverless";
import env from "dotenv";

env.config();


        
         const sql = neon(`${process.env.DATABASE_URL}`);



export default sql;    