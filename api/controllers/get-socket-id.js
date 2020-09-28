  
module.exports = {

	friendlyName : `Get Socket ID`,

	descriptions : `Returns the socket ID of a connection`,

	extendedDescription : `Returns the socket ID of a connection`,
	
	inputs : {},

	exits : sails.config.custom.responseTypes,

	fn : async function(inputs, exits) {

		if (!this.req.isSocket) 
            return exits.logicalError({status: "logicalError", data: "The request must be a Socket request"});
		
        return exits.success({status: "success", data: sails.sockets.getId(this.req)})
	}
};