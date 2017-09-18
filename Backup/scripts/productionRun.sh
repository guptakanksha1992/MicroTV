pkill node 
# enable production mode in config.js
sed -i 's/.*dev.*/        dev : false,/' ./app/config.js
# start server
node app/server.js
