import "dotenv/config"
import express from "express";
import moviesRouter from "./routers/movies.js"
import cors from "cors"
const app = express ();
const port = process.env.SERVER_PORT;

app.use(cors({origin: "http://localhost:5173"}))

app.use("/api/movies", moviesRouter)

app.listen(port,()=>{
    console.log (`il server è in ascolto nella porta ${port}`);
})
