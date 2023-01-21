const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error_handler");

const {
  registerRouter,
  loginRouter,
  refreshTokenRouter,
} = require("./controllers/users");

//TODO: add allowed origins
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

<<<<<<< HEAD
const corsOptions = {
<<<<<<< HEAD
  origin: [
    'http://localhost:3000',
<<<<<<< HEAD
<<<<<<< HEAD
    'http://localhost:5173',
=======
>>>>>>> 0f62c58 (feat: add origin domain)
=======
    'http://localhost:5173',
>>>>>>> 3f2280c (feat: add one origin for cors policy)
    'https://na-database.vercel.app',
    new RegExp('https:\/\/fe-na-database-.*-xploratech\.vercel\.app'),
    'https://fe-na-database-k1czrpt89-xploratech.vercel.app',
  ],
=======
  origin: ['http://localhost:3000', 'https://na-database.vercel.app/', 'https://fe-na-database-bdilh31im-xploratech.vercel.app'],
>>>>>>> e830b00 (feat: add more origin for cors policy)
  credentials: true,
<<<<<<< HEAD
};

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("NA Database API is running 🥳");
})

app.use('/users/register', registerRouter);
app.use('/users/login', loginRouter);
app.use('/users/refresh_token', refreshTokenRouter);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

app.use(errorHandler);

main();
