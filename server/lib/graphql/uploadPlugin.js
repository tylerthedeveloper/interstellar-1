import fs from 'fs'
const UPLOAD_DIR_NAME = "uploads";
import aws from 'aws-sdk';
import uuid from 'uuid/v4';

import config from '../../../config.json';
import {pool} from '../../server';

const s3 = new aws.S3({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey
});

const BUCKET_NAME = 'silentshop';

export const defaultUploadFieldDef = {
    match: ({schema, table, column, tags}) => {
        return table === "users" && column === "profile_picture"
    },
    resolve: resolveUploadDefault
};


async function resolveUploadDefault(upload, args, other){
    
    let oldPhoto;
    try {
        oldPhoto = await pool.query(`
            SELECT profile_picture
            FROM users
            WHERE users.id = $1
        `, [args.input.id]);
        await deleteS3(oldPhoto.rows[0].profile_picture);
        console.log("Old photo deleted!")
    }catch(e){
        console.log(e);
        throw e;
    }
    const path = await saveS3(upload,uuid());
    console.log("saved at", path);
    return path;
}

async function deleteS3(key) {

    const params = {
        Bucket: BUCKET_NAME,
        Key: key
    };

    return new Promise((resolve, reject) => {
        s3.deleteObject(params, function(err, data) {
            if (err) reject(err);
            resolve(data.Key)
        })
    })
}

async function saveS3({stream, filename, mimetype, encoding}, key) {

    const params = {
        Bucket: BUCKET_NAME,
        ContentEncoding: encoding,
        ContentType: mimetype,
        Key: key,
        Body: stream,
        ACL: "public-read"
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, function(err, data) {
            if (err) reject(err);
            resolve(data.Key)
        })
    })
}


function saveLocal({ stream, filename }) {
    const id = `${new Date().getTime()}`;
    const path = `${UPLOAD_DIR_NAME}/${id}`;
    const writeStreamPath = `./${path}`;
    return new Promise((resolve, reject) =>
        stream
            .on("error", error => {
                if (stream.truncated)
                // Delete the truncated file
                    fs.unlinkSync(writeStreamPath);
                reject(error);
            })
            .on("end", () => resolve({ id, path }))
            .pipe(fs.createWriteStream(writeStreamPath))
    );
}
