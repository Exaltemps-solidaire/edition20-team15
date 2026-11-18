import { describe, expect, it } from "vitest";
import { router } from "./routes.ts";

describe("router", () => {
  it("répond 200 sur les deux routes de santé", () => {
    expect(router("GET", "/health").statut).toBe(200);
    expect(router("GET", "/sante?x=1").statut).toBe(200);
  });

  it("répond 404 sur une route inconnue ou une méthode non prévue", () => {
    expect(router("GET", "/api/v1/inconnue").statut).toBe(404);
    expect(router("POST", "/health").statut).toBe(404);
  });

  it("répond 200 sur /api/v1/parcours avec le parcours actif", () => {
    const { statut, corps } = router("GET", "/api/v1/parcours");
    expect(statut).toBe(200);
    expect(corps).toMatchObject({ nom: "BURN TO BE ALIVE" });
  });
});
