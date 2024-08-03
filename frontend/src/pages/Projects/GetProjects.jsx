import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {ShimmerPostItem} from "react-shimmer-effects"

const GetProjects = () => {
  const [projects, setProjects] = useState([]);
  // const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://skai-lama-psi.vercel.app/project", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setProjects(response.data);
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

  return (
    <>
      <Navbar />
      <div className=" lg:px-32 md:px-28 px-5">
        <div className="flex flex-row max-sm:flex-col justify-between items-center ">
          <h1 className="text-5xl font-bold text-[#7E22CE] p-5 mb-5">
            Projects
          </h1>
          <Link to="/project/create">
            <button className="flex items-center bg-[#211935] px-3 py-2 rounded-lg text-white my-5 mr-5">
              <svg
                width="40"
                height="35"
                viewBox="0 0 57 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.8806 42.7186H31.4663V31.5484H42.6376V25.9633H31.4663V14.7931H25.8806V25.9633H14.7093V31.5484H25.8806V42.7186ZM28.6734 56.6814C24.81 56.6814 21.1793 55.9478 17.7814 54.4808C14.3834 53.0138 11.4277 51.0246 8.91415 48.5131C6.4006 45.9998 4.41117 43.0444 2.94587 39.6468C1.48056 36.2492 0.746979 32.6189 0.745117 28.7558C0.745117 24.8928 1.4787 21.2625 2.94587 17.8649C4.41304 14.4673 6.40246 11.5118 8.91415 8.99854C11.4277 6.48524 14.3834 4.49601 17.7814 3.03085C21.1793 1.56569 24.81 0.832184 28.6734 0.830322C32.5368 0.830322 36.1675 1.56383 39.5655 3.03085C42.9634 4.49787 45.9192 6.4871 48.4327 8.99854C50.9463 11.5118 52.9366 14.4673 54.4038 17.8649C55.8709 21.2625 56.6036 24.8928 56.6017 28.7558C56.6017 32.6189 55.8681 36.2492 54.401 39.6468C52.9338 43.0444 50.9444 45.9998 48.4327 48.5131C45.9192 51.0264 42.9634 53.0166 39.5655 54.4836C36.1675 55.9506 32.5368 56.6832 28.6734 56.6814Z"
                  fill="#F8F8F8"
                />
              </svg>
              <span className="text-xl font-bold   ml-2">
                Create New Project
              </span>
            </button>
          </Link>
        </div>
        {loading ? (
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {Array.from({ length: 6 }).map((_, index) => (
              // <CardLoader key={index} />
              <div key={index}>
                <div className="gap-10 mt-10 ">
                  <div className=" w-[350px]">
                    <ShimmerPostItem
                      card
                      title
                      cta
                      imageType="thumbnail"
                      imageWidth={200}
                      imageHeight={5}
                      contentCenter
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card projects={projects} />
        )}
      </div>
    </>
  );
};

export default GetProjects;
