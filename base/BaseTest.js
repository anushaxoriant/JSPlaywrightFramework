const { test } =
    require('@playwright/test');

const BrowserFactory =
    require('./BrowserFactory');

const Logger =
    require('../utils/Logger');

const config =
    require('../utils/config');

class BaseTest {

    static browser;
    static context;
    static page;
}

// =========================================
// BEFORE ALL
// =========================================

test.beforeAll(async () => {

    Logger.info(
        'beforeAll - Starting Suite'
    );

    BaseTest.browser =
        await BrowserFactory
            .launchBrowser();

    Logger.info(
        'Browser Launched Successfully'
    );
});

// =========================================
// BEFORE EACH
// =========================================

test.beforeEach(async () => {

    Logger.info(
        'beforeEach - Creating Context and Page'
    );

    // Create context

    BaseTest.context =
        await BaseTest.browser
            .newContext({

            viewport: null
        });

    // Create page

    BaseTest.page =
        await BaseTest.context
            .newPage();

    // Open application

    await BaseTest.page.goto(
        config.baseUrl
    );

    // Intelligent wait

    await BaseTest.page
        .waitForLoadState(
            'networkidle'
        );

    Logger.info(
        'Application Opened Successfully'
    );
});

// =========================================
// AFTER EACH
// =========================================

test.afterEach(async ({ }, testInfo) => {

    Logger.info(
        `afterEach - ${testInfo.title}`
    );

    try {

        // Screenshot on failure

        if (
            testInfo.status !==
            testInfo.expectedStatus
        ) {

            await BaseTest.page
                .screenshot({

                path:
                `screenshots/${testInfo.title}.png`,

                fullPage: true
            });

            Logger.error(
                `Test Failed:
                ${testInfo.title}`
            );
        }

        // Demo wait

        await BaseTest.page
            .waitForTimeout(2000);

        // Close page

        await BaseTest.page.close();

        // Close context

        await BaseTest.context.close();

        Logger.info(
            'Page and Context Closed Successfully'
        );
    }
    catch (error) {

        Logger.error(
            `afterEach Failed:
            ${error.message}`
        );
    }
});

// =========================================
// AFTER ALL
// =========================================

test.afterAll(async () => {

    Logger.info(
        'afterAll - Closing Browser'
    );

    await BaseTest.browser
        .close();

    Logger.info(
        'Browser Closed Successfully'
    );
});

module.exports = BaseTest;