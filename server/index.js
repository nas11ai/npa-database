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

const {
  createNewPropertyPersonInChargeRouter,
  readPropertyPersonInChargeRouter,
  updatePropertyPersonInChargeRouter,
  deletePropertyPersonInChargeRouter,
  restorePropertyPersonInChargeRouter,
} = require("./controllers/property/person_in_charges")

const {
  createNewApartmentPaymentTermRouter,
  readApartmentPaymentTermRouter,
  updateApartmentPaymentTermRouter,
  deleteApartmentPaymentTermRouter,
} = require("./controllers/apartment/payment_terms");

const {
  createNewApartmentIconicPlaceRouter,
  readApartmentIconicPlaceRouter,
  updateApartmentIconicPlaceRouter,
  deleteApartmentIconicPlaceRouter,
} = require("./controllers/apartment/iconic_places");

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

//TODO: Tambahkan middleware authorization sesuai role
app.use('/users/register', registerRouter);
app.use('/users/login', loginRouter);
app.use('/users/refresh_token', refreshTokenRouter);

//API that needs access token validation
// app.use(accessTokenValidator);

app.use('/users/logout', logoutRouter);
app.use('/property/areas/create', createNewPropertyAreaRouter);
app.use('/property/areas/read', readPropertyAreaRouter);
app.use('/property/areas/update', updatePropertyAreaRouter);
app.use('/property/areas/delete', deletePropertyAreaRouter);

app.use('/property/facility_names/create', createNewPropertyFacilityNameRouter);
app.use('/property/facility_names/read', readPropertyFacilityNameRouter);
app.use('/property/facility_names/update', updatePropertyFacilityNameRouter);
app.use('/property/facility_names/delete', deletePropertyFacilityNameRouter);

//TODO: Tambahkan middleware authorization sesuai role
app.use('/property/person_in_charges/create', createNewPropertyPersonInChargeRouter);
app.use('/property/person_in_charges/read', readPropertyPersonInChargeRouter);
app.use('/property/person_in_charges/update', updatePropertyPersonInChargeRouter);
app.use('/property/person_in_charges/delete', deletePropertyPersonInChargeRouter);
app.use('/property/person_in_charges/restore', restorePropertyPersonInChargeRouter);

app.use('/apartment/payment_terms/create', createNewApartmentPaymentTermRouter);
app.use('/apartment/payment_terms/read', readApartmentPaymentTermRouter);
app.use('/apartment/payment_terms/update', updateApartmentPaymentTermRouter);
app.use('/apartment/payment_terms/delete', deleteApartmentPaymentTermRouter);

app.use('/apartment/iconic_places/create', createNewApartmentIconicPlaceRouter);
app.use('/apartment/iconic_places/read', readApartmentIconicPlaceRouter);
app.use('/apartment/iconic_places/update', updateApartmentIconicPlaceRouter);
app.use('/apartment/iconic_places/delete', deleteApartmentIconicPlaceRouter);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

app.use(errorHandler);

main();