import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config({ path: "config/.env" }); // Env variable config
app.use(express.json()); // Use JSON from requests as object in backend for node.js

// Server Setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
