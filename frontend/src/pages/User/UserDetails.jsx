import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { AiOutlineHome } from "react-icons/ai";
import Breadcrumb from "../../components/Breadcrumbs";
import { MdEdit, MdCheck } from "react-icons/md";
import {
  ShimmerCircularImage,
  ShimmerSectionHeader,
} from "react-shimmer-effects";

const UserDetails = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const[isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://skai-lama-psi.vercel.app/user`, {
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

  const handleSaveClick = async (e) => {
    e.preventDefault();
    axios
      .put(
        "https://skai-lama-psi.vercel.app/user/update",
        {
          username: username,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setIsEditing(false);
        alert("Username updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditClick = ()=>{
    setIsEditing(!isEditing)
  }

  const breadcrumbItems = [
    { path: "/", label: "Home", icon: AiOutlineHome },
    { path: "/projects", label: "Projects" },
    { path: "/user", label: "Account Settings", color: "#7E22CE" },
  ];

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-32 space-y-4">
          <ShimmerCircularImage size={150} />
          <ShimmerSectionHeader />
        </div>
      ) : (
        <>
          <div className="px-8 md:px-20 my-10">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl md:text-5xl font-bold text-[#7E22CE]">
              Account Settings
            </h1>
          </div>
          <div className="flex flex-col md:flex-row justify-evenly items-center mt-10 md:mt-20 space-y-10 md:space-y-0">
            <div className="bg-purple-800 flex items-center justify-center text-white text-3xl md:text-5xl font-bold w-24 h-24 md:w-32 md:h-32 p-4 md:p-16 rounded-full shadow-lg">
              {username.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col items-start gap-5 w-72">
              <p className="text-xl md:text-2xl font-bold text-[#7E22CE]">
                Username
              </p>
              <div className="flex gap-5 items-center">
                <input
                  value={username}
                  className={`w-full border-2 ${isEditing ? "border-blue-300" : "border-gray-300"} rounded-lg px-4 py-2 font-semibold bg-gray-100 shadow-inner`}
                  readOnly={!isEditing}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {isEditing ? (
                  <MdCheck
                    className="text-green-500 cursor-pointer text-3xl"
                    onClick={handleSaveClick}
                  />
                ) : (
                  <MdEdit
                    className="text-blue-500 cursor-pointer text-3xl"
                    onClick={handleEditClick}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 w-72">
              <p className="text-xl md:text-2xl font-bold text-[#7E22CE]">
                Email
              </p>
              <input
                value={email}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-100 shadow-inner"
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
