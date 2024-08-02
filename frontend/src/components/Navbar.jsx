import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiLogoutBoxLine, RiLoginBoxLine } from "react-icons/ri";
import { GoProjectSymlink } from "react-icons/go";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/user`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          // console.log(response.data.user);
          setUsername(response.data.user.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-white mb-5">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <p className="text-2xl text-purple-700 font-bold ml-3">LAMA</p>
        </Link>

        <div className="flex items-center space-x-4">
          {token && username ? (
            <div className="flex items-center space-x-4 ">
              <Link to="/projects" className="mr-2">
                <GoProjectSymlink  className="w-8 h-8 text-purple-700 cursor-pointer"/>
              </Link>
              <Link to="/user" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full font-bold p-5">
                  {username.charAt(0).toUpperCase()}
                </div>
              </Link>
              <div>
                {" "}
                <RiLogoutBoxLine
                  className="w-8 h-8 text-purple-700 cursor-pointer"
                  onClick={handleLogout}
                />
              </div>
              {/* <span className="hidden md:block">{username}</span> */}
            </div>
          ) : (
            <Link to="/login">
              <RiLoginBoxLine className="w-8 h-8 text-purple-700" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
