const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const removeCreated = async (req, res) => {
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
          $pull: {
            created: {
              drinkName: req.body.drinkName,
              drinkThumb: req.body.drinkThumb,
              drinkIngredients: req.body.drinkIngredients,
              drinkInstructions: req.body.drinkInstructions,
              drinkCategory: req.body.drinkCategory,
              drinkId: req.body.drinkId,
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

module.exports = { removeCreated };
