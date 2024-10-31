import db from "../db/connection.js";

export const GetBalance = async (email) => {
  try {
    const query = await db();
    const [rows] = await query.execute(
      "SELECT balance FROM balance WHERE email = ?",
      [email]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetServiceByCode = async (serviceCode) => {
  try {
    const query = await db();
    const [result] = await query.execute(
      "SELECT service_code, service_name, service_tarif FROM services WHERE service_code = ?",
      [serviceCode.toLowerCase()]
    );
    return result[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const InsertTransactionTopUp = async (
  email,
  invoice,
  type,
  totalAmount
) => {
  try {
    const query = await db();
    const [transaction] = await query.execute(
      `INSERT INTO transaction (email, invoice_number, service_code, service_name, transaction_type, total_amount, created_on) 
          VALUES (?, ?, "Top Up", "Top Up Balance", ?, ?, NOW())`,
      [email, invoice, type, totalAmount]
    );
    return transaction.insertId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const InsertTransaction = async (
  email,
  invoice,
  service,
  type,
  totalAmount
) => {
  try {
    const query = await db();
    const [transaction] = await query.execute(
      `INSERT INTO transaction (email, invoice_number, service_code, service_name, transaction_type, total_amount, created_on) 
          VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        email,
        invoice,
        service.service_code,
        service.service_name,
        type,
        totalAmount,
      ]
    );
    return transaction.insertId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateBalance = async (email, newBalance) => {
  try {
    const query = await db();
    const [updated] = await query.execute(
      `UPDATE balance SET balance = balance + ?, created_on = NOW() WHERE email = ?`,
      [newBalance, email]
    );
    if (updated.affectedRows === 0) {
      throw new Error("user tidak ditemukan atau update balance gagal");
    }
    const rows = await GetBalance(email);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateBalanceAfterTransaction = async (email, lastBalance) => {
  try {
    const query = await db();
    const [updated] = await query.execute(
      `UPDATE balance SET balance = ?, created_on = NOW() WHERE email = ?`,
      [lastBalance, email]
    );
    if (updated.affectedRows === 0) {
      throw new Error("user tidak ditemukan atau update balance gagal");
    }
    const rows = await GetBalance(email);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetTransactionById = async (transactionId) => {
  try {
    const query = await db();
    const [result] = await query.execute(
      "SELECT invoice_number, service_code, service_name, transaction_type, total_amount, created_on FROM transaction WHERE id = ?",
      [transactionId]
    );
    return result[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetAllTransaction = async (email, limit, offset) => {
  try {
    const query = await db();
    const [rows] = await query.execute(
      "SELECT invoice_number, service_code, service_name as description, transaction_type, total_amount, created_on FROM transaction WHERE email = ? ORDER BY created_on DESC LIMIT ?,?",
      [email, offset, limit]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
