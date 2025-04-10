const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log("generateToken received user:", user);

  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
};

module.exports = generateToken;
