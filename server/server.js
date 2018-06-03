import express from 'express';
import bodyParser from 'body-parser';
import fallback from 'express-history-api-fallback'
import path from 'path';


const publicDir = path.resolve(__dirname, '../dist');
console.log(publicDir);


const app = express();
app.get('/', function(req, res) {
    console.log(path.resolve(publicDir, './index.html'));
    res.sendFile(path.resolve(publicDir, './index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(publicDir));
app.use(fallback(path.resolve(publicDir, './index.html')));

export default app;