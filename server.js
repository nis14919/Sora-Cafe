const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // Serve HTML, CSS, JS, Images, etc.

const ordersFile = path.join(__dirname, "orders.json");

// ✅ Get all orders (Admin Panel)
app.get("/orders", (req, res) => {
  if (!fs.existsSync(ordersFile)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(ordersFile, "utf-8") || "[]");
  res.json(data);
});

// ✅ Add new order (Customer places order)
app.post("/order", (req, res) => {
  const order = req.body;
  let orders = [];
  if (fs.existsSync(ordersFile)) {
    orders = JSON.parse(fs.readFileSync(ordersFile, "utf-8") || "[]");
  }
  orders.push({ ...order, time: new Date().toISOString() });
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
  res.json({ message: "Order received" });
});

// ✅ Delete order (Admin marks completed)
app.delete("/delete-order/:index", (req, res) => {
  if (!fs.existsSync(ordersFile)) return res.sendStatus(200);
  const orders = JSON.parse(fs.readFileSync(ordersFile, "utf-8") || "[]");
  orders.splice(req.params.index, 1);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
  res.json({ message: "Order deleted" });
});

// ✅ Clear all orders
app.delete("/clear-orders", (req, res) => {
  fs.writeFileSync(ordersFile, "[]");
  res.json({ message: "All orders cleared" });
});

// ✅ Serve main and admin pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "order.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "admin.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
