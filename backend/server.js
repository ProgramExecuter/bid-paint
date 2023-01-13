import express from "express";
import dotenv from "dotenv";
const app = express();

// Env variable config
dotenv.config({ path: "config/.env" });

// Server Setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
