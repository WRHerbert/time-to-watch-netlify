axios = require("axios")

exports.handler = async (event, context) => {
  try {
    const code = event.queryStringParameters.code

    const response = await axios.post("https://api.trakt.tv/oauth/token",
      {
        "code": code,
        "client_id": process.env.TTW_TRAKT_CLIENT_ID,
        "client_secret": process.env.TTW_TRAKT_CLIENT_SECRET,
        "redirect_uri": process.env.URL + "/.netlify/functions/auth-callback",
        "grant_type": "authorization_code"
      },
      { 
        headers: {
          "Content-Type": "application/json",
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
