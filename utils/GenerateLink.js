const HOST = process.env.HOST || "http://localhost:3550";

const generate_link = async (token) => {
  return `${HOST}/api/users/verify/${token}`;
};

module.exports = generate_link;
