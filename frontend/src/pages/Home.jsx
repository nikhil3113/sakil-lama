import Navbar from "../components/Navbar";
import image from "../assets/podcast.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleAuthUser = () => {
    if (token) {
      navigate("/project/create");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="max-sm:text-2xl text-5xl font-extrabold text-[#7E22CE] ">
          Create New Project
        </h1>
        <img src={image} alt="podcast" className="my-5 max-sm:w-80" />
        <p className="my-5 w-[60%] text-[20px] text-[#838383] font-semibold text-center max-sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in
        </p>

        <button className="flex items-center bg-[#211935] px-4 py-4 rounded-lg text-white my-5 hover:opacity-90" onClick={handleAuthUser}>
          <svg
            width="50"
            height="45"
            viewBox="0 0 57 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-sm:w-10"
          >
            <path
              d="M25.8806 42.7186H31.4663V31.5484H42.6376V25.9633H31.4663V14.7931H25.8806V25.9633H14.7093V31.5484H25.8806V42.7186ZM28.6734 56.6814C24.81 56.6814 21.1793 55.9478 17.7814 54.4808C14.3834 53.0138 11.4277 51.0246 8.91415 48.5131C6.4006 45.9998 4.41117 43.0444 2.94587 39.6468C1.48056 36.2492 0.746979 32.6189 0.745117 28.7558C0.745117 24.8928 1.4787 21.2625 2.94587 17.8649C4.41304 14.4673 6.40246 11.5118 8.91415 8.99854C11.4277 6.48524 14.3834 4.49601 17.7814 3.03085C21.1793 1.56569 24.81 0.832184 28.6734 0.830322C32.5368 0.830322 36.1675 1.56383 39.5655 3.03085C42.9634 4.49787 45.9192 6.4871 48.4327 8.99854C50.9463 11.5118 52.9366 14.4673 54.4038 17.8649C55.8709 21.2625 56.6036 24.8928 56.6017 28.7558C56.6017 32.6189 55.8681 36.2492 54.401 39.6468C52.9338 43.0444 50.9444 45.9998 48.4327 48.5131C45.9192 51.0264 42.9634 53.0166 39.5655 54.4836C36.1675 55.9506 32.5368 56.6832 28.6734 56.6814Z"
              fill="#F8F8F8"
            />
          </svg>
          <span className="text-3xl font-bold ml-2 max-sm:text-xl">Create New Project</span>
        </button>
      </div>
    </>
  );
};

export default Home;
