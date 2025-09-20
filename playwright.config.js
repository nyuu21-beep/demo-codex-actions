const { defineConfig } = require("@playwright/test");
const path = require("path");

const PORT = 4173;
const LOCAL_BASE_URL = `http://127.0.0.1:${PORT}`;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    actionTimeout: 0,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || LOCAL_BASE_URL,
    screenshot: "only-on-failure",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium"
    }
  ],
  webServer: process.env.PLAYWRIGHT_TEST_BASE_URL
    ? undefined
    : {
        command: "python3 -m http.server 4173",
        cwd: path.resolve(__dirname),
        port: PORT,
        reuseExistingServer: !process.env.CI
      }
});
