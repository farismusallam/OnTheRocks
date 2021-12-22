const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("myFinalProject");

  try {
    const users = await db.collection("users").find().toArray();

    const dataObj = {};
    users.forEach((user) => {
      dataObj[user._id] = user;
    });
    console.log("users", dataObj);

    users ? res.status(200).json({ users }) : res.status(404);

    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getUsers };
