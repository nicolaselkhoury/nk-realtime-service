  
module.exports = {

	friendlyName : `Unfollow User`,

	descriptions : `Unfollow User`,

	extendedDescription : `A user leaves the room of another user. Alerts all users that this user unfollowed the room.`,
	
	inputs : {
        username: {
            type: 'string',
            description: 'The username of the user unfollowing the room',
            required: true
        },
        room: {
            type: 'string',
            description: 'The room to be unfollowed',
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

        sails.log.info(`Controller ${FILE_PATH} -- Socket ID ${SOCKET_ID}: ${inputs.username} leaving room ${inputs.room}`);
        // Include the user in the room
        sails.sockets.leave(this.req, inputs.room, (error) => {
            if (error) {
                sails.log.error(`Controller ${FILE_PATH} -- Socket ID ${SOCKET_ID}: Error while leave the room`);
                return exits.serverError({status: 'serverError', data:`Error while attempting to remove ${inputs.username} from room ${inputs.room}`});
            }

            sails.log.info(`Controller ${FILE_PATH} -- Socket ID ${SOCKET_ID}: ${inputs.username} successfully left room ${inputs.room}`);
            // Broadcast to everyone in the room that a new follower has joined
            sails.sockets.broadcast(inputs.room, 'removed_follower_notification', `${inputs.username} has left room ${inputs.room}`);
            return exits.success({ status: "success", data: `${inputs.username} has left room ${inputs.room}`});
        });
	}
};