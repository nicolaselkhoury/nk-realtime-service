module.exports.routes = {
	'GET /health': { action: 'health' },
	'GET /socket/health': { action: 'socket-health' },

	'POST /follow': {action: 'follow'},
	'POST /unfollow': {action: 'unfollow'},


};
