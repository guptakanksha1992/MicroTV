pkill node
# enable development mode in config.js
sed -i 's/.*dev.*/        dev : true,/' ./app/config.js
# start server with nodemon running
nodemon app/server.js
