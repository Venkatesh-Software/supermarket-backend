// filepath: f:\supermarket-backend-v3\api\index.js
const express = require("express");
const { createServer } = require("vercel-express");
const app = require("../server"); // or require your express app directly

module.exports = createServer(app);