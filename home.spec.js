const { test, expect } = require("@playwright/test");

const createIndexUrl = () => {
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || "http://127.0.0.1:4173";
  return new URL("/index.html", baseUrl).toString();
};

test.describe("CodeX Running トップページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(createIndexUrl());
  });

  test("ヒーローセクションが表示される", async ({ page }) => {
    await expect(page.locator(".hero__title")).toContainText("CodeX Running");
    await expect(page.locator(".hero__cta-group .button--primary")).toHaveText(
      "パーソナルプランを見る"
    );
  });

  test("プログラムタブが切り替わる", async ({ page }) => {
    const advanceTab = page.getByRole("button", { name: "アドバンスプラン" });
    await advanceTab.click();
    await expect(page.locator(".programs__panel-title")).toContainText("アドバンスプラン");

    const relayTab = page.getByRole("button", { name: "リレープラン" });
    await relayTab.click();
    await expect(page.locator(".programs__panel-title")).toContainText("リレープラン");
  });

  test("週間スケジュールが 4 件表示される", async ({ page }) => {
    await expect(page.locator(".schedule__item")).toHaveCount(4);
    await expect(page.locator(".schedule__item").first()).toContainText("MON");
  });

  test("コミュニティカードが 3 件表示される", async ({ page }) => {
    const cards = page.locator(".community__card");
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(1)).toContainText("ライブコーチング");
  });

  test("CTA セクションに無料トライアルボタンが表示される", async ({ page }) => {
    const ctaButton = page.locator(".cta .button--primary");
    await expect(ctaButton).toHaveAttribute("href", "#");
    await expect(ctaButton).toHaveText("無料トライアルをリクエスト");
  });
});
