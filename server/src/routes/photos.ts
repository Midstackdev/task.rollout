import { Router } from "express";
import * as controllers from "../controllers/photos";

const routes = Router();

routes.route("/").get(controllers.getPhotos);
export default routes;
