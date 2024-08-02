const prisma = require('../prisma')

const projectController = {
    createProject: async (req, res) => {
        try {
            const { name } = req.body
            await prisma.project.create({
                data: {
                    name,
                    User: {
                        connect: {
                            id: req.user.id
                        }
                    }
                }
            })
            res.status(201).json({ message: "Project created" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    },

    getProjects: async(req,res)=>{
        try {
            const projects = await prisma.project.findMany({
                where:{
                    userId: req.user.id
                },include:{
                    subProjects:true
                }
            })
            res.status(200).json(projects)
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}

module.exports = projectController