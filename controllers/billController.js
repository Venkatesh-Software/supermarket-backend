const Bill = require("../models/Bill");
const Item = require("../models/Item");

const createBill = async (req, res) => {
  try {
    const billData = req.body;
    const items = billData.items || [];
    const processedItems = [];

    // Use session for atomicity
    const session = await Item.startSession();
    session.startTransaction();

    try {
      for (const item of items) {
        if (item.barcode) {
          // Find item in inventory
          const inventoryItem = await Item.findOne({ barcode: item.barcode }).session(session);
          if (!inventoryItem) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: `Item with barcode ${item.barcode} not found in inventory` });
          }
          // Reduce stock
          if (inventoryItem.stock < item.quantity) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: `Insufficient stock for ${inventoryItem.name}` });
          }
          inventoryItem.stock -= item.quantity;
          await inventoryItem.save({ session });

          // Use inventory values for name/mrp/sp1/sp2/sp3 if not provided
          processedItems.push({
            barcode: inventoryItem.barcode,
            name: inventoryItem.name,
            mrp: inventoryItem.mrp,
            sp: inventoryItem.sp1,
            sp2: inventoryItem.sp2,
            sp3: inventoryItem.sp3,
            quantity: item.quantity
          });
        } else {
          // Allow item without barcode
          processedItems.push({
            barcode: "",
            name: item.name,
            mrp: item.mrp,
            sp: item.sp,
            sp2: item.sp2,
            sp3: item.sp3,
            quantity: item.quantity
          });
        }
      }

      // Set correct date/time (UTC)
      const newBill = new Bill({
        ...billData,
        items: processedItems,
        date: new Date()
      });
      await newBill.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({ message: "Bill created", id: newBill._id });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create bill" });
  }
};

const getBills = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const bills = await Bill.find({}, { customerName: 1, total: 1, totalSavings: 1, date: 1 }).sort({ date: -1 }).skip(skip).limit(limit);
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bills" });
  }
};

const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bill" });
  }
};

const deleteBillById = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.billId);
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json({ message: "Bill deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete bill" });
  }
};

const deleteAllBills = async (req, res) => {
  try {
    await Bill.deleteMany({});
    res.json({ message: "All bills deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all bills" });
  }
};

const deleteItemById = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

module.exports = { 
  createBill, 
  getBills, 
  getBillById, 
  deleteBillById, 
  deleteAllBills, 
  deleteItemById 
};