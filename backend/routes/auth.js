const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { query, validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECREAT = "Thisisa$ecreatToken"

//Route 1 : Creating a User using POST : "/api/auth/createuser" No login required 
router.post('/createuser', [
    body('name').isLength({ min: 5 }).withMessage('Enter a valid name name should be atleast 5 characters'),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password').isLength({ min: 8 }).withMessage('Enter a valid password. Password should be atleast 8 characters'),
    body('username', 'Enter a valid username').isLength({ min: 4 }),

], async (req, res) => {

    // If there is any error return Bad Request and the error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check wheather the user with this email or username exists already or not

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user is already exists with this Email" })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        //Create a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            username: req.body.username,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECREAT);
        // res.json(user)
        res.json({ authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2 : Authenticating a User using POST : "/api/auth/login" No login required 

router.post('/login', [
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password', 'Password Cannot be Blank').exists(),

], async (req, res) => {
    // If there is any error return Bad Request and the error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct Credencials " });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct Credencials " });

        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECREAT);
        res.json({ authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3 : Grabbing Logged in User detsils  using POST : "/api/auth/getuser" No login required 
router.post('/getuser',fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router