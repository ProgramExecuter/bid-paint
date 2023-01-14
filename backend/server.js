// Import from packages
import express from "express";
import dotenv from "dotenv";

// Import from files
import authRoute from "./routes/auth.js";

const app = express();

// Configs / Setups / Middlewares
dotenv.config({ path: "config/.env" }); // Env variable config
app.use(express.json()); // Use JSON from requests as object in backend for node.js

// Attach Routes
app.use("/api/auth", authRoute);

// Server Setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
