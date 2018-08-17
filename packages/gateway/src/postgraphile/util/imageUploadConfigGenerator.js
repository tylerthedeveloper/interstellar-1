import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';
import Promise from 'bluebird';
import sharp from 'sharp';
sharp.simd(true);
sharp.cache( { memory: 200 } );
import zlib from 'zlib';

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../config/config.json')));
import {pool} from '../../server';

const BUCKET_NAME = 'silentshop';
aws.config.setPromisesDependency(Promise);
const s3 = new aws.S3({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey
});


export function generateUploadResolver(config){

    const {
        matching:{
            schema,
            table,
            column,
        },
        queryForOldKey:{
            sql,
            argExtractor
        },
        keyGenerator,
        copyGenerator
    } = config;

    if(!sql || !argExtractor || !column || !table){
        throw new Error("Missing parameters!");
    }

    async function resolve(upload, args){

        //generate the stream configs
        const {stream} = upload;
        const copies = copyGenerator(stream);

        //query for the current key
        const oldKeyPromise = pool.query(sql, argExtractor(args))
            .then((res) => {
                if(!res.rows[0]){
                    console.log("No previous image!");
                    return null;
                }
                return res.rows[0][column];
            })
            .catch((err) => {
                console.log(`Could not find old key (or lack of old key) on image delete
                for table '${table}' and column '${column}!\n`, err);
                return null;
            });

        // SAVE the new images
        const newKey = keyGenerator ? keyGenerator(args) : uuid();
        const savePromise = Promise.all(Object.keys(copies).map((extension) => {
            const {stream, mimetype} = copies[extension];
            return saveS3({
                stream: stream.pipe(zlib.createGzip()),
                mimetype,
                filename: generateFilename(newKey, extension)
            });
        }));

        // promise for when all of the data (new and old) is safe
        const readyToMutatePromise = Promise.all([oldKeyPromise, savePromise]);

        //once the new images have been saved AND we have gotten the old key, DELETE the old images
        readyToMutatePromise.then(([oldKey, ...rest]) => {
            console.log("oldkey", oldKey);

            //nothing to delete!
            if(!oldKey)
                return Promise.resolve();

            const toDelete = Object.keys(copies).map(extension => generateFilename(oldKey, extension));
            return deleteS3(toDelete).catch(err => {
                console.log(
                    `Image of key ${oldKey} failed to delete for table '${table}' and column '${column}!\n`,
                    err
                );
            })
        });

        //no need to wait for deleting to finish
        return readyToMutatePromise.then(() => newKey);
    }


    function match({schema, table: tableToCheck, column: columnToCheck, tags}) {
        return table === tableToCheck && column === columnToCheck
    }

    return {
        match,
        resolve
    }
}

function generateFilename(key, extension){
    return key + "-" + extension;
}

async function deleteS3(keys) {
    if(Array.isArray(keys)){
        const params = {
            Bucket: BUCKET_NAME,
            Delete: {
                Objects: keys.map((key) => ({Key: key}))
            }
        };

        return s3.deleteObjects(params).promise();
    }else{
        const params = {
            Bucket: BUCKET_NAME,
            Key: keys
        };
        return s3.deleteObject(params).promise();
    }
}

async function saveS3({stream, filename, mimetype}) {

    const params = {
        Bucket: BUCKET_NAME,
        ContentEncoding: "gzip",
        ContentType: mimetype,
        Key: filename,
        Body: stream,
        ACL: "public-read"
    };

    return s3.upload(params).promise();
}