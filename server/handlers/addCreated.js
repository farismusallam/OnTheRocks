const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const addCreated = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("myFinalProject");

    const user = await db.collection("users").findOne({ _id: req.body._id });
    console.log("user", user);
    if (user) {
      await db.collection("users").updateOne(
        {
          _id: req.body._id,
        },
        {
          $addToSet: {
            created: {
              drinkName: req.body.name,
              drinkThumb: req.body.thumb,
              drinkIngredients: req.body.ingredients,
              drinkInstructions: req.body.instructions,
              drinkCategory: req.body.category,
              drinkId: uuidv4(),
            },
          },
        }
      );
      console.log("user", user);
      res.status(201).json({ user });
    } else {
      console.log("User does not exist");
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = { addCreated };
