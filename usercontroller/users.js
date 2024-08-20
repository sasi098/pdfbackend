const { Users } = require("../schema/userschema");

exports.createUser = async (req, res) => {
  try {
    const { uname, pass, email } = req.body;
    const newuser = new Users({ uname, pass, email });
    await newuser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newuser });
  } catch (error) {
    console.error("Error in adding user", error);
    res.status(500).json({ message: "Error in creating user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { uname, pass } = req.body;
    const user = await Users.findOne({ uname: uname, pass: pass });
    if (user) {
      res
        .status(201)
        .json({ message: "User logged in successfully", user: user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in logging in user", error);
    res.status(500).json({ message: "Error in logging in user" });
  }
};
