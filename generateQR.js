// ✅ QR Code Generator for Café Tables (simple clean version)
// Author: Harshil Café System

const QRCode = require("qrcode"); // npm install qrcode

// 🪑 Total tables in your café
const totalTables = 10;

// 🌐 Your live deployed URL (no trailing slash)
const baseURL = "https://sora-cafe.onrender.com";

console.log("🚀 Generating QR codes...");

(async () => {
  for (let table = 1; table <= totalTables; table++) {
    const url = `${baseURL}/order.html?table=${table}`;
    const fileName = `qr_table_${table}.png`;

    try {
      await QRCode.toFile(fileName, url, {
        color: {
          dark: "#000000", // QR dots color
          light: "#ffffff", // background color
        },
        width: 400,
        margin: 3,
      });
      console.log(`✅ QR code generated for Table ${table} (${url})`);
    } catch (err) {
      console.error(`❌ Error generating QR for Table ${table}:`, err);
    }
  }

  console.log("\n🎉 All 10 QR codes created successfully!");
  console.log("📁 Check your folder for files: qr_table_1.png → qr_table_10.png");
})();
