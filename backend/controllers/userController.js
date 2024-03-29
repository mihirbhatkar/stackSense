const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");
const Wallet = require("../models/walletModel.js");

// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email });

	if (user && (await user.matchPasswords(password))) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, walletAmount } = req.body;

	const userExists = await User.findOne({ email: email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists!");
	}

	const user = await User.create({
		name: name,
		email: email,
		password: password,
	});

	// const newWallet = await Wallet.create({
	//   user: user._id,
	//   monthlyLimit: walletAmount,
	//   currentBalance: walletAmount,
	// });

	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// route    POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: "User logged out" });
});

// route    GET /api/users/profile
// @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   res.status(200).json(user);
// });

// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		const userWithSameEmail = await User.findOne({ email: req.body.email });
		if (
			userWithSameEmail &&
			userWithSameEmail._id.valueOf() !== user._id.valueOf()
		) {
			res.status(406);
			throw new Error("This email already exists. Try different one.");
		}

		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) user.password = req.body.password;

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

module.exports = {
	authUser,
	registerUser,
	logoutUser,
	// getUserProfile,
	updateUserProfile,
};
