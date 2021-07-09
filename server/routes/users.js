const router = require("express").Router();
const { getUsers, getUser, addUser } = require("../controllers/users");

// GET /users Gets all users
router.get("/", getUsers);
// GET /users/:id Get user by Id
router.get("/:id", getUser);
// POST /users/add Adds a user
router.post("/add", addUser);

module.exports = router;
