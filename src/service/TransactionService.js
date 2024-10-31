import {
  GetBalance,
  GetServiceByCode,
  GetTransactionById,
  InsertTransaction,
  UpdateBalance,
  GetAllTransaction,
  InsertTransactionTopUp,
  UpdateBalanceAfterTransaction,
} from "../models/TransactionModel.js";

export const generateInvoiceNumber = () => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${String(
    date.getMonth() + 1
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const randomIncrement = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `INV${formattedDate}-${randomIncrement}`;
};
export const GetBalanceService = async (email) => {
  try {
    const data = await GetBalance(email);
    if (!data) {
      return new Error("balance tidak ditemukan");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const TopUpService = async (amount, email) => {
  try {
    if (isNaN(amount) || amount <= 0) {
      throw new Error(
        "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
      );
    }
    const invoice = generateInvoiceNumber();
    await InsertTransactionTopUp(email, invoice, "TOPUP", amount);
    const data = await UpdateBalance(email, amount);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ProcessTransaction = async (email, serviceCode) => {
  try {
    const service = await GetServiceByCode(serviceCode);
    if (!service) throw new Error("Service atau Layanan tidak ditemukan");

    const userBalance = await GetBalance(email);
    if (
      userBalance.balance === 0 ||
      userBalance.balance < service.service_tarif
    ) {
      throw new Error("Saldo balance tidak cukup untuk transaksi");
    }

    const invoice = generateInvoiceNumber();
    const newBalance = userBalance.balance - service.service_tarif;

    const transactionId = await InsertTransaction(
      email,
      invoice,
      service,
      "PAYMENT",
      service.service_tarif
    );

    await UpdateBalanceAfterTransaction(email, newBalance);
    const data = await GetTransactionById(transactionId);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const TransactionHistoryService = async (email, limit, offset) => {
  try {
    const data = await GetAllTransaction(email, limit, offset);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
