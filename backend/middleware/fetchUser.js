const jwt = require('jsonwebtoken');
const JWT_SECREAT = "Thisisa$ecreatToken"

const fetchUser = (req, res, next) => {
    // Get the zuser from the JWT token and add Id to the requested object 
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Please Authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECREAT);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please Authenticate using a valid token" })

    }
}

module.exports = fetchUser;