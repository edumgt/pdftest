const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB 연결
mongoose
  .connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model 정의
const ShippingPortSchema = new mongoose.Schema({
  country: String,
  port: String,
  lat: Number,
  lon: Number,
});
const ShipSchema = new mongoose.Schema({
  name: String,
  status: String,
  lat: Number,
  lon: Number,
});

const ShippingPort = mongoose.model("shipping", ShippingPortSchema, "shipping"); // 기존 컬렉션 매핑
const Ship = mongoose.model("ships", ShipSchema, "ships");

// ✅ API Routes

// 1. 모든 항구 정보 조회
app.get("/api/ports", async (req, res) => {
  try {
    const ports = await ShippingPort.find({});
    res.json(ports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. 모든 선박 정보 조회
app.get("/api/ships", async (req, res) => {
  try {
    const ships = await Ship.find({});
    res.json(ships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. 특정 국가의 항구 조회
app.get("/api/ports/:country", async (req, res) => {
  try {
    const ports = await ShippingPort.find({ country: req.params.country });
    res.json(ports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. 특정 배 정보 조회
app.get("/api/ship/:name", async (req, res) => {
  try {
    const ship = await Ship.findOne({ name: req.params.name });
    if (!ship) return res.status(404).json({ error: "Ship not found" });
    res.json(ship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
