const bcrypt = require('bcrypt');

const User = require('../models/user');
const Token = require("../models/token");

async function register (req, res) {
    const data = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
    data.password = await bcrypt.hash(data.password, salt)

    const result = await User.create(data)
    console.log(result);
    res.status(201).send(result);
}

async function login (req, res) {
    try {
        const data = req.body;
        const user = await User.getOneByUsername(data.username)

        const authenticated = await bcrypt.compare(data.password, user.password)
        if (!authenticated) {
            throw new Error("Incorrect credentials")
        } else {
            const token = await Token.create(user.id)
            res.status(200).json({ authenticated: true, token: token.token })
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = {
    register, login
}
