module.exports = {

    timeout: 60000,

    retries: 1,

    reporter: [

        ['list'],

        ['html', {

            outputFolder: 'playwright-report',

            open: 'never'
        }]
    ],

    use: {

        browserName: 'chromium',

        headless: false
    },

    reporter: [
    ['html', { open: 'never' }]
]
};
