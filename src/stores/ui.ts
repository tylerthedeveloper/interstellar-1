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
    private notificationTimeout: any;

    @action.bound public displayNotification(notification: string, keepOpen?: boolean) {
        clearTimeout(this.notificationTimeout);
        this.notificationOpen = true;
        this.notificationMessage = notification;
        if (!keepOpen) {
            this.notificationTimeout = setTimeout(this.closeNotification, 2000);
        }
    }

    @action.bound public closeNotification() {
        this.notificationOpen = false;
        this.notificationMessage = null;
    }

}

export default UIStore;
