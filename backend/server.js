import express from "express";
import dotenv from "dotenv";
const app  = express();

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // 

app.use("/api/auth", authRoutes); //to parse the incoming requests with JSON payloads (from req.body)

// app.get("/", (req, res) => 
// {
//     //root route http"//localhost: 5000/
//     res.send("Hello World!!!!!")
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});

