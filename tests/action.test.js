const request = require("supertest");
const app = require("../app");

let server;

beforeAll((done) => {
  server = app.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

test("GET /action returns move and action", async () => {
  const res = await request(server).get("/action");
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("move");
  expect(res.body).toHaveProperty("action");
});

test("POST /command updates the current command", async () => {
  const res = await request(server)
    .post("/command")
    .send({ move: "LEFT", action: "COLLECT" })
    .set("Content-Type", "application/json");

  expect(res.statusCode).toBe(200);
  expect(res.body.command).toEqual({ move: "LEFT", action: "COLLECT" });

  // Vérifie que la commande a bien été modifiée
  const getRes = await request(server).get("/action");
  expect(getRes.body).toEqual({ move: "LEFT", action: "COLLECT" });
});

test("POST /command with invalid values does not update command", async () => {
  // Commande invalide
  const res = await request(server)
    .post("/command")
    .send({ move: "FLY", action: "JUMP" })
    .set("Content-Type", "application/json");

  expect(res.statusCode).toBe(200);
  // La commande doit rester la même qu'avant (LEFT / COLLECT)
  const getRes = await request(server).get("/action");
  expect(getRes.body).toEqual({ move: "LEFT", action: "COLLECT" });
});
