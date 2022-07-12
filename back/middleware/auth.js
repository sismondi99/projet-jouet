const jwt = require("jsonwebtoken");

const config = process.env;

const verifySeller = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        try {
            const user = jwt.verify(bearerToken, config.JWT_TOKEN);
            if (user.role !== 'seller') {
                return res.status(403).send("You are not the seller");
            }
            req.user = user;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    } else {
        // Forbidden
        return res.status(403).send("A token is required for authentication");
    }
};

const verifyUser = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        try {
            const decoded = jwt.verify(bearerToken, config.JWT_TOKEN);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    } else {
        // Forbidden
        return res.status(403).send("A token is required for authentication");
    }
};

module.exports = {
    verifySeller,
    verifyUser
};
