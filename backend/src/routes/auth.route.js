import express from "express"

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send("Signup End Point")
})

router.get('/login', (req, res) => {
    res.send("Login End Point")
})

router.get('/logout', (req, res) => {
    res.send("Logout End Point")
})

export default router;