import express from "express"
import dotenv from "dotenv"
import router from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import path from "path"
import { connectDB } from "./lib/db.js";

dotenv.config()

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT;

app.use(express.json()) //req.body

app.use("/api/auth", router)
app.use("/api/message", messageRouter)


//make ready for deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB()
});