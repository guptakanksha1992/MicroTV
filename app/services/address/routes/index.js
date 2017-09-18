const router = require('express').Router(); 

// define our landing page 
router.get('/', function (req, res) {
    // get access to global logging variable
    req.app.locals.log.info('main /address function '); 
    res.status(200).send("Welcome to Address API");
});

module.exports = router; 
