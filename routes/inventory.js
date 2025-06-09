const express = require("express");
const router = express.Router();
const {
  addItem,
  updateItem,
  getItems,
  getItemById
} = require("../controllers/inventoryController");
const { deleteItemById } = require("../controllers/billController");

router.post("/add", addItem);
router.patch("/:itemId", updateItem);
router.get("/", getItems);
router.get("/:itemId", getItemById);
router.delete("/:itemId", deleteItemById);

module.exports = router;