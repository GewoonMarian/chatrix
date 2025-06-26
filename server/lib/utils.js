import jwt from "jsonwebtoken";

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
  };
  // Generate a token with a secret key and an expiration time
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}
