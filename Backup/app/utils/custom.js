const config      = require("../config"); 
// get a property from an object if it exists and return null if property does not
module.exports.getObjectMetadata = function getObjectMetadata(metadata, object) {
    return object.hasOwnProperty(metadata)? object[metadata]: null;
}; 

module.exports.findObjectByFilter = (type, filter, isNumeric) => {
    return (req, res, next, value) => {
	// block or transaction or account == type
	// blocks or transaction or account == typePlural
        req.app.locals.log.info("inside findObjectByFilter"); 
	const typePlural = `${type}s`; 
	filterObject = {}; 

	if (isNumeric) {
	    if (isNaN(value)) {
		req.app.locals.log.debug("user did not pass in a valid number"); 
		res.status(404).json( {"error" : `Error processing ${type} object` } ); 
                return; 
	    }
	    // coerce to numeric if the value is a numeric one
	    filterObject[filter] = value * 1; 
	} else {
	    filterObject[filter] = value; 
	}

	// essentially this function will check if the requested object (via the filter) exists in the database ...
	// if it does, store it and normally process it
	// if it does not, skip the actual endpoint handler since the object does not exist
	req.app.locals.db.collection(typePlural).findOne( filterObject, function(err, item) {
		if (err) { 
		    req.app.locals.log.debug("err in findObjectByFilter"); 
		    res.status(404).json( {"error" : `Error processing ${type} object` } ); 
		} else if (!item) { 
		    req.app.locals.log.debug("null object"); 
		res.status(404).json( {"error" : `Unable to find ${type} object` } ); 
		} else {
    		    req.app.locals.log.info("successful object"); 
		    req[type] = item; 
		    next(); 
		}
	}); 
    }; 

};


module.exports.processSubdata = (type) => {
    return (req, res, next, value) => {
        // to ensure consistency, we make the end result of this chained functions be accessible by the req[type] parameter, where type = block or transaction
        // actual endpoint is responsible for sending final data out
	// send the entire object if not request a single metadata field
        req.app.locals.log.info("inside processSubData"); 
	if (Object.keys(req.query).length == 0) {
	    next(); 
	} else if (Object.keys(req.query).length == 1) {
            var item = req[type]; 
	    var value = module.exports.getObjectMetadata(req.query.subdata, item); 
	    if (!value) {  
		res.json({"error": "Could not find requested sub-data"}); 
		return; 
	    }
	    var temp = {}; 
	    temp[req.query.subdata] = value; 
            req[type] = temp; 
	    next(); 
	} else {
	    res.status(404).json( {"message": "We currently only support one subdata field" } ); 
	}
    }; 

};
