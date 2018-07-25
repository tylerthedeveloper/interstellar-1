import * as React from "react";

import CreateProductPicMutation from "Mutation/CreateProductPic";
import UpdateProductPicMutation from "Mutation/UpdateProductPic";
import GetAllProductInfo from 'Query/GetAllProductInfo';
import ImageUploadDialog from './ImageUploadDialogComponent';

/***        Types       ***/
import { ApolloClient } from "apollo-client";
import { withApollo, WithApolloClient } from "react-apollo";
import { injectWithTypes } from "TypeUtil";
import UIStore from "Stores/ui";

interface IImageUploadDialogContainerProps {
    images: {productId?: string; imageKey?: string, imageNum: number}[];
    open: boolean;
    handleClose: () => void;
    ui: UIStore;
    productID: string;
}
type IImageUploadDialogContainerPropsWithApollo = WithApolloClient<IImageUploadDialogContainerProps>;

export type CreateProductPicMutationHandlerVars = {
    file: File
    num: number
}
export type UpdateProductPicMutationHandlerVars = {
    file: File
    num: number
}

/***        Component       ***/
class ImageUploadDialogContainer extends React.Component<IImageUploadDialogContainerPropsWithApollo> {

    private client: ApolloClient<any>;
    private ui: UIStore;
    public state: {

    };
    private productID: string;

    constructor(props: IImageUploadDialogContainerPropsWithApollo) {
        super(props);
        const { client, ui, productID } = props;
        this.client = client;
        this.ui = ui;
        this.productID = productID;

        /****  Initial State    *****/
        this.state = {

        }
    }


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
            }
        })
    }



    /*****  Mutation Handlers    *****/
    public CreateProductPicMutationHandler = ( {
        file,
        num,
    }: CreateProductPicMutationHandlerVars) => {

        this.verifyImage(file).then(() => {
            this.ui.displayNotification("Photo uploading...", { keepOpen: true, type: "loading" });

            return this.client.mutate({
                mutation: CreateProductPicMutation,
                variables: { productID: this.productID, file, num, },
                update: (cache, {data}) => {
                    if(data && data.createProductImage) {

                        //get the old query
                        const oldData = cache.readQuery({
                            query: GetAllProductInfo,
                            variables: {
                                productID: this.productID,
                            }
                        });

                        //add the image to the image list
                        oldData.productById.productImagesByProductId.nodes.push(data.createProductImage.productImage);

                        //reaplce the data in the cache
                        cache.writeQuery({
                            query: GetAllProductInfo,
                            variables: {
                                productID: this.productID,
                            },
                            data: oldData,
                        });
                    }
                },
            }).then(() => {
                this.ui.displayNotification("Upload complete!");
            }).catch((err) => {
                //TODO What to do on mutation error?
            });
        });
    };


    public UpdateProductPicMutationHandler =( {
        file,
        num,
    }: UpdateProductPicMutationHandlerVars) => {

        this.verifyImage(file).then(() => {
            this.ui.displayNotification("Photo uploading...", { keepOpen: true, type: "loading" });

            this.client.mutate({
                mutation: UpdateProductPicMutation,
                variables: { productID: this.productID, file, num, },
                update: (cache, {data}) => {
                    if(data && data.updateProductImageByProductIdAndImageNum) {

                        //run the old query
                        const oldData = cache.readQuery({
                            query: GetAllProductInfo,
                            variables: {
                                productID: this.productID,
                            }
                        });

                        //replace the appropriate image link
                        oldData.productById.productImagesByProductId.nodes[num].imageKey =
                            data.updateProductImageByProductIdAndImageNum.productImage.imageKey;

                        //replace the data
                        cache.writeQuery({
                            query: GetAllProductInfo,
                            variables: {
                                productID: this.productID,
                            },
                            data: oldData,
                        });
                    }
                },
            }).then(() => {
                this.ui.displayNotification("Upload complete!");
            }).catch((err) => {
                //TODO What to do on mutation error?
            });
        });
    };


    /*****      Render          *****/
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
}

export default injectWithTypes(["ui"], withApollo(ImageUploadDialogContainer));