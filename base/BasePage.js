class BasePage {

    constructor(page) {

        this.page = page;
    }

    async click(locator) {

        await locator.highlight();

        await this.page.waitForTimeout(500);

        await locator.click();

        await this.page.waitForTimeout(1000);
    }

    async fill(locator, text) {

        await locator.click();

        await locator.pressSequentially(
            text,
            {
                delay: 120
            }
        );

        await this.page.waitForTimeout(1000);
    }

    async isVisible(locator) {

        return await locator.isVisible();
    }
}

module.exports = BasePage;