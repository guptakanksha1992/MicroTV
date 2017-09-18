module.exports = function(req, res) {
    req.app.locals.log.info("/v1/status function"); 
    res.json({ message: 'API is functional!' });
};


