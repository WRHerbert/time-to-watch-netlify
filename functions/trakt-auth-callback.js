axios = require("axios")

exports.handler = async (event, context) => {
  try {
    const code = event.queryStringParameters.code

    const response = await axios.post("https://api.trakt.tv/oauth/token",
      {
        "code": code,
        "client_id": process.env.TTW_TRAKT_CLIENT_ID,
        "client_secret": process.env.TTW_TRAKT_CLIENT_SECRET,
        "redirect_uri": process.env.URL + "/.netlify/functions/trakt-auth-callback",
        "grant_type": "authorization_code"
      },
      { 
        headers: {
          "Content-Type": "application/json",
        } 
      })

    const location = '/'
    const accessToken = 
      `trakt_access_token=${response.data.access_token};` +
      `Max-Age=${response.data.expires_in};` +
      `Secure;` +
      `HttpOnly;` +
      `SameSite=Strict;`

    return {
      statusCode: 302,
      headers: {
        Location: location,
        "Set-Cookie": accessToken
      }
    }

  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
