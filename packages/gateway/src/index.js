import app from "./server";

const PORT = process.env.NODE_ENV === "production" ? 443 : 3002;
const HOST = "0.0.0.0";

let currentApp = app;
app.listen(PORT, HOST);

if (module.hot) {
    module.hot.accept("./server", (what) => {
        server.removeListener("request", currentApp);
        server.on("request", app);
        currentApp = app;
    });
}
