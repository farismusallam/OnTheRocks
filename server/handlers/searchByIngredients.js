const request = require("request");

require("dotenv").config();
const { COCKTAIL_API_KEY } = process.env;

const searchByIngredients = (req, res) => {
  const { ingredients } = req.params;
  request(
    {
      url: `http://www.thecocktaildb.com/api/json/v2/${COCKTAIL_API_KEY}/filter.php?i=${ingredients}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: "Not Found" });
      }
      res.json(JSON.parse(body));
    }
  );
};

module.exports = { searchByIngredients };
