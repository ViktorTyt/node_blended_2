console.log("Hello backend");
const express = require("express");
require("colors");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const { connectDB } = require("../config/db");
const { prefixDevices } = require("../config/routesPrefix");
const errorHandler = require("./middlewares/errorHandler");

const configPath = path.join(__dirname, "..", "config", ".env");

dotenv.config({ path: configPath });
const { PORT } = process.env;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(prefixDevices, require("./routes/devicesRoutes"));

app.use((req, res) => res.status(401).json("not found"));

app.use(errorHandler);

connectDB();
app.listen(PORT, () =>
  console.log(`server start on port ${PORT}`.cyan.bold.italic)
);
