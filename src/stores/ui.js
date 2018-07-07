import {observable, action} from 'mobx';

class UIStore {


    /****************************
     * Login Modal
     ****************************/

    @observable loginModalLoading = false;
    @observable loginModalOpen = false;
    @observable loginModalErrorMessage = null;


    @action.bound closeLoginModal() {
        this.loginModalOpen = false;
        this.loginModalLoadomg = false;
        this.loginModalErrorMessage = null;
    }

    @action.bound openLoginModal() {
        this.loginModalOpen = true;
    }

    @action.bound setLoginModalErrorMessage(err){
        this.loginModalErrorMessage = err;
        this.loginModalLoading = false;
    }


}

export default UIStore;