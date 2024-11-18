const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const uri =  'mongodb+srv://theprithivraj:h1h2h3h4@prithiv.xaz8u.mongodb.net/';
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
const houseSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: String,
  image: String,
});

const House = mongoose.model("House", houseSchema);
app.get("/houses", async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch houses" });
  }
});
app.post("/houses", async (req, res) => {
  try {
    const house = new House(req.body);
    await house.save();
    res.status(201).json(house);
  } catch (err) {
    res.status(500).json({ error: "Failed to add house" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
