// Import packages
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import files-functions
import routes from "./routes/index.js";

const app = express();

// Middlewares
dotenv.config();
app.use(express.json()); // To parse the req.body to JSON

// Connecting to DB
mongoose.connect(process.env.MONGOURL).catch((err) => {
  console.log(err.message);
});

// Attaching Routes
app.use("/api", routes);

// Server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
