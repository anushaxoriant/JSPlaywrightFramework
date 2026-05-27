const { chromium, firefox, webkit } =
    require('@playwright/test');

const config =
    require('../utils/config');

class BrowserFactory {

    static async launchBrowser() {

        const browserOptions = {

            headless: config.headless,

            slowMo:
                config.demoMode
                ? 1000
                : 0,

            args: ['--start-maximized']
        };

        switch(config.browser) {

            case 'firefox':

                return await firefox.launch(
                    browserOptions
                );

            case 'webkit':

                return await webkit.launch(
                    browserOptions
                );

            default:

                return await chromium.launch(
                    browserOptions
                );
        }
    }
}

module.exports = BrowserFactory;