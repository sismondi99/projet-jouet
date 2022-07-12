const UsersModel = require("./users.model");

class UsersService {
    constructor() {
    }

    async createUser(user) {
        return UsersModel.create(user);
    }

    async findUser(email) {
        return UsersModel.findOne({ email });
    }
}

module.exports = new UsersService();