import db from "../db/connection.js";
export const GetUser = async () => {
  try {
    const query = await db();
    const [rows] = await query.execute(
      "SELECT id,email,first_name,last_name,created_at,updated_at,profile_image FROM users"
    );
    await query.end();
    return rows;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const GetDetailUser = async (email) => {
  try {
    const query = await db();
    const [rows] = await query.execute(
      "SELECT email,first_name,last_name,profile_image FROM users WHERE email = ?",
      [email]
    );
    await query.end();
    return rows[0];
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const CreateUser = async (email, password, first_name, last_name) => {
  try {
    const query = await db();
    const [existingUser] = await query.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      throw new Error("Email sudah terdaftar");
    }
    const [rows] = await query.execute(
      "INSERT INTO users (email,password,first_name,last_name,created_at) VALUES (?,?,?,?,NOW())",
      [email, password, first_name, last_name]
    );
    await query.execute("INSERT INTO balance (email,balance) VALUES (?,0)", [
      email,
    ]);
    return rows;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const ProfileUser = async (email) => {
  try {
    const query = await db();
    const [existingUser] = await query.execute(
      "SELECT id,email,password,first_name,last_name,created_at,updated_at,profile_image FROM users WHERE email = ?",
      [email]
    );
    return existingUser[0];
  } catch (error) {
    console.log("error from models profile users users", error.message);
    throw error;
  }
};

export const ProfileUpdateUsers = async (first_name, last_name, email) => {
  try {
    const query = await db();
    await query.execute(
      "UPDATE users SET first_name = ?, last_name = ? WHERE email = ?",
      [first_name, last_name, email]
    );

    const [existingUser] = await query.execute(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE email = ?",
      [email]
    );

    return existingUser[0];
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const ProfileUpdateImage = async (email, profileImage) => {
  try {
    const query = await db();
    await query.execute("UPDATE users SET profile_image = ? WHERE email = ?", [
      profileImage,
      email,
    ]);

    const [existingUser] = await query.execute(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE email = ?",
      [email]
    );

    return existingUser[0];
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
