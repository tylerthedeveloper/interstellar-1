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

    @action.bound public displayNotification(notification: string) {
        this.notificationOpen = true;
        this.notificationMessage = notification;
    }

    @action.bound public closeNotification(){
        this.notificationOpen = false;
        this.notificationMessage = null;
    }

}

export default UIStore;
