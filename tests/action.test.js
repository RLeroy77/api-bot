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
