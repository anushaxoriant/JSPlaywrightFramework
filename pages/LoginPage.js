const BasePage =
    require('../base/BasePage');

class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.usernameInput =
            page.locator('#user-name');

        this.passwordInput =
            page.locator('#password');

        this.loginButton =
            page.locator('#login-button');

        this.inventoryContainer =
            page.locator('.inventory_list');
    }

    async login(username, password) {

        await this.fill(
            this.usernameInput,
            username
        );

        await this.fill(
            this.passwordInput,
            password
        );

        await this.click(
            this.loginButton
        );
    }

    async isInventoryPageLoaded() {

        await this.page.waitForURL(
            '**/inventory.html'
        );

        return await this.isVisible(
            this.inventoryContainer
        );
    }
}

module.exports = LoginPage;