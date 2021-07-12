const router = require("express").Router();
const { getUsers, getUser, signUpUser, signInUser } = require("../controllers/users");
const auth = require('../middleware/auth')

// GET /users Gets all users
router.get("/", getUsers);
// GET /users/:id Get user by Id
router.get("/:id", getUser);
// POST /users/signIn Adds a user
router.post("/signin", signInUser);
// POST /users/signUp Adds a user
router.post("/signup", signUpUser);

module.exports = router;
