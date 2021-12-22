const request = require("request");

const listOfCategories = (req, res) => {
  request(
    {
      url: "http://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: "Not Found" });
      }
      res.json(JSON.parse(body));
    }
  );
};

module.exports = { listOfCategories };
