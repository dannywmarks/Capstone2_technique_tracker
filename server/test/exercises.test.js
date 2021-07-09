const expect = require("chai").expect;
const request = require("supertest");

const server = require("../server")

var app = request.agent(server);

// let helloWorld = testFunction.helloWorld();
// let multiply = testFunction.multiply(8,2)

// console.log(helloWorld);

describe("Post", () => {
  describe("Adding new Exercise", () => {
    it("Success should return 200", () => {
      expect(helloWorld).to.equal("Hello World!");
   
});
