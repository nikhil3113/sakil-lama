import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../../components/Form";
import Navbar from "../../components/Navbar";
import { AiOutlineHome } from "react-icons/ai";
import Breadcrumb from "../../components/Breadcrumbs";

const Login = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        "https://skai-lama-psi.vercel.app/user/login",
        {
          email: formData.email,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/projects");
    } catch (error) {
      console.log(error);
      alert("Invalid Email")
    }
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter Email",
    },
  ];

  const breadcrumbItems = [
    { path: "/", label: "Home", icon: AiOutlineHome },
    { path: "/login", label: "Login", color: "#7E22CE" },
  ];

  return (
    <>
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      <ProjectForm
        title="Login"
        fields={fields}
        onSubmit={handleLogin}
        userAuth="signup"
      />
    </>
  );
};

export default Login;
