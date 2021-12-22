const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addDrink = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("myFinalProject");

    const drink = await db.collection("drinks").findOne({ _id: req.body._id });
    console.log("drink", drink);
    if (drink) {
      console.log("Drink already exists");
      res.status(200).json({ drink });
    } else {
      await db.collection("drinks").insertOne(req.body);
      console.log("drink", drink);
      res.status(201).json({ drink });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = { addDrink };
