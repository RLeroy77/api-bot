const request = require("supertest");
const app = require("../app");

describe("GET /action", () => {
  it("should return a valid move and action", async () => {
    const res = await request(app).get("/action");
    expect(res.statusCode).toBe(200);
    expect(["UP", "DOWN", "LEFT", "RIGHT"]).toContain(res.body.move);
    expect(["NONE", "BOMB", "COLLECT"]).toContain(res.body.action);
  });
});
