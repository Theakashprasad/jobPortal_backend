import connectDB from "./Config/dbConfig";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./Routes/authRoutes";
import jobRoutes from "./Routes/jobRoutes";

dotenv.config();
const app = express();

connectDB();
const port = process.env.PORT;
const allowedOrigins = process.env.CLIENT_ORIGINS;
app.get("/", (req: any, res: any) => res.send("helo world"));


app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/jobs/", jobRoutes);
app.use("/api/auth/", AuthRoutes);

app.listen(port, () => {
  console.log(`Server connected at port ${port}`);
});
