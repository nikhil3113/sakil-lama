import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/User/Signup";
import Login from "./pages/User/Login";
import CreateProject from "./pages/Projects/CreateProject";
import GetProjects from "./pages/Projects/GetProjects";
import GetSubPRoject from "./pages/subProjects/GetSubProject";
import CreateSubProject from "./pages/subProjects/CreateSubProject";
import UserDetails from "./pages/User/UserDetails";
import EditSubProject from "./pages/subProjects/EditSubProject";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<UserDetails />} />

      <Route path="/projects" element={<GetProjects />} />
      <Route path="/project/create" element={<CreateProject />} />

      <Route path="/subproject/:projectId" element={<GetSubPRoject />} />
      <Route
        path="/subproject/create/:projectId"
        element={<CreateSubProject />}
      />
      <Route path="/subproject/edit/:id" element={<EditSubProject />} />
    </Routes>
  );
}

export default App;
