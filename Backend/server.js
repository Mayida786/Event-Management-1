import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/events", eventsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
