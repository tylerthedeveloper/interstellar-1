import fastify from "fastify";
import fastifyStatic from "fastify-static";
import fs from "fs";
import path from "path";
import { postgraphile} from 'postgraphile';
import cors from 'cors';
import {Pool} from 'pg';
import PostGraphileUploadFieldPlugin from 'postgraphile-plugin-upload-field';

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/config.json')));
import {currentUserPlugin, resolveFromSourceFirst} from './postgraphile/authPlugin';
import {ProfilePicPluginConfig, ProductPicPluginConfig} from './postgraphile/uploadPlugin';

const app = fastify({
    logger: true,
    http2: true,
    https: {
        key: fs.readFileSync(config.https.key),
        cert: fs.readFileSync(config.https.cert),
        passphrase: config.https.passphrase
    }
});

export const pool = new Pool({
    user: 'postgres',
    host: 'interstellar.market',
    database: 'silent_shop',
    password: config.pg.password,
    port: 5432,
});

app.use("/gql",
    cors({origin: true, credentials: true, maxAge: 60 * 60, exposedHeaders: ['Authorization'],  allowHeaders: ['Authorization']}),
);

app.use(postgraphile(pool, 'public', {
    graphiql: true,
    graphqlRoute: "/gql",
    extendedErrors: ['hint', 'detail', 'errcode'],
    additionalGraphQLContextFromRequest: (req, res) => {
        return {
            req,
            res
        }
    },
    jwtSecret: "jack",
    appendPlugins: [resolveFromSourceFirst, currentUserPlugin, PostGraphileUploadFieldPlugin],
    watchPg: true,
    graphileBuildOptions: {
        uploadFieldDefinitions: [ProfilePicPluginConfig, ProductPicPluginConfig]
    }
}));

//set the static asset directory
const publicDir = path.resolve(config.static.path);
app.register(fastifyStatic, {
    root: publicDir
});

//tries to serve index.html if requesting html asset from unknown route
app.setNotFoundHandler((req, reply) => {
    if(req.headers.accept.indexOf('text/html') > -1){
        reply.type("text/html");
        reply.send(fs.createReadStream(publicDir + "/index.html"))
    }
});

export default app;
