const prisma = require('../prisma')

const subProjectController = {
    createSubProject: async (req, res) => {
        try {
            const { name, description } = req.body;
            const { projectId } = req.params;
            await prisma.subProject.create({
                data: {
                    name,
                    description,
                    Project: {
                        connect: {
                            id: projectId
                        }
                    }
                }
            })

            res.status(201).json({ message: "SubProject created" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    },

    getsubPRojectByProjectId: async (req, res) => {
        try {
            const { projectId } = req.params;

            const subProject = await prisma.subProject.findMany({
                where: {
                    projectId: projectId,
                },
                include: {
                    Project: true
                }
            })
            const projectName = subProject.length > 0 ? subProject[0].Project.name : "Projects";


            const responseData = {
                projectName: projectName,
                subProjects: subProject,
            };

            res.status(200).json(responseData);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    },

    getSubProjectById: async (req, res) => {

        try {

            const { id } = req.params;
            const subProject = await prisma.subProject.findUnique({
                where: {
                    id: id
                }
            })

            res.status(200).json(subProject)
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    },

    editSubProject: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            await prisma.subProject.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    description
                }
            })
            res.status(200).json({ message: "SubProject updated" })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    },

    deleteSubProject: async (req, res) => {
        try {
            const { id } = req.params

            await prisma.subProject.delete({
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: "SubProject deleted" })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
}

module.exports = subProjectController