import * as React from "react";

import CreateProductPicMutation from "Mutation/CreateProductPic";
import UpdateProductPicMutation from "Mutation/UpdateProductPic";
import GetAllProductInfoQuery from "Query/GetAllProductInfo";
import ImageUploadDialog from "./ImageUploadDialogComponent";

/***        Types       ***/
import { ApolloClient } from "apollo-client";
import { CreateProductPic, GetAllProductInfo, UpdateProductPic } from "GQLTypes";
import { withApollo, WithApolloClient } from "react-apollo";
import UIStore from "Stores/ui";
import { injectWithTypes } from "TypeUtil";

interface IImageUploadDialogContainerProps {
    images: GetAllProductInfo.Nodes[];
    open: boolean;
    handleClose: () => void;
    ui: UIStore;
    productID: string;
}
type IImageUploadDialogContainerPropsWithApollo = WithApolloClient<IImageUploadDialogContainerProps>;

export interface CreateProductPicMutationHandlerVars {
    file: File;
    num: number;
}
export interface UpdateProductPicMutationHandlerVars {
    file: File;
    num: number;
}

/***        Component       ***/
class ImageUploadDialogContainer extends React.Component<IImageUploadDialogContainerPropsWithApollo> {

    private client: ApolloClient<any>;
    private ui: UIStore;
    public state: {

    };
    private productID: string;

    /*********************************************************************
     * React Integration
     *********************************************************************/

    constructor(props: IImageUploadDialogContainerPropsWithApollo) {
        super(props);
        const { client, ui, productID } = props;
        this.client = client;
        this.ui = ui;
        this.productID = productID;

        /****  Initial State    *****/
        this.state = {};
    }

    public render() {
        const {} = this.state;
        return (
            <ImageUploadDialog
                {...this.props}
                newProductImageHandler={this.CreateProductPicMutationHandler}
                updateProductImageHandler={this.UpdateProductPicMutationHandler}
            />
        );
    }

    /*********************************************************************
     * Mutation Handlers
     *********************************************************************/

    /**
     * When provides an image and order number, uploads the image to the gateway and updates
     * the graphql cache to contain the new image metadata, including the url where the image
     * is now hosted.
     *
     * @param {File} file
     * @param {number} num
     */
    public CreateProductPicMutationHandler = ( {
        file,
        num,
    }: CreateProductPicMutationHandlerVars) => {

        this.verifyImage(file).then(() => {
            this.ui.displayNotification("Photo uploading...", { keepOpen: true, type: "loading" });

            return this.client.mutate({
                mutation: CreateProductPicMutation,
                variables: { productID: this.productID, file, num },
                update: (cache, res) => {
                    const data = res.data as CreateProductPic.Mutation;
                    if (data.createProductImage && data.createProductImage.productImage) {
                        const newProductImage = data.createProductImage.productImage;
                        this.updateHandler(cache, newProductImage);
                    }
                },
            }).then(() => {
                this.ui.displayNotification("Upload complete!");
            }).catch((err) => {
                // TODO What to do on mutation error?
            });
        });
    }

    /**
     * When provides an image and order number, uploads the image to the gateway and updates
     * the graphql cache to contain the new image metadata (replacing the old image metadata)
     *
     * @param {File} file
     * @param {number} num
     */
    public UpdateProductPicMutationHandler = ( {
        file,
        num,
    }: UpdateProductPicMutationHandlerVars) => {

        this.verifyImage(file).then(() => {
            this.ui.displayNotification("Photo uploading...", { keepOpen: true, type: "loading" });

            this.client.mutate({
                mutation: UpdateProductPicMutation,
                variables: { productID: this.productID, file, num },
                update: (cache, res) => {
                    const data = res.data as UpdateProductPic.Mutation;
                    if (data.updateProductImageByProductIdAndImageNum &&
                        data.updateProductImageByProductIdAndImageNum.productImage) {
                        const newProductImage =  data.updateProductImageByProductIdAndImageNum.productImage;
                        this.updateHandler(cache, newProductImage, num);
                    }
                },
            }).then(() => {
                this.ui.displayNotification("Upload complete!");
            }).catch((err) => {
                // TODO What to do on mutation error?
            });
        });
    }

    /*********************************************************************
     * Utilities
     *********************************************************************/

    /**
     * Accepts an input file that the user is trying to upload as a product photo and returns
     * an empty promise that is either resolved if the input file meets the site requirements
     * or a rejected promise if it doesn't. The current requirements are:
     *
     * - 100kB <= File.size <= 5MB
     * - roughly square
     *
     * @param {File} file
     * @returns {Promise<>}
     */

    private verifyImage(file: File) {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        return new Promise((res, rej) => {
            img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                const size = file.size;

                if (size < 100000) {
                    this.ui.displayNotification("File must be larger than 100kB!", { type: "error" });
                    rej();
                    return;
                } else if (size > 5000000) {
                    this.ui.displayNotification("File must be smaller than 5MB!", { type: "error" });
                    rej();
                    return;
                } else if (width < height * .75 || width > height * 1.25) {
                    this.ui.displayNotification("File must be roughly square!", { type: "error" });
                    rej();
                    return;
                }
                res();
            };
        });
    }

    /**
     * Takes the new image and updates the image data in the local cache.
     *
     * If given a replacement number, it will replace the image at the specified index's imageKey with the new
     * imageKey.
     *
     * If not given a placement number, it will simply push the image onto the image array.
     *
     * @param cache
     * @param newProductImage
     * @param {number} replaceNum
     */

    private updateHandler(cache: any, newProductImage: {imageKey: string, productId: string, imageNum: number}, replaceNum?: number) {

        // get the old data
        const oldData = cache.readQuery({
            query: GetAllProductInfoQuery,
            variables: {
                productID: this.productID,
            },
        }) as GetAllProductInfo.Query;

        // make sure the data exists on the cache
        if (oldData.productById &&
            oldData.productById.productImagesByProductId &&
            Array.isArray(oldData.productById.productImagesByProductId.nodes)
        ) {

            // add the image to the image list
            if (!replaceNum) {
                oldData.productById.productImagesByProductId.nodes.push(newProductImage);

                // replace the existing images key
            } else if (oldData.productById.productImagesByProductId.nodes[replaceNum]) {
                oldData.productById.productImagesByProductId.nodes[replaceNum]!.imageKey =
                    newProductImage.imageKey;
            }

            // replace the data in the cache
            cache.writeQuery({
                query: GetAllProductInfoQuery,
                variables: {
                    productID: this.productID,
                },
                data: oldData,
            });
        }
    }

}

export default injectWithTypes(["ui"], withApollo(ImageUploadDialogContainer));
