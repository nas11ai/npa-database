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

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://na-database.vercel.app',
    new RegExp('https:\/\/fe-na-database-.*-xploratech\.vercel\.app'),
    'https://fe-na-database-k1czrpt89-xploratech.vercel.app',
  ],
  credentials: true,
<<<<<<< HEAD
};

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
=======
  // methods: 'GET,POST,PUT,DELETE',
}))
>>>>>>> 5e60dde (fix: commenting methods in cors)
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

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

app.use(errorHandler);

main();
