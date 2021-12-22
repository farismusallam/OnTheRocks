const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getDrinkRating = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const _id = req.params._id;
  const db = client.db("myFinalProject");
  console.log("id", _id);
  try {
    await db.collection("drinks").findOne({ _id: _id }, (err, result) => {
      result
        ? res.status(200).json({ data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getDrinkRating };
