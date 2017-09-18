module.exports = function(req, res) {
    req.app.locals.log.info("/v1/eth/transactions/transactionbyhash/ function"); 
    res.send(req['transaction']); 
}; 
