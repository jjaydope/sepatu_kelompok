require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require("./api/user/user.router");
const productRouter = require("./api/product/product.router");
const customerRouter = require("./api/customer/customer.router");
const transactionRouter = require("./api/transaksi/transaction.router");

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/customer", customerRouter);
app.use("/api/transaction", transactionRouter);


app.listen(process.env.APP_PORT, () => {

    console.log("Tersambung di PORT : " + process.env.APP_PORT)
})