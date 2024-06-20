const { where } = require('sequelize');
const {User} = require('../models/model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        res.status(400).json({message: "invalid request"})

    const user = User.findOne({where: {email: email}})
    if (!user)
        res.status(401).json({message: "User doesnt exist"})

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
        res.status(401).json({message: "Wrong password"})

    const token = jwt.sign({email, id: user.id}, process.env.JWT_SECRET, {expiresIn: '30d'});
    res.status(200).json({token});
}

const register = async (req, res) => {
    const {email, password, username, role, } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, process.env.SALT || 10);
        const user = await User.create({username, email, password: hashedPassword});
        res.status(201).send("Success");
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {login, register}