const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsersByNick = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const nickname = req.params.nickname;
  const db = client.db("myFinalProject");
  try {
    await db
      .collection("users")
      .findOne({ nickname: nickname }, (err, result) => {
        result
          ? res.status(200).json({ data: result })
          : res.status(404).json({ status: 404, nickname, data: "Not Found" });
        client.close();
      });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getUsersByNick };
