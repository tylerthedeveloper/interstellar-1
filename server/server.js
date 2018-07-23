import express from "express";
import path from "path";
import fallback from "express-history-api-fallback";
import session from 'express-session';
import { postgraphile} from 'postgraphile';
import cors from 'cors';
import {Pool} from 'pg';
import { apolloUploadExpress } from 'apollo-upload-server';
import PostGraphileUploadFieldPlugin from 'postgraphile-plugin-upload-field';

import config from '../config.json';
import {currentUserPlugin, resolveFromSourceFirst} from './lib/graphql/authPlugin';
import {defaultUploadFieldDef} from './lib/graphql/uploadPlugin';

const app = express();
export const pool = new Pool({
    user: 'postgres',
    host: 'interstellar.market',
    database: 'silent_shop',
    password: config.pg.password,
    port: 5432,
});

app.use("/gql",
    cors({origin: true, credentials: true, maxAge: 60 * 60, exposedHeaders: ['Authorization'],  allowHeaders: ['Authorization']}),
    session({
        secret: "Jack Langston is the undisputed best",
        resave: true,
        saveUninitialized: true,
        cookie : {
            maxAge: 1000 * 60
        }
    }),
    apolloUploadExpress()
);
app.use(postgraphile(pool, 'public', {
    graphiql: true,
    graphqlRoute: "/gql",
    extendedErrors: ['hint', 'detail', 'errcode'],
    additionalGraphQLContextFromRequest: (req, res) => {
        return {
            session: req.session,
            req,
            res
        }
    },
    jwtSecret: "jack",
    appendPlugins: [resolveFromSourceFirst, currentUserPlugin, PostGraphileUploadFieldPlugin],
    watchPg: true,
    graphileBuildOptions: {
        uploadFieldDefinitions: [defaultUploadFieldDef]
    }
}));

//set the static asset directory
const publicDir = path.resolve(__dirname, "../dist");
app.use(express.static(publicDir));
app.use(fallback(path.resolve(publicDir, "./index.html")));

export default app;
