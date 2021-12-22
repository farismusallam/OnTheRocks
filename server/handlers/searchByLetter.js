const request = require("request");

const searchByLetter = (req, res) => {
  const { letter } = req.params;
  request(
    {
      url: `http://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: "Not Found" });
      }
      res.json(JSON.parse(body));
    }
  );
};

module.exports = { searchByLetter };
