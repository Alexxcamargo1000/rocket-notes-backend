const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require('bcryptjs')
class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();
 
    if (!user) {
      throw new AppError("Email e/ou senha incorreta",401 );
    }
    
    const isPasswordChecked = await compare(password, user.password);

    if(!isPasswordChecked) {
      throw new AppError("Email e/ou senha incorreta",401 );
    }

    return response.json(user);
  }
}

module.exports = SessionsController;
