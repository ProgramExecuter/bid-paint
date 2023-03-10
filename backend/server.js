// Import packages
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import files-functions
import authRoute from "./routes/auth.js";
import paintingRoute from "./routes/painting.js";

// Attach the complete application to 'app'
const app = express();

// Configs / Setups / Middlewares
dotenv.config({ path: "config/.env" }); // Env variable config
app.use(express.json()); // Use JSON from requests as object

// Connect/Setup to the Database
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGOURI, (err) => {
  if (err) console.log(err.message);
  else console.log("DB Connected");
});

// Attach Routes
app.use("/api/auth", authRoute);
app.use("/api/painting", paintingRoute);

// Server Setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
