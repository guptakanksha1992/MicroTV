const router = require('express').Router(); 

// define our landing page 
router.get('/', function (req, res) {
    // get access to global logging variable
    req.app.locals.log.info('main / function '); 
    res.status(200).send("Welcome to Chain Intelligence's API!");
});

// include the v1 routing subsystem
router.use('/v1', require('./v1'));  

module.exports = router; 

