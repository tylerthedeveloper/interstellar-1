import http from "http";
import app from "./server";

const PORT = 3002;
const HOST = "localhost";

const server = http.createServer(app);
let currentApp = app;
server.listen(PORT, HOST);

if (module.hot) {
    module.hot.accept("./server", (what) => {
        server.removeListener("request", currentApp);
        server.on("request", app);
        currentApp = app;
    });
}
