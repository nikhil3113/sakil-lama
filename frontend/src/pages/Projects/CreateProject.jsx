import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../../components/Form";
import { AiOutlineHome } from "react-icons/ai";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumbs";

const CreateProject = () => {
  const navigate = useNavigate();

  const handleCreateProject = async (formData) => {
    await axios
      .post(
        "https://skai-lama-psi.vercel.app/project",
        {
          name: formData.name,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        navigate("/projects");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };
  const fields = [
    {
      name: "name",
      label: "Project Name",
      type: "text",
      placeholder: "Enter Project Name",
    },
  ];

  const breadcrumbItems = [
    { path: "/", label: "Home", icon: AiOutlineHome },
    { path: "/project/create", label: "create-project", color: "#7E22CE" },
  ];

  return (
    <>
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      <ProjectForm
        title="Create Project"
        fields={fields}
        onSubmit={handleCreateProject}
      />
    </>
  );
};

export default CreateProject;
