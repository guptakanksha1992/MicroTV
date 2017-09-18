module.exports = function(req, res) {
    req.app.locals.log.info("/v1/eth/transactions/transactioninblockbynumber/ function"); 
    res.json(req['transaction']); 
}; 
