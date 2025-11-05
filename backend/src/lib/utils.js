import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const { JWT_SECRET, NODE_ENV } = process.env;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured")
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, //prevent xss attacks: cross site scripting
        sameSite: "Strict", //CSRF attacks
        secure: NODE_ENV !== "development",
    })
    return token;
}