const request = require("supertest");
const { app } = require("./app");

describe("Checking if it is alive", () => {
  test("Should respond with 200 status code", async () => {
    const response = await request(app).get("/api/test");
    expect(response.statusCode).toBe(200);
  });

  test("Content type should be json", async () => {
    const response = await request(app).get("/api/test");
    expect(response.headers["content-type"]).toContain("json");
  });

  test("Message should contain >It's alive!<", async () => {
    const response = await request(app).get("/api/test");
    expect(response.text).toContain("It's alive!");
  });
});
