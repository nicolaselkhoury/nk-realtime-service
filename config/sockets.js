	/**
	 * WebSocket Server Settings
	 * (sails.config.sockets)
	 *
	 * Use the settings below to configure realtime functionality in your app.
	 * (for additional recommended settings, see `config/env/production.js`)
	 *
	 * For all available options, see:
	 * https://sailsjs.com/config/sockets
	 */

module.exports.sockets = {

	transports: [ 'websocket' ],
	adapter: '@sailshq/socket.io-redis',
	host: '127.0.0.1',
	port: 6379,
	db: 3,

	/***************************************************************************
	 *                                                                          *
	 * `beforeConnect`                                                          *
	 *                                                                          *
	 * This custom beforeConnect function will be run each time BEFORE a new    *
	 * socket is allowed to connect, when the initial socket.io handshake is    *
	 * performed with the server.                                               *
	 *                                                                          *
	 * https://sailsjs.com/config/sockets#?beforeconnect                        *
	 *                                                                          *
	 ***************************************************************************/


	beforeConnect: async (handshake, proceed) => {
		const jwt = require("jsonwebtoken");
		const FILE_PATH = __filename.split('config')[1];
        sails.log.info(`File ${FILE_PATH} -- Verifying the JWT token of a new socket connection`);

		let token = handshake._query.token;

		if(!token) {
			sails.log.warn(`File ${FILE_PATH} -- There exists no token. Rejecting the connection.`);
			return proceed({status: "logicalError", message: "Provide a JWT token to authenticate"}, false);
		}
		try {
			let data = jwt.verify(token, sails.config.custom.jwt.secret);
			sails.log.info(`File ${FILE_PATH} -- Successfully verified the JWT token and extracted the following:`);
			sails.log.info(`File ${FILE_PATH} -- ${data}`);
			return proceed(null, true);
		} catch (error) {
			sails.log.warn(`File ${FILE_PATH} -- Error while verifying the JWT token:`);
			sails.log.warn(`File ${FILE_PATH} -- ${error}`);
			return proceed({status: "logicalError", message: "Invalid JWT Token"}, false);
		}
	},


	/***************************************************************************
	 *                                                                          *
	 * `afterDisconnect`                                                        *
	 *                                                                          *
	 * This custom afterDisconnect function will be run each time a socket      *
	 * disconnects                                                              *
	 *                                                                          *
	 ***************************************************************************/

	// afterDisconnect: function(session, socket, done) {
	//
	//   // By default: do nothing.
	//   // (but always trigger the callback)
	//   return done();
	//
	// },


	/***************************************************************************
	 *                                                                          *
	 * Whether to expose a 'GET /__getcookie' route that sets an HTTP-only      *
	 * session cookie.                                                          *
	 *                                                                          *
	 ***************************************************************************/

	// grant3rdPartyCookie: true,


};
