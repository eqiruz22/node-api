import {
  RegisterUser,
  Login,
  ProfileUpdateService,
  ProfileImageUpdateService,
} from "../service/UserService.js";
import { ResponseJSON } from "../utils/response.js";
import bcrypt from "bcrypt";
import validate from "../utils/validation.js";
import { GetDetailUser } from "../models/UserModel.js";

export const Register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const rules = {
      email: [
        { rule: "required", message: "Parameter email harus diisi" },
        { rule: "email", message: "Parameter email tidak sesuai format" },
      ],
      password: [
        { rule: "required", message: "Parameter password harus diisi" },
        {
          rule: "minLength",
          length: 8,
          message: "Password tidak boleh kurang dari 8 karakter",
        },
      ],
      first_name: [
        { rule: "required", message: "Parameter first name harus diisi" },
      ],
      last_name: [
        { rule: "required", message: "Parameter last name harus diisi" },
      ],
    };

    const validationError = validate(req.body, rules);
    if (validationError instanceof Error) {
      return ResponseJSON(res, 400, 102, validationError.message, null);
    }

    const hash = await bcrypt.hash(password, 10);
    await RegisterUser(email, hash, first_name, last_name);

    return ResponseJSON(
      res,
      201,
      0,
      "Registrasi berhasil silahkan login",
      null
    );
  } catch (error) {
    if (error.message.includes("sudah terdaftar")) {
      return ResponseJSON(res, 400, 102, error.message, null);
    }
    return ResponseJSON(res, 500, 500, error.message, null);
  }
};

export const Auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const rules = {
      email: [
        { rule: "required", message: "Email tidak boleh kosong" },
        { rule: "email", message: "Parameter email tidak sesuai format" },
      ],
      password: [{ rule: "required", message: "Password tidak boleh kosong" }],
    };
    const validationError = validate(req.body, rules);
    if (validationError instanceof Error) {
      return ResponseJSON(res, 400, 102, validationError.message, null);
    }
    const data = await Login(email, password);
    if (data instanceof Error) {
      return ResponseJSON(res, 400, 103, "username atau password salah", null);
    }
    return ResponseJSON(res, 200, 0, "Login Sukses", data.token);
  } catch (error) {
    return ResponseJSON(res, 500, 500, "error", error.message);
  }
};

export const GetDetail = async (req, res) => {
  try {
    const data = await GetDetailUser(req.user.email);
    return ResponseJSON(res, 200, 0, "Sukses", data);
  } catch (error) {
    return ResponseJSON(res, 500, 500, "error", error.message);
  }
};

export const ProfileUpdate = async (req, res) => {
  const { first_name, last_name } = req.body;
  const rules = {
    first_name: [
      { rule: "required", message: "first name tidak boleh kosong" },
    ],
    last_name: [{ rule: "required", message: "last name tidak boleh kosong" }],
  };
  const validationError = validate(req.body, rules);
  if (validationError instanceof Error) {
    return ResponseJSON(res, 400, 102, validationError.message, null);
  }
  try {
    const { email } = req.user;
    const data = await ProfileUpdateService(first_name, last_name, email);
    if (data instanceof Error) {
      return ResponseJSON(res, 400, 103, data.message, null);
    }
    return ResponseJSON(res, 200, 0, "Update Profile Berhasil", data);
  } catch (error) {
    return ResponseJSON(res, 500, 500, "error", error.message);
  }
};

export const UpdateProfileImage = async (req, res) => {
  const { email } = req.user;
  try {
    const updatedUser = await ProfileImageUpdateService(email, req.file);
    if (updatedUser instanceof Error) {
      return ResponseJSON(res, 400, 102, updatedUser.message, null);
    }
    return ResponseJSON(
      res,
      200,
      0,
      "Update Profile Image Berhasil",
      updatedUser
    );
  } catch (error) {
    console.error("Error in UpdateProfileImage controller:", error.message);
    return ResponseJSON(res, 500, 500, error, null);
  }
};
