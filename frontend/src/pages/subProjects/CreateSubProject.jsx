import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../../components/Form";
import Navbar from "../../components/Navbar";
import { AiOutlineHome } from "react-icons/ai";
import Breadcrumb from "../../components/Breadcrumbs";

const CreateSubProject = () => {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const handleCreateSubProject = async (formData) => {
    await axios
      .post(
        `https://skai-lama-psi.vercel.app/subproject/${projectId}`,
        {
          name: formData.name,
          description: formData.description,
          projectId: projectId,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        navigate(`/subproject/${projectId}`);
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
      label: "Episode Name",
      type: "text",
      placeholder: "Enter Episode Name",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter Description",
    },
  ];

  const breadcrumbItems = [
    { path: "/", label: "Home", icon: AiOutlineHome },
    // { path: "/projects", label: "project", },
    { path: `/subproject/${projectId}`, label: "Upload" },
    {
      path: `/subproject/create/${projectId}`,
      label: "Create",
      color: "#7E22CE",
    },
  ];

  return (
    <>
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      <ProjectForm
        title="Create Episode"
        fields={fields}
        onSubmit={handleCreateSubProject}
      />
    </>
  );
};

export default CreateSubProject;
