import express from "express";
import {
  Auth,
  GetDetail,
  ProfileUpdate,
  Register,
  UpdateProfileImage,
} from "../controllers/UserController.js";
import RequireAuth from "../middleware/authentication.js";
import upload from "../middleware/upload.js";

const route = express.Router();

route.get("/profile", RequireAuth, GetDetail);
route.put("/profile/update", RequireAuth, ProfileUpdate);
route.put(
  "/profile/image",
  RequireAuth,
  upload.single("profileImage"),
  UpdateProfileImage
);
route.post("/login", Auth);
route.post("/registration", Register);

export default route;
