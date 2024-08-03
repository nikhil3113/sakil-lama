import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../../components/Form";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumbs";
import { AiOutlineHome } from "react-icons/ai";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      await axios.post("https://skai-lama-psi.vercel.app/user/signup", {
        username: formData.username,
        email: formData.email,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        alert("User already exists");
      }
    }
  };
  const fields = [
    {
      name: "username",
      label: "username",
      type: "text",
      placeholder: "Enter Username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter Email",
    },
  ];

  const breadcrumbItems = [
   {path:"/", label:"Home", icon: AiOutlineHome},
    {path:"/Signup", label:"Signup", color: "#7E22CE"}
  ]

  return(
    <>
    <Navbar />
    <Breadcrumb items={breadcrumbItems}/>
    <ProjectForm title="Signup" fields={fields} onSubmit={handleSignup} userAuth="login"/>
    </>
  ) 
  
};

export default Signup;
