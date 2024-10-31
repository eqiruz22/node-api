import {
  CreateUser,
  GetUser,
  GetDetailUser,
  ProfileUser,
  ProfileUpdateUsers,
  ProfileUpdateImage,
} from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
const createToken = (email) => {
  if (!process.env.ACCESS_TOKEN) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: "12h" });
};
export const GetAll = async () => {
  try {
    return await GetUser();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const GetUserDetail = async (email) => {
  try {
    const user = await GetDetailUser(email);
    if (!user) {
      return new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const RegisterUser = async (email, password, first_name, last_name) => {
  try {
    const user = await CreateUser(email, password, first_name, last_name);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const Login = async (email, password) => {
  try {
    const user = await ProfileUser(email);
    if (!user) {
      return new Error("not found");
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return new Error("email atau password salah");
    }
    const token = createToken(user.email || null);
    if (!token) {
      console.log(token);
    }
    const decodedToken = jwt.decode(token);
    const expiresIn = decodedToken ? decodedToken.exp : null;
    const { password: _, ...userDetails } = user;
    return { userDetails, token, expiresIn };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ProfileUpdateService = async (first_name, last_name, email) => {
  try {
    const updatedUser = await ProfileUpdateUsers(first_name, last_name, email);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ProfileImageUpdateService = async (email, file) => {
  const VALID_IMAGE_TYPES = ["image/png", "image/jpeg"];
  const BASE_URL = "https://localhost:8443/uploads/";
  if (!file) {
    return new Error("Field file tidak boleh kosong");
  }

  const fileType = file.mimetype;
  if (!VALID_IMAGE_TYPES.includes(fileType)) {
    return new Error("Format image tidak sesuai");
  }

  try {
    const profileImageName = `${file.originalname}`;
    const profileImagePath = `uploads/${file.filename}`;
    const profileImageUrl = `${BASE_URL}${profileImageName}`;
    await fs.promises.rename(file.path, profileImagePath);
    const updatedUser = await ProfileUpdateImage(email, profileImageUrl);
    return updatedUser;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
