// tests/purchaseFlow.spec.js

const { test, expect } =
    require('@playwright/test');

// =====================================
// BASE TEST
// =====================================

require('../base/BaseTest');

const BaseTest =
    require('../base/BaseTest');

// =====================================
// PAGE OBJECTS
// =====================================

const LoginPage =
    require('../pages/LoginPage');

const InventoryPage =
    require('../pages/InventoryPage');

const CartPage =
    require('../pages/CartPage');

const CheckoutPage =
    require('../pages/CheckoutPage');

// =====================================
// UTILITIES
// =====================================

const config =
    require('../utils/config');

const Logger =
    require('../utils/Logger');

// =====================================
// TEST SUITE
// =====================================

test.describe(
    'Enterprise Playwright Hooks Framework',
    () => {

    // =====================================
    // TEST 1
    // =====================================

    test(
        'TC_1: Verify Login',
        async () => {

        const page =
            BaseTest.page;

        Logger.info(
            'BEFORE TEST - Login Validation'
        );

        try {

            const loginPage =
                new LoginPage(page);

            // =================================
            // TEST EXECUTION
            // =================================

            await test.step(
                'Login to application',
                async () => {

                await loginPage.login(
                    config.username,
                    config.password
                );
            });

            // =================================
            // VALIDATION
            // =================================

            await test.step(
                'Validate inventory page',
                async () => {

                expect(
                    await loginPage
                        .isInventoryPageLoaded()
                ).toBeTruthy();
            });

            Logger.info(
                'AFTER TEST - Login Successful'
            );
        }
        catch (error) {

            Logger.error(
                `Verify Login Failed:
                ${error.message}`
            );

            throw error;
        }
    });

    // =====================================
    // TEST 2
    // =====================================

    test(
        'TC_2: Verify Add Backpack To Cart',
        async () => {

        const page =
            BaseTest.page;

        Logger.info(
            'BEFORE TEST - Add Backpack'
        );

        try {

            const loginPage =
                new LoginPage(page);

            const inventoryPage =
                new InventoryPage(page);

            // =================================
            // LOGIN
            // =================================

            await test.step(
                'Login to application',
                async () => {

                await loginPage.login(
                    config.username,
                    config.password
                );
            });

            // =================================
            // ADD ITEM
            // =================================

            await test.step(
                'Add backpack to cart',
                async () => {

                await inventoryPage
                    .addItemToCart();
            });

            // =================================
            // VALIDATION
            // =================================

            await test.step(
                'Validate cart badge',
                async () => {

                expect(
                    await inventoryPage
                        .isCartBadgeDisplayed()
                ).toBeTruthy();
            });

            Logger.info(
                'AFTER TEST - Backpack Added'
            );
        }
        catch (error) {

            Logger.error(
                `Add Backpack Failed:
                ${error.message}`
            );

            throw error;
        }
    });

    // =====================================
    // TEST 3
    // =====================================

    test(
        'TC_3: Verify Backpack Displayed In Cart',
        async () => {

        const page =
            BaseTest.page;

        Logger.info(
            'BEFORE TEST - Cart Validation'
        );

        try {

            const loginPage =
                new LoginPage(page);

            const inventoryPage =
                new InventoryPage(page);

            const cartPage =
                new CartPage(page);

            // =================================
            // LOGIN
            // =================================

            await test.step(
                'Login to application',
                async () => {

                await loginPage.login(
                    config.username,
                    config.password
                );
            });

            // =================================
            // ADD TO CART
            // =================================

            await test.step(
                'Add backpack to cart',
                async () => {

                await inventoryPage
                    .addItemToCart();
            });

            // =================================
            // OPEN CART
            // =================================

            await test.step(
                'Open cart page',
                async () => {

                await inventoryPage
                    .openCart();
            });

            // =================================
            // VALIDATION
            // =================================

            await test.step(
                'Validate backpack in cart',
                async () => {

                expect(
                    await cartPage
                        .isBackpackDisplayed()
                ).toBeTruthy();
            });

            Logger.info(
                'AFTER TEST - Cart Validation Successful'
            );
        }
        catch (error) {

            Logger.error(
                `Cart Validation Failed:
                ${error.message}`
            );

            throw error;
        }
    });

    // =====================================
    // TEST 4
    // =====================================

    test(
        'TC_4: Verify Purchase Flow',
        async () => {

        const page =
            BaseTest.page;

        Logger.info(
            'BEFORE TEST - Purchase Flow'
        );

        try {

            const loginPage =
                new LoginPage(page);

            const inventoryPage =
                new InventoryPage(page);

            const cartPage =
                new CartPage(page);

            const checkoutPage =
                new CheckoutPage(page);

            // =================================
            // LOGIN
            // =================================

            await test.step(
                'Login to application',
                async () => {

                await loginPage.login(
                    config.username,
                    config.password
                );
            });

            // =================================
            // ADD ITEM
            // =================================

            await test.step(
                'Add backpack to cart',
                async () => {

                await inventoryPage
                    .addItemToCart();
            });

            // =================================
            // OPEN CART
            // =================================

            await test.step(
                'Open cart page',
                async () => {

                await inventoryPage
                    .openCart();
            });

            // =================================
            // CHECKOUT
            // =================================

            await test.step(
                'Proceed to checkout',
                async () => {

                await cartPage
                    .clickCheckout();
            });

            // =================================
            // COMPLETE PURCHASE
            // =================================

            await test.step(
                'Complete checkout flow',
                async () => {

                await checkoutPage
                    .checkout();
            });

            // =================================
            // VALIDATION
            // =================================

            await test.step(
                'Validate order success',
                async () => {

                expect(
                    await checkoutPage
                        .isOrderSuccessful()
                ).toBeTruthy();

                await expect(page)
                    .toHaveURL(
                        /checkout-complete/
                    );
            });

            Logger.info(
                'AFTER TEST - Purchase Successful'
            );
        }
        catch (error) {

            Logger.error(
                `Purchase Flow Failed:
                ${error.message}`
            );

            throw error;
        }
    });
});