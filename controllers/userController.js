const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { member1Email, password } = req.body;

  const user = await User.findOne({ member1Email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      member1Name: user.member1Name,
      member1Email: user.member1Email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { member1Name, member1Email, member1Number, state, password } =
    req.body;

  const userExists = await User.findOne({ member1Email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    member1Name,
    member1Email,
    member1Number,
    state,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      member1Name: user.member1Name,
      member1Email: user.member1Email,
      member1Number: user.member1Number,
      state: user.state,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,

      state: user.state,

      shortTeamName: user.shortTeamName,
      teamName: user.teamName,

      member1Name: user.member1Name,
      member1Email: user.member1Email,
      member1Number: user.member1Number,

      member2Name: user.member2Name,
      member2Email: user.member2Email,
      member2Number: user.member2Number,

      member3Name: user.member3Name,
      member3Email: user.member3Email,
      member3Number: user.member3Number,

      member4Name: user.member4Name,
      member4Email: user.member4Email,
      member4Number: user.member4Number,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("User fetched:", user);

    if (user) {
      user.shortTeamName = req.body.shortTeamName || user.shortTeamName;
      user.teamName = req.body.teamName || user.teamName;

      user.member1Name = req.body.member1Name || user.member1Name;
      user.member1Email = req.body.member1Email || user.member1Email;
      user.member1Number = req.body.member1Number || user.member1Number;

      user.member2Name = req.body.member2Name || user.member2Name;
      user.member2Email = req.body.member2Email || user.member2Email;
      user.member2Number = req.body.member2Number || user.member2Number;

      user.member3Name = req.body.member3Name || user.member3Name;
      user.member3Email = req.body.member3Email || user.member3Email;
      user.member3Number = req.body.member3Number || user.member3Number;

      user.member4Name = req.body.member4Name || user.member4Name;
      user.member4Email = req.body.member4Email || user.member4Email;
      user.member4Number = req.body.member4Number || user.member4Number;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      console.log("Updated user:", updatedUser);

      res.json({
        _id: updatedUser._id,
        paymentComplete: updatedUser.paymentComplete,

        shortTeamName: updatedUser.shortTeamName,
        teamName: updatedUser.teamName,

        member1Name: updatedUser.member1Name,
        member1Email: updatedUser.member1Email,
        member1Number: updatedUser.member1Number,

        member2Name: updatedUser.member2Name,
        member2Email: updatedUser.member2Email,
        member2Number: updatedUser.member2Number,

        member3Name: updatedUser.member3Name,
        member3Email: updatedUser.member3Email,
        member3Number: updatedUser.member3Number,

        member4Name: updatedUser.member4Name,
        member4Email: updatedUser.member4Email,
        member4Number: updatedUser.member4Number,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error in updateUserProfile:", error); // Log any caught errors
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
