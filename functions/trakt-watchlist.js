axios = require("axios")

exports.handler = async (event, context) => {
  try {
    const authorization = event.headers["authorization"]
    if (!authorization) {
      return {
        statusCode: 401,
        body: JSON.stringify({ msg: "'authorization' header required" })
      }
    }

    const response = await axios.get("https://api.trakt.tv/users/me/watchlist?extended=full",
      { 
        headers: {
          "Content-Type": "application/json",
          "trakt-api-key": process.env.TTW_TRAKT_CLIENT_ID,
          "trakt-api-version": 2,
          "Authorization": authorization
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