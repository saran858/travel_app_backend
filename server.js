const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const hotelDataAddedToDBRouter = require("./routes/dataimport.router");
const categoryDataAddedToDBRouter = require("./routes/categoryimport.router");

const hotelRouter = require("./routes/hotel.router");
const categoryRouter = require("./routes/category.router");
const singleHotelRouter = require("./routes/singlehotel.router"); // Corrected spelling
const authRouter = require("./routes/auth.router");
const wishlistRouter = require("./routes/wishlist.router");

const connectDB = require("./config/dbconfig");

const app = express();

const corsOptions = {
  origin: "*", // or your frontend domain
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());
connectDB();

const PORT = 3500;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or your frontend domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Geeks");
});

app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working" });
});

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/category", categoryRouter);
app.use("/api/singlehotel", singleHotelRouter); // Changed route to avoid conflict
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || PORT, () => {
    console.log("Server is Up and Running");
  });
});
