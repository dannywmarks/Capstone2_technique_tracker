process.env.NODE_ENV = "test";
// node --inspect-brk $(which jest) --runInBand NAME_OF_FILE

const request = require("supertest");

const app = require("../app");
const mongoose = require("mongoose");

const databaseName = "test";

beforeEach(async function () {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(function () {
  // makes sure this *mutates*, not redefines, `cats`
});

afterAll(() => mongoose.disconnect());

describe("GET /exercises", () => {
  test("Get all exercises", async () => {
    const response = await request(app).get("/exercises");
    expect(response.statusCode).toBe(200);
    // expect(response.body).toEqual({ exercise_name: ["Burpees"] });
  });
});

// describe("POST /exercises", () => {
//   test("Create  new exercise", async () => {
//     const response = await request(app).post({ exercise_name: "pull-ups" });
//     expect(response.statusCode).toBe(201);
//   });
// });
