import express from "express";
import RequireAuth from "../middleware/authentication.js";
import {
  FetchAllBalance,
  TopUpUser,
  Transaction,
  TransactionHistory,
} from "../controllers/TransactionController.js";

const route = express.Router();

route.get("/balance", RequireAuth, FetchAllBalance);
/**
 * @swagger
 * /transaction/history:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit records
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Offset records
 *     responses:
 *       200:
 *         description: Get History Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Get History Berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     offset:
 *                       type: integer
 *                       example: 3
 *                     limit:
 *                       type: integer
 *                       example: 0
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           invoice_number:
 *                             type: string
 *                             example: "INV20241030-511"
 *                           service_code:
 *                             type: string
 *                             example: "PLN"
 *                           description:
 *                             type: string
 *                             example: "Listrik"
 *                           transaction_type:
 *                             type: string
 *                             example: "PAYMENT"
 *                           total_amount:
 *                             type: integer
 *                             example: 10000
 *                           created_on:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-10-30T08:57:23.000Z"
 *                            type: object
 *                            properties:
 *                               invoice_number:
 *                                  type: string
 *                                  example: "INV20241030-511"
 *                               service_code:
 *                                  type: string
 *                                  example: "PLN"
 *                               description:
 *                                  type: string
 *                             example: "Listrik"
 *                           transaction_type:
 *                             type: string
 *                             example: "PAYMENT"
 *                           total_amount:
 *                             type: integer
 *                             example: 10000
 *                           created_on:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-10-30T08:57:23.000Z"
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Token tidak tidak valid atau kadaluwarsa "
 *                 data:
 *                   type: string
 *                   example: null
 *
 */
route.get("/transaction/history", RequireAuth, TransactionHistory);
route.post("/topup", RequireAuth, TopUpUser);
route.post("/transaction", RequireAuth, Transaction);

export default route;
