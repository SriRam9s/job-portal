const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect("mongodb+srv://srirampalepu21:1234@cluster0.cjdp4hc.mongodb.net/jobportal")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// 👤 User Schema
const User = mongoose.model("User", {
  username: String,
  password: String
});

// 💼 Job Schema
const Job = mongoose.model("Job", {
  title: String,
  desc: String,
  applicants: [String]
});

// 🔐 Signup
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "Signup successful" });
});

// 🔐 Login
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) {
    res.json({ message: "Login success", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ➕ Post Job
app.post("/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

// 📄 Get Jobs
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// 📥 Apply Job
app.post("/apply/:id", async (req, res) => {
  await Job.findByIdAndUpdate(req.params.id, {
    $push: { applicants: "user" }
  });
  res.json({ message: "Applied successfully" });
});

// 🚀 Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});