const request = require("request");

const searchByName = (req, res) => {
  const { name } = req.params;
  request(
    {
      url: `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: "Not Found" });
      }
      res.json(JSON.parse(body));
    }
  );
};

module.exports = { searchByName };
