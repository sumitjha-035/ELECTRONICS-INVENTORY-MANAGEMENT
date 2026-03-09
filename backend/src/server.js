import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import electronicRoutes from "./routes/electronicRoutes.js";
import cors from "cors";
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use("/electronics", electronicRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/electronics`);
  });
});
