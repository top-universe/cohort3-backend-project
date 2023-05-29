const AuthRepository = require("./Repository");

const AuthModel = {
  checkForDuplicates: async (email) => {
    return await AuthRepository.checkIfEmailExist(email);
  },

  signUp: async (input) => {
    return await AuthRepository.createAccount(input);
  },
};

module.exports = AuthModel;
