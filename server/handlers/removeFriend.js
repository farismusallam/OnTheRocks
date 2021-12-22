const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const removeFriend = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("myFinalProject");

    const user = await db.collection("users").findOne({ _id: req.body._id });
    if (user) {
      await db.collection("users").updateOne(
        {
          _id: req.body._id,
        },
        {
          $pull: {
            friends: {
              friendId: req.body.friendId,
              picture: req.body.picture,
              nickname: req.body.nickname,
            },
          },
        }
      );

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

module.exports = { removeFriend };
