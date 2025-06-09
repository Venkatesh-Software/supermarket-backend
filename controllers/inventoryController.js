const Item = require("../models/Item");

const addItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json({ message: "Item added", id: item._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item updated", item });
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

const getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.q;

    let filter = {};
    if (searchQuery) {
      filter.name = { $regex: searchQuery, $options: "i" };
    }

    // Debug log
    // console.log("Filter being used:", filter);

    const items = await Item.find(filter, { name: 1, mrp: 1, sp1: 1, stock: 1 }).skip(skip).limit(limit);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

module.exports = { addItem, updateItem, getItems, getItemById };