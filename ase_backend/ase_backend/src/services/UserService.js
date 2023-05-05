const UserModel = require('../models/user');
class UserService {
  static async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  static async findByEmailInOrg(
    organization,
    email,
  ) {
    const user = await UserModel.findOne({ organization, email });
    return user;
  }
}

module.exports = UserService;
