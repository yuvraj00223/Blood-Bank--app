const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'User already exists',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const user = new userModel(req.body);
        await user.save();

        return res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Register API',
        });
    }
};
//login call back
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials',
            });
        }
        if(user.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message:"role dosent match"
            })
        }
// compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            token,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error In Login API',
        });
    }
};

const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        return res.status(200).send({
            success: true,
            message: 'User Fetched Successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Unable to get current user',
        });
    }
};

module.exports = { registerController, loginController, currentUserController };
