const mongoose = require("mongoose");

async function connect(uri) {
  const mongoUri =
    uri || process.env.MONGODB_URI || "mongodb://localhost:27017/fits";
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connect, mongoose };
