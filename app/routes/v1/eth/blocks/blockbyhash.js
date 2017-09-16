module.exports = function(req, res) {
    req.app.locals.log.info("/v1/eth/blocks/blockbyhash function"); 
    res.json(req['block']); 
}; 
