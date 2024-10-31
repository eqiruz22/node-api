import express from "express";
import cors from "cors";
import UserRoute from "./route/UserRoute.js";
import ServiceListRoute from "./route/ServiceListRoute.js";
import TransactionRoute from "./route/TransactionRoute.js";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import multer from "multer";
import https from "https";
import { ResponseJSON } from "./utils/response.js";
const app = express();
app.disable("x-powered-by")
app.disable("etag")
const port = 8443;
const dirname = path.dirname(new URL(import.meta.url).pathname);
const swaggerSpec = yaml.load(
  fs.readFileSync(path.resolve("./swagger.yaml"), "utf-8")
);
const sslOpt = {
 key: fs.readFileSync("key.pem"),
 cert: fs.readFileSync("cert.pem"),
}
dotenv.config();
app.use(cors());
app.use((req, res, next) => {
  res.removeHeader("access-control-allow-origin");
  res.removeHeader("connection");
  res.removeHeader("date");
  res.removeHeader("keep-alive");
  next();
});
app.use(express.json());
app.use("/uploads", express.static(path.join(dirname, "./uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(UserRoute);
app.use(ServiceListRoute);
app.use(TransactionRoute);
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return ResponseJSON(res, 500, 500, err.message, null);
  } else if (err) {
    return ResponseJSON(res, 400, 102, err.message, null);
  }
  next();
});
https.createServer(sslOpt,app).listen(port, () => {
	console.log(`server running via https port ${port}`)
})
//app.listen(port,() => {
//  console.log(`server running on port ${port}`);
//});

