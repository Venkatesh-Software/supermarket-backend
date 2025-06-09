const express = require("express");
const router = express.Router();
const { 
  createBill, 
  getBills, 
  getBillById, 
  deleteBillById, 
  deleteAllBills, 
  deleteItemById 
} = require("../controllers/billController");

router.post("/create", createBill);
router.get("/", getBills);
router.get("/:billId", getBillById);
router.delete("/:billId", deleteBillById);
router.delete("/", deleteAllBills);

// For deleting item by id (optional: you may want to move this to inventory routes)
router.delete("/item/:itemId", deleteItemById);

module.exports = router;