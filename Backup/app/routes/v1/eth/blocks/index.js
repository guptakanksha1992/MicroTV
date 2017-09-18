const router = require('express').Router(); 
const utils = require('../../../../utils'); 

router.get('/', function(req, res) {
    req.app.locals.log.info("/v1/eth/blocks function"); 
    res.status(200).json( { "blocks" : "Ethereum Blocks System" } ); 
});

// TODO: Security vulnerability if they discover that our _id is simply the unique ID block..., but even then, information disclosed is publicly-accessible
router.get('/current', require('./current')); 

// AS: generalized design leveraging closure property of javascript
// always pass in the type of the object first (could be block or transaction etc)
// for findObjectByFilter, 2nd argument is the name of the subdata to query for in the database and the 3rd argument is if the subdata is numeric or not
router.param('blockHash', utils.custom.findObjectByFilter('block', 'hash', false)); 
router.param('blockHash', utils.custom.processSubdata('block')); 
router.get('/blockbyhash/:blockHash', require('./blockbyhash')); 


// TODO: create a mapping b/t internal names and public facing variable names
router.param('blockNum', utils.custom.findObjectByFilter('block', 'number', true)); 
router.param('blockNum', utils.custom.processSubdata('block')); 

router.get('/blockbynumber/:blockNum', require('./blockbynumber')); 

module.exports = router; 

