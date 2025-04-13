// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { on } = require('events');

module.exports = defineConfig({
  testDir: './src/tests',
  timeout: 120_000, /* Maximum time one test can run for. */
  expect: {
    timeout: 10 * 1000, //Maximum time expect()  should wait for the condition to be met. Ex: await expect(locator).toHaveText();
  },
  
  fullyParallel: true, /* Run tests in files in parallel */
  
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code. */
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter: [['junit', { outputFile: 'results.xml' }], ['html', { open: 'never' }]],  // Generates both JUnit XML and HTML reports
  // reporter: 'html', // Generates only HTML report
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    video: 'on',
    // video: {
    //   mode: 'on', // Record video for each test
    // },
    launchOptions: {
      slowMo: 1000
    },

    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',

    // Record trace only when retrying a test for the first time.
    trace: 'on-first-retry',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport: { width: 1500, height: 747 }
      },
    },
  ],

});