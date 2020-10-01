module.exports.routes = {
	'GET /health': { action: 'health' },
	'GET /socket/health': { action: 'socket-health' },

	'POST /follow': {action: 'follow'},
	'POST /unfollow': {action: 'unfollow'},
	'POST /message/broadcast': {action: 'message-broadcaster'}


};
