import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { AiOutlineHome } from "react-icons/ai";
import Breadcrumb from "../../components/Breadcrumbs";
import {
  ShimmerCircularImage,
  ShimmerSectionHeader,
} from "react-shimmer-effects";

const UserDetails = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data.user);
        setUsername(response.data.user.username);
        setEmail(response.data.user.email);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  const breadcrumbItems = [
    { path: "/", label: "Home", icon: AiOutlineHome },
    { path: "/projects", label: "Projects" },
    { path: "/user", label: "Account Settings", color: "#7E22CE" },
  ];

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-evenly mt-32">
          <ShimmerCircularImage size={150} />
          <ShimmerSectionHeader />
        </div>
      ) : (
        <>
          <div className="px-20 my-10">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-5xl font-bold text-[#7E22CE] ">
              Account Settings
            </h1>
          </div>
          <div className="flex justify-evenly items-center mt-20">
            <div className="bg-purple-800 flex items-center justify-center text-white mb-4 text-5xl font-bold w-14 h-14 p-16 rounded-full">
              {username.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col justify-between items-start gap-5">
              <p className="text-2xl font-bold"> User Name</p>
              <input
                value={username}
                className="border-2 border-gray-500 rounded-lg px-2 py-1 font-semibold "
                readOnly
              />
            </div>
            <div className="flex flex-col justify-between items-start gap-5">
              <p className="text-2xl font-bold"> Email</p>
              <input
                value={email}
                className="border-2 border-gray-500 rounded-lg px-2 py-1  "
                readOnly
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
