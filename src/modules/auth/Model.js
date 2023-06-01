const AuthRepository = require("./Repository");

const AuthModel = {

  checkIfUserExists: async (email) => {

    return await AuthRepository.checkIfEmailExist(email);
  },

  signUp: async (input) => {
    return await AuthRepository.createAccount(input);
  },

  UpdateUser: async (id, updatedData) => {
    return await AuthRepository.updateRecord(id, updatedData);
  },

};

module.exports = AuthModel;
