import express from "express";
import dotenv from "dotenv";
import aiRoutes from "./src/routes/aiRoutes.ts";
import cors from "cors";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

const allowed = "http://localhost:3001";

app.use(cors({ origin: allowed }));
app.use(express.json());
app.use("/api/ai", aiRoutes);

app.listen(port, () => {
  console.log(`Backend Server is live and Running check that out at ${port}`);
});
