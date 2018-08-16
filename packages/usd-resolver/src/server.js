const WebSocket = require('ws');

const Cache = require('./cacheUtils');

const wss = new WebSocket.Server({
    host: "0.0.0.0",
    port: 3005,
});

//load in the inital data
Cache.initCache().then(() => {

    //set up the websocket paths
    wss.on('connection', (ws) => {

        //start the cache updates only when a client connects (//todo maybe remove this requirment?)
        Cache.beginUpdating();

        //public api
        ws.on('message', (message) => {
            switch (message){
                case 'prices':
                    Cache.getPrices().then(prices => ws.send(JSON.stringify(prices)));
                    break;
            }
        });


        ws.on('close', ()=> {

            //stop updating if that was the last client
            if(wss.clients.length === 0) Cache.stopUpdating();
        })
    });

    console.log("Microservice ready!")
});

