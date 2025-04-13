class Login_po {
    constructor(page) {
        this.page = page;
        this.loc_input_login_User_ID = "input[data-test='username']";
        this.loc_input_login_Password = "input[data-test='password']";
        this.loc_button_login_Login = "input[data-test='login-button']";
        this.loc_button_login_Error = "h3[data-test='error']";
    }

    async login_enterUserID(UserID) {
        await this.page.locator(this.loc_input_login_User_ID).fill(UserID);
    }

    async login_enterPassword(Password) {
        await this.page.locator(this.loc_input_login_Password).fill(Password);
    }

    async login_clickLogin() {
        await this.page.locator(this.loc_button_login_Login).click();
    }

    async login_getErrorMessage() {
        return await this.page.locator(this.loc_button_login_Error).innerText();
    }
}

export default Login_po;