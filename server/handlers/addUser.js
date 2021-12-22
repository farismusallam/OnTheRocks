const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("myFinalProject");

    await db.collection("users").find().toArray();
    const user = await db.collection("users").findOne({ _id: req.body._id });
    console.log("user", user);
    if (user) {
      console.log("User already exists");
      res.status(200).json({ user });
    } else {
      await db.collection("users").insertOne(req.body);
      console.log("user", user);
      res.status(201).json({ user });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = { addUser };
