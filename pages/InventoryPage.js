const BasePage =
    require('../base/BasePage');

class InventoryPage extends BasePage {

    constructor(page) {

        super(page);

        this.backpackButton =
            page.locator(
                '#add-to-cart-sauce-labs-backpack'
            );

        this.cartBadge =
            page.locator(
                '.shopping_cart_badge'
            );

        this.cartLink =
            page.locator(
                '.shopping_cart_link'
            );
    }

    async addItemToCart() {

        await this.click(
            this.backpackButton
        );
    }

    async openCart() {

        await this.click(
            this.cartLink
        );

        await this.page.waitForURL(
            '**/cart.html'
        );
    }

    async isCartBadgeDisplayed() {

        return await this.isVisible(
            this.cartBadge
        );
    }
}

module.exports = InventoryPage;