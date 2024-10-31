import jwt from "jsonwebtoken";
import db from "../db/connection.js";
import { ResponseJSON } from "../utils/response.js";

const RequireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return ResponseJSON(
      res,
      401,
      108,
      "Token tidak valid atau kadaluwarsa",
      null
    );
  }
  const token = authorization.split(" ")[1];
  try {
    const { email } = jwt.verify(token, process.env.ACCESS_TOKEN);
    const query = await db();
    const [rows] = await query.execute(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE email = ?",
      [email]
    );

    if (!rows || rows.length === 0) {
      return ResponseJSON(res, 401, "User not found", null);
    }
    req.user = rows[0];
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return ResponseJSON(
        res,
        401,
        108,
        "Token tidak tidak valid atau kadaluwarsa",
        null
      );
    }
    throw error;
  }
};

export default RequireAuth;
