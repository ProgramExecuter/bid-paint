// Import packages
import express from "express";

// Import files-functions
import routes from "./routes/index.js";

const app = express();

// Attaching Routes
app.use("/api", routes);

// Server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
