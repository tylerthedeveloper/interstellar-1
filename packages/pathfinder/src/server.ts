import * as WebSocket from "ws";

import {Pathfinder} from './pathfinder'

const wss = new WebSocket.Server({
    host: "0.0.0.0",
    port: 3008,
});

const pf = new Pathfinder();

pf.init().then(() => {

    // set up the websocket paths
    wss.on("connection", (ws) => {

        // public api
        ws.on("message", (message) => {
            const req = JSON.parse(message.toString());

            switch (req.method) {
                case "getPath":
                    break;
            }
        });

    });
    console.log("Microservice ready!");

}).catch(err => {
    console.log("Microservice failed!");
    console.log(err);
    process.exit(1);
});

