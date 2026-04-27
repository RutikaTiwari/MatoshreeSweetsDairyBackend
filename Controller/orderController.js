const Order = require("../Model/order");

// ADD ORDER
exports.createOrder = async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const { name, phone, orderType, message } = req.body;

    if (!name || !phone || !orderType) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const order = await Order.create({
      name,
      phone,
      orderType,
      message
    });

    res.status(201).json({
      message: "Order booked successfully",
      order
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});