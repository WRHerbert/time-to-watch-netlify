axios = require("axios")

exports.handler = async (event, context) => {
  try {
    const response = await axios.get("https://api.trakt.tv/movies/trending",
      { 
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "trakt-api-key": process.env.TTW_TRAKT_CLIENT_ID,
          "trakt-api-version": 2,
        } 
      })
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: response.data })
    }

  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}