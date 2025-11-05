import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import 'dotenv/config'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    console.log(fullName, email, password)
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters" })
        }
        // check if email is valid:
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email Formate" })
        }

        const user = await User.findOne({ email: email })
        if (user) return res.status(400).json({ message: "User Already Exists!" })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            const savedUser = await newUser.save()
            generateToken(savedUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

            try {
                await sendWelcomeEmail(savedUser.fullName, savedUser.email, process.env.CLIENT_URL)
            } catch (error) {
                console.log("Failed to send welcome email", error)
                throw new Error("Failed To send welcome email", error)
            }

        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }


    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

