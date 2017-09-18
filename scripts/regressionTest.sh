# kill the spawned server (cannot due this to return status of npm )
# TODO: look into sigint
pkill node

# launch server in bg
### PERIODICALLY UPDATE THIS TO REFLECT CONTENTS OF devRun.sh ###
# enable development mode in config.js
sed -i 's/.*dev.*/        dev : false,/' ./app/config.js
# start server with nodemon running
node app/server.js & # & is needed
#### END 

	# Note: 
	# can't use below line b/c it spawns a new shell, which creates IPC communication issues
	#npm run dev &

# get rid of weird input of server
sleep 5
# execute regression tests
./node_modules/newman/bin/newman.js run --color Chain\ Intelligence.postman_collection.json

