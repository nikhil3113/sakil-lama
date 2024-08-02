import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../../components/Form";

const Login = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email: formData.email,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/projects");
    } catch (error) {
      console.log(error);
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

  return <ProjectForm title="Login" fields={fields} onSubmit={handleLogin} userAuth="signup" />;
};

export default Login;
