const express = require("express");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const methodOverride = require("method-override");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// 🔧 Middleware setup
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 🛠️ MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL successfully!");
  }
});

// 🏠 Homepage route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🗺️ Sitemap route
app.get("/sitemap.xml", async (req, res) => {
  const links = [
    { url: "/", changefreq: "monthly", priority: 1.0 },
    { url: "/about.html", changefreq: "monthly", priority: 0.8 },
  ];
  const stream = new SitemapStream({
    hostname: "https://kanhaikumarsah.com.np",
  });
  res.header("Content-Type", "application/xml");
  const sitemap = await streamToPromise(Readable.from(links).pipe(stream));
  res.send(sitemap.toString());
});

// 📩 Form submission route
app.post("/submit-user", (req, res) => {
  const { username, email, subject, message } = req.body;
  const id = faker.string.uuid();

  if (!username || !email || !subject || !message) {
    return res.status(400).send("❌ Missing required fields");
  }

  const query =
    "INSERT INTO customer (id, username, email, subject, message) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, [id, username, email, subject, message], (err) => {
    if (err) {
      console.error("❌ Error inserting user:", err.message);
      return res.status(500).send("Server error");
    }
    res.status(200).send("✅ Your message has been submitted successfully!");
  });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
