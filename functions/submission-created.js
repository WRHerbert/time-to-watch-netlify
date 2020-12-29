exports.handler = function( event, context, callback ) {
	console.log( { event } );

	return {
		statusCode: 200,
		body: JSON.stringify( { message: 'Hello World' } )
	};
}
