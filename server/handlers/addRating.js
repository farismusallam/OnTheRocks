const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addRating = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("myFinalProject");

    const ratingNumber = Number(req.body.rating);

    const user = await db.collection("users").findOne({ _id: req.body._id });
    const drink = await db
      .collection("drinks")
      .findOne({ _id: req.body.idDrink });
    if (user) {
      await db.collection("users").updateOne(
        {
          _id: req.body._id,
        },
        {
          $push: {
            rated: {
              idDrink: req.body.idDrink,
              rating: ratingNumber,
            },
          },
        }
      );
      await db.collection("drinks").updateOne(
        {
          _id: req.body.idDrink,
        },
        {
          $push: {
            drinkRating: ratingNumber,
          },
        }
      );

      res.status(201).json({ user, drink });
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

module.exports = { addRating };
