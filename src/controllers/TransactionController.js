import {
  GetBalanceService,
  ProcessTransaction,
  TopUpService,
  TransactionHistoryService,
} from "../service/TransactionService.js";
import { ResponseJSON, ResponseJSONWithPagination } from "../utils/response.js";
import validate from "../utils/validation.js";

export const FetchAllBalance = async (req, res) => {
  const { email } = req.user;
  try {
    const data = await GetBalanceService(email);
    if (data instanceof Error) {
      return ResponseJSON(res, 400, 108, error.message, null);
    }
    return ResponseJSON(res, 200, 0, "Get Balance Berhasil", data);
  } catch (error) {
    return ResponseJSON(res, 500, 500, error.message, null);
  }
};

export const TopUpUser = async (req, res) => {
  const { email } = req.user;
  const { top_up_amount } = req.body;
  try {
    const data = await TopUpService(top_up_amount, email);
    return ResponseJSON(res, 200, 0, "Top Up Balance berhasil", data);
  } catch (error) {
    console.log(error);
    if (error.message.includes("top_up_amount hanya")) {
      return ResponseJSON(res, 400, 102, error.message, null);
    }
    return ResponseJSON(res, 500, 500, error, null);
  }
};

export const Transaction = async (req, res) => {
  const { email } = req.user;
  const { service_code } = req.body;
  const rules = {
    service_code: [
      { rule: "required", message: "Parameter service_code harus di isi" },
    ],
  };
  const validationError = validate(req.body, rules);
  if (validationError instanceof Error) {
    return ResponseJSON(res, 400, 102, validationError.message, null);
  }
  try {
    const result = await ProcessTransaction(email, service_code);
    return ResponseJSON(res, 200, 0, "Transaksi berhasil", result);
  } catch (error) {
    console.log(error);
    return ResponseJSON(res, 500, 500, error, null);
  }
};

export const TransactionHistory = async (req, res) => {
  const { email } = req.user;
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  try {
    const result = await TransactionHistoryService(email, limit, offset);
    return ResponseJSONWithPagination(
      res,
      200,
      0,
      "Get History Berhasil",
      result,
      limit,
      offset
    );
  } catch (error) {
    console.log(error);
    return ResponseJSON(res, 500, 500, error, null);
  }
};
