import { Router } from "express";
import photoRoutes from "./photos";

const routes = Router();

routes.use("/photos", photoRoutes);

export default routes;
