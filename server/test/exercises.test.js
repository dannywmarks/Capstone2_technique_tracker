
// node --inspect-brk $(which jest) --runInBand NAME_OF_FILE

// const request = require("supertest");

// const app = require("../app");

const { setupDB } = require("../test/test-setup")


//Setup a Test Database 
setupDB("endpoint-testing")

describe("GET /exercises", () => {
  // test("Get all exercises", async () => {
  //   const response = await request(app).get("/exercises");
  //   expect(response.statusCode).toBe(200);
  //   // expect(response.body).toEqual({ exercise_name: ["Burpees"] });
  // });
  it("Gets the test endpoint", async done => {
    // Sends GET Request to /test endpoint
    const res = await request.get("/test");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe({message: "pass!"});
    // ...
    done();
  });
});

// describe("POST /exercises", () => {
//   test("Create  new exercise", async () => {
//     const response = await request(app).post({ exercise_name: "pull-ups" });
//     expect(response.statusCode).toBe(201);
//   });
// });
