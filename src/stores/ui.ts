import {observable, action} from 'mobx';

class UIStore {


    /****************************
     * Login Modal
     ****************************/

    @observable loginModalLoading = false;
    @observable loginModalOpen = false;
    @observable loginModalErrorMessage: string | null = null;


    @action.bound closeLoginModal() {
        this.loginModalOpen = false;
        this.loginModalLoading = false;
        this.loginModalErrorMessage = null;
    }

    @action.bound openLoginModal() {
        this.loginModalOpen = true;
    }

    @action.bound setLoginModalErrorMessage(err: string){
        this.loginModalErrorMessage = err;
        this.loginModalLoading = false;
    }


}

export default UIStore;