const db = require("../db");
const Product = require("../models/Product");

(async () => {
  try {
    await db.connect();
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.create({
        name: "Sample Product",
        price: 19.99,
        description: "A sample product (seeded)",
      });
      console.log("Seeded sample product");
    } else {
      console.log("Products already exist, skipping seed");
    }
    await db.mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
