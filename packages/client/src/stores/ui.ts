import {action, observable} from "mobx";

class UIStore {

    /****************************
     * Login Modal
     ****************************/

    @observable public loginModalLoading = false;
    @observable public loginModalOpen = false;
    @observable public loginModalErrorMessage: string | null = null;

    @action.bound public closeLoginModal() {
        this.loginModalOpen = false;
        this.loginModalLoading = false;
        this.loginModalErrorMessage = null;
    }

    @action.bound public openLoginModal() {
        this.loginModalOpen = true;
    }

    @action.bound public setLoginModalErrorMessage(err: string) {
        this.loginModalErrorMessage = err;
        this.loginModalLoading = false;
    }

    /****************************
     * Notification MBar
     ****************************/

    @observable public notificationOpen = false;
    @observable public notificationMessage: string | null = null;
    @observable public notificationType: "error" | "loading" | "ok";
    private notificationTimeout: any;

    @action.bound public displayNotification(notification: string, options: {
        keepOpen?: boolean;
        type?: "error" | "loading" | "ok";
    } = {}) {

        // message logic
        this.notificationMessage = notification;

        // timeout logic
        clearTimeout(this.notificationTimeout);
        this.notificationOpen = true;
        if (!options.keepOpen) {
            this.notificationTimeout = setTimeout(this.closeNotification, 2000);
        }

        // display logic
        if (options.type) {
            this.notificationType = options.type;
        }else{
            this.notificationType = "ok";
        }

    }

    @action.bound public closeNotification() {
        this.notificationOpen = false;
        this.notificationMessage = null;
        //this.notificationType = "ok";
    }

}

export default UIStore;
