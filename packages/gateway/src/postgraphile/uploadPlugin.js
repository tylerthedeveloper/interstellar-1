import sharp from 'sharp';
import {generateUploadResolver} from "./util/imageUploadConfigGenerator";


const copyGenerator = (stream) => {

    const pipeline = sharp();
    const small = pipeline.clone().resize(75);
    const medium = pipeline.clone().resize(200);
    const large = pipeline.clone().resize(450);
    stream.pipe(pipeline);
    return {
        "sm.jpeg": {
            mimetype: "image/jpeg",
            stream: small.clone().jpeg({
                quality: 60,
                trellisQuantisation: true,
                overshootDeringing: true
            })
        },
        "med.jpeg": {
            mimetype: "image/jpeg",
            stream: medium.clone().jpeg({
                quality: 80,
                progressive: true,
                optimizeScans: true,
                trellisQuantisation: true,
                overshootDeringing: true
            })
        },
        "lg.jpeg": {
            mimetype: "image/jpeg",
            stream: large.clone().jpeg({
                quality: 80,
                progressive: true,
                optimizeScans: true,
                trellisQuantisation: true,
                overshootDeringing: true
            })
        },
        "sm.webp": {
            mimetype: "image/webp",
            stream: small.clone().webp()
        },
        "med.webp": {
            mimetype: "image/webp",
            stream: medium.clone().webp()
        },
        "lg.webp": {
            mimetype: "image/webp",
            stream: large.clone().webp()
        }
    };
};

const profilePicConfig = {
    matching: {
        schema: "public",
        table: "users",
        column: "profile_picture"
    },
    queryForOldKey: {
        sql: `
            SELECT profile_picture
            FROM users
            WHERE users.id = $1
        `,
        argExtractor: (args) => ([args.input.id])
    },
    copyGenerator
};

const productPicConfig = {
    matching: {
        schema: "public",
        table: "product_images",
        column: "image_key"
    },
    queryForOldKey: {
        sql: `
            SELECT image_key
            FROM product_images
            WHERE product_images.product_id = $1 AND product_images.image_num = $2
        `,
        argExtractor: (args) => ([args.input.productId, args.input.imageNum])
    },
    copyGenerator
};




export const ProfilePicPluginConfig = generateUploadResolver(profilePicConfig);
export const ProductPicPluginConfig = generateUploadResolver(productPicConfig);

