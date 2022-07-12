const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UsersService = require("./users.service");

class UsersController {
    constructor() {
    }

    async signUp(req, res) {
        try {
            let newUser;
            const user = req.body;
            const oldUser = await UsersService.findUser(user.email);

            // check user if exist
            if (oldUser) {
                return res.status(409).send("User already exist. Please login.");
            }

            // create new user
            user.password = await bcrypt.hash(user.password, 10);
            newUser = await UsersService.createUser(user);

            res.status(204).send("No Content");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async signIn(req, res) {
        try {
            let oldUser,
                token;
            const {email, password} = req.body;
            // check user if exist
            oldUser = await UsersService.findUser(email);
            if (!oldUser) {
                return res.status(400).send("Invalid Credentials");
            }

            // check password if right
            if (await bcrypt.compare(password, oldUser.password)) {
                token = jwt.sign({
                    email: oldUser.email,
                    username: oldUser.username,
                    id: oldUser._id,
                    role: oldUser.role
                }, process.env.JWT_TOKEN)
            } else {
                return res.status(400).send("Invalid Credentials");
            }
            res.status(200).json({token, role: oldUser.role});
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new UsersController();