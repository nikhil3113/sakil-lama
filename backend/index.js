const express = require('express');
const userRouter = require('./src/routes/user');
const projectRouter = require('./src/routes/project');
const subProjectRouter = require('./src/routes/subProjects');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/user', userRouter)
app.use('/project', projectRouter)
app.use('/subproject', subProjectRouter)

port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})