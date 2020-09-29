  
module.exports = {

	friendlyName : `Follow User`,

	descriptions : `Follow User`,

	extendedDescription : `A user joins the room of another user. Alerts all users that this user followed the room.`,
	
	inputs : {
        username: {
            type: 'string',
            description: 'The username of the user',
            required: true
        },
        room: {
            type: 'string',
            description: 'The username of the followed user',
            required: true
        }
    },     

	exits : sails.config.custom.responseTypes,

	fn : async function(inputs, exits) {
        const FILE_PATH = __filename.split('controllers')[1];
        const SOCKET_ID = sails.sockets.getId(this.req);

        sails.log.info(`Controller ${FILE_PATH} -- Socket ID ${SOCKET_ID}: Starting...`);

		if (!this.req.isSocket) 
            return exits.logicalError({status: "logicalError", data: "The request must be a Socket request"});

        sails.log.info(`Controller ${FILE_PATH} -- Socket ID ${SOCKET_ID}: ${inputs.username} joining room ${inputs.room}`);
        // Include the user in the room
        sails.sockets.join(this.req, inputs.room, (error) => {
            if (error) {
                sails.log.error(`Controller ${FILE_PATH} -- Socket ID ${SOCKET_ID}: Error while joining the room`);
                return exits.serverError({status: 'serverError', data:`Error while attempting to include ${inputs.username} in room ${inputs.room}`});
            }

            sails.log.info(`Controller ${FILE_PATH} -- Socket ID ${SOCKET_ID}: ${inputs.username} successfully joined room ${inputs.room}`);
            // Broadcast to everyone in the room that a new follower has joined
            sails.sockets.broadcast(sails.sockets.getId(this.req), 'personal_notification', `You have joined room ${inputs.room}`);
            sails.sockets.broadcast(inputs.room, 'new_follower_notification', `${inputs.username} has joined room ${inputs.room}`, this.req);
            return exits.success({ status: "success", data: `${inputs.username} has joined room ${inputs.room}`});
        });
	}
};