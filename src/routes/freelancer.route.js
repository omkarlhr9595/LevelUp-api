const router = require("express").Router();
const register = require("../controllers/freelancer.auth");

router.post("/register", register);

module.exports = router;
