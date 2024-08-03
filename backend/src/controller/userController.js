const prisma = require('../prisma')
const jwt = require('jsonwebtoken')


const userController = {
    signup: async (req, res) => {
        try {
            const { username, email } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (user) {
                return res.status(400).json({
                    message: "User already exists"
                })
            }

            await prisma.user.create({
                data: {
                    email: email,
                    username: username
                }
            })

            res.status(201).json({
                message: "User created successfully"
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
        }

    },

    login: async (req, res) => {
        try {
            const { email } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!user) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }

            const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

            res.status(201).json({
                message: "User created successfully",
                token: `Bearer ${token}`
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })

        }

    },

    getUser: async (req, res) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.user.id
                }
            })

            res.status(200).json({
                user
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })

        }
    },

    updateUsername: async (req, res) => {
        try {
            const { username } = req.body;

            await prisma.user.update({
                where: {
                    id: req.user.id,
                },
                data: {
                    username: username
                }
            })

            res.status(200).json({
                message: "Username updated successfully"
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

module.exports = userController