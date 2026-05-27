module.exports = {

    timeout: 60000,

    retries: 1,

    use: {

        browserName: 'chromium',

        headless: false,

        screenshot:
            'only-on-failure',

        video:
            'retain-on-failure'
    },

    reporter: [
    ['html', { open: 'never' }]
]
};