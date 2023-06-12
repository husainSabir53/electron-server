const express = require("express");
const createError = require("http-errors");
const apiRoutes = require("./routes/apiRoutes");
const morgan = require("morgan");
require("dotenv").config();
require("./helper/connectMongo");

const app = express();
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

app.use("/api", apiRoutes);

app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist."));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error.",
    },
  });
});
