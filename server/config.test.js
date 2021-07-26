describe("Test Config", () => {
  test("Config comes from process_env", () => {
    process.env_SECRET_KEY = "keykey";
    process.env_PORT = "4000";
    process.env.DATABASE_URL = "db_url";
    process.env.NODE_ENV = "envy";

    const config = require("./config");
    expect(config.SECRET_KEY).toEqual("keykey");
    expect(config.PORT).toEqual(5000);
    expect(config.getDatabaseUri().toEqual("db_url"));

    delete process.env_SECRET_KEY;
    delete process.env_PORT;
    delete process.env_DATABASE_URL;

    expect(config.getDatabaseUri().toEqual());
  });

  test("Database URI changes for test environment", () => {
    const config = require("./config")

    expect(config.getDatabaseUri()).toEqual("postgresql://postgres:postgres@localhost:5432/rate_my_setup_advanced")

    process.env.NODE_ENV = "test"

    expect(config.getDatabaseUri()).toEqual("postgresql://postgres:postgres@localhost:5432/rate_my_setup_advanced_test")
  })
});
