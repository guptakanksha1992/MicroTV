module.exports = function(req, res) {
    req.app.locals.log.info("/v1/eth/transactions/transactioninblockbyhash/ function"); 
    res.json(req['transaction']); 
}; 
