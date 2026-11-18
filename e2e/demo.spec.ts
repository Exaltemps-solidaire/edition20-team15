import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je choisis qui je suis", async () => {
    await expect(page.getByText("Qui êtes-vous ?")).toBeVisible();
    await page.getByRole("listitem").filter({ hasText: "Sophie" }).getByRole("button", { name: "Choisir" }).click();
  });

  await test.step("Je vois mon tableau de bord avec ma progression", async () => {
    await expect(page.getByText("BURN TO BE ALIVE")).toBeVisible();
    await expect(page.getByText("33%")).toBeVisible();
  });

  await test.step("Je choisis de faire une pause", async () => {
    await page
      .getByRole("listitem")
      .filter({ hasText: "Je souhaite faire une pause" })
      .getByRole("button", { name: "Choisir" })
      .click();
    await expect(page.getByText("Vos notifications sont suspendues")).toBeVisible();
  });

  await test.step("Je reprends mon parcours", async () => {
    await page.getByRole("button", { name: "Reprendre mon parcours" }).click();
    await expect(page.getByText("BURN TO BE ALIVE")).toBeVisible();
  });
});
