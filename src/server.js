require("express-async-errors")
require("dotenv/config")
const migrationsRun = require("./database/sqlite/migrations")
const routes = require("./routes");
const uploadConfig = require("./configs/upload")
const AppError = require("./utils/AppError")
const express = require("express");
const cors = require("cors");

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes);


const PORT = process.env.PORT || 3333;

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error)
  return response.status(500).json({
    status: "error",
    message: "internal server error",
  })
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
