const request = require("request");

const getCocktailById = (req, res) => {
  const { id } = req.params;
  request(
    {
      url: `http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: "Not Found" });
      }
      res.json(JSON.parse(body));
    }
  );
};

module.exports = { getCocktailById };
