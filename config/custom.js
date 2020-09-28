module.exports.custom = {
	responseTypes: {
		logicalError: {
			description: 'This response type informs the client that there was an error, specifically handled by the respective microservice',
			responseType: 'logicalError',
			statusCode: 400
		},
		unauthorized: {
			description: 'This response type informs the client that the access to the resource is forbidden due to an invalid token',
			responseType: 'logicalError',
			statusCode: 401
		},
		forbidden: {
			description: 'This response type informs the client that an unauthorized action has been requested',
			responseType: 'forbidden',
			statusCode: 403
		},
		serverError: {
			description: 'This response type informs the client that an unexpected error has occurred in the catch block of the action',
			responseType: 'serverError',
			statusCode: 500
		}
	},
};
