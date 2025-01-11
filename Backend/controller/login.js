const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the provided email and password match the environment variables
    if (process.env.EMAIL === email && process.env.PASS === password) {
      // Create JWT token (no need for user._id and user.email since it's a hardcoded check)
      const token = jwt.sign(
        { email: email }, // Store the email in the token payload
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.json({
        message: "Login successful",
        token,
      });
    } else {
      // Return 401 Unauthorized for incorrect credentials
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports =  { login };
