const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require('path');

const { accessTokenValidator, errorHandler, getUsername } = require("./middleware");

const {
  registerRouter,
  loginRouter,
  refreshTokenRouter,
  accessTokenValidatorRouter,
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
  createNewPropertyPaymentTermRouter,
  readPropertyPaymentTermRouter,
  updatePropertyPaymentTermRouter,
  deletePropertyPaymentTermRouter,
} = require("./controllers/property/payment_terms");

const {
  createNewPropertyIconicPlaceRouter,
  readPropertyIconicPlaceRouter,
  updatePropertyIconicPlaceRouter,
  deletePropertyIconicPlaceRouter,
} = require("./controllers/property/iconic_places");

const {
  createNewApartmentRouter,
  readApartmentRouter,
  updateApartmentRouter,
  deleteApartmentRouter,
  restoreApartmentRouter,
} = require("./controllers/apartment/apartments")

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://na-database.vercel.app',
    new RegExp('https:\/\/fe-na-database-.*-xploratech\.vercel\.app'),
    'https://fe-na-database-k1czrpt89-xploratech.vercel.app',
    'https://na-database-fwkv8xvhn-xploratech.vercel.app',
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
app.use('/users/access_token', accessTokenValidatorRouter);

//API that needs access token validation
app.use(accessTokenValidator);
app.use('/static', express.static(path.join(__dirname, 'assets')));

app.use('/users/logout', logoutRouter);
app.use('/property/areas/create', createNewPropertyAreaRouter);
app.use('/property/areas/read', readPropertyAreaRouter);
app.use('/property/areas/update', updatePropertyAreaRouter);
app.use('/property/areas/delete', deletePropertyAreaRouter);

app.use('/property/facility_names/create', createNewPropertyFacilityNameRouter);
app.use('/property/facility_names/read', readPropertyFacilityNameRouter);
app.use('/property/facility_names/update', updatePropertyFacilityNameRouter);
app.use('/property/facility_names/delete', deletePropertyFacilityNameRouter);

app.use('/property/iconic_places/create', createNewPropertyIconicPlaceRouter);
app.use('/property/iconic_places/read', readPropertyIconicPlaceRouter);
app.use('/property/iconic_places/update', updatePropertyIconicPlaceRouter);
app.use('/property/iconic_places/delete', deletePropertyIconicPlaceRouter);

//TODO: Tambahkan middleware authorization sesuai role
app.use('/property/person_in_charges/create', createNewPropertyPersonInChargeRouter);
app.use('/property/person_in_charges/read', readPropertyPersonInChargeRouter);
app.use('/property/person_in_charges/update', updatePropertyPersonInChargeRouter);
app.use('/property/person_in_charges/delete', deletePropertyPersonInChargeRouter);
app.use('/property/person_in_charges/restore', restorePropertyPersonInChargeRouter);

app.use('/property/payment_terms/create', createNewPropertyPaymentTermRouter);
app.use('/property/payment_terms/read', readPropertyPaymentTermRouter);
app.use('/property/payment_terms/update', updatePropertyPaymentTermRouter);
app.use('/property/payment_terms/delete', deletePropertyPaymentTermRouter);

app.use(getUsername);

app.use('/apartment/create', createNewApartmentRouter);
app.use('/apartment/read', readApartmentRouter);
app.use('/apartment/update', updateApartmentRouter);
app.use('/apartment/delete', deleteApartmentRouter);
app.use('/apartment/restore', restoreApartmentRouter);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

app.use(errorHandler);

main();