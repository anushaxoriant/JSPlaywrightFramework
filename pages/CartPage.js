const BasePage =
    require('../base/BasePage');

class CartPage extends BasePage {

    constructor(page) {

        super(page);

        this.checkoutButton =
            page.locator('#checkout');

        this.backpackLabel =
            page.locator(
                '.inventory_item_name'
            );
    }

    async clickCheckout() {

        await this.click(
            this.checkoutButton
        );

        await this.page.waitForURL(
            '**/checkout-step-one.html'
        );
    }

    async isBackpackDisplayed() {

        return await this.backpackLabel
            .filter({
                hasText:
                'Sauce Labs Backpack'
            })
            .isVisible();
    }
}

module.exports = CartPage;