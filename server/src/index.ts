import express, { Application, Request, Response } from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import config from "./config";
import routes from "./routes";
import cors from "cors";
import db, { pool } from "./database";
import { fetchAndStorePhotos } from "./sripts/fetchPhotos";
import "./jobs/index";

const PORT = config.port;

const app: Application = express();

app.use(cors());
app.use(express.json());

//create table
async function createPhotosTable() {
  const connection = await pool.getConnection();
  try {
    // Create photos table
    await connection.query(`
          CREATE TABLE IF NOT EXISTS photos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            published_date DATETIME,
            image_url LONGTEXT,
            tags LONGTEXT
          )
      `);
    console.log("Photos table created successfully");
  } catch (error) {
    console.error("Error creating photos table:", error);
  } finally {
    connection.release();
  }
}

createPhotosTable();

fetchAndStorePhotos();

app.use("/api", routes);

app.post("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello from post",
    data: req.body,
  });
});
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "Not found!, read the API documentation to find your way",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});

export default app;
