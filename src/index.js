import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", clientRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
