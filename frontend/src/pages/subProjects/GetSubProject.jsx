import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import Table from "../../components/Table";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumbs";
import { ShimmerTable, ShimmerTitle } from "react-shimmer-effects";

const GetSubPRoject = () => {
  const [subproject, setSubProject] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://skai-lama-psi.vercel.app/subproject/${projectId}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setSubProject(response.data.subProjects);
        setProjectName(response.data.projectName);
        setLoading(false);  
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [projectId, navigate]);

  const handleDelete = async (subProjectId) => {
    try {
      await axios.delete(
        `https://skai-lama-psi.vercel.app/subproject/delete/${subProjectId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      // Refresh or update the project list after deletion
      setSubProject(
        subproject.filter((subProject) => subProject.id !== subProjectId)
      );
    } catch (error) {
      console.error("Error deleting subproject", error);
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const breadcrumbItems = [
    { path: "/", label: "Home", icon: AiOutlineHome },
    { path: "/projects", label: projectName },
    { path: `/subproject/${projectId}`, label: "Upload", color: "#7E22CE" },
  ];

  return (
    <>
      <Navbar />

      <div className="lg:px-32 md:px-28 px-5 ">
        {loading ? (
          <div className="mt-20">
          <ShimmerTitle  line={3} variant="secondary" />
          <ShimmerTable />
          </div>
        ) : (
          <>
            <Breadcrumb items={breadcrumbItems} />
            <Table
              project={subproject}
              id={projectId}
              projectName={projectName}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </>
  );
};

export default GetSubPRoject;
