// ✅ QR Code Generator for Café Tables
// Author: Harshil Cafe System

const QRCode = require("qrcode"); // npm install qrcode

// 🪑 Total tables in your café
const totalTables = 10; // 👈 only 10 tables as you wanted

// 🌐 Your live deployed site URL
const baseURL = "https://sora-cafe.onrender.com"; // 👈 update if domain changes

console.log("🚀 Generating QR codes...\n");

(async () => {
  for (let table = 1; table <= totalTables; table++) {
    // 👇 Each QR goes directly to that table’s order page
    const url = `${baseURL}/order.html?table=${table}`;
    const fileName = `qr_table_${table}.png`;

    try {
      await QRCode.toFile(fileName, url, {
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        width: 400,
        margin: 3,
      });
      console.log(`✅ QR code generated for Table ${table}: ${url}`);
    } catch (err) {
      console.error(`❌ Error generating QR for Table ${table}:`, err);
    }
  }

  console.log("\n🎉 All QR codes created successfully!");
  console.log("📁 Check your project folder for 'qr_table_1.png' to 'qr_table_10.png'");
})();
