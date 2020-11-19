exports.handler = async (event, context) => {
  try {
    const location =
      "https://api.trakt.tv/oauth/authorize" +
      "?response_type=code" +
      "&client_id=" + process.env.TTW_TRAKT_CLIENT_ID +
      "&redirect_uri=" + process.env.URL + "/.netlify/functions/trakt-auth-callback"

    return {
      statusCode: 302,
      headers: {
        Location: location,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
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
