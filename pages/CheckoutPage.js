const BasePage =
    require('../base/BasePage');

class CheckoutPage extends BasePage {

    constructor(page) {

        super(page);

        this.firstName =
            page.locator('#first-name');

        this.lastName =
            page.locator('#last-name');

        this.postalCode =
            page.locator('#postal-code');

        this.continueButton =
            page.locator('#continue');

        this.finishButton =
            page.locator('#finish');

        this.completeHeader =
            page.locator('.complete-header');
    }

    async checkout() {

        await this.fill(
            this.firstName,
            'Anusha'
        );

        await this.fill(
            this.lastName,
            'Shivaram'
        );

        await this.fill(
            this.postalCode,
            '560001'
        );

        await this.click(
            this.continueButton
        );

        await this.page.waitForURL(
            '**/checkout-step-two.html'
        );

        await this.click(
            this.finishButton
        );

        await this.page.waitForURL(
            '**/checkout-complete.html'
        );
    }

    async isOrderSuccessful() {

        return await this.completeHeader
            .filter({
                hasText:
                'Thank you for your order!'
            })
            .isVisible();
    }
}

module.exports = CheckoutPage;