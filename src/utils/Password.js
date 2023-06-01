const bcrypt = require("bcryptjs");

const hash_password = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw err.toString();
  }
};

const compare_password = async(password)=>{
  try{
    return await bcrypt.compare(password, user.password);
  } catch(err){
    throw err.toString();
  }
}
module.exports = { hash_password, compare_password };
