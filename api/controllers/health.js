  
module.exports = {

	friendlyName : `Health api`,

	descriptions : `Health api`,

	extendedDescription : `This is a health check API. It is used to ensure that the service is up and running. Upon being called, the API returns a 200 response`,
	
	inputs : {},

	exits : sails.config.custom.responseTypes,

	fn : async function(inputs, exits) {

		if (this.req.isSocket) 
            return exits.logicalError({status: "error", data: "The request must not be a Socket request"});
		
        return exits.success({status: "success", data: "The realtime service is running"})
	}
};