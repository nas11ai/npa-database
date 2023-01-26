const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error_handler");
const accessTokenValidator = require("./middleware/access_token_validator");

const {
  registerRouter,
  loginRouter,
  refreshTokenRouter,
  logoutRouter,
} = require("./controllers/users");

//TODO: add allowed origins
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  next();
});
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("NA Database API is running 🥳");
})

app.use('/users/register', registerRouter);
app.use('/users/login', loginRouter);
app.use('/users/refresh_token', refreshTokenRouter);

//API that needs access token validation
app.use(accessTokenValidator);

app.use('/users/logout', logoutRouter);
app.use('/property/areas/create', createNewPropertyAreaRouter);
app.use('/property/areas/read', readPropertyAreaRouter);
app.use('/property/areas/update', updatePropertyAreaRouter);
app.use('/property/areas/delete', deletePropertyAreaRouter)

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

app.use(errorHandler);

main();
