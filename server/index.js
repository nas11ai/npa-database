const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const { accessTokenValidator, errorHandler } = require("./middleware");

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

const {
  createNewPropertyFacilityNameRouter,
  readPropertyFacilityNameRouter,
  updatePropertyFacilityNameRouter,
  deletePropertyFacilityNameRouter,
} = require("./controllers/property/facility_names");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://na-database.vercel.app',
    new RegExp('https:\/\/fe-na-database-.*-xploratech\.vercel\.app'),
    'https://fe-na-database-k1czrpt89-xploratech.vercel.app',
  ],
  credentials: true,
};

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
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
app.use('/property/areas/delete', deletePropertyAreaRouter);

app.use('/property/facility_names/create', createNewPropertyFacilityNameRouter);
app.use('/property/facility_names/read', readPropertyFacilityNameRouter);
app.use('/property/facility_names/update', updatePropertyFacilityNameRouter);
app.use('/property/facility_names/delete', deletePropertyFacilityNameRouter);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

app.use(errorHandler);

main();