install:
	npm ci --prefix ./corserver
	npm ci --legacy-peer-deps

start-server:
	cd corserver
	node ./corserver/server.js

start-app:
	npm run dev

run: start-server start-app

start:
	make -j 2 run
