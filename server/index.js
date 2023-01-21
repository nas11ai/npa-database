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

const {
  createNewPropertyAreaRouter,
  readPropertyAreaRouter,
  updatePropertyAreaRouter,
  deletePropertyAreaRouter
} = require("./controllers/property/areas");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const corsOptions = {
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
=======
const corsOptions = {
  origin: [
    'http://localhost:3000',
>>>>>>> 7c3571e (feat: remove secure:true for development)
    'https://na-database.vercel.app',
    new RegExp('https:\/\/fe-na-database-.*-xploratech\.vercel\.app'),
    'https://fe-na-database-k1czrpt89-xploratech.vercel.app',
  ],
<<<<<<< HEAD
=======
  origin: ['http://localhost:3000', 'https://na-database.vercel.app/', 'https://fe-na-database-bdilh31im-xploratech.vercel.app'],
>>>>>>> e830b00 (feat: add more origin for cors policy)
  credentials: true,
};

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
=======
  // methods: 'GET,POST,PUT,DELETE',
}))
>>>>>>> 5e60dde (fix: commenting methods in cors)
=======
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'https://na-database.vercel.app',
//     new RegExp('https:\/\/fe-na-database-.*-xploratech\.vercel\.app'),
//     'https://fe-na-database-k1czrpt89-xploratech.vercel.app',
//   ],
//   credentials: true,
// };

// app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  next();
});
>>>>>>> f040049 (feat: using self made middleware for cors policy)
=======
const corsOptions = {
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
=======
const corsOptions = {
  origin: [
    'http://localhost:3000',
>>>>>>> 7c3571e (feat: remove secure:true for development)
    'https://na-database.vercel.app',
    new RegExp('https:\/\/fe-na-database-.*-xploratech\.vercel\.app'),
    'https://fe-na-database-k1czrpt89-xploratech.vercel.app',
  ],
<<<<<<< HEAD
=======
  origin: ['http://localhost:3000', 'https://na-database.vercel.app/', 'https://fe-na-database-bdilh31im-xploratech.vercel.app'],
>>>>>>> e830b00 (feat: add more origin for cors policy)
  credentials: true,
};

app.use(cors(corsOptions));
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