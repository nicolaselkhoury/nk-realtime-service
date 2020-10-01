  
module.exports = {

	friendlyName : `Message Broadcast`,

	descriptions : `Broadcasts a message to one or more rooms, or to all the sockets connected to the server`,

	extendedDescription : `Broadcasts a message to one or more rooms, or to all the sockets connected to the server`,
	
	inputs : {
        message: {
            type: 'string',
            description: 'The message to be broadcasted',
            required: true
        },
        room: {
            type: 'ref',
            description: 'An array of rooms to whom the message should be broadcasted. If no input is provided, broadcast to everyone on the server.',
            required: false,
            defaultsTo: "all"
        }
    },     

	exits : sails.config.custom.responseTypes,

	fn : async function(inputs, exits) {
        const FILE_PATH = __filename.split('controllers')[1];
        const REQUEST_ID = this.req.headers.requestid;

        console.log(this.req.headers)
        sails.log.info(`Controller ${FILE_PATH} -- Request ID ${REQUEST_ID}: Starting...`);

		if (this.req.isSocket) 
            return exits.logicalError({status: "logicalError", data: "The request must not be a Socket request"});

        if(inputs.room === "all") {
            sails.log.info(`Controller ${FILE_PATH} -- Request ID ${REQUEST_ID}: Broadcasting a message to all the clients connected to the server.`);
            sails.sockets.blast("public_notification", inputs.message);
            sails.log.info(`Controller ${FILE_PATH} -- Request ID ${REQUEST_ID}: Successfully broadcasted a message to all the clients connected to the server.`);

            return exits.success({ status: "success", data: `Successfully broadcasted a message to all the clients.`});
        }
        else {
            sails.log.info(`Controller ${FILE_PATH} -- Request ID ${REQUEST_ID}: Broadcasting a message to room(s) ${inputs.room}.`);
            sails.sockets.broadcast(inputs.room, "personal_notification", inputs.message);
            sails.log.info(`Controller ${FILE_PATH} -- Request ID ${REQUEST_ID}: Successfully broadcasted a message to room(s) ${inputs.room}.`);

            return exits.success({ status: "success", data: `Successfully broadcasted a message to room(s) ${inputs.room}.`});
        }
	}
};