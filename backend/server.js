const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const noteRoutes = require("./routes/noteRoutes");

app.use("/", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
const cors = require("cors");

app.use(cors({
  origin: "https://notes-app-nu-ochre.vercel.app"
}));