const router = require('express').Router(); 
const utils = require('../../../../utils'); 

router.get('/', function(req, res) {
    req.app.locals.log.debug("/v1/eth/transactions function"); 
    // TODO: de-hardcode v1
    res.status(200).json( { "system": "Ethereum Transactions System" } ); 
});

router.param('transactionHash', utils.custom.findObjectByFilter('transaction', 'hash', false)); 
router.param('transactionHash', utils.custom.processSubdata('transaction')); 
router.get('/transactionbyhash/:transactionHash', require('./transactionbyhash')); 


// acquire the block
router.param('blockHash', utils.custom.findObjectByFilter('block', 'hash', false)); 
// get the transaction in the block at the specified index
router.param('blockHash', require('./indexblock')); 
    
// filter it if the user requests so
router.param('blockHash', utils.custom.processSubdata('transaction')); 
router.get('/transactioninblockbyhash/:blockHash/atIndex/:index', require('./transactioninblockbyhash')); 

// acquire the block
router.param('blockNumber', utils.custom.findObjectByFilter('block', 'number', true)); 
// get the transaction in the block at the specified index
router.param('blockNumber', require('./indexblock')); 
    
// filter it if the user requests so
router.param('blockNumber', utils.custom.processSubdata('transaction')); 
router.get('/transactioninblockbynumber/:blockNumber/atIndex/:index', require('./transactioninblockbynumber')); 

module.exports = router; 
