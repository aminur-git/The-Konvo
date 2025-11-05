import express from "express"
import dotenv from "dotenv"
import router from "./routes/auth.route.js";

dotenv.config()

const app = express();
const port = process.env.PORT;


app.use("/api/auth", router)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});