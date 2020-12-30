axios = require( 'axios' );

exports.handler = async ( event, context ) => {
	try {
// PoC: use runtime minutes as limit to the number of records returned
		const runtime = event.body;
		const response = await axios.get( 'https://api.trakt.tv/movies/trending?limit=' + runtime,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"trakt-api-key": process.env.TTW_TRAKT_CLIENT_ID,
					"trakt-api-version": 2
				}
			}
		)

		return {
			statusCode: 200,
			body: JSON.stringify( { records: response.data } )
		}
	} catch ( error ) {
		console.log( error );

		return {
			statusCode: 500,
			body: JSON.stringify( { message: error.message } )
		}
	}
}
