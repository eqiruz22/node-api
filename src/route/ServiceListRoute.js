import express from "express";
import RequireAuth from "../middleware/authentication.js";
import {
  FetchAll,
  FetchAllBanner,
} from "../controllers/ServiceListController.js";

const route = express.Router();

route.get("/services", RequireAuth, FetchAll);
route.get("/banner", RequireAuth, FetchAllBanner);

export default route;
